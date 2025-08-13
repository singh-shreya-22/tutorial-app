
import React from 'react';
import { Bell, Zap, Weight, Apple, Droplets, Plus } from 'lucide-react';
import type { DashboardPageProps } from '../props/AuthenticationPageProps';

const DashboardPage: React.FC<DashboardPageProps> = ({
    currentUser,
    goal,
    notifications,
    progress,
    dailyTotals,
    meals, 
    setShowMealModal,
}) => {
    return (
        <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}!</h2>
                <p className="opacity-90">Here's your nutrition overview for today</p>
              </div>
        
              {/* Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700">Calories</h3>
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{dailyTotals.calories}</p>
                    <p className="text-sm text-gray-500">of {goal?.dailyCalories} goal</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
        
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700">Protein</h3>
                    <Weight className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{dailyTotals.protein}g</p>
                    <p className="text-sm text-gray-500">daily intake</p>
                  </div>
                </div>
        
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700">Carbs</h3>
                    <Apple className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{dailyTotals.carbs}g</p>
                    <p className="text-sm text-gray-500">daily intake</p>
                  </div>
                </div>
        
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700">Fat</h3>
                    <Droplets className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{dailyTotals.fat}g</p>
                    <p className="text-sm text-gray-500">daily intake</p>
                  </div>
                </div>
              </div>
        
              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Bell className="w-5 h-5 text-purple-500 mr-2" />
                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg ${
                        notification.type === 'success' ? 'bg-green-50 text-green-800' :
                        notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                        'bg-blue-50 text-blue-800'
                      }`}>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs opacity-70">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
        
              {/* Add Meal Button */}
              <button
                onClick={() => setShowMealModal(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
              >
                <Plus className="w-8 h-8 cursor-pointer" />
              </button>
        
              {/* Today's Meals */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-700 mb-4">Today's Meals</h3>
                {meals.filter(meal => meal.date === new Date().toISOString().split('T')[0]).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No meals added yet today</p>
                ) : (
                  <div className="space-y-3">
                    {meals.filter(meal => meal.date === new Date().toISOString().split('T')[0]).map((meal) => (
                      <div key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-gray-500">{meal.quantity} {meal.unit} • {meal.tag}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{meal.nutritionalDetails.calories} cal</p>
                          <p className="text-sm text-gray-500">{meal.nutritionalDetails.protein}g protein</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
    );
}

export default DashboardPage;