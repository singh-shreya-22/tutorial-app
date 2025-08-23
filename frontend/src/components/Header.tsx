import React from "react";
import { Apple, User} from "lucide-react";
import type { HeaderProps } from "../props/AuthenticationPageProps";

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  setCurrentUser,
  setShowAuth,
  setGoal,
  setMeals,
  setNotifications
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Apple className="w-8 h-8 text-purple-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">NutriTrack</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{currentUser?.name}</span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setShowAuth(true);
                  setGoal(null);
                  setMeals([]);
                  setNotifications([]);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
  );
};      