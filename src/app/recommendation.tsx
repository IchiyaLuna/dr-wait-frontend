import React from 'react';
import styles from './page.module.css';

interface Recommendation {
  name: string;
  specialty: string;
  address: string;
  rating: number;
  distance: string;
}

// 예시 데이터
const recommendations: Recommendation[] = [
  {
    name: '서울 중앙 종합병원',
    specialty: '내과 · 소아과',
    address: '서울특별시 중구 세종대로 110',
    rating: 4.7,
    distance: '1.2km',
  },
  {
    name: '강남 메디컬 센터',
    specialty: '정형외과 · 재활의학과',
    address: '서울특별시 강남구 테헤란로 123',
    rating: 4.5,
    distance: '3.8km',
  },
  {
    name: '노원 힐링한의원',
    specialty: '한의원 · 침구과',
    address: '서울특별시 노원구 동일로 456',
    rating: 4.8,
    distance: '5.5km',
  },
  {
    name: '송파 아이소아과',
    specialty: '소아과',
    address: '서울특별시 송파구 올림픽로 78',
    rating: 4.6,
    distance: '4.1km',
  },
];

export default function RecommendPage(): React.ReactElement {
  return React.createElement(
    'main',
    { className: styles.container },
    React.createElement(
      'h1',
      { className: styles.title },
      '이런 병원 찾고계신가요?'
    ),
    React.createElement(
      'section',
      { className: styles.list },
      ...recommendations.map((h, idx) =>
        React.createElement(
          'div',
          { key: idx, className: styles.card },
          React.createElement('h2', { className: styles.name }, h.name),
          React.createElement('p', { className: styles.specialty }, h.specialty),
          React.createElement('p', { className: styles.address }, h.address),
          React.createElement(
            'div',
            { className: styles.meta },
            React.createElement(
              'span',
              { className: styles.rating },
              `⭐ ${h.rating.toFixed(1)}`
            ),
            React.createElement('span', { className: styles.distance }, h.distance)
          )
        )
      )
    )
  );
}