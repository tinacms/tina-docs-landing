import { fetchMeetingLinks } from '@/src/utils/get-meeting-links';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const meetingLinks = await fetchMeetingLinks();
    return NextResponse.json({ data: meetingLinks });
  } catch (error) {
    console.error('Error fetching meeting links:', error);
    return NextResponse.json({ error: 'Failed to fetch meeting links' }, { status: 500 });
  }
}
