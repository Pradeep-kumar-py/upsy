import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import PartnerCategory from '@/models/Partner';

export async function GET() {
  try {
    await dbConnect();

    const partnerCategories = await PartnerCategory.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Transform the data to match the frontend structure
    const formattedData: any = {};
    
    partnerCategories.forEach((category: any) => {
      formattedData[category.categoryKey] = {
        title: category.title,
        description: category.description,
        partners: category.partners
      };
    });

    return NextResponse.json(
      {
        message: 'Partner categories fetched successfully',
        data: formattedData
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error fetching partner categories:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { partnerCategories } = body;

    if (!partnerCategories || typeof partnerCategories !== 'object') {
      return NextResponse.json(
        { error: 'Invalid partner categories data' },
        { status: 400 }
      );
    }

    // Clear existing data and insert new data
    await PartnerCategory.deleteMany({});

    const categoriesToInsert = Object.entries(partnerCategories).map(([key, value]: [string, any]) => ({
      categoryKey: key,
      title: value.title,
      description: value.description,
      partners: value.partners
    }));

    await PartnerCategory.insertMany(categoriesToInsert);

    return NextResponse.json(
      {
        message: 'Partner categories uploaded successfully',
        data: categoriesToInsert
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error uploading partner categories:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
