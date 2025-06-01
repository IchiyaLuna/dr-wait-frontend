'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function deleteFamilyMember(
  familyGroupId: number,
  memberId: string
) {
  const session = await auth();
  if (!session) {
    throw new Error('로그인이 필요합니다.');
  }
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/family/${familyGroupId}/${memberId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('가족 삭제에 실패했습니다.');
  }

  revalidatePath('/family');
}

export async function acceptFamilyInvite() {
  const session = await auth();
  if (!session) {
    throw new Error('로그인이 필요합니다.');
  }
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/family/confirm`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token.access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('가족 초대 수락에 실패했습니다.');
  }

  revalidatePath('/family');
}
