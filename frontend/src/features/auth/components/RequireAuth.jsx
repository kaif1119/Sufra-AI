import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getCurrentUser } from "../services/auth.api";

const authStatus = {
  CHECKING: "checking",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

function RequireAuth({ children }) {
  const [status, setStatus] = useState(authStatus.CHECKING);

  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      try {
        const user = await getCurrentUser();

        if (!isMounted) return;

        setStatus(user ? authStatus.AUTHENTICATED : authStatus.UNAUTHENTICATED);
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setStatus(authStatus.UNAUTHENTICATED);
        }
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === authStatus.CHECKING) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f6f7fb] text-sm font-medium text-[#4b5563]">
        Checking your session...
      </div>
    );
  }

  if (status === authStatus.UNAUTHENTICATED) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default RequireAuth;
