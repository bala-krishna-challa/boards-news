import { BehaviorSubject } from "rxjs";

export interface UserState {
  isAuthenticated: boolean;
  email: string;
}

interface Observer {
  (value: UserState): void;
}

export const initialUserState: UserState = {
  isAuthenticated: false,
  email: "",
};

const userState = new BehaviorSubject<UserState>(initialUserState);

export const AuthEmitter = {
  next: ({ isAuthenticated, email }: UserState) =>
    userState.next({ isAuthenticated, email }),
  subscribe: (observer: Observer) =>
    userState.asObservable().subscribe(observer),
};
