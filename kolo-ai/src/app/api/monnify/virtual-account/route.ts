import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { groupId, amount } = await req.json();
    const reference = `SC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const virtualAccount = {
      bankName: "Wema Bank",
      accountNumber: `803${Math.floor(1000000 + Math.random() * 9000000)}`,
      accountName: `SaveCircle / ${user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}`,
      reference,
    };

    // Create contribution
    if (groupId) {
      await supabase.from("contributions").insert({
        amount: amount || 50000,
        status: "pending",
        group_id: groupId,
        user_id: user.id,
        transaction_ref: reference,
      });
    }

    // Auto-confirm after a short delay (simulates payment)
    setTimeout(async () => {
      await supabase
        .from("contributions")
        .update({ status: "completed" })
        .eq("transaction_ref", reference);

      // Create transaction
      await supabase.from("transactions").insert({
        monnify_ref: reference,
        amount: amount || 50000,
        status: "completed",
        type: "contribution",
        group_id: groupId,
        user_id: user.id,
      });

      // Update group pool
      if (groupId) {
        const { data: group } = await supabase
          .from("groups")
          .select("pool_amount")
          .eq("id", groupId)
          .single();
        
        if (group) {
          await supabase
            .from("groups")
            .update({ pool_amount: (group.pool_amount || 0) + (amount || 50000) })
            .eq("id", groupId);
        }
      }
    }, 8000);

    return NextResponse.json({
      success: true,
      account: virtualAccount,
      reference,
    });
  } catch (error) {
    console.error("Virtual account error:", error);
    return NextResponse.json({ error: "Failed to create virtual account" }, { status: 500 });
  }
}




// import { NextRequest, NextResponse } from "next/server";
// import { createServerSupabase } from "@/lib/supabase/server";

// export async function POST(req: NextRequest) {
//   try {
//     const supabase = await createServerSupabase();
//     const { data: { user } } = await supabase.auth.getUser();
    
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { groupId, amount } = await req.json();

//     // Generate a unique reference
//     const reference = `SC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//     // In production, this would call Monnify API to create a reserved account
//     // For hackathon demo, we simulate with realistic data
    
//     const virtualAccount = {
//       bankName: "Wema Bank",
//       accountNumber: `803${Math.floor(1000000 + Math.random() * 9000000)}`,
//       accountName: `SaveCircle / ${user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}`,
//       reference,
//     };

//     // Create contribution record in database
//     if (groupId) {
//       const { error } = await supabase.from("contributions").insert({
//         amount: amount || 50000,
//         status: "pending",
//         group_id: groupId,
//         user_id: user.id,
//         transaction_ref: reference,
//       });

//       if (error) {
//         console.error("Failed to create contribution:", error);
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       account: virtualAccount,
//       reference,
//     });
//   } catch (error) {
//     console.error("Virtual account error:", error);
//     return NextResponse.json({ error: "Failed to create virtual account" }, { status: 500 });
//   }
// }