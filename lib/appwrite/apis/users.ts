import {ID} from 'appwrite';
import { INewUser } from '@/types';
import { account, functions } from '../config';
import jwt from 'jsonwebtoken';


interface DecodedPayload {
  email: string;
  otp: string;
}


// *** CREATOR ***

//** Authentication */

// Create a new user account
export async function createUserAccount(user: INewUser) {
  try {
    const username = user.email.split('@')[0];

    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      if (!newAccount) {
        throw new Error('Account creation failed');
      }

      await account.createEmailPasswordSession(user.email, user.password);
      
      await sendVerificationMail();
      
  }
  catch (error) {
    console.error('Error creating user account:', error);
  }
}


//**Send Verification Mail */

export async function sendVerificationMail(){
  try {
    
    const INITIAL_DELAY = 60;
    const EXTENDED_DELAY = 120;
    const MAX_ATTEMPTS = 5;

    const user = await account.get();
    const userPrefs = await account.getPrefs();
    const now = Date.now();
    const attempts = userPrefs?.verificationAttempts || 0;
    const lastAttemptTime = userPrefs?.lastVerificationTime || 0;

    if (attempts >= MAX_ATTEMPTS) {
      throw new Error(
        'Maximum verification attempts reached. Please contact support.'
      );
    }

    const requiredDelay = attempts < 3 ? INITIAL_DELAY : EXTENDED_DELAY;
    const timeElapsed = (now - lastAttemptTime) / 1000;

    if (lastAttemptTime && timeElapsed < requiredDelay) {
      const waitTime = Math.ceil(requiredDelay - timeElapsed);
      throw new Error(`Please wait ${waitTime} seconds before requesting another email.`);
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    const token = jwt.sign(
      {
        otp,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '5m' } // 5-minute expiry
    );


    await functions.createExecution(
      'send-otp-email', // your deployed Appwrite function ID
      JSON.stringify({
        email: user.email,
        otp,
      })
    );


    await account.updatePrefs({
      verificationAttempts: attempts + 1,
      lastVerificationTime: now,
    });

    return token;


  }
  catch (error){
       
    throw new Error(error instanceof Error ? error.message : 'Failed to send OTP');
  }
}



//Verify OTP

export async function verifyOtp(enteredOtp: string, token: string): Promise<boolean> {
  try {
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedPayload;

    
    if (decoded.otp !== enteredOtp) {
      throw new Error('Invalid OTP. Please try again.');
    }

    
    const user = await account.get();
    if (user.email !== decoded.email) {
      throw new Error('Token does not belong to the authenticated user.');
    }

    
    await account.updatePrefs({ isVerified: true });

    return true;
  } catch (error) {
    console.error('OTP Verification Failed:', error);
    throw new Error('OTP verification failed. Please request a new one.');
  }
}
 

    
