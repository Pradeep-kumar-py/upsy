import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  name: string;
  email: string;
  phone: string;
  college: string;
  purpose: 'course' | 'trip' | 'exchange' | 'other';
  createdAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 digits'],
    maxlength: [15, 'Phone number cannot exceed 15 digits']
  },
  college: {
    type: String,
    required: [true, 'College is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required'],
    enum: ['course', 'trip', 'exchange', 'other']
  }
}, {
  timestamps: true
});

const Submission = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', submissionSchema);

export default Submission;
