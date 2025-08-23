import type React from "react";
import type GoalDetails from "../interfaces/Goal";
import type Notification from "../interfaces/Notifications";
import type UserDetails from "../interfaces/UserDetails";
import type { AuthForm, MealForm } from "../interfaces/Forms";
import { getNutritionalInfo } from "./commonUtils";
import type { UserCredentials } from "../interfaces/UserCredentials";
import type Meal from "../interfaces/MealDetails";
import axios from "axios";  

export function handleGoalSetup(
    e: React.FormEvent, 
    setGoal: React.Dispatch<React.SetStateAction<GoalDetails | null>>,
    setShowGoalSetup: React.Dispatch<React.SetStateAction<boolean>>,
    goalForm: GoalDetails,
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) {
    e.preventDefault();
    setGoal(goalForm);
    setShowGoalSetup(false);
    
    // Add welcome notification
    const notification: Notification = {
        id: Math.random().toString(36),
        message: `Welcome! Your daily goal is ${goalForm.dailyCalories} calories.`,
        type: 'success',
        time: new Date().toLocaleTimeString()
    };
    setNotifications([notification]);
  };

export function handleAuth(
    e: React.FormEvent,
    setCurrentUser: React.Dispatch<React.SetStateAction<UserDetails | null>>,
    setShowAuth: React.Dispatch<React.SetStateAction<boolean>>,
    setShowGoalSetup: React.Dispatch<React.SetStateAction<boolean>>,
    authForm: AuthForm,
    isSignUp: boolean,
) {
    e.preventDefault();
    const user: UserCredentials = {
        email: authForm.email,
        password: authForm.password
    };

    if( isSignUp ) {
        axios.post('http://localhost:3000/auth/signup', user)
            .then(response => {
              console.log('Sign up successful:', response.data);
            })
            .catch(error => {
                console.error('Error during sign up:', error);
            });
      }

    // setCurrentUser(currentUser);
    setShowAuth(false);
    setShowGoalSetup(true);
}

export async function handleAddMeal(
    e: React.FormEvent,
    meals: Meal[],
    mealForm: MealForm,
    setMeals: React.Dispatch<React.SetStateAction<Meal[]>>,
    setMealForm: React.Dispatch<React.SetStateAction<MealForm>>,
    setShowMealModal: React.Dispatch<React.SetStateAction<boolean>>,
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>


){
    e.preventDefault();
    try {
      const nutritionData = await getNutritionalInfo(mealForm.name, mealForm.quantity, mealForm.unit);
      
      const newMeal: Meal = {
        id: Math.random().toString(36),
        name: mealForm.name,
        quantity: mealForm.quantity,
        unit: mealForm.unit,
        tag: mealForm.tag,
        date: new Date().toISOString().split('T')[0],
        nutritionalDetails: nutritionData
      };
      
      setMeals([...meals, newMeal]);
      setMealForm({ name: '', quantity: '', unit: 'grams', tag: 'breakfast' });
      setShowMealModal(false);
      
      // Add success notification
      const notification: Notification = {
        id: Math.random().toString(36),
        message: `Added ${newMeal.name} (${newMeal.nutritionalDetails.calories} calories)`,
        type: 'success',
        time: new Date().toLocaleTimeString()
      };
      setNotifications(prev => [notification, ...prev]);
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };