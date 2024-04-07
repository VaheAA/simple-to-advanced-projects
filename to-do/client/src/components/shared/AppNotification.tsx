import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AppNotificationType } from '../../shared/enums.ts';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
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
  duration = 3500
}: AppNotificationProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [barWidth, setBarWidth] = useState<number>(100);
  const { deleteNotification } = useContext(NotificationContext);
  const nodeRef = useRef(null);

  useEffect(() => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);

      setTimeout(() => deleteNotification(id), 500);
    }, duration);

    return () => {};
  }, [duration, id, deleteNotification]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBarWidth((prevProgress) => {
        if (prevProgress === 0) {
          clearInterval(intervalId);
          return prevProgress; // Return existing progress if already 100%
        } else {
          return prevProgress - 1;
        }
      });
    }, duration / 100);

    return () => clearInterval(intervalId);
  }, [duration]);

  function closeNotification(id: string) {
    setVisible(false);
    deleteNotification(id);
  }

  return (
    <CSSTransition in={visible} timeout={500} unmountOnExit classNames="my-node" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="text-gray-600 rounded shadow-2xl z-50 w-full relative bg-slate-100"
        role="alert">
        <div className="px-2 py-3.5 ">
          <div className="flex gap-2 items-center self-center p-1">
            {type === AppNotificationType.SUCCESS ? (
              <IoCheckmarkCircle className="w-7 h-7 text-green-500" />
            ) : (
              <MdError className="w-7 h-7 text-red-500" />
            )}
            <span>{message}</span>
          </div>
        </div>
        <button
          onClick={() => {
            closeNotification(id);
          }}
          className="absolute z-3 top-1 right-2 text-gray-400 hover:text-gray-800 transition-all">
          <IoMdCloseCircleOutline className="h-[20px] w-[20px]" />
        </button>
        <div
          className={`h-2 rounded bg-${type === AppNotificationType.SUCCESS ? 'green' : 'red'}-500`}
          style={{ width: barWidth + '%' }}></div>
      </div>
    </CSSTransition>
  );
}

export default function NotificationsContainer() {
  const { notifications } = useContext(NotificationContext);

  return createPortal(
    <div className="flex flex-col gap-4 px-4 py-4 absolute right-5 bottom-5 w-[350px] items-end">
      {notifications.length > 0 &&
        notifications.map(({ message, id, type }) => (
          <AppNotification key={id} id={id!} message={message} type={type} />
        ))}
    </div>,
    document.body
  );
}
