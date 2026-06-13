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
    viewAllSkincare: string;
    viewAllMakeup: string;
    viewAllHairBody: string;
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
    titleLine: string;
    subtitle: string;
    ctaShop: string;
    ctaQuiz: string;
  };
  trustBar: {
    newArrivalsTitle: string;
    newArrivalsSub: string;
    bestSellersTitle: string;
    bestSellersSub: string;
    cleanSafeTitle: string;
    cleanSafeSub: string;
    premiumTitle: string;
    premiumSub: string;
    secureTitle: string;
    secureSub: string;
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
    customerCareHeading: string;
    subscribeHeading: string;
    newsletterHint: string;
    emailPlaceholder: string;
    subscribe: string;
    privacyNote: string;
    privacyLink: string;
    langHeading: string;
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
      fastDeliveryDetail: string;
      easyReturns: string;
      easyReturnsDetail: string;
      securePayments: string;
      securePaymentsDetail: string;
    };
    craftedLine: string;
    rights: string;
    langEnglishPrimary: string;
    langKoreanSecondary: string;
    langGroupAria: string;
    socialInstagramAria: string;
    socialFacebookAria: string;
    socialTiktokAria: string;
    socialYoutubeAria: string;
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
    promoTitle: "Discover the Glass-Skin Collection",
    promoBody: "Curated for that healthy, dewy glow.",
    promoCta: "SHOP NOW",
    viewAllSkincare: "View all skincare →",
    viewAllMakeup: "View all makeup →",
    viewAllHairBody: "View all →",
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
    eyebrow: "THE GLASS-SKIN COLLECTION",
    titleLine: "Radiance, distilled in Seoul.",
    subtitle:
      "Full-screen luxury. Micro-layered hydration. Finishes that read expensive on camera—and unforgettable in person.",
    ctaShop: "SHOP COLLECTION →",
    ctaQuiz: "SKIN QUIZ",
  },
  trustBar: {
    newArrivalsTitle: "New arrivals",
    newArrivalsSub: "Fresh picks every week",
    bestSellersTitle: "Best sellers",
    bestSellersSub: "Customer favorites",
    cleanSafeTitle: "Clean & safe",
    cleanSafeSub: "Dermatologist tested",
    premiumTitle: "Premium quality",
    premiumSub: "Made in Korea",
    secureTitle: "Secure payment",
    secureSub: "100% safe checkout",
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
    customerCareHeading: "Customer care",
    subscribeHeading: "SUBSCRIBE FOR BEAUTY TIPS",
    newsletterHint: "Get exclusive offers, beauty tips and early access to new launches.",
    emailPlaceholder: "Email address",
    subscribe: "Subscribe",
    privacyNote: "By subscribing you agree to our",
    privacyLink: "privacy policy",
    langHeading: "Language / 언어",
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
      fastDelivery: "Fast delivery",
      fastDeliveryDetail: "2–4 days across Nepal",
      easyReturns: "Easy returns",
      easyReturnsDetail: "Hassle-free within 7 days",
      securePayments: "Secure payments",
      securePaymentsDetail: "100% safe & protected",
    },
    craftedLine: "Crafted in Korea. Curated for Nepal.",
    rights: "All rights reserved.",
    langEnglishPrimary: "English (Primary)",
    langKoreanSecondary: "한국어 (Secondary)",
    langGroupAria: "Store language",
    socialInstagramAria: "Uvely Glow on Instagram",
    socialFacebookAria: "Uvely Glow on Facebook",
    socialTiktokAria: "Uvely Glow on TikTok",
    socialYoutubeAria: "Uvely Glow on YouTube",
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
    promoTitle: "글래스 스킨 컬렉션",
    promoBody: "건강하고 촉촉한 광채를 위해 엄선했습니다.",
    promoCta: "쇼핑하기",
    viewAllSkincare: "스킨케어 전체 →",
    viewAllMakeup: "메이크업 전체 →",
    viewAllHairBody: "전체 보기 →",
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
    eyebrow: "글래스 스킨 컬렉션",
    titleLine: "서울에서 증류한 광채.",
    subtitle:
      "풀스크린 럭셔리. 층층이 쌓는 수분. 카메라 앞에서는 고급스럽게, 직접 볼 때는 잊히지 않는 마무리.",
    ctaShop: "컬렉션 쇼핑 →",
    ctaQuiz: "피부 퀴즈",
  },
  trustBar: {
    newArrivalsTitle: "신상품",
    newArrivalsSub: "매주 새로운 추천",
    bestSellersTitle: "베스트셀러",
    bestSellersSub: "고객이 사랑한 제품",
    cleanSafeTitle: "클린 & 세이프",
    cleanSafeSub: "피부과 테스트 완료",
    premiumTitle: "프리미엄 퀄리티",
    premiumSub: "한국 제조",
    secureTitle: "안전 결제",
    secureSub: "100% 안전한 결제",
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
    customerCareHeading: "고객 케어",
    subscribeHeading: "뷰티 팁 구독",
    newsletterHint: "독점 혜택, 뷰티 팁, 신제품 얼리 액세스를 받아보세요.",
    emailPlaceholder: "이메일 주소",
    subscribe: "구독",
    privacyNote: "구독 시 당사",
    privacyLink: "개인정보 처리방침",
    langHeading: "언어 / Language",
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
      fastDeliveryDetail: "네팔 전역 2–4일",
      easyReturns: "간편한 반품",
      easyReturnsDetail: "7일 이내 간편 반품",
      securePayments: "안전한 결제",
      securePaymentsDetail: "100% 안전하게 보호",
    },
    craftedLine: "한국에서 엄선했습니다. 네팔을 위해 큐레이션했습니다.",
    rights: "모든 권리 보유.",
    langEnglishPrimary: "English (Primary)",
    langKoreanSecondary: "한국어 (Secondary)",
    langGroupAria: "스토어 언어",
    socialInstagramAria: "인스타그램의 Uvely Glow",
    socialFacebookAria: "페이스북의 Uvely Glow",
    socialTiktokAria: "틱톡의 Uvely Glow",
    socialYoutubeAria: "유튜브의 Uvely Glow",
  },
};

export function getStoreMessages(locale: StoreLocale): StoreMessages {
  return locale === "ko" ? ko : en;
}
