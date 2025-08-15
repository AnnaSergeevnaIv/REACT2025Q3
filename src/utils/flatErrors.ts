import type { ZodError } from 'zod';
import type { ValidationError } from '../components/UncontrolledForm/UncontrolledForm.types';

export function flatErrors(zodError: ZodError): ValidationError {
  const flattened = zodError.flatten();
  const errors: ValidationError = {};

  for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
    if (Array.isArray(messages) && messages.length > 0) {
      errors[field] = messages[0];
    }
  }

  return errors;
}
