export interface IPO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  listingDate: string;
  lots: number;
  description: string;
  issueSize: string;
  priceRange: string;
  minInvest: string;
  status: "upcoming" | "open" | "closed" | "listed";
  listedGains?: string;
  listedPrice?: string;
}
