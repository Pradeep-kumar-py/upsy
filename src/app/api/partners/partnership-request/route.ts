import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import PartnershipRequest, { IPartnershipRequest } from '@/models/PartnershipRequest';
import { z } from 'zod';

// Define the schema for partnership request validation
const partnershipRequestSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required').max(200),
  organizationType: z.enum(['university', 'corporate', 'platform', 'other']),
  contactPersonName: z.string().min(1, 'Contact person name is required').max(100),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(1, 'Contact phone is required').max(20),
  website: z.string().max(200).optional(),
  establishedYear: z.string().max(4).optional(),
  numberOfStudents: z.string().max(50).optional(),
  programs: z.array(z.string()).max(20, 'Cannot have more than 20 programs'),
  description: z.string().min(1, 'Organization description is required').max(1000),
  partnershipGoals: z.string().min(1, 'Partnership goals are required').max(1000),
  currentPartnerships: z.string().max(1000).optional(),
  additionalInfo: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // Validate the request body
    const validatedData = partnershipRequestSchema.parse(body);

    // Create a new partnership request using the Mongoose model
    const partnershipRequest = new PartnershipRequest({
      ...validatedData,
      status: 'pending',
      submittedAt: new Date(),
    });

    // Save to database
    const savedRequest = await partnershipRequest.save();

    console.log('Partnership Request Saved:', {
      id: savedRequest._id,
      organization: savedRequest.organizationName,
      type: savedRequest.organizationType,
      contact: savedRequest.contactEmail,
      submittedAt: savedRequest.submittedAt,
    });

    // Here you would typically also:
    // 1. Send notification emails to admin team
    // 2. Send confirmation email to the applicant
    // 3. Create a ticket in your CRM/support system

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Partnership request submitted successfully',
      data: {
        id: savedRequest._id,
        status: savedRequest.status,
        submittedAt: savedRequest.submittedAt,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Partnership request submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'Database validation failed',
        details: Object.values((error as any).errors).map((err: any) => ({
          field: err.path,
          message: err.message
        }))
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to submit partnership request'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
