export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info' | 'primary';
  title: string;
  message: string;
  duration: number;
  visible: boolean;
}
