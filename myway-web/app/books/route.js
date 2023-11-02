import {NextRequest, NextResponse} from "next/server";
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  const db = await connectToDatabase();

  const data = await db.collection('Hadiths').find({});

  return NextResponse.json({
    success: true,
    data,
  })
}