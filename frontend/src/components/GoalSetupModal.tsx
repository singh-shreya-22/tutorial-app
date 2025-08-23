import React from "react";
import { Target } from "lucide-react";
import { handleGoalSetup } from "../utils/handlers";
import type {GoalSetupModalProps} from "../props/AuthenticationPageProps";
import type GoalDetails from "../interfaces/Goal";

const GoalSetupModal: React.FC<GoalSetupModalProps> = ({
    goalForm,
    setGoalForm,
    setGoal,
    setShowGoalSetup,
    setNotifications
}) => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <div className="text-center mb-8">
                <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Set Your Goals</h2>
                <p className="text-gray-300">Let's customize your nutrition journey</p>
            </div>
            
            <form onSubmit={(e) => handleGoalSetup(e, setGoal, setShowGoalSetup, goalForm, setNotifications)} className="space-y-6">
                <div>
                <label className="text-white font-medium block mb-2">Goal Type</label>
                <select
                    value={goalForm.type}
                    onChange={(e) => setGoalForm({...goalForm, type: e.target.value as GoalDetails['type']})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="maintain" className="text-black">Maintain Weight</option>
                    <option value="lose" className="text-black">Lose Weight</option>
                    <option value="gain" className="text-black">Gain Weight</option>
                </select>
                </div>
                
                <div>
                <label className="text-white font-medium block mb-2">Daily Calories</label>
                <input
                    type="number"
                    value={goalForm.dailyCalories}
                    onChange={(e) => setGoalForm({...goalForm, dailyCalories: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-white font-medium block mb-2">Current Weight (kg)</label>
                    <input
                    type="number"
                    value={goalForm.currentWeight}
                    onChange={(e) => setGoalForm({...goalForm, currentWeight: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="text-white font-medium block mb-2">Target Weight (kg)</label>
                    <input
                    type="number"
                    value={goalForm.targetWeight}
                    onChange={(e) => setGoalForm({...goalForm, targetWeight: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                </div>
                
                <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                >
                Set Goals
                </button>
            </form>
            </div>
        </div>
    );
}
export default GoalSetupModal;