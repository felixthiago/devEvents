import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event, type IEvent } from "@/database";

interface SuccessResponse {
  message: string;
  event: IEvent;
}

interface ErrorResponse {
  message: string;
  error?: string;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Invalid slug parameter", error: "Slug is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    await connectDB();

    const event = await Event.findOne({ slug: slug.toLowerCase().trim() }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found`, error: "EVENT_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event retrieved successfully", event },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);

    return NextResponse.json(
      {
        message: "Failed to retrieve event",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
