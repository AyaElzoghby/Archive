import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AuthLayout({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated]);

	// Optionally, you could render null if unauthenticated for a cleaner UI
	return children;
}
