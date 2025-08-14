// Test script to verify PAN validation
const testPanNumbers = [
  'ABCDE1234F', // Valid
  'abcde1234f', // Valid (should be converted to uppercase)
  'ABCDE1234',  // Invalid (missing last character)
  'ABCDE12345', // Invalid (wrong format)
  '12345ABCDF', // Invalid (wrong format)
  'ABCDE1234G', // Valid
  'XYZAB1234C', // Valid
];

// Simulate the validation regex
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

console.log('Testing PAN validation:');
testPanNumbers.forEach(pan => {
  const upperPan = pan.toUpperCase();
  const isValid = panRegex.test(upperPan);
  console.log(`${pan} → ${upperPan} → ${isValid ? '✅ Valid' : '❌ Invalid'}`);
});

// Test the exact pattern used in validation schema
console.log('\nTesting with exact pattern from schema:');
testPanNumbers.forEach(pan => {
  const upperPan = pan.toUpperCase();
  const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(upperPan);
  console.log(`${pan} → ${upperPan} → ${isValid ? '✅ Valid' : '❌ Invalid'}`);
});
