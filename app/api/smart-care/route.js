import { NextResponse } from "next/server";
import dbConnect from "../../../lib/connectDB";
import BabyData from "../../models/BabyData";
import { getInsightsFromGemini } from "../../utils/gemini";

export async function GET(request) {
  try {
    await dbConnect();
    console.log("Database connected.");

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("Extracted userId:", userId);

    const babyData = await BabyData.findOne({ userId });
    console.log("Fetched babyData:", babyData);

    if (!babyData) {
      return NextResponse.json(
        { error: "No baby data found for this user." },
        { status: 404 }
      );
    }

    const insights = await getInsightsFromGemini(babyData);
    console.log("Obtained insights:", insights);

    return NextResponse.json(insights);
  } catch (err) {
    console.error("API Error caught in route.js:", err);
    
    return new NextResponse(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
