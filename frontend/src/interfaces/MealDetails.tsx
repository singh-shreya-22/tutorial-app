import type NutritionalInfo from "./Nutritionals";

export default interface Meal {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  tag: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  nutritionalDetails: NutritionalInfo;
  date: string;
}