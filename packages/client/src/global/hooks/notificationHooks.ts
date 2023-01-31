import { useContext } from "react";

import { NotificationContext, T_NotificationContextProps } from "../context";

export const useNotification = () => {
  return useContext<T_NotificationContextProps>(NotificationContext);
};
