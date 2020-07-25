export interface BrandItem {
  id: number;
  name: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  logo?: string;
  image?: string;
  level?:number;
  storyText?: string;
  storyTextColor?: string;
  storyCover?: string;
  popularity?: boolean;
  new?: boolean;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
}
