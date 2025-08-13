import type Meal from "../interfaces/MealDetails";
import type GoalDetails from "../interfaces/Goal";
import type MealRecommendations from "../interfaces/MealRecommendations";
// Calculate daily totals
export const getDailyTotals = (meals: Meal[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = meals.filter(meal => meal.date === today);
    
    return todayMeals.reduce((totals, meal) => ({
      calories: totals.calories + meal.nutritionalDetails.calories,
      protein: totals.protein + meal.nutritionalDetails.protein,
      carbs: totals.carbs + meal.nutritionalDetails.carbs,
      fat: totals.fat + meal.nutritionalDetails.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

export const getNutritionalInfo = async (mealName: string, quantity: string, unit: string) => {
    // Simulate API delay
    if(mealName === '' || quantity === '' || unit === '') {
      console.log("Invalid meal details provided");
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock nutritional data - in real app, this would call ChatGPT/LLM
    const mockData = {
      calories: Math.floor(Math.random() * 500) + 100,
      protein: Math.floor(Math.random() * 30) + 5,
      carbs: Math.floor(Math.random() * 60) + 10,
      fat: Math.floor(Math.random() * 25) + 2
    };
    return mockData;
  };
// Mock LLM API call for meal recommendations
export const getMealRecommendations = async (goal: GoalDetails) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if(!goal) {
      console.log("No goal provided for meal recommendations");
    }
    const recommendations: MealRecommendations[]= [
      {
        meal: 'breakfast',
        suggestion: 'Greek yogurt with berries and granola',
        nutritionalInfo: {
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10
        } 
      },
      {
        meal: 'lunch',
        suggestion: 'Grilled chicken salad with quinoa',
        nutritionalInfo: {
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10
        } 
      },
      {
        meal: 'dinner',
        suggestion: 'Baked salmon with sweet potato',
        nutritionalInfo: {
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10
        } 
      },
      {
        meal: 'snack',
        suggestion: 'Mixed nuts and apple',
        nutritionalInfo: {
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10
        } 
      }
    ];
    return recommendations;
  };