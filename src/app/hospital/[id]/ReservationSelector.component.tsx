'use client';
// React
import React, { useState } from 'react';
// Components
import Card from '@/components/Card';
// Types
import { User } from '@/types/user';
import { Symptom } from '@/types/symptom';
import { FamilyMember } from '@/types/family';
// Styles
import styles from './page.module.scss';
// Props
type Props = Readonly<{
  userId: string | undefined;
  currentUser: User | null;
  familyMembers: FamilyMember[];
  symptoms: Symptom[];
}>;
// Component
export default function ReservationSelector({
  userId,
  familyMembers,
  symptoms,
}: Props) {
  console.log('FamilySelector rendered with userId:', userId);
  // States
  const [selectedMember, setMember] = useState<FamilyMember>(familyMembers[0]);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [selectedSymptom, setSymptom] = useState<Symptom>(symptoms[0]);
  const [message, setMessage] = useState<string>('');
  // Render
  return (
    <>
      <Card className={styles.sectionCard}>
        <input type={'hidden'} name={'userId'} value={selectedMember.userId} />
        <input type={'hidden'} name={'role'} value={selectedMember.role} />
        <input type={'hidden'} name={'symptomId'} value={selectedSymptom.id} />
        <input
          type={'hidden'}
          name={'isFirstVisit'}
          value={isFirstVisit ? 1 : 0}
        />
        <input type={'hidden'} name={'message'} value={message} />
        <h2>진료대상 선택</h2>
        <div className={styles.users}>
          {familyMembers.map((member) => (
            <button
              type={'button'}
              key={member.userId}
              className={[
                selectedMember &&
                  selectedMember.userId === member.userId &&
                  styles.active,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setMember(member)}
            >
              <div className={styles.info}>
                <p>{member.fullname}</p>
                <span>{member.role}</span>
              </div>
              {member.userId === userId ? (
                <div className={styles.tag}>본인</div>
              ) : null}
            </button>
          ))}
        </div>
      </Card>
      <Card className={styles.sectionCard}>
        <h2>초진 여부</h2>
        <div className={styles.firstVisit}>
          <button
            type={'button'}
            className={[isFirstVisit && styles.active]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setIsFirstVisit(true)}
          >
            초진
          </button>
          <button
            type={'button'}
            className={[!isFirstVisit && styles.active]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setIsFirstVisit(false)}
          >
            재진
          </button>
        </div>
      </Card>
      <Card className={styles.sectionCard}>
        <h2>진료 증상 선택</h2>
        <div className={styles.symptoms}>
          {symptoms.map((symptom) => (
            <button
              type={'button'}
              key={symptom.id}
              className={[selectedSymptom.id === symptom.id && styles.active]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setSymptom(symptom)}
            >
              {symptom.name}
            </button>
          ))}
          <button
            type={'button'}
            className={[selectedSymptom.id === 0 && styles.active]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setSymptom({ id: 0, name: '기타' })}
          >
            기타
          </button>
        </div>
      </Card>
      <Card className={styles.sectionCard}>
        <h2>증상 설명</h2>
        <div className={styles.symptom}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </Card>
    </>
  );
}
