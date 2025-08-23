import React from "react";
import type { GoalsPageProps } from "../props/AuthenticationPageProps";

const GoalsPage : React.FC<GoalsPageProps> = ({
    goal,
    progress,

}) => {
    return (
        <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-700 mb-6">Your Goals</h3>
            {goal && (
            <div className="space-y-6">
                {/* Goal Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-600 mb-1">Goal Type</div>
                    <div className="font-semibold capitalize">{goal.type} Weight</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Daily Calories</div>
                    <div className="font-semibold">{goal.dailyCalories} cal</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">Progress</div>
                    <div className="font-semibold">{progress.toFixed(1)}%</div>
                </div>
                </div>

                {/* Weight Progress */}
                <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-4">Weight Progress</h4>
                <div className="flex justify-between items-center">
                    <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{goal.currentWeight}kg</div>
                    <div className="text-sm text-gray-500">Current</div>
                    </div>
                    <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: '60%' }}
                        ></div>
                    </div>
                    </div>
                    <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{goal.targetWeight}kg</div>
                    <div className="text-sm text-gray-500">Target</div>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
export default GoalsPage;