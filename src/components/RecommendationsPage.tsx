import React, {useState, useEffect} from "react";
import type { RecommendationsPageProps } from "../props/AuthenticationPageProps";
import { getMealRecommendations } from "../utils/commonUtils";
import type MealRecommendations from "../interfaces/MealRecommendations";

const RecommendationsPage : React.FC<RecommendationsPageProps> = ({
    goal
    
}) =>{
    const [recommendations, setRecommendations] = useState<MealRecommendations[]>([]);
    const [loading, setLoading] = useState(false);

    const loadRecommendations = async () => {
      if (!goal) return;
      setLoading(true);
      try {
        const recs = await getMealRecommendations(goal);
        setRecommendations(recs);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      }
      setLoading(false);
    };

    useEffect(() => {
      loadRecommendations();
    });

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-700">Meal Recommendations</h3>
            <button
              onClick={loadRecommendations}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Getting personalized recommendations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium capitalize text-gray-800">{rec.meal}</h4>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {rec.nutritionalInfo.calories} cal
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{rec.suggestion}</p>
                  <div className="text-xs text-gray-500">
                    Protein: {rec.nutritionalInfo.protein}g
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default RecommendationsPage;
