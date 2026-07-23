import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { uploadFile } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    // Auth Guard
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload using our helper (Cloudinary or local public folder fallback)
    const url = await uploadFile(buffer, file.name);

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
