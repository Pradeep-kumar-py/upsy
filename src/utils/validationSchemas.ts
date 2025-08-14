import { z } from 'zod';

// Base user schema for common fields
const baseUserSchema = {
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s.]+$/, 'Name should only contain letters, spaces, and dots'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  confirmPassword: z.string(),
  
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  
  aadharNumber: z.string()
    .regex(/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number'),
  
  panNumber: z.string()
    .min(10, 'PAN number must be 10 characters')
    .max(10, 'PAN number must be 10 characters')
    .transform(val => val.toUpperCase())
    .refine(val => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
      message: 'Please enter a valid PAN number (e.g., ABCDE1234F)'
    }),
  
  userType: z.enum(['parent', 'student'], {
    message: 'Please select user type',
  }),
  
  agreeToTerms: z.boolean()
    .refine(val => val === true, 'You must agree to the terms and conditions'),
  
  allowMarketing: z.boolean().optional(),
};

// Student-specific schema (includes college email)
export const studentSignupSchema = z.object({
  ...baseUserSchema,
  collegeEmail: z.string()
    .email('Please enter a valid college email address')
    .toLowerCase(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Parent-specific schema (college email optional)
export const parentSignupSchema = z.object({
  ...baseUserSchema,
  collegeEmail: z.string()
    .email('Please enter a valid college email address')
    .toLowerCase()
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(1, 'Password is required'),
});

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string()
    .min(1, 'Verification token is required'),
});

// Types for TypeScript
export type StudentSignupForm = z.infer<typeof studentSignupSchema>;
export type ParentSignupForm = z.infer<typeof parentSignupSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type EmailVerificationForm = z.infer<typeof emailVerificationSchema>;
