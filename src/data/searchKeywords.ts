export interface Keyword {
  name: string;
  keyword: string;
  category: string;
}

export const searchKeywords: Keyword[] = [
  {
    name: '공원',
    keyword: '공원',
    category: '여행 > 공원',
  },
  {
    name: '편의점',
    keyword: '편의점',
    category: '가정,생활 > 편의점',
  },
  {
    name: '베이커리',
    keyword: '빵',
    category: '음식점 > 간식 > 제과,베이커리',
  },
  {
    name: '서점',
    keyword: '서점',
    category: '문화,예술 > 도서 > 서점',
  },
  {
    name: '드럭스토어',
    keyword: '드럭스토어',
    category: '가정,생활 > 드럭스토어',
  },
  {
    name: '생활용품',
    keyword: '생활용품',
    category: '가정,생활 > 생활용품점',
  },
  {
    name: '카페',
    keyword: '카페',
    category: '음식점 > 카페',
  },
  {
    name: '은행',
    keyword: '은행',
    category: '금융,보험 > 금융서비스 > 은행',
  },
  {
    name: '패스트푸드',
    keyword: '패스트푸드',
    category: '음식점 > 패스트푸드',
  },
  {
    name: '죽집',
    keyword: '죽',
    category: '음식점 > 한식 > 죽',
  },
];
