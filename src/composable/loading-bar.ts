/**
 * Top progress bar — replaces Naive UI NLoadingBarProvider.
 *
 * Usage:
 *   const { loadingBar } = useLoadingBar();
 *   loadingBar.start();   // starts indeterminate progress
 *   loadingBar.finish();  // completes
 *   loadingBar.error();   // shows error state
 */

interface LoadingBarState {
  visible: boolean
  progress: number
  color: string
}

const state = ref<LoadingBarState>({
  visible: false,
  progress: 0,
  color: 'var(--accent-primary)',
});

let timer: ReturnType<typeof setInterval> | null = null;

function start() {
  state.value = {
    visible: true,
    progress: 0,
    color: 'var(--accent-primary)',
  };

  let p = 0;
  timer = setInterval(() => {
    // Simulate indeterminate progress: fast at first, then slow
    if (p < 60) {
      p += 10 + Math.random() * 15;
    } else if (p < 85) {
      p += 3 + Math.random() * 5;
    } else if (p < 95) {
      p += 0.5 + Math.random() * 1;
    } else {
      // stay at ~95
    }
    state.value.progress = Math.min(95, p);
  }, 400);
}

function finish() {
  state.value.progress = 100;
  state.value.color = 'var(--accent-primary)';
  clearTimer();
  setTimeout(() => {
    state.value.visible = false;
  }, 300);
}

function error() {
  state.value.color = 'var(--state-danger)';
  state.value.progress = 100;
  clearTimer();
  setTimeout(() => {
    state.value.visible = false;
  }, 400);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export function useLoadingBar() {
  return {
    loadingBarState: state as Readonly<Ref<LoadingBarState>>,
    loadingBar: { start, finish, error },
  };
}