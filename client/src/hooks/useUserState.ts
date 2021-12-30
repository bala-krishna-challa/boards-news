import { useEffect, useState } from "react";
import {
  AuthEmitter,
  initialUserState,
  UserState,
} from "../emitters/AuthEmitter";

const useUserState = () => {
  const [userState, setUserState] = useState<UserState>(initialUserState);
  const { subscribe } = AuthEmitter;

  useEffect(() => {
    const subscription = subscribe(({ isAuthenticated, email }: UserState) => {
      setUserState({ isAuthenticated, email });
    });

    return () => subscription.unsubscribe();
  }, [subscribe, setUserState]);

  return userState;
};

export default useUserState;
