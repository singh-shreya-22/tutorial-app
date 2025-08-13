import type { AuthForm, MealForm, Tab } from "../interfaces/Forms";
import type UserDetails from "../interfaces/UserDetails";
import type GoalDetails from "../interfaces/Goal";
import type Notification from "../interfaces/Notifications";
import type Meal from "../interfaces/MealDetails";
import type NutritionalInfo from "../interfaces/Nutritionals";

interface AuthenticationPageProps {
    authForm: AuthForm
    setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
    setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setShowGoalSetup: React.Dispatch<React.SetStateAction<boolean>>;
    isSignUp: boolean;
    setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
interface GoalSetupModalProps {
    goalForm: GoalDetails;
    setGoalForm: React.Dispatch<React.SetStateAction<GoalDetails>>;
    setGoal: React.Dispatch<React.SetStateAction<GoalDetails | null>>;
    setShowGoalSetup: React.Dispatch<React.SetStateAction<boolean>>;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface DashboardPageProps {
    currentUser: UserDetails | null;
    goal: GoalDetails | null;
    dailyTotals: NutritionalInfo,
    notifications: Notification[];
    progress: number;
    meals: Meal[];
    setShowMealModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AnalyticsPageProps {
    meals: Meal[];
}
interface RecommendationsPageProps {
    goal: GoalDetails | null;
}

interface GoalsPageProps {
    goal: GoalDetails | null;
    progress: number;
}

interface MealsAdditionModalProps {
    setShowMealModal: React.Dispatch<React.SetStateAction<boolean>>;
    mealForm: MealForm;
    setMealForm: React.Dispatch<React.SetStateAction<MealForm>>;
    meals: Meal[];
    setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface HeaderProps {
    currentUser: UserDetails | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
    setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setGoal: React.Dispatch<React.SetStateAction<GoalDetails | null>>;
    setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface NavigationTabsProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export type {
    AuthenticationPageProps, 
    GoalSetupModalProps, 
    DashboardPageProps, 
    AnalyticsPageProps, 
    RecommendationsPageProps,
    GoalsPageProps, 
    MealsAdditionModalProps,
    HeaderProps,
    NavigationTabsProps
};