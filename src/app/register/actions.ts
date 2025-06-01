'use server';

export type stateType =
  | {
      message: string | null;
    }
  | undefined;

function formatPhoneNumber(digits: string) {
  const onlyNums = digits.replace(/\D/g, '').slice(0, 11);
  if (onlyNums.length !== 11) {
    return onlyNums;
  }
  const part1 = onlyNums.slice(0, 3);
  const part2 = onlyNums.slice(3, 7);
  const part3 = onlyNums.slice(7, 11);
  return `${part1}-${part2}-${part3}`;
}

export async function signup(prevState: stateType, formData: FormData) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const fullname = formData.get('fullname') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const rrnFront = formData.get('rrnFront') as string;
    const rrnBack = formData.get('rrnBack') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const requestBody = {
      fullname,
      phoneNumber: formatPhoneNumber(phoneNumber),
      residentRegistrationNumber: rrnFront + '-' + rrnBack,
      username,
      password,
    };

    const res = await fetch(backendUrl + '/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (
        res.status === 400 &&
        (data.name === 'ALREADY_EXISTED_USERNAME' ||
          data.code === '존재하는 계정입니다.')
      ) {
        return {
          ...prevState,
          message: '이미 존재하는 계정입니다.',
        };
      }
      // 기타 오류
      return {
        ...prevState,
        message: '알 수 없는 오류가 발생했습니다.',
      };
    }
    return { ...prevState, message: 'success' };
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return {
      ...prevState,
      message: '서버 요청 중 알 수 없는 오류가 발생했습니다.',
    };
  }
}
