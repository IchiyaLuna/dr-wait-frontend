'use server';

import { auth } from '@/auth';

export type stateType =
  | {
      message: string | null;
    }
  | undefined;

export async function checkUserId(prevState: stateType, formData: FormData) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const memberId = formData.get('memberId') as string;

    const res = await fetch(backendUrl + `/api/auth/signup/${memberId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return {
        ...prevState,
        message: '존재하지 않는 아이디입니다.',
      };
    }

    return {
      ...prevState,
      message: 'found',
    };
  } catch (error) {
    console.error('Error checking user ID:', error);
    return {
      ...prevState,
      message: '오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
}

export async function inviteFamily(prevState: stateType, formData: FormData) {
  const backendUrl = process.env.BACKEND_URL;
  const session = await auth();
  if (!session) {
    return {
      ...prevState,
      message: '로그인이 필요합니다.',
    };
  }
  try {
    const memberId = formData.get('memberId') as string;
    const role = formData.get('role') as string;

    const res = await fetch(backendUrl + `/api/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
      body: JSON.stringify({
        username: memberId,
        role,
      }),
    });

    if (res.ok) {
      return {
        ...prevState,
        message: 'success',
      };
    }

    if (res.status === 409) {
      return {
        ...prevState,
        message: '이미 초대된 가족입니다.',
      };
    }

    if (res.status === 404) {
      return {
        ...prevState,
        message: '존재하지 않는 아이디입니다.',
      };
    }

    return {
      ...prevState,
      message: '초대에 실패했습니다. 다시 시도해주세요.',
    };
  } catch (error) {
    console.error('Error inviting family:', error);
    return {
      ...prevState,
      message: '오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
}
