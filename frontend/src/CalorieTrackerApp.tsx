import React, { useState, useEffect } from 'react';
import type GoalDetails from './interfaces/Goal';
import type User from './interfaces/UserDetails';
import type Meal from './interfaces/MealDetails';
import type Notification from './interfaces/Notifications';
import { getDailyTotals } from './utils/commonUtils';
import AuthenticationPage from './components/AuthenticationPage';
import GoalSetupModal from './components/GoalSetupModal';
import { BarChart3, TrendingUp, Lightbulb, Target } from 'lucide-react';
import DashboardPage from './components/DashboardPage';
import AnalyticsPage from './components/AnalyticsPage';
import RecommendationsPage from './components/RecommendationsPage';
import GoalsPage from './components/GoalsPage';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import MealsAdditionModal from './components/MealsAdditionModal';

export const CalorieTrackerApp : React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showAuth, setShowAuth] = useState(true);
    const [showGoalSetup, setShowGoalSetup] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSignUp, setIsSignUp] = useState(false);
    const [goal, setGoal] = useState<GoalDetails | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [showMealModal, setShowMealModal] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Form states
    const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
    const [goalForm, setGoalForm] = useState({
        type: 'maintain' as GoalDetails['type'],
        dailyCalories: 2000,
        currentWeight: 70,
        targetWeight: 70
    });
    const [mealForm, setMealForm] = useState({
        name: '',
        quantity: '',
        unit: 'grams',
        tag: 'breakfast' as Meal['tag']
    });


      // Check for notifications based on progress
    useEffect(() => {
        if (goal && meals.length > 0) {
        const dailyTotals = getDailyTotals(meals);
        const progress = (dailyTotals.calories / goal.dailyCalories) * 100;
        
        if (progress > 90 && progress < 100) {
            const notification: Notification = {
            id: Math.random().toString(36),
            message: "You're very close to your target goal! Great job! 🎯",
            type: 'info',
            time: new Date().toLocaleTimeString()
            };
            setNotifications(prev => [notification, ...prev.slice(0, 4)]);
        } else if (progress < 30 && new Date().getHours() > 14) {
            const notification: Notification = {
            id: Math.random().toString(36),
            message: "Time to eat! You're behind on your calorie goal 🍽️",
            type: 'warning',
            time: new Date().toLocaleTimeString()
            };
            setNotifications(prev => [notification, ...prev.slice(0, 4)]);
        }
        }
    }, [meals, goal]);

    if (showAuth) {
        return (
            <AuthenticationPage
                authForm={authForm}
                setAuthForm={setAuthForm}
                setCurrentUser={setCurrentUser}
                setShowAuth={setShowAuth}
                setShowGoalSetup={setShowGoalSetup}
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
            />
        );
    }

    if (showGoalSetup) {
        return (
            <GoalSetupModal
                goalForm={goalForm}
                setGoalForm={setGoalForm}
                setGoal={setGoal}
                setShowGoalSetup={setShowGoalSetup}
                setNotifications={setNotifications}
            />
        );
    }

     // Main App Interface
  const dailyTotals = getDailyTotals(meals);
  const progress = goal ? (dailyTotals.calories / goal.dailyCalories) * 100 : 0;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  const renderDashboard = () => {
    return <DashboardPage
        currentUser={currentUser}
        goal={goal}
        dailyTotals={dailyTotals}
        notifications={notifications}
        progress={progress}
        meals={meals}
        setShowMealModal={setShowMealModal}
    />
  }

  const renderAnalytics = () => (
    <AnalyticsPage meals={meals} />
  );

  const renderRecommendations = () => {
    return <RecommendationsPage goal={goal}/>
  }
  const renderGoals = () => (
    <GoalsPage goal={goal} progress={progress} />
  );
  const renderMealsAdditionModal = () => (
    <MealsAdditionModal
        setShowMealModal={setShowMealModal}
        mealForm={mealForm}
        setMealForm={setMealForm}
        meals={meals}
        setMeals={setMeals}
        setNotifications={setNotifications}
    />
  );
  

    return (
        // Header
        <div className="min-h-screen bg-gray-50">
            <Header
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setShowAuth={setShowAuth}
                setGoal={setGoal}
                setMeals={setMeals}
                setNotifications={setNotifications}
            />
            <NavigationTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'analytics' && renderAnalytics()}
                {activeTab === 'recommendations' && renderRecommendations()}
                {activeTab === 'goals' && renderGoals()}
            </main>

            {showMealModal && renderMealsAdditionModal()}

        </div>


    )
}