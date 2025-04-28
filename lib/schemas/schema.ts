import { z } from 'zod';


const allowedEmailDomains = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'yahoo.com',
    'ymail.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'aol.com',
    'zoho.com',
    'protonmail.com',
    'gmx.com',
    'gmx.de',
    'yandex.com',
    'yandex.ru',
    'mail.com',
    // Add more domains as needed
  ];
  

export const SignUpFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters.' })
      .max(30, { message: 'Name should not exceed 30 characters.' }),
    hometown: z
      .string()
      .min(2, { message: 'Hometown must be at least 2 characters.' })
      .max(30, { message: 'Hometown should not exceed 30 characters.' }),
    email: z
      .string()
      .email({ message: 'Invalid email address.' })
      .refine(
        (email) => {
          const domain = email.split('@')[1];
          return allowedEmailDomains.includes(domain);
        },
        { message: 'Email must be from a valid provider (e.g., Gmail, Yahoo).' }
      ),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
  });
  
  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
  });