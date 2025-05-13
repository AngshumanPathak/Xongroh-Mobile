import {ID, Models, Query, OAuthProvider} from 'react-native-appwrite';
import { INewUser, IUpdateUser } from '@/types';
import { account, functions, avatars, appwriteConfig, databases } from '../config';
import { sign, decode } from "react-native-pure-jwt";
import * as SecureStore from 'expo-secure-store';


interface DecodedPayload {
  otp: string;
  email: string;
  exp: number;
}

function isDecodedPayload(obj: any): obj is DecodedPayload {
  return (
    obj &&
    typeof obj.otp === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.exp === 'number'
  );
}


// Database
const db = {
  usersId: appwriteConfig.databases.users.databaseId,
  postsId: appwriteConfig.databases.posts.databaseId,
};

// Collections
const cl = {
  supportId: appwriteConfig.databases.users.collections.support,
  creatorId: appwriteConfig.databases.users.collections.creator,
  projectId: appwriteConfig.databases.posts.collections.project,
  creationId: appwriteConfig.databases.posts.collections.creation,
};

// Bucket
const bk = {
  creatorBucketId: appwriteConfig.storage.creatorBucket,
};

const url = {
  googleSuccessUrl: appwriteConfig.oauth.googleSuccessUrl,
  googleFailureUrl: appwriteConfig.oauth.googleFailureUrl,
};

// *** CREATOR ***

//** Authentication */

// Create a new user account
export async function createUserAccount(
  user: INewUser
): Promise<Models.Document | Error> {
  try {
    // Extract username from email (everything before "@")
    const username = user.email?.split('@')[0] ?? '';
    if (!username) throw new Error('Invalid email format.');

    // Create the account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) {
      throw new Error('Account creation failed');
    }
    // create a new session
    await account.createEmailPasswordSession(user.email, user.password);

    // Send verification email
    await sendVerificationEmail();

    // Check if the user already exists in the database
    const existingUser = await checkUserExists(newAccount.email);
    if (existingUser) {
      console.log('User data already exists in the database');
      console.log(existingUser);

      // If the accountId doesn't match, update the accountId
      if (existingUser.accountId !== newAccount.$id) {
        const updatedUser = await updateUserAccountId(
          existingUser.$id,
          newAccount.$id
        );
        console.log('User accountId updated:', updatedUser);
        return updatedUser;
      }

      return existingUser;
    }

    // Generate avatar and save user data to the database
    const avatarUrl = avatars.getInitials(user.name);
    const agreedUserAgreements = true;
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      hometown: user.hometown,
      email: newAccount.email,
      dpUrl: avatarUrl,
      username: username, // Add the generated username
      agreeUserAgreements: agreedUserAgreements,
      badges: ['B9001'],
    });

    return newUser;
  } catch (error) {
    console.error('Error during account creation:', error);
    throw error;
  }
}


//**Create User Account using Google */

export async function createUserAccountWithGoogle(
  session: any
): Promise<Models.Document> {
  // Check if the user already exists in the database
  const existingUser = await checkUserExists(session.email);
  if (existingUser) {
    // console.log('User data already exists in the database');
    // console.log(existingUser);

    // If the accountId doesn't match, update the accountId
    if (existingUser.accountId !== session.$id) {
      const updatedUser = await updateUserAccountId(
        existingUser.$id,
        session.$id
      );
      console.log('User accountId updated:', updatedUser);
      return updatedUser;
    }

    return existingUser;
  }

  try {
    const username = session.email.split('@')[0];
    const agreedUserAgreements = true;
    const newUser = await saveUserToDB({
      accountId: session.$id,
      name: session.name,
      email: session.email,
      dpUrl: avatars.getInitials(session.name),
      username: username,
      agreeUserAgreements: agreedUserAgreements,
      badges: ['B9001'],
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
}


//**Send Verification Mail */

export async function sendVerificationEmail() {
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
      throw new Error('Maximum verification attempts reached. Please contact support.');
    }

    const requiredDelay = attempts < 3 ? INITIAL_DELAY : EXTENDED_DELAY;
    const timeElapsed = (now - lastAttemptTime) / 1000;

    if (lastAttemptTime && timeElapsed < requiredDelay) {
      const waitTime = Math.ceil(requiredDelay - timeElapsed);
      throw new Error(`Please wait ${waitTime} seconds before requesting another email.`);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Use react-native-pure-jwt
    const jwtSecret = process.env.JWT_SECRET!; // Replace this with a hardcoded string if needed
    const payload = {
      otp,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 5 // 5 min expiry
    };

    const token = await sign(payload, jwtSecret, {
      alg: 'HS256',
    });

    await functions.createExecution('send-otp-email', JSON.stringify({ email: user.email, otp }));

    // Store the token securely
    await SecureStore.setItemAsync('otpToken', token);

    await account.updatePrefs({
      verificationAttempts: attempts + 1,
      lastVerificationTime: now,
    });

    return token;

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to send OTP');
  }
}


//Verify OTP

export async function verifyOtp(enteredOtp: string): Promise<boolean> {
  try {
    // Retrieve the token from SecureStore
    const token = await SecureStore.getItemAsync('otpToken');

    if (!token) {
      throw new Error('Token not found. Please request a new OTP.');
    }

    // Decode and verify the token (your previous logic here)
    const raw = await decode(token, process.env.JWT_SECRET!, {
      skipValidation: true,
    }) as unknown;

    if (!isDecodedPayload(raw)) {
      throw new Error('Invalid token structure.');
    }

    const decoded = raw as DecodedPayload;

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      throw new Error('OTP has expired. Please request a new one.');
    }

    if (decoded.otp !== enteredOtp) {
      throw new Error('Invalid OTP. Please try again.');
    }

    const user = await account.get();
    if (user.email !== decoded.email) {
      throw new Error('Token does not belong to the authenticated user.');
    }

    await account.updatePrefs({ isVerified: true });

    // Optionally, remove the token after successful verification
    await SecureStore.deleteItemAsync('otpToken');

    return true;
  } catch (error) {
    console.error('OTP Verification Failed:', error);
    throw new Error('OTP verification failed. Please request a new one.');
  }
}

async function saveUserToDB(user: {
  accountId: string;
  name: string;
  username: string;
  hometown?: string;
  email: string;
  dpUrl: URL;
  agreeUserAgreements: Boolean;
  badges?: string[];
}): Promise<Models.Document> {
  try {
    // Save the user to the database
    return await databases.createDocument(
      db.usersId,
      cl.creatorId,
      ID.unique(),
      user
    );
  } catch (error) {
    console.error('Error saving user to the database:', error);
    throw new Error('Failed to save user');
  }
}


  // Check-User-Exists
export async function checkUserExists(
  email: string
): Promise<Models.Document | null> {
  try {
    const users = await databases.listDocuments(db.usersId, cl.creatorId, [
      Query.equal('email', email),
    ]);

    return users.documents?.[0] || null;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return null;
  }
}


// Sign-In
export async function signInAccount(user: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    return await account.createEmailPasswordSession(user.email, user.password);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}


// Sign-In-With-Google
export async function loginWithGoogle(): Promise<void> {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      url.googleSuccessUrl,
      url.googleFailureUrl
    );
  } catch (error) {
    console.error('Error during Google OAuth session creation:', error);
    throw error;
  }
}


// Sign-Out
export async function signOutAccount(): Promise<any> {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}


// Update-User-Account-Id
export async function updateUserAccountId(
  userId: string,
  newAccountId: string
): Promise<Models.Document> {
  try {
    const updatedUser = await databases.updateDocument(
      db.usersId,
      cl.creatorId,
      userId,
      { accountId: newAccountId }
    );
    return updatedUser;
  } catch (error) {
    console.error('Error updating user accountId:', error);
    throw error;
  }
}


// Get-Current-User
export async function getCurrentUser(): Promise<Models.Document> {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) {
      throw new Error('No current account found.');
    }

    const currentUser = await databases.listDocuments(
      db.usersId,
      cl.creatorId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    const user = currentUser.documents?.[0];
    if (!user) {
      throw new Error('No user document found for the current account.');
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error; // Re-throw error to be handled by the calling code
  }
}

// Is-Email-Verified
export async function isEmailVerified(): Promise<boolean> {
  try {
    const session = await getAccount();
    return session?.emailVerification || false;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
}




// * USER MANAGEMENT *

// Get-User
export async function getAccount(): Promise<any | null> {
  try {
    const checkAccount = await account.get();
    return checkAccount || null;
  } catch (error) {
    console.log('Error in getAccount (no session found):', error);
    return null;
  }
}