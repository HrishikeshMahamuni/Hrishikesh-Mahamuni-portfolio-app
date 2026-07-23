import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";

export const revalidate = 0; // Disable static caching so it always reflects CMS updates in real-time

export async function GET(req: Request) {
  try {
    const about = await dataService.getAbout();
    
    if (about && about.resumeUrl) {
      // Redirect to the stored resume URL (Cloudinary or local public upload URL)
      return NextResponse.redirect(new URL(about.resumeUrl, req.url));
    }
    
    // Fallback if no resume is uploaded yet
    return new NextResponse(
      "<html><body><h3>Resume PDF has not been uploaded yet in the admin panel.</h3><p><a href='/admin/about'>Go to Admin Panel to upload your resume PDF.</a></p></body></html>",
      {
        status: 404,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    console.error("Resume GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
