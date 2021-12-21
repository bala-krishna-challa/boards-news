import { useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        setError,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
