import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AppNotificationType } from '../../shared/enums.ts';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useContext } from 'react';
import { NotificationContext } from '../../context/notiification';

interface AppNotificationProps {
  id: string;
  message: string;
  type: AppNotificationType;
  duration?: number;
}

export function AppNotification({
  id,
  message,
  type = AppNotificationType.SUCCESS,
  duration = 3000
}: AppNotificationProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { deleteNotification } = useContext(NotificationContext);

  useEffect(() => {
    setVisible(true);

    const timeoutId = setTimeout(() => {
      setVisible(false);
      setTimeout(() => deleteNotification(id), 700);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration, id, deleteNotification]);

  function closeNotification(id: string) {
    setVisible(false);
    setTimeout(() => deleteNotification(id), 700);
  }

  const toastClasses = `text-white px-4 py-3 rounded 
                        shadow-lg z-50 max-w-[300px] min-h-[100px] flex relative 
                         ${type === AppNotificationType.SUCCESS ? 'bg-green-500' : 'bg-red-500'}
                         transition-opacity duration-700 
                         ${visible ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className={toastClasses} role="alert">
      <div className="flex flex-col self-center p-3">
        <span>{message}</span>
      </div>
      <button
        onClick={() => {
          closeNotification(id);
        }}
        className="absolute z-3 top-2 right-2 transition-all text-white">
        <IoMdCloseCircleOutline className="h-7 w-7" />
      </button>
    </div>
  );
}

export default function NotificationsContainer() {
  const { notifications } = useContext(NotificationContext);

  return createPortal(
    <div className="flex flex-col gap-4 px-4 py-4 absolute right-5 bottom-5">
      {notifications.length > 0 &&
        notifications.map(({ message, id, type }) => (
          <AppNotification key={id} id={id!} message={message} type={type} />
        ))}
    </div>,
    document.body
  );
}
