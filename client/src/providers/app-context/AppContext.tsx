import { createContext, useContext } from "react";

interface AppState {
  isLoading: boolean;
  error: string | null;
  setError: (message: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const AppContext = createContext<AppState>({
  isLoading: false,
  error: null,
  setError: (message) => {},
  setIsLoading: (loading) => {},
});

export const useAppContext = () => useContext(AppContext);
