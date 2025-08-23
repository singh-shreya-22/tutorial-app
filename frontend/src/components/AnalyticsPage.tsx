import React from "react";
import type { AnalyticsPageProps } from "../props/AuthenticationPageProps";

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
    meals
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-700 mb-6">Nutrition Analytics</h3>
        
        {/* Weekly Overview */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-600 mb-4">Weekly Calorie Intake</h4>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day}</div>
                <div 
                  className="bg-purple-100 rounded-lg mx-auto transition-all duration-300 hover:bg-purple-200"
                  style={{ 
                    height: `${60 + (index * 10)}px`,
                    width: '40px'
                  }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{1800 + (index * 100)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Distribution */}
        <div>
          <h4 className="font-medium text-gray-600 mb-4">Meal Distribution</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealType) => {
              const mealCount = meals.filter(meal => meal.tag === mealType).length;
              return (
                <div key={mealType} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{mealCount}</div>
                  <div className="text-sm text-gray-600 capitalize">{mealType}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;