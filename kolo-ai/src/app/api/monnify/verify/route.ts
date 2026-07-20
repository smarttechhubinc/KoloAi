import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const reference = req.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    // Check contribution status from database
    const { data: contribution } = await supabase
      .from("contributions")
      .select("*")
      .eq("transaction_ref", reference)
      .single();

    if (!contribution) {
      return NextResponse.json({ status: "NOT_FOUND" });
    }

    // For demo: auto-confirm after a few seconds
    // In production, this would check Monnify API
    const createdTime = new Date(contribution.created_at).getTime();
    const now = Date.now();
    const elapsed = now - createdTime;

    if (elapsed > 10000) {
      // Auto-confirm after 10 seconds for demo
      await supabase
        .from("contributions")
        .update({ status: "completed" })
        .eq("transaction_ref", reference);

      // Update group pool amount
      if (contribution.group_id) {
        await supabase
          .from("groups")
          .update({ pool_amount: supabase.sql`pool_amount + ${contribution.amount}` })
          .eq("id", contribution.group_id);
      }

      // Create transaction record
      await supabase.from("transactions").insert({
        monnify_ref: reference,
        amount: contribution.amount,
        status: "completed",
        type: "contribution",
        group_id: contribution.group_id,
        user_id: contribution.user_id,
      });

      return NextResponse.json({ status: "SUCCESS", contribution });
    }

    return NextResponse.json({ status: "PENDING", contribution });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}