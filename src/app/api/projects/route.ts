import { NextResponse } from "next/server";
import { dataService } from "@/lib/dataService";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await dataService.getProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("GET Projects API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, shortDescription, description, category, techStack, heroImage } = body;

    // Validation
    if (!title || !shortDescription || !description || !category || !heroImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = body.slug || slugify(title);
    
    // Check if slug already exists
    const existing = await dataService.getProjectBySlug(slug);
    let finalSlug = slug;
    if (existing) {
      finalSlug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newProject = await dataService.createProject({
      ...body,
      slug: finalSlug,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error("POST Projects API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
