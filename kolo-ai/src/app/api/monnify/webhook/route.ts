import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const body = await req.json();

    const { eventType, eventData } = body;

    if (eventType === "SUCCESSFUL_TRANSACTION") {
      const { paymentReference, amountPaid } = eventData;

      // Update contribution status
      await supabase
        .from("contributions")
        .update({ status: "completed" })
        .eq("transaction_ref", paymentReference);

      // Get contribution details
      const { data: contribution } = await supabase
        .from("contributions")
        .select("*")
        .eq("transaction_ref", paymentReference)
        .single();

      // Update group pool
      if (contribution?.group_id) {
        const { data: group } = await supabase
          .from("groups")
          .select("pool_amount")
          .eq("id", contribution.group_id)
          .single();

        if (group) {
          await supabase
            .from("groups")
            .update({ pool_amount: group.pool_amount + amountPaid })
            .eq("id", contribution.group_id);
        }
      }

      // Create transaction record
      await supabase.from("transactions").insert({
        monnify_ref: paymentReference,
        amount: amountPaid,
        status: "completed",
        type: "contribution",
        group_id: contribution?.group_id,
        user_id: contribution?.user_id,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}