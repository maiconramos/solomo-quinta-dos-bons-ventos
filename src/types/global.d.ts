interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLayer?: Record<string, any>[];
  fbq?: (
    method: string,
    eventName: string,
    params?: Record<string, unknown>,
    options?: { eventID: string }
  ) => void;
}
