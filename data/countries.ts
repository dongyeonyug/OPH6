import type { Country, Memory } from "@/lib/types";

export const COUNTRIES: Country[] = [
  { id: "410", code: "KOR", iso2: "KR", nameKo: "대한민국", nameEn: "South Korea", summary: "도시의 속도와 산책길의 온도가 함께 남는 여행지입니다." },
  { id: "392", code: "JPN", iso2: "JP", nameKo: "일본", nameEn: "Japan", summary: "골목, 기차역, 작은 식탁의 기억을 촘촘히 모으기 좋습니다." },
  { id: "250", code: "FRA", iso2: "FR", nameKo: "프랑스", nameEn: "France", summary: "오래된 거리와 미술관, 느린 오후의 색을 담아두기 좋습니다." },
  { id: "840", code: "USA", iso2: "US", nameKo: "미국", nameEn: "United States", summary: "큰 도시와 국립공원 사이를 넓게 기록할 수 있는 나라입니다." },
  { id: "380", code: "ITA", iso2: "IT", nameKo: "이탈리아", nameEn: "Italy", summary: "광장, 음식, 바다의 빛이 사진첩을 풍성하게 채웁니다." },
  { id: "724", code: "ESP", iso2: "ES", nameKo: "스페인", nameEn: "Spain", summary: "따뜻한 골목과 긴 저녁의 분위기를 남기기 좋습니다." },
  { id: "764", code: "THA", iso2: "TH", nameKo: "태국", nameEn: "Thailand", summary: "시장, 사원, 해변의 선명한 색이 살아있는 여행지입니다." },
  { id: "036", code: "AUS", iso2: "AU", nameKo: "호주", nameEn: "Australia", summary: "넓은 자연과 해안 도시를 한 앨범에 담기 좋습니다." },
  { id: "076", code: "BRA", iso2: "BR", nameKo: "브라질", nameEn: "Brazil", summary: "리듬감 있는 도시와 거대한 자연의 대비가 선명합니다." },
  { id: "124", code: "CAN", iso2: "CA", nameKo: "캐나다", nameEn: "Canada", summary: "호수, 숲, 차분한 도시의 계절감을 오래 보관하기 좋습니다." },
  { id: "826", code: "GBR", iso2: "GB", nameKo: "영국", nameEn: "United Kingdom", summary: "흐린 하늘과 오래된 건축의 결이 사진에 잘 남습니다." },
  { id: "704", code: "VNM", iso2: "VN", nameKo: "베트남", nameEn: "Vietnam", summary: "거리 음식과 오토바이, 초록 풍경이 빠르게 스쳐갑니다." }
];

export const COUNTRY_BY_ID = new Map(COUNTRIES.map((country) => [country.id, country]));

export const seedMemories: Memory[] = [
  {
    id: "seed-jp-1",
    countryId: "392",
    title: "교토 오후",
    description: "작은 골목 끝에서 만난 조용한 빛",
    date: "2025-04-12",
    note: "다음에는 아침 산책으로 다시 보기",
    tags: "골목, 산책",
    category: "도시",
    imageUrl: "https://picsum.photos/seed/tripcanvas-japan-alley/900/1200",
    source: "seed",
    isRepresentative: true,
    createdAt: 1712900000000
  },
  {
    id: "seed-kr-1",
    countryId: "410",
    title: "서울의 밤",
    description: "비 온 뒤 선명해진 거리",
    date: "2025-09-03",
    note: "",
    tags: "서울, 야경",
    category: "도시",
    imageUrl: "https://picsum.photos/seed/tripcanvas-seoul-night/1200/900",
    source: "seed",
    isRepresentative: true,
    createdAt: 1725300000000
  },
  {
    id: "seed-fr-1",
    countryId: "250",
    title: "파리 창가",
    description: "천천히 식은 커피와 오후 햇빛",
    date: "2024-11-18",
    note: "",
    tags: "카페, 파리",
    category: "음식",
    imageUrl: "https://picsum.photos/seed/tripcanvas-paris-cafe/1000/1250",
    source: "seed",
    isRepresentative: true,
    createdAt: 1700300000000
  },
  {
    id: "seed-us-1",
    countryId: "840",
    title: "서부 도로",
    description: "창밖으로 길게 이어진 붉은 풍경",
    date: "2024-08-07",
    note: "",
    tags: "로드트립",
    category: "자연",
    imageUrl: "https://picsum.photos/seed/tripcanvas-us-road/1300/860",
    source: "seed",
    isRepresentative: true,
    createdAt: 1691400000000
  }
];
