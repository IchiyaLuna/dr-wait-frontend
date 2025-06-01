export interface Department {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export const departments: Department[] = [
  {
    id: 1,
    name: '소아청소년과',
    category: '의료,건강 > 병원 > 소아청소년과',
    icon: 'fa-person-breastfeeding',
    color: '--color-blue-900',
  },
  {
    id: 2,
    name: '이비인후과',
    category: '의료,건강 > 병원 > 이비인후과',
    icon: 'fa-ear',
    color: '--color-blue-900',
  },
  {
    id: 3,
    name: '가정의학과',
    category: '의료,건강 > 병원 > 가정의학과',
    icon: 'fa-house-medical',
    color: '--color-blue-900',
  },
  {
    id: 4,
    name: '산부인과',
    category: '의료,건강 > 병원 > 산부인과',
    icon: 'fa-person-dress',
    color: '--color-blue-900',
  },
  {
    id: 5,
    name: '내과',
    category: '의료,건강 > 병원 > 내과',
    icon: 'fa-stomach',
    color: '--color-blue-900',
  },
  {
    id: 6,
    name: '정형외과',
    category: '의료,건강 > 병원 > 정형외과',
    icon: 'fa-bone-break',
    color: '--color-blue-900',
  },
  {
    id: 7,
    name: '피부과',
    category: '의료,건강 > 병원 > 피부과',
    icon: 'fa-person-dots-from-line',
    color: '--color-blue-900',
  },
  {
    id: 8,
    name: '안과',
    category: '의료,건강 > 병원 > 안과',
    icon: 'fa-eye',
    color: '--color-blue-900',
  },
  {
    id: 9,
    name: '정신건강의학과',
    category: '의료,건강 > 병원 > 정신건강의학과',
    icon: 'fa-head-side-medical',
    color: '--color-blue-900',
  },
];
