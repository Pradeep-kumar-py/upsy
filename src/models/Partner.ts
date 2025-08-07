import mongoose, { Document, Schema } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo: string;
  description: string;
  programs: string[];
  students: string;
  category: 'universities' | 'corporates' | 'platforms';
  createdAt: Date;
  updatedAt: Date;
}

export interface IPartnerCategory extends Document {
  categoryKey: 'universities' | 'corporates' | 'platforms';
  title: string;
  description: string;
  partners: IPartner[];
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>({
  name: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true,
    maxlength: [200, 'Partner name cannot exceed 200 characters']
  },
  logo: {
    type: String,
    required: [true, 'Partner logo URL is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Partner description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  programs: [{
    type: String,
    trim: true,
    maxlength: [100, 'Program name cannot exceed 100 characters']
  }],
  students: {
    type: String,
    required: [true, 'Student count is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['universities', 'corporates', 'platforms']
  }
}, {
  timestamps: true
});

const partnerCategorySchema = new Schema<IPartnerCategory>({
  categoryKey: {
    type: String,
    required: [true, 'Category key is required'],
    enum: ['universities', 'corporates', 'platforms'],
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Category title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true
  },
  partners: [partnerSchema]
}, {
  timestamps: true
});

export const Partner = mongoose.models.Partner || mongoose.model<IPartner>('Partner', partnerSchema);
export const PartnerCategory = mongoose.models.PartnerCategory || mongoose.model<IPartnerCategory>('PartnerCategory', partnerCategorySchema);

export default PartnerCategory;
