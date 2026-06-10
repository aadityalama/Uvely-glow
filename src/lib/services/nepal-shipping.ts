export const NEPAL_PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
] as const;

export type NepalProvince = (typeof NEPAL_PROVINCES)[number];
export type ShippingMethod = "standard" | "express" | "valley_same_day";

export type NepalDistrictRate = {
  province: NepalProvince;
  district: string;
  zoneName: string;
  baseFeeKrw: number;
  remoteSurchargeKrw: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
};

export const NEPAL_DISTRICTS: NepalDistrictRate[] = [
  { province: "Bagmati", district: "Kathmandu", zoneName: "Central", baseFeeKrw: 150, remoteSurchargeKrw: 0, estimatedDaysMin: 1, estimatedDaysMax: 2 },
  { province: "Bagmati", district: "Lalitpur", zoneName: "Central", baseFeeKrw: 150, remoteSurchargeKrw: 0, estimatedDaysMin: 1, estimatedDaysMax: 2 },
  { province: "Bagmati", district: "Bhaktapur", zoneName: "Central", baseFeeKrw: 175, remoteSurchargeKrw: 0, estimatedDaysMin: 1, estimatedDaysMax: 2 },
  { province: "Bagmati", district: "Chitwan", zoneName: "Central", baseFeeKrw: 250, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 3 },
  { province: "Gandaki", district: "Kaski", zoneName: "Western", baseFeeKrw: 300, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Gandaki", district: "Gorkha", zoneName: "Western", baseFeeKrw: 350, remoteSurchargeKrw: 75, estimatedDaysMin: 3, estimatedDaysMax: 5 },
  { province: "Koshi", district: "Morang", zoneName: "Eastern", baseFeeKrw: 325, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Koshi", district: "Sunsari", zoneName: "Eastern", baseFeeKrw: 325, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Madhesh", district: "Parsa", zoneName: "Central", baseFeeKrw: 300, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Madhesh", district: "Dhanusha", zoneName: "Central", baseFeeKrw: 325, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Lumbini", district: "Rupandehi", zoneName: "Western", baseFeeKrw: 325, remoteSurchargeKrw: 0, estimatedDaysMin: 2, estimatedDaysMax: 4 },
  { province: "Lumbini", district: "Banke", zoneName: "Western", baseFeeKrw: 375, remoteSurchargeKrw: 50, estimatedDaysMin: 3, estimatedDaysMax: 5 },
  { province: "Karnali", district: "Surkhet", zoneName: "Mid-western", baseFeeKrw: 450, remoteSurchargeKrw: 125, estimatedDaysMin: 4, estimatedDaysMax: 7 },
  { province: "Karnali", district: "Jumla", zoneName: "Mid-western", baseFeeKrw: 550, remoteSurchargeKrw: 250, estimatedDaysMin: 5, estimatedDaysMax: 9 },
  { province: "Sudurpashchim", district: "Kailali", zoneName: "Far-western", baseFeeKrw: 450, remoteSurchargeKrw: 100, estimatedDaysMin: 4, estimatedDaysMax: 7 },
  { province: "Sudurpashchim", district: "Kanchanpur", zoneName: "Far-western", baseFeeKrw: 475, remoteSurchargeKrw: 125, estimatedDaysMin: 4, estimatedDaysMax: 7 },
];

export const SHIPPING_METHOD_LABELS: Record<ShippingMethod, string> = {
  standard: "Standard delivery",
  express: "Express delivery",
  valley_same_day: "Kathmandu Valley same day",
};

export function getDistrictsForProvince(province: string) {
  return NEPAL_DISTRICTS.filter((rate) => rate.province === province);
}

export function calculateDeliveryFee({
  province,
  district,
  method,
  subtotalKrw,
}: {
  province: string;
  district: string;
  method: ShippingMethod;
  subtotalKrw: number;
}) {
  const rate =
    NEPAL_DISTRICTS.find(
      (item) => item.province === province && item.district === district,
    ) ?? NEPAL_DISTRICTS.find((item) => item.province === "Bagmati");

  const base = (rate?.baseFeeKrw ?? 300) + (rate?.remoteSurchargeKrw ?? 0);
  const methodFee =
    method === "express" ? 150 : method === "valley_same_day" ? 250 : 0;
  const isValley =
    province === "Bagmati" &&
    ["Kathmandu", "Lalitpur", "Bhaktapur"].includes(district);
  const fee = subtotalKrw >= 50000 ? 0 : base + (method === "valley_same_day" && !isValley ? 0 : methodFee);

  return {
    feeKrw: fee,
    estimatedDaysMin:
      method === "valley_same_day" && isValley ? 0 : rate?.estimatedDaysMin ?? 2,
    estimatedDaysMax:
      method === "express" ? Math.max(1, (rate?.estimatedDaysMax ?? 4) - 1) : rate?.estimatedDaysMax ?? 5,
    label: SHIPPING_METHOD_LABELS[method],
    supportsMethod: method !== "valley_same_day" || isValley,
  };
}
