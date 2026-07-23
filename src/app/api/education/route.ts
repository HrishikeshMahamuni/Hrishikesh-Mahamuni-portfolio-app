import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const education = await dataService.getEducation();
    return NextResponse.json(education);
  } catch (error: any) {
    console.error("GET Education API error:", error);
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
    const { type, institute,college, degree, startYear, endYear } = body;

    if (!type || !institute || !college || !degree || !startYear || !endYear) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newEdu = await dataService.createEducation(body);
    return NextResponse.json(newEdu, { status: 201 });
  } catch (error: any) {
    console.error("POST Education API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
