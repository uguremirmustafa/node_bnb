import db from '@/initializers/db';
import { User } from '@/models/user';
import { Result } from '@/utils/types';
import bcrypt from 'bcrypt';

interface Credientials {
  password: string;
  email: string;
}

export async function registerUser(creds: Credientials): Promise<Result<User | null>> {
  const { email, password } = creds;
  const user = await getUser(email);

  if (user) {
    return { data: null, message: 'email already in use', code: 400 };
  } else {
    const hashedPw = await hashPassword(password);
    if (!hashedPw) {
      return {
        data: null,
        message: 'sth went wrong while hashing',
        code: 400,
      };
    } else {
      const newUser = await saveUser({ email, hashedPw });
      if (newUser) {
        return {
          code: 201,
          data: newUser,
          message: 'user created successfully',
        };
      }
      return {
        code: 400,
        data: null,
        message: 'user creation failed',
      };
    }
  }
}

export async function getUsers(): Promise<User[]> {
  return db.any('SELECT * FROM users');
}
export async function getUserByEmail(email: User['email']): Promise<User> {
  return db.one('SELECT * FROM users WHERE email = $1', email);
}
export async function getUser(email: User['email']): Promise<User | null> {
  try {
    const user = db.oneOrNone<User>('SELECT * FROM users WHERE email = $1', email);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function saveUser(user: { email: string; hashedPw: string }): Promise<User | null> {
  try {
    await db.none('INSERT INTO users (email, "password") VALUES ($1, $2)', [
      user.email,
      user.hashedPw,
    ]);
    const newUser = await getUserByEmail(user.email);
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function hashPassword(pw: string): Promise<string> {
  const hashedPw = await bcrypt.hash(pw, 10);
  if (hashedPw) {
    console.log('password hashing successful');
  } else {
    console.log('sth went wrong while hashing');
  }
  return hashedPw;
}
export async function validatePassword(password: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
  }
}
