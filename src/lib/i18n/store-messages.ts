import type { StoreLocale } from "@/lib/i18n/constants";

export type StoreMessages = {
  announcement: {
    freeShipping: string;
    authentic: string;
    pureKorean: string;
    location: string;
  };
  nav: {
    shop: string;
    categories: string;
    skinQuiz: string;
    brands: string;
    bestsellers: string;
    journal: string;
    aboutUs: string;
    admin: string;
  };
  mega: {
    skincare: string;
    makeup: string;
    hairBody: string;
    collections: string;
    promoTitle: string;
    promoBody: string;
    promoCta: string;
    viewAll: string;
  };
  tools: {
    searchPlaceholder: string;
    wishlist: string;
    cart: string;
    logIn: string;
    logOut: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    language: string;
    english: string;
    korean: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    subtitle: string;
    ctaShop: string;
    ctaQuiz: string;
    discover: string;
  };
  trustBar: {
    secure: string;
    shipping: string;
    authenticBadge: string;
    support: string;
  };
  brands: {
    title: string;
  };
  footer: {
    tagline: string;
    shop: string;
    care: string;
    company: string;
    newsletterTitle: string;
    newsletterHint: string;
    emailPlaceholder: string;
    subscribe: string;
    privacyNote: string;
    privacyLink: string;
    languageNote: string;
    contactTitle: string;
    addressLine1: string;
    addressLine2: string;
    emailLabel: string;
    phoneLabel: string;
    phoneValue: string;
    hoursLabel: string;
    hoursValue: string;
    rights: string;
    authenticity: string;
    returns: string;
  };
};

const en: StoreMessages = {
  announcement: {
    freeShipping: "FREE SHIPPING on orders over NPR 7,000",
    authentic: "100% AUTHENTIC K-BEAUTY",
    pureKorean: "PURE KOREAN PRODUCTS",
    location: "Kathmandu, Nepal",
  },
  nav: {
    shop: "Shop",
    categories: "Categories",
    skinQuiz: "Skin Quiz",
    brands: "Brands",
    bestsellers: "Bestsellers",
    journal: "Journal",
    aboutUs: "About Us",
    admin: "Admin",
  },
  mega: {
    skincare: "Skincare",
    makeup: "Makeup",
    hairBody: "Hair & Body",
    collections: "Collections",
    promoTitle: "New arrivals",
    promoBody: "Layered hydration and Seoul-tested textures—edited weekly for Nepal.",
    promoCta: "Shop the drop",
    viewAll: "View all",
  },
  tools: {
    searchPlaceholder: "Search K-beauty…",
    wishlist: "Wishlist",
    cart: "Cart",
    logIn: "Log in",
    logOut: "Log out",
    openMenu: "Open menu",
    closeMenu: "Close",
    menu: "Menu",
    language: "Language",
    english: "English",
    korean: "한국어",
  },
  hero: {
    eyebrow: "Seoul-curated K-beauty",
    titleLine1: "Radiance,",
    titleAccent: "delivered",
    titleLine2: "to Kathmandu.",
    subtitle:
      "Dermatologist-loved formulas, authenticated sourcing, and textures that melt like silk—shipped from Nepal with concierge care.",
    ctaShop: "Shop bestsellers",
    ctaQuiz: "Skin quiz",
    discover: "Discover the edit",
  },
  trustBar: {
    secure: "Secure checkout",
    shipping: "Free shipping NPR 7,000+",
    authenticBadge: "100% authentic",
    support: "Kathmandu support",
  },
  brands: {
    title: "Featured brands",
  },
  footer: {
    tagline:
      "Luxury Korean beauty with editorial curation, authenticated sourcing, and textures designed for visible radiance under real light.",
    shop: "Shop",
    care: "Client care",
    company: "Company",
    newsletterTitle: "Newsletter",
    newsletterHint: "First access to drops, journal notes, and member-only codes.",
    emailPlaceholder: "Email address",
    subscribe: "Subscribe",
    privacyNote: "By subscribing you agree to our",
    privacyLink: "privacy policy",
    languageNote:
      "Uvely Glow is offered in English and Korean (한국어). Product names may appear in Korean as on packaging.",
    contactTitle: "Visit & contact",
    addressLine1: "Thamel Marg",
    addressLine2: "Kathmandu 44600 · Nepal",
    emailLabel: "Email",
    phoneLabel: "Phone",
    phoneValue: "+977 1-444-0000",
    hoursLabel: "Hours",
    hoursValue: "Sun–Thu · 10:00–18:00 NPT",
    rights: "All rights reserved.",
    authenticity: "Authenticity guarantee",
    returns: "Complimentary returns on qualifying orders",
  },
};

const ko: StoreMessages = {
  announcement: {
    freeShipping: "NPR 7,000 이상 무료 배송",
    authentic: "100% 정품 K-뷰티",
    pureKorean: "순수 한국 제품",
    location: "네팔 카트만두",
  },
  nav: {
    shop: "쇼핑",
    categories: "카테고리",
    skinQuiz: "피부 퀴즈",
    brands: "브랜드",
    bestsellers: "베스트셀러",
    journal: "저널",
    aboutUs: "회사 소개",
    admin: "관리자",
  },
  mega: {
    skincare: "스킨케어",
    makeup: "메이크업",
    hairBody: "헤어 & 바디",
    collections: "컬렉션",
    promoTitle: "신상품",
    promoBody: "층층이 쌓는 수분과 서울에서 검증된 텍스처—네팔을 위해 매주 엄선합니다.",
    promoCta: "신상 보기",
    viewAll: "전체 보기",
  },
  tools: {
    searchPlaceholder: "K-뷰티 검색…",
    wishlist: "위시리스트",
    cart: "장바구니",
    logIn: "로그인",
    logOut: "로그아웃",
    openMenu: "메뉴 열기",
    closeMenu: "닫기",
    menu: "메뉴",
    language: "언어",
    english: "English",
    korean: "한국어",
  },
  hero: {
    eyebrow: "서울 엄선 K-뷰티",
    titleLine1: "빛나는 피부,",
    titleAccent: "카트만두",
    titleLine2: "까지.",
    subtitle:
      "피부과에서 사랑받는 포뮬러, 정품 소싱, 실크처럼 스며드는 텍스처—네팔에서 컨시어지 케어로 배송됩니다.",
    ctaShop: "베스트셀러 쇼핑",
    ctaQuiz: "피부 퀴즈",
    discover: "에디트 살펴보기",
  },
  trustBar: {
    secure: "안전 결제",
    shipping: "NPR 7,000 이상 무료 배송",
    authenticBadge: "100% 정품",
    support: "카트만두 고객 지원",
  },
  brands: {
    title: "추천 브랜드",
  },
  footer: {
    tagline:
      "에디토리얼 큐레이션, 정품 소싱, 실제 조명 아래에서도 돋보이는 광채를 위한 텍스처까지—럭셔리 한국 뷰티.",
    shop: "쇼핑",
    care: "고객 케어",
    company: "회사",
    newsletterTitle: "뉴스레터",
    newsletterHint: "신상, 저널 노트, 회원 전용 코드를 가장 먼저 받아보세요.",
    emailPlaceholder: "이메일 주소",
    subscribe: "구독",
    privacyNote: "구독 시 당사",
    privacyLink: "개인정보 처리방침",
    languageNote:
      "Uvely Glow는 영어와 한국어(한국어)로 제공됩니다. 제품명은 패키지와 동일하게 한국어로 표기될 수 있습니다.",
    contactTitle: "매장 및 연락처",
    addressLine1: "Thamel Marg",
    addressLine2: "Kathmandu 44600 · Nepal",
    emailLabel: "이메일",
    phoneLabel: "전화",
    phoneValue: "+977 1-444-0000",
    hoursLabel: "운영 시간",
    hoursValue: "일–목 · 10:00–18:00 NPT",
    rights: "모든 권리 보유.",
    authenticity: "정품 보증",
    returns: "조건 충족 시 무료 반품",
  },
};

export function getStoreMessages(locale: StoreLocale): StoreMessages {
  return locale === "ko" ? ko : en;
}
