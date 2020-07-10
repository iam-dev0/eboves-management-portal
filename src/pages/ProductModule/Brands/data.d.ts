export interface BrandItem {
  id: number;
  name: string;
  popularity: boolean;
  active: boolean;
  createdAt: Date;
  logo1?: string;
  logo2?: string;
  image?: string;
  storyText?: string;
  storyTextColor?: string;
  storyCover?: string;
  popularity?: boolean;
  new?: boolean;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
}
