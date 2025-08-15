import { mockFormData } from '../test-utils/mocks';
import { flatErrors } from '../utils/flatErrors';
import { formSchema } from './schema';

describe('validation schema', () => {
  const mockFile = new File(['mock image content'], 'test.png', {
    type: 'image/png',
    lastModified: Date.now(),
  });
  test('should pass validation', () => {
    const dataWithFile = { ...mockFormData, image: mockFile };
    const result = formSchema.safeParse(dataWithFile);
    expect(result.success).toBeTruthy();
  });
  test("shouldn't pass with 'The name must be capitalized' error ", () => {
    const dataWithNameError = { ...mockFormData, name: 'test' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['name']).toEqual('The name must be capitalized');
  });
  test("shouldn't pass with 'Age must be written and to be >= 0' error with -1 value ", () => {
    const dataWithNameError = { ...mockFormData, age: '-1' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['age']).toEqual('Age must be written and to be >= 0');
  });
  test("shouldn't pass with 'Age must be written and to be >= 0' error with empty value ", () => {
    const dataWithNameError = { ...mockFormData, age: '' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['age']).toEqual('Age must be written and to be >= 0');
  });

  test("shouldn't pass with 'The name must be capitalized' error ", () => {
    const dataWithNameError = { ...mockFormData, email: 'test' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });
  test("shouldn't pass with 'Term must be accepted'", () => {
    const dataWithNameError = { ...mockFormData, accepted: false };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['accepted']).toBeTruthy();
  });
  test("shouldn't pass with 'Password must be at least 8 characters long'", () => {
    const dataWithNameError = { ...mockFormData, password: 'pass' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['password']).toEqual(
      'Password must be at least 8 characters long'
    );
  });
  test("shouldn't pass with 'The password must contain a number, lowercase and uppercase letters, and a special character' with value Qwerty111", () => {
    const dataWithNameError = { ...mockFormData, password: 'Qwerty111' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['password']).toEqual(
      'The password must contain a number, lowercase and uppercase letters, and a special character'
    );
  });
  test("shouldn't pass with 'The password must contain a number, lowercase and uppercase letters, and a special character' with value qwerty!111", () => {
    const dataWithNameError = { ...mockFormData, password: 'qwerty!111' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['password']).toEqual(
      'The password must contain a number, lowercase and uppercase letters, and a special character'
    );
  });
  test("shouldn't pass with 'The password must contain a number, lowercase and uppercase letters, and a special character' with value Qwerty!!!!", () => {
    const dataWithNameError = { ...mockFormData, password: 'Qwerty!!!!' };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['password']).toEqual(
      'The password must contain a number, lowercase and uppercase letters, and a special character'
    );
  });
  test("shouldn't pass with 'Passwords do not match' with different passwords", () => {
    const dataWithNameError = {
      ...mockFormData,
      confirmPassword: 'Qwerty!!!!',
    };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['confirmPassword']).toEqual('Passwords do not match');
  });
  test("shouldn't pass with 'File must be PNG or JPEG and less than 1MB' with large file", () => {
    const largeFile = new File(['x'.repeat(2000000)], 'large.png', {
      type: 'image/png',
    });
    const dataWithNameError = { ...mockFormData, image: largeFile };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['image']).toEqual(
      'File must be PNG or JPEG and less than 1MB'
    );
  });
  test("shouldn't pass with 'File must be PNG or JPEG and less than 1MB' with wrong type", () => {
    const wrongTypeImage = new File(['mock image content'], 'test.png', {
      type: '',
      lastModified: Date.now(),
    });
    const dataWithNameError = { ...mockFormData, image: wrongTypeImage };
    const result = formSchema.safeParse(dataWithNameError);
    const errors = result.error ? flatErrors(result.error) : {};
    expect(result.success).toBeFalsy();
    expect(errors['image']).toEqual(
      'File must be PNG or JPEG and less than 1MB'
    );
  });
});
