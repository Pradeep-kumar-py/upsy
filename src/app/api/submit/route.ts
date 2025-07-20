import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Submission from '@/models/Submission';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, phone, college, purpose } = body;

    // Basic validation
    if (!name || !email || !phone || !college || !purpose) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Phone validation (10-15 digits)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Phone number must be 10-15 digits' },
        { status: 400 }
      );
    }

    // Purpose validation
    const validPurposes = ['course', 'trip', 'exchange', 'other'];
    if (!validPurposes.includes(purpose)) {
      return NextResponse.json(
        { error: 'Invalid purpose selected' },
        { status: 400 }
      );
    }

    // Create new submission
    const submission = new Submission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      purpose
    });

    await submission.save();

    return NextResponse.json(
      { 
        message: 'Submission saved successfully',
        data: submission
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error saving submission:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0] as any;
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
