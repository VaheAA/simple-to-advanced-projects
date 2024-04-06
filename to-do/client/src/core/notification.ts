import { AppNotificationType } from '../shared/enums.ts';

export interface ToastNotification {
  id?: string;
  message: string;
  type: AppNotificationType;
}
