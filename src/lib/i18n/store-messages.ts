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
    topIntro: string;
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    subtitle: string;
    ctaShop: string;
    ctaQuiz: string;
    footerTrust: string;
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
    location: string;
    emailDisplay: string;
    shopHeading: string;
    helpHeading: string;
    companyHeading: string;
    subscribeHeading: string;
    newsletterHint: string;
    emailPlaceholder: string;
    subscribe: string;
    privacyNote: string;
    privacyLink: string;
    shop: {
      skincare: string;
      makeup: string;
      brands: string;
      bestsellers: string;
      newArrivals: string;
      giftCards: string;
    };
    help: {
      shipping: string;
      returns: string;
      faq: string;
      trackOrder: string;
      contact: string;
    };
    company: {
      about: string;
      story: string;
      blog: string;
      careers: string;
      privacy: string;
      terms: string;
    };
    customerCare: {
      fastDelivery: string;
      easyReturns: string;
      securePayments: string;
    };
    craftedLine: string;
    rights: string;
    langEnglishPrimary: string;
    langKoreanSecondary: string;
    langGroupAria: string;
    socialInstagramAria: string;
    socialFacebookAria: string;
  };
};

const en: StoreMessages = {
  announcement: {
    freeShipping: "FREE SHIPPING ON ORDERS OVER NPR 7,000",
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
    promoTitle: "New in",
    promoBody: "Fresh drops from Seoul labs—limited units for Nepal.",
    promoCta: "Shop new arrivals",
    viewAll: "View all",
  },
  tools: {
    searchPlaceholder: "Search products",
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
    topIntro:
      "Dermatologist-informed formulas, Seoul sourcing, and textures that melt like silk. This is K-beauty elevated for the modern luxury wardrobe.",
    eyebrow: "The glass-skin collection",
    titleBefore: "Radiance, distilled in",
    titleAccent: "Seoul",
    titleAfter: ".",
    subtitle:
      "Full-screen luxury. Micro-layered hydration. Finishes that read expensive on camera—and unforgettable in person.",
    ctaShop: "Shop bestsellers",
    ctaQuiz: "Skin ritual quiz",
    footerTrust: "Complimentary shipping · Authenticity guaranteed",
    discover: "Discover the edit",
  },
  trustBar: {
    secure: "Secure checkout",
    shipping: "Free shipping NPR 7,000+",
    authenticBadge: "100% authentic",
    support: "Kathmandu support",
  },
  brands: {
    title: "",
  },
  footer: {
    tagline: "Luxury Korean Beauty Curated for Nepal",
    location: "Kathmandu, Nepal",
    emailDisplay: "hello@uvelyglow.com",
    shopHeading: "Shop",
    helpHeading: "Help",
    companyHeading: "Company",
    subscribeHeading: "Subscribe For Beauty Tips",
    newsletterHint: "Editorial drops, ritual notes, and member-only codes—delivered quietly to your inbox.",
    emailPlaceholder: "Email address",
    subscribe: "Subscribe",
    privacyNote: "By subscribing you agree to our",
    privacyLink: "privacy policy",
    shop: {
      skincare: "Skincare",
      makeup: "Makeup",
      brands: "Brands",
      bestsellers: "Bestsellers",
      newArrivals: "New Arrivals",
      giftCards: "Gift Cards",
    },
    help: {
      shipping: "Shipping Information",
      returns: "Returns & Exchanges",
      faq: "FAQ",
      trackOrder: "Track Your Order",
      contact: "Contact Us",
    },
    company: {
      about: "About Us",
      story: "Our Story",
      blog: "Blog",
      careers: "Careers",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    customerCare: {
      fastDelivery: "Fast Delivery",
      easyReturns: "Easy Returns",
      securePayments: "Secure Payments",
    },
    craftedLine: "Crafted in Korea. Curated for Nepal.",
    rights: "All rights reserved.",
    langEnglishPrimary: "English (Primary)",
    langKoreanSecondary: "한국어 (Secondary)",
    langGroupAria: "Store language",
    socialInstagramAria: "Uvely Glow on Instagram",
    socialFacebookAria: "Uvely Glow on Facebook",
  },
};

const ko: StoreMessages = {
  announcement: {
    freeShipping: "NPR 7,000 이상 주문 시 무료 배송",
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
    promoTitle: "신상",
    promoBody: "서울 연구소의 신제품—네팔 한정 수량.",
    promoCta: "신상 쇼핑",
    viewAll: "전체 보기",
  },
  tools: {
    searchPlaceholder: "상품 검색",
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
    topIntro:
      "피부과에서 검증된 포뮬러와 서울 소싱, 실크처럼 스며드는 텍스처. 현대 럭셔리 워드로브를 위한 K-뷰티입니다.",
    eyebrow: "글래스 스킨 컬렉션",
    titleBefore: "빛나는 피부,",
    titleAccent: "서울",
    titleAfter: "에서 완성되다.",
    subtitle:
      "풀스크린 럭셔리. 층층이 쌓는 수분. 카메라 앞에서는 고급스럽게, 직접 볼 때는 잊히지 않는 마무리.",
    ctaShop: "베스트셀러 쇼핑",
    ctaQuiz: "피부 리추얼 퀴즈",
    footerTrust: "무료 배송 · 정품 보증",
    discover: "에디트 살펴보기",
  },
  trustBar: {
    secure: "안전 결제",
    shipping: "NPR 7,000 이상 무료 배송",
    authenticBadge: "100% 정품",
    support: "카트만두 고객 지원",
  },
  brands: {
    title: "",
  },
  footer: {
    tagline: "네팔을 위한 럭셔리 한국 뷰티 큐레이션",
    location: "네팔 카트만두",
    emailDisplay: "hello@uvelyglow.com",
    shopHeading: "쇼핑",
    helpHeading: "고객 지원",
    companyHeading: "회사",
    subscribeHeading: "뷰티 팁 구독",
    newsletterHint: "에디토리얼 신상, 리추얼 노트, 회원 전용 혜택을 차분하게 전해 드립니다.",
    emailPlaceholder: "이메일 주소",
    subscribe: "구독",
    privacyNote: "구독 시 당사",
    privacyLink: "개인정보 처리방침",
    shop: {
      skincare: "스킨케어",
      makeup: "메이크업",
      brands: "브랜드",
      bestsellers: "베스트셀러",
      newArrivals: "신상품",
      giftCards: "기프트 카드",
    },
    help: {
      shipping: "배송 안내",
      returns: "반품 및 교환",
      faq: "자주 묻는 질문",
      trackOrder: "주문 조회",
      contact: "문의하기",
    },
    company: {
      about: "회사 소개",
      story: "브랜드 스토리",
      blog: "블로그",
      careers: "채용",
      privacy: "개인정보 처리방침",
      terms: "이용약관",
    },
    customerCare: {
      fastDelivery: "빠른 배송",
      easyReturns: "간편한 반품",
      securePayments: "안전한 결제",
    },
    craftedLine: "한국에서 엄선했습니다. 네팔을 위해 큐레이션했습니다.",
    rights: "모든 권리 보유.",
    langEnglishPrimary: "English (Primary)",
    langKoreanSecondary: "한국어 (Secondary)",
    langGroupAria: "스토어 언어",
    socialInstagramAria: "인스타그램의 Uvely Glow",
    socialFacebookAria: "페이스북의 Uvely Glow",
  },
};

export function getStoreMessages(locale: StoreLocale): StoreMessages {
  return locale === "ko" ? ko : en;
}
