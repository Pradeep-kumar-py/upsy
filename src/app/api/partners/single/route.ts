import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import PartnerCategory from '@/models/Partner';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, logo, description, programs, students, category } = body;

    // Validate required fields
    if (!name || !logo || !description || !programs || !students || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(programs) || programs.length === 0) {
      return NextResponse.json(
        { error: 'At least one program is required' },
        { status: 400 }
      );
    }

    if (!['universities', 'corporates', 'platforms'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Get category titles and descriptions
    const categoryInfo = {
      universities: {
        title: "University Partners",
        description: "Leading educational institutions providing world-class programs"
      },
      corporates: {
        title: "Corporate Partners", 
        description: "Industry leaders offering skill development and internship opportunities"
      },
      platforms: {
        title: "Learning Platform Partners",
        description: "Online education platforms providing flexible learning solutions"
      }
    };

    // Find or create the category
    let partnerCategory = await PartnerCategory.findOne({ categoryKey: category });
    
    if (!partnerCategory) {
      // Create new category with the partner
      partnerCategory = new PartnerCategory({
        categoryKey: category,
        title: categoryInfo[category as keyof typeof categoryInfo].title,
        description: categoryInfo[category as keyof typeof categoryInfo].description,
        partners: [{
          name,
          logo,
          description,
          programs,
          students,
          category
        }]
      });
    } else {
      // Check if partner already exists
      const existingPartner = partnerCategory.partners.find(
        (partner: any) => partner.name.toLowerCase() === name.toLowerCase()
      );
      
      if (existingPartner) {
        return NextResponse.json(
          { error: 'Partner with this name already exists in this category' },
          { status: 400 }
        );
      }

      // Add partner to existing category
      partnerCategory.partners.push({
        name,
        logo,
        description,
        programs,
        students,
        category
      });
    }

    await partnerCategory.save();

    return NextResponse.json(
      {
        message: 'Partner added successfully',
        data: {
          category: partnerCategory.categoryKey,
          partner: { name, logo, description, programs, students, category }
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error adding partner:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
