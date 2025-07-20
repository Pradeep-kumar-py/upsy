# Multi-Step Form Component

This is a Typeform-like interactive multi-step form built with Next.js, TypeScript, and Tailwind CSS.

## Features

✅ **One question per step** - Clean, focused user experience
✅ **Smooth animations** - Slide transitions between steps using Framer Motion
✅ **Progress indicator** - Visual progress bar showing completion status
✅ **Client-side validation** - Real-time validation for all fields
✅ **Responsive design** - Works perfectly on mobile and desktop
✅ **Modern UI** - Typeform-inspired design with clean typography
✅ **Database integration** - Saves submissions to MongoDB via Next.js API routes

## Form Fields

1. **Name** (text input) - Required, minimum 2 characters
2. **Email** (email input) - Required, valid email format
3. **Phone** (tel input) - Required, exactly 10 digits
4. **College** (text input) - Required, minimum 2 characters
5. **Purpose** (dropdown) - Options: course, trip, exchange, other

## Validation Rules

- **Name**: Required, at least 2 characters
- **Email**: Required, valid email format (regex validated)
- **Phone**: Required, exactly 10 digits (non-digit characters are filtered)
- **College**: Required, at least 2 characters
- **Purpose**: Required, must select one option

## Navigation

- **Next/Submit button**: Validates current step before proceeding
- **Back button**: Available on all steps except the first
- **Enter key**: Advances to next step (like Typeform)
- **Auto-focus**: Input fields are automatically focused

## API Integration

- Submits to `/api/submit` endpoint
- Handles form data with proper error handling
- Shows success screen on successful submission
- Displays error messages for validation failures

## Responsive Design

- Mobile-first approach
- Responsive typography (text-xl to text-2xl)
- Responsive spacing and padding
- Touch-friendly buttons and inputs

## Animation Details

- **Slide transitions**: Questions slide in/out horizontally
- **Progress bar animation**: Smooth width transition
- **Button hover effects**: Scale animations
- **Error messages**: Fade in from bottom
- **Loading state**: Spinning animation

## Usage

```tsx
import MultiStepForm from '@/components/MultiStepForm';

function FormPage() {
  return <MultiStepForm />;
}
```

The component is fully self-contained and handles all state management internally.

## Dependencies

- `next` - React framework
- `react` - UI library  
- `motion/react` - Animations
- `tailwindcss` - Styling
- Form submission handled via built-in `fetch` API

## File Structure

```
src/
├── components/
│   └── MultiStepForm.tsx     # Main form component
├── utils/
│   └── formUtils.ts          # Validation and API utilities
└── app/
    ├── form/
    │   └── page.tsx          # Form page
    └── api/
        └── submit/
            └── route.ts      # API endpoint
```

## Customization

The form can be easily customized by:

1. **Modifying questions**: Update the `steps` array in `MultiStepForm.tsx`
2. **Changing validation**: Update validation rules in `formUtils.ts`
3. **Styling updates**: Modify Tailwind classes for different appearance
4. **Animation changes**: Adjust Framer Motion variants for different transitions

## Testing

To test the form:

1. Visit `/form` route
2. Fill out each step
3. Validate error handling by submitting invalid data
4. Test successful submission flow
5. Verify mobile responsiveness

The form integrates with the existing MongoDB setup and uses the same validation rules as defined in the Mongoose schema.
