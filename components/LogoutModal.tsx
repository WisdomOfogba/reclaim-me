import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {toast} from "sonner";

const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2>Are you sure you want to log out?</h2>
        <div>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={async () => {
              // Handle logout logic
              try {
                setIsLoading(true);
                await fetch("/api/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                onClose();
                router.replace("/signin"); // Redirect to sign-in page
              } catch (error) {
                console.error("Logout failed:", error);
                toast.error("Logout failed. Please try again.");
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {isLoading ? <><Loader2 className="animate-spin" />Logging out</> : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
