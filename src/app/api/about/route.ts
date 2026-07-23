import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const about = await dataService.getAbout();
    return NextResponse.json(about);
  } catch (error: any) {
    console.error("GET About API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await dataService.updateAbout(body);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT About API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
