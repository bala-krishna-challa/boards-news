import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppError from "../pages/AppError";
import { useAppContext } from "../providers/app-context/AppContext";

const ErrorHandler: React.FC<{}> = ({ children }) => {
  const { error, setError } = useAppContext();
  const { listen } = useHistory();

  useEffect(() => {
    const unsubscribe = listen(() => setError(null));
    return unsubscribe;
  }, [listen, setError]);

  if (error) return <AppError error={error} />;

  return children as ReactElement;
};

export default ErrorHandler;
