import mongoose, { Schema, Document } from 'mongoose';

export interface IPartnershipRequest extends Document {
  organizationName: string;
  organizationType: 'university' | 'corporate' | 'platform' | 'other';
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  establishedYear?: string;
  numberOfStudents?: string;
  programs: string[];
  description: string;
  partnershipGoals: string;
  currentPartnerships?: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
}

const PartnershipRequestSchema: Schema = new Schema({
  organizationName: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
    maxlength: [200, 'Organization name cannot exceed 200 characters']
  },
  organizationType: {
    type: String,
    required: [true, 'Organization type is required'],
    enum: ['university', 'corporate', 'platform', 'other']
  },
  contactPersonName: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true,
    maxlength: [100, 'Contact person name cannot exceed 100 characters']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  website: {
    type: String,
    trim: true,
    maxlength: [200, 'Website URL cannot exceed 200 characters']
  },
  establishedYear: {
    type: String,
    trim: true,
    maxlength: [4, 'Year should be 4 digits']
  },
  numberOfStudents: {
    type: String,
    trim: true,
    maxlength: [50, 'Number of students field cannot exceed 50 characters']
  },
  programs: {
    type: [String],
    default: [],
    validate: [
      {
        validator: function(v: string[]) {
          return v.length <= 20;
        },
        message: 'Cannot have more than 20 programs'
      }
    ]
  },
  description: {
    type: String,
    required: [true, 'Organization description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  partnershipGoals: {
    type: String,
    required: [true, 'Partnership goals are required'],
    trim: true,
    maxlength: [1000, 'Partnership goals cannot exceed 1000 characters']
  },
  currentPartnerships: {
    type: String,
    trim: true,
    maxlength: [1000, 'Current partnerships cannot exceed 1000 characters']
  },
  additionalInfo: {
    type: String,
    trim: true,
    maxlength: [1000, 'Additional information cannot exceed 1000 characters']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'in-review'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: String,
    trim: true,
    maxlength: [100, 'Reviewer name cannot exceed 100 characters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Add indexes for better query performance
PartnershipRequestSchema.index({ contactEmail: 1 });
PartnershipRequestSchema.index({ organizationType: 1 });
PartnershipRequestSchema.index({ status: 1 });
PartnershipRequestSchema.index({ submittedAt: -1 });

// Add a compound index for common queries
PartnershipRequestSchema.index({ status: 1, submittedAt: -1 });

export default mongoose.models.PartnershipRequest || mongoose.model<IPartnershipRequest>('PartnershipRequest', PartnershipRequestSchema);
