import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  private notificationId = 0;
  
  notifications$ = this.notificationSubject.asObservable();

  constructor() { }

  /**
   * Show a success notification
   * @param title Notification title
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  success(title: string, message: string, duration: number = 5000): void {
    this.show({
      id: this.getNextId(),
      type: 'success',
      title,
      message,
      duration,
      visible: false
    });
  }

  /**
   * Show an error notification
   * @param title Notification title
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  error(title: string, message: string, duration: number = 5000): void {
    this.show({
      id: this.getNextId(),
      type: 'error',
      title,
      message,
      duration,
      visible: false
    });
  }

  /**
   * Show a warning notification
   * @param title Notification title
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  warning(title: string, message: string, duration: number = 5000): void {
    this.show({
      id: this.getNextId(),
      type: 'warning',
      title,
      message,
      duration,
      visible: false
    });
  }

  /**
   * Show an info notification
   * @param title Notification title
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  info(title: string, message: string, duration: number = 5000): void {
    this.show({
      id: this.getNextId(),
      type: 'info',
      title,
      message,
      duration,
      visible: false
    });
  }

  /**
   * Show a primary notification
   * @param title Notification title
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  primary(title: string, message: string, duration: number = 5000): void {
    this.show({
      id: this.getNextId(),
      type: 'primary',
      title,
      message,
      duration,
      visible: false
    });
  }

  /**
   * Show a custom notification or quick message
   */
  show(notification: Notification): void;
  show(message: string, type: Notification['type']): void;
  show(arg1: Notification | string, arg2?: Notification['type']): void {
    if (typeof arg1 === 'string') {
      const notification: Notification = {
        id: this.getNextId(),
        type: arg2 ?? 'info',
        title: arg1,
        message: '',
        duration: 5000,
        visible: false
      };
      this.notificationSubject.next(notification);
    } else {
      this.notificationSubject.next(arg1);
    }
  }

  /**
   * Get next notification ID
   * @returns Unique notification ID
   */
  private getNextId(): number {
    return ++this.notificationId;
  }
} 