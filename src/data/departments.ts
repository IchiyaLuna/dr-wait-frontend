/**
 * 사용자 정보를 담고 있는 인터페이스
 */
export interface Departments {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export const departments: Departments[] = [
  {
    id: 1,
    name: '소아청소년과',
    icon: 'fa-person-breastfeeding',
    color: '--color-blue-200',
  },
  {
    id: 2,
    name: '이비인후과',
    icon: 'fa-ear',
    color: 'red',
  },
  {
    id: 3,
    name: '가정의학과',
    icon: 'fa-house-medical',
    color: '',
  },
  {
    id: 4,
    name: '산부인과',
    icon: 'fa-person-dress',
    color: '',
  },
  {
    id: 5,
    name: '내과',
    icon: 'fa-stomach',
    color: '',
  },
  {
    id: 6,
    name: '정형외과',
    icon: 'fa-bone-break',
    color: '',
  },
  {
    id: 7,
    name: '피부과',
    icon: 'fa-person-dots-from-line',
    color: '',
  },
  {
    id: 8,
    name: '안과',
    icon: 'fa-eye',
    color: '',
  },
  {
    id: 9,
    name: '정신건강의학과',
    icon: 'fa-head-side-medical',
    color: '',
  },
];
