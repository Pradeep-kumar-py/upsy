import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dbConnect from '@/db/dbConnect';
import User from '@/models/User';
import { sendVerificationEmail } from '@/utils/emailService';
import { studentSignupSchema, parentSignupSchema } from '@/utils/validationSchemas';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate based on user type
    const schema = body.userType === 'student' ? studentSignupSchema : parentSignupSchema;
    const validatedData = schema.parse(body);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Check if Aadhar number already exists
    const existingAadhar = await User.findOne({ aadharNumber: validatedData.aadharNumber });
    if (existingAadhar) {
      return NextResponse.json(
        { error: 'User with this Aadhar number already exists' },
        { status: 400 }
      );
    }
    
    // Check if PAN number already exists
    const existingPan = await User.findOne({ panNumber: validatedData.panNumber });
    if (existingPan) {
      return NextResponse.json(
        { error: 'User with this PAN number already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);
    
    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date();
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24); // 24 hours
    
    // Create user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      mobile: validatedData.mobile,
      aadharNumber: validatedData.aadharNumber,
      panNumber: validatedData.panNumber,
      collegeEmail: validatedData.collegeEmail || undefined,
      userType: validatedData.userType,
      emailVerificationToken,
      emailVerificationExpires,
      isEmailVerified: false,
    });
    
    await user.save();
    
    // Send verification email
    try {
      await sendVerificationEmail({
        email: validatedData.email,
        name: validatedData.name,
        verificationToken: emailVerificationToken,
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails
    }
    
    return NextResponse.json(
      {
        message: 'Account created successfully! Please check your email to verify your account.',
        userId: user._id,
      },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Signup error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
