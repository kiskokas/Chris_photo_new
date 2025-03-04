interface Window {
    grecaptcha: {
      enterprise: {
        execute: (siteKey: string, action: { action: string }) => Promise<string>;
        ready: (callback: () => void) => void;
      };
    };
  }
  