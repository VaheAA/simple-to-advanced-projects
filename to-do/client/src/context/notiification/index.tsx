import { createContext, ReactNode, useState } from 'react';
import { ToastNotification } from '../../core/notification.ts';

interface NotificationContextState {
  notifications: ToastNotification[];
  addNotification: (notificationOptions: ToastNotification) => void;
  deleteNotification: (notificationId: string) => void;
}

const NotificationContext = createContext<NotificationContextState>({
  notifications: [],
  addNotification: () => {},
  deleteNotification: () => {}
});

const NotificationContextProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = (notificationOptions: ToastNotification) => {
    const { id = new Date().getTime().toString(), type, message } = notificationOptions;
    const newNotification = { id, type, message };

    setNotifications((prevState) => [...prevState, newNotification]);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prevState) => prevState.filter(({ id }) => id !== notificationId));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
