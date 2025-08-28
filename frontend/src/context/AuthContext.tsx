import { createContext, useState} from 'react';
import type UserDetails from '../interfaces/UserDetails';

type AuthContextType = {
  currentUser: UserDetails; 
  setCurrentUser: React.Dispatch<React.SetStateAction<UserDetails>>; // Replace 'any' with your user type if available
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode; 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Replace 'any' with your user type if available

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};