"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import styles from "./toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: Omit<ToastItem, "id">) => string;
  dismissToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string) => string;
    error: (message: string, title?: string) => string;
    warning: (message: string, title?: string) => string;
    info: (message: string, title?: string) => string;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function emitAdminToast(options: Omit<ToastItem, "id">) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("admin-toast", { detail: options }));
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      type = "info",
      title,
      message,
      duration = 4000,
    }: Omit<ToastItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast],
  );

  useEffect(() => {
    function handleEvent(event: Event) {
      const customEvent = event as CustomEvent<Omit<ToastItem, "id">>;
      if (customEvent.detail) {
        showToast(customEvent.detail);
      }
    }

    window.addEventListener("admin-toast", handleEvent);
    return () => window.removeEventListener("admin-toast", handleEvent);
  }, [showToast]);

  const toastHelpers = {
    success: (message: string, title?: string) =>
      showToast({ type: "success", title, message }),
    error: (message: string, title?: string) =>
      showToast({ type: "error", title, message }),
    warning: (message: string, title?: string) =>
      showToast({ type: "warning", title, message }),
    info: (message: string, title?: string) =>
      showToast({ type: "info", title, message }),
  };

  return (
    <ToastContext.Provider
      value={{ showToast, dismissToast, toast: toastHelpers }}
    >
      {children}
      <div className={styles.toastContainer} aria-live="polite" role="region">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`${styles.toastItem} ${styles[item.type] || styles.info}`}
            role="alert"
          >
            <div className={styles.toastIcon}>
              {item.type === "success" && <CheckCircle2 size={18} />}
              {item.type === "error" && <AlertCircle size={18} />}
              {item.type === "warning" && <AlertTriangle size={18} />}
              {item.type === "info" && <Info size={18} />}
            </div>
            <div className={styles.toastBody}>
              {item.title ? (
                <strong className={styles.toastTitle}>{item.title}</strong>
              ) : null}
              <p className={styles.toastMessage}>{item.message}</p>
            </div>
            <button
              type="button"
              className={styles.toastClose}
              onClick={() => dismissToast(item.id)}
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: emitAdminToast,
      dismissToast: () => {},
      toast: {
        success: (message: string, title?: string) => {
          emitAdminToast({ type: "success", title, message });
          return "";
        },
        error: (message: string, title?: string) => {
          emitAdminToast({ type: "error", title, message });
          return "";
        },
        warning: (message: string, title?: string) => {
          emitAdminToast({ type: "warning", title, message });
          return "";
        },
        info: (message: string, title?: string) => {
          emitAdminToast({ type: "info", title, message });
          return "";
        },
      },
    };
  }
  return context;
}
