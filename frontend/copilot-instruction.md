# Copilot Project Context: NutriTrack

## Project Overview
NutriTrack is a nutrition and calorie tracking application. The project is structured as a modern TypeScript/React app, using Vite as the build tool. It provides features for user authentication, goal setting, meal tracking, analytics, and personalized recommendations.

## Project Structure

- **Root Files:**
  - `eslint.config.js`: ESLint configuration for code linting.
  - `index.html`: Main HTML entry point.
  - `package.json`: Project dependencies and scripts.
  - `README.md`: Project documentation.
  - `tsconfig*.json`: TypeScript configuration files.
  - `vite.config.ts`: Vite build configuration.

- **public/**: Static assets (SVGs, images).

- **src/**: Main source code directory.
  - `App.css`: Global styles.
  - `main.tsx`: App entry point.
  - `vite-env.d.ts`: Vite/TypeScript environment types.
  - **assets/**: (Not detailed, likely images/icons.)
  - **components/**: React components for major app features:
    - `AnalyticsPage.tsx`: Analytics and insights.
    - `AuthenticationPage.tsx`: User login/signup.
    - `DashboardPage.tsx`: Main dashboard.
    - `GoalSetupModal.tsx`: Modal for setting goals.
    - `GoalsPage.tsx`: User goals overview.
    - `Header.tsx`: App header/navigation.
    - `MealsAdditionModal.tsx`: Modal for adding meals.
    - `NavigationTabs.tsx`: Tab navigation UI.
    - `RecommendationsPage.tsx`: Personalized recommendations.
  - **interfaces/**: TypeScript interfaces for data structures:
    - `Forms.tsx`, `Goal.tsx`, `MealDetails.tsx`, `MealRecommendations.tsx`, `Notifications.tsx`, `Nutritionals.tsx`, `UserDetails.tsx`
  - **props/**: Component prop type definitions:
    - `AuthenticationPageProps.tsx`
  - **utils/**: Utility/helper functions:
    - `commonUtils.tsx`, `handlers.tsx`

## Key Features
- User authentication and profile management
- Goal setup and tracking
- Meal addition and nutritional breakdown
- Analytics and progress visualization
- Personalized meal and nutrition recommendations

## Technologies Used
- React (TypeScript)
- Vite (build tool)
- ESLint (linting)
- CSS (styling)

---
This file provides a high-level context of the NutriTrack project for GitHub Copilot and other AI tools. For detailed implementation, refer to the respective files and folders.
