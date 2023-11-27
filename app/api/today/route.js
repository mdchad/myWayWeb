import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await kv.get('todayHadith');
  return NextResponse.json(user);
}