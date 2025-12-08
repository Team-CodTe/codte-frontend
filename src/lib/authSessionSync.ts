let sessionUpdateCallback: (() => Promise<void>) | null = null;

export const setSessionUpdateCallback = (
  callback: (() => Promise<void>) | null,
) => {
  sessionUpdateCallback = callback;
};

export const triggerSessionUpdate = async () => {
  if (sessionUpdateCallback) {
    await sessionUpdateCallback();
  }
};
