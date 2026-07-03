/**
 * Lightweight notification system — replaces Naive UI useMessage / useNotification.
 *
 * Usage:
 *   const { notify } = useNotification();
 *   notify.success('Copied to clipboard');
 *   notify.error('Something went wrong');
 */

type NotificationType = 'success' | 'error' | 'info' | 'warning';
type NotificationPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'bottom';

interface NotificationItem {
  id: number
  type: NotificationType
  message: string
  duration: number
}

const notifications = ref<NotificationItem[]>([]);
let nextId = 0;

function add(type: NotificationType, message: string, duration = 3000) {
  const id = nextId++;
  notifications.value.push({ id, type, message, duration });
  if (duration > 0) {
    setTimeout(() => remove(id), duration);
  }
}

function remove(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id);
}

export function useNotification() {
  return {
    notifications,
    notify: {
      success: (message: string) => add('success', message),
      error: (message: string) => add('error', message),
      info: (message: string) => add('info', message),
      warning: (message: string) => add('warning', message),
    },
    removeNotification: remove,
  };
}
