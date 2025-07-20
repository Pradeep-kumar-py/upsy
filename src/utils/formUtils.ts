export interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  purpose: 'course' | 'trip' | 'exchange' | 'other' | '';
}

export const submitToDatabase = async (formData: FormData) => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }

  return response.json();
};

export const validateField = (field: keyof FormData, value: string): string | undefined => {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      break;
    case 'email':
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      break;
    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      const phoneDigits = value.replace(/\D/g, '');
      if (phoneDigits.length !== 10) return 'Phone number must be 10 digits';
      break;
    case 'college':
      if (!value.trim()) return 'College name is required';
      if (value.trim().length < 2) return 'College name must be at least 2 characters';
      break;
    case 'purpose':
      if (!value) return 'Please select a purpose';
      break;
  }
  return undefined;
};
