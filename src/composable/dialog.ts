/**
 * Lightweight dialog (confirm/alert) system — replaces Naive UI NDialogProvider.
 *
 * Usage:
 *   const { dialog } = useDialog();
 *   await dialog.confirm({ title: 'Delete?', content: 'Are you sure?', positiveText: 'Delete', negativeText: 'Cancel' });
 *   await dialog.alert({ title: 'Info', content: 'File saved.' });
 */

interface DialogOptions {
  title?: string
  content: string
  positiveText?: string
  negativeText?: string
  type?: 'info' | 'warning' | 'error' | 'success'
  onPositive?: () => void | Promise<void>
  onNegative?: () => void | Promise<void>
}

interface DialogItem extends DialogOptions {
  id: number
  resolve: (value: boolean) => void
  visible: boolean
}

const dialogs = ref<DialogItem[]>([]);
let nextId = 0;

function confirm(options: DialogOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const id = nextId++;
    dialogs.value.push({
      ...options,
      id,
      resolve,
      visible: true,
    });
  });
}

function alert(options: Omit<DialogOptions, 'negativeText' | 'onNegative'>): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const id = nextId++;
    dialogs.value.push({
      ...options,
      id,
      resolve,
      visible: true,
      negativeText: undefined,
      onNegative: undefined,
    });
  });
}

function close(id: number, result: boolean) {
  const idx = dialogs.value.findIndex(d => d.id === id);
  if (idx === -1) return;
  const item = dialogs.value[idx];
  item.visible = false;
  item.resolve(result);
  setTimeout(() => {
    dialogs.value = dialogs.value.filter(d => d.id !== id);
  }, 300);
}

export function useDialog() {
  return {
    dialogs: dialogs as Readonly<Ref<DialogItem[]>>,
    dialog: { confirm, alert },
    closeDialog: close,
  };
}