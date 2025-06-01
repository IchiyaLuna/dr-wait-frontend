'use server';

import { signIn } from '@/auth';

export type stateType =
  | {
      message: string | null;
    }
  | undefined;

export async function authenticate(prevState: stateType, formData: FormData) {
  try {
    await signIn('credentials', {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      redirect: false,
    });
    return {
      ...prevState,
      message: 'success',
    };
  } catch (error) {
    console.error('Login failed:', error);
    return {
      ...prevState,
      message: '아이디 또는 비밀번호가 일치하지 않습니다.',
    };
  }
}
