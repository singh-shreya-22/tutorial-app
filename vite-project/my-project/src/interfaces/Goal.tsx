export default interface GoalDetails {
  type: 'maintain' | 'gain' | 'lose';
  dailyCalories: number;
  currentWeight: number;
  targetWeight: number;
  protein?: number;
}