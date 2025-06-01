// src/data/hospitalKeywords.ts
export interface Keyword {
  name: string;
  keyword: string;
  category: string;
}

export const hospitalKeywords: Keyword[] = [
  {
    name: '종합병원',
    keyword: '종합병원',
    category: '의료,건강 > 병원 > 종합병원',
  },
  {
    name: '대학병원',
    keyword: '대학병원',
    category: '의료,건강 > 병원 > 대학병원',
  },
  {
    name: '외과',
    keyword: '외과',
    category: '의료,건강 > 병원 > 외과',
  },
  {
    name: '흉부외과',
    keyword: '흉부외과',
    category: '의료,건강 > 병원 > 흉부외과',
  },
  {
    name: '신경외과',
    keyword: '신경외과',
    category: '의료,건강 > 병원 > 신경외과',
  },
  {
    name: '성형외과',
    keyword: '성형외과',
    category: '의료,건강 > 병원 > 성형외과',
  },
  {
    name: '정형외과',
    keyword: '정형외과',
    category: '의료,건강 > 병원 > 정형외과',
  },
  {
    name: '내과',
    keyword: '내과',
    category: '의료,건강 > 병원 > 내과',
  },
  {
    name: '피부과',
    keyword: '피부과',
    category: '의료,건강 > 병원 > 피부과',
  },
  {
    name: '소아청소년과',
    keyword: '소아청소년과',
    category: '의료,건강 > 병원 > 소아청소년과',
  },
  {
    name: '치과',
    keyword: '치과',
    category: '의료,건강 > 병원 > 치과',
  },
  {
    name: '이비인후과',
    keyword: '이비인후과',
    category: '의료,건강 > 병원 > 이비인후과',
  },
  {
    name: '산부인과',
    keyword: '산부인과',
    category: '의료,건강 > 병원 > 산부인과',
  },
  {
    name: '안과',
    keyword: '안과',
    category: '의료,건강 > 병원 > 안과',
  },
  {
    name: '정신건강의학과',
    keyword: '정신건강의학과',
    category: '의료,건강 > 병원 > 정신건강의학과',
  },
  {
    name: '동물병원',
    keyword: '동물병원',
    category: '가정,생활 > 반려동물 > 동물병원',
  },
  // 필요한 병원 종류가 더 있으면 여기에 추가
];
