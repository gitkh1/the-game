import { createContext } from "react";

export type T_NotificationContextProps = {
  showAlert?: (message: string, delay?: number) => void;
};

export const NotificationContext = createContext<T_NotificationContextProps>({});
