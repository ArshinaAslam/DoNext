import { useState, useCallback } from "react";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  }, []);

  return { message, showToast, clearToast: () => setMessage(null) };
};