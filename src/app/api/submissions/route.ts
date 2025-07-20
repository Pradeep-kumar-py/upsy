import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Submission from '@/models/Submission';

export async function GET() {
  try {
    await dbConnect();

    const submissions = await Submission.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Use lean() for better performance

    return NextResponse.json(
      {
        message: 'Submissions fetched successfully',
        data: submissions
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error fetching submissions:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
