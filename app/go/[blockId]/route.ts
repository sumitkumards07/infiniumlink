import { db } from "@/db";
import { blocks, blockClicks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  const { blockId } = await params;

  // Validate UUID basic format to prevent DB errors
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(blockId);
  
  if (!isUUID) {
    return new Response("Invalid link", { status: 400 });
  }

  // Find the block
  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, blockId),
  });

  if (!block) {
    return new Response("Link not found", { status: 404 });
  }

  // Extract URL from contentJson (assuming this is a link or image block)
  const content = block.contentJson as any;
  const url = content.url;

  if (!url) {
    return new Response("Block has no URL to redirect to", { status: 400 });
  }

  const { device, browser } = userAgent(request);
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  // Basic anonymization / hashing of IP
  const crypto = await import("crypto");
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  try {
    // Record click
    await db.insert(blockClicks).values({
      blockId: block.id,
      pageId: block.pageId,
      referrer: request.headers.get("referer") || "direct",
      device: device.type || "desktop",
      browser: browser.name || "unknown",
      country: request.geo?.country || "unknown",
      ipHash: ipHash,
    });
  } catch (err) {
    console.error("Failed to track click", err);
  }

  redirect(url);
}
