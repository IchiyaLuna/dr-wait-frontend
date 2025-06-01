'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createReservation(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('로그인이 필요합니다.');
  }

  const currentUserId = session.token.id;
  const userId: string = formData.get('userId') as string;
  const role = formData.get('role') as string;

  const body = {
    hospitalId: formData.get('hospitalId') as string,
    role: role === '소유자' ? '본인' : role,
    symptomId: Number(formData.get('symptomId')),
    firstVisit: formData.get('isFirstVisit') === '1',
    message: formData.get('message'),
  };

  console.log('Creating reservation with body:', body);
  console.log('Current User ID:', currentUserId);
  console.log('User ID:', userId);
  let url = `${process.env.BACKEND_URL}/api/reservation`;
  if (currentUserId !== userId) {
    url += `/${userId}`;
  }
  console.log('Reservation URL:', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token.access_token}`,
    },
    body: JSON.stringify(body),
  });
  console.log('Response from reservation creation:', res);
  if (!res.ok) {
    throw new Error('예약 요청에 실패했습니다.');
  }

  redirect('/reservation');
}
