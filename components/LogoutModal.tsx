import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

// Mock Loader2 component for demonstration in Canvas
const Loader2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin h-4 w-4 mr-2"
  >
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
  </svg>
);

// Mock Button component (as provided in previous turn)
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "sm" | "md";
  variant?: "destructive" | "outline" | "default";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size,
  variant,
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50";
  let sizeClasses = "";
  let variantClasses = "";

  switch (size) {
    case "sm":
      sizeClasses = "h-8 px-3";
      break;
    default:
      sizeClasses = "h-9 px-4 py-2";
  }

  switch (variant) {
    case "destructive":
      variantClasses = "bg-red-500 text-white shadow hover:bg-red-600";
      break;
    case "outline":
      variantClasses =
        "border border-gray-300 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900";
      break;
    default:
      variantClasses = "bg-blue-600 text-white shadow hover:bg-blue-700";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

type LogoutModalProps = {
  onClose: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const mockToast = {
    error: (message: string) => {
      console.error(`Toast Error: ${message}`);
      alert(`Error: ${message}`); // Using alert for immediate feedback in Canvas
    },
  };

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Handle Escape key to close modal
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl space-y-6 max-w-sm w-full border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100 opacity-100"
      >
        <h2
          id="logout-modal-title"
          className="text-xl font-semibold text-gray-900 dark:text-gray-50 text-center"
        >
          Are you sure you want to log out?
        </h2>
        <p
          id="logout-modal-description"
          className="text-gray-600 dark:text-gray-400 text-center"
        >
          Logging out will end your current session. You will need to sign in
          again to access your account.
        </p>
        <div className="flex justify-end gap-3 w-full">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="hover:bg-gray-50 dark:hover:bg-gray-300 text-gray-700 dark:text-gray-700 border-gray-300 dark:border-gray-700"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              try {
                setIsLoading(true);
                await fetch("/api/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                router.replace("/signin");

                onClose();
              } catch (error) {
                console.error("Logout failed:", error);
                mockToast.error("Logout failed. Please try again.");
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      </div>
      {/* Tailwind CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LogoutModal;
