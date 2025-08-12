import * as z from 'zod';
import { COUNTRIES } from '../utils/countries';
export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .refine((val) => /^[A-ZА-Я][a-zа-я]*$/.test(val), {
        error: 'The name must be capitalized',
      }),
    age: z.preprocess((val) => {
      if (typeof val === 'string') {
        return Number.parseInt(val);
      }
      return val;
    }, z.number().nonnegative()),
    email: z.string().email(),
    gender: z.enum(['male', 'female'], { error: 'Gender must be chosen' }),
    accept: z.stringbool({ error: 'Terms must be accepted' }),
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/, {
        error:
          'The password must contain a number, lowercase and uppercase letters, and a special character',
      }),
    confirmPassword: z.string(),
    country: z.enum(COUNTRIES, {
      error: 'Country must be chosen from selected values',
    }),
    image: z
      .file()
      .refine(
        (file) => {
          if (file.name === '' && file.size === 0) return true;
          if (file.size > 1_000_000) return false;
          if (!['image/png', 'image/jpeg'].includes(file.type)) return false;
          return true;
        },
        {
          message: 'File must be PNG or JPEG and less than 1MB',
        }
      )
      .transform(() => 'image'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
    when(payload) {
      return formSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

export type FormDataType = z.infer<typeof formSchema>;
