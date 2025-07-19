import dbConnect from "@/db/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        console.log("Database connection established");
        return NextResponse.json({ message: "Database connection successful" });
    } catch (error) {
        console.log("Database connection failed", error);
        return NextResponse.json({ message: "Database connection failed", error }, { status: 500 });
    }
}