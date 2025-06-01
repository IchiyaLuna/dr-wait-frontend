'use client';
// React
import React from 'react';
// Actions
import { deleteFamilyMember } from './actions';
// Props
type Props = Readonly<{
  children: React.ReactNode;
  className?: string | undefined;
  familyGroupId: number;
  memberId: string;
}>;
// Component
export default function DeleteButton({
  children,
  className,
  familyGroupId,
  memberId,
}: Props) {
  return (
    <button
      className={className}
      onClick={async () => {
        if (!confirm('정말로 이 가족을 삭제하시겠습니까?')) return;
        await deleteFamilyMember(familyGroupId, memberId);
      }}
    >
      {children}
    </button>
  );
}
