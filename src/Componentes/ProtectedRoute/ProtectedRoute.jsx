import * as authHooks from "../../Context/useAuth.js";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, rolesPermitidos }) {

  const { user } = authHooks.useAuth();

  if (!user) return <Navigate to="/login" />;

  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}