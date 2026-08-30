import { auth } from "@clerk/nextjs/server";
import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return new NextResponse("Missing file metadata", { status: 400 });
    }

    const key = `assets/${userId}/${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "linkflow-assets",
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // The public URL assuming a custom domain is mapped to the R2 bucket
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_URL || "https://assets.mock-domain.com"}/${key}`;

    return NextResponse.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
