import React from 'react';
import type {AuthenticationPageProps} from '../props/AuthenticationPageProps';
import { Apple } from 'lucide-react';
import { handleAuth } from '../utils/handlers';

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({
    authForm,
    setAuthForm,
    setCurrentUser,
    setShowAuth,
    setShowGoalSetup,
    isSignUp,
    setIsSignUp
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <Apple className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">NutriTrack</h1>
            <p className="text-gray-300">Your personal nutrition companion</p>
            </div>
            
            <form onSubmit={(e) => handleAuth(e, setCurrentUser, setShowAuth, setShowGoalSetup, authForm, isSignUp)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-white font-medium">Email</label>
                <input
                type="email"
                required
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-white font-medium">Password</label>
                <input
                type="password"
                required
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                />
            </div>
            
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            </form>
            
            <div className="text-center mt-6">
            <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-300 hover:text-white transition-colors"
            >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
            </div>
        </div>
        </div>
    );
}

export default AuthenticationPage;