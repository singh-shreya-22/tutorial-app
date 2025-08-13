import React from "react";
import type Meal from "../interfaces/MealDetails";
import { handleAddMeal } from "../utils/handlers";
import type { MealsAdditionModalProps } from "../props/AuthenticationPageProps";

const MealsAdditionModal: React.FC<MealsAdditionModalProps> = ({
    setShowMealModal,
    mealForm,
    setMealForm,
    meals, 
    setMeals,
    setNotifications
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Meal</h3>
              <button
                onClick={() => setShowMealModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={(e) => {handleAddMeal(e, meals, mealForm, setMeals, setMealForm, setShowMealModal, setNotifications)}} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Name
                </label>
                <input
                  type="text"
                  required
                  value={mealForm.name}
                  onChange={(e) => setMealForm({...mealForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Grilled Chicken Salad"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    required
                    value={mealForm.quantity}
                    onChange={(e) => setMealForm({...mealForm, quantity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={mealForm.unit}
                    onChange={(e) => setMealForm({...mealForm, unit: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="grams">grams</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="litre">litre</option>
                    <option value="cup">cup</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="piece">piece</option>
                    <option value="slice">slice</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Type
                </label>
                <select
                  value={mealForm.tag}
                  onChange={(e) => setMealForm({...mealForm, tag: e.target.value as Meal['tag']})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMealModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
    );
};

export default MealsAdditionModal;