export interface CategoryItem {
  id: number;
  name:string;
  active: boolean;
  slug:string;
  image?: string;
  displayOrder?: number;
  storyText?: string;
  storyTextColor?: string;
  storyCover?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  childrens?:OutletIte[];
  createdAt: Date;
}