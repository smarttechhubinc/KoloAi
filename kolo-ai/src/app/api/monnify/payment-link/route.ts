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

    // Create contribution record
    if (groupId) {
      await supabase.from("contributions").insert({
        amount: amount || 50000,
        status: "pending",
        group_id: groupId,
        user_id: user.id,
        transaction_ref: reference,
      });
    }

    // Simulate Monnify checkout URL
    const checkoutUrl = `https://sandbox.monnify.com/checkout/${reference}`;

    return NextResponse.json({
      success: true,
      checkoutUrl,
      reference,
    });
  } catch (error) {
    console.error("Payment link error:", error);
    return NextResponse.json({ error: "Failed to create payment link" }, { status: 500 });
  }
}