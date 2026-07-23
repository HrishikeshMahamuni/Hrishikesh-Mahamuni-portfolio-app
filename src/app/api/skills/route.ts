import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const skills = await dataService.getSkills();
    return NextResponse.json(skills);
  } catch (error: any) {
    console.error("GET Skills API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, icon } = body;

    if (!name || !category || !icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newSkill = await dataService.createSkill(body);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    console.error("POST Skills API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
