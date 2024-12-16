import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RouteProtection({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/auth");
		}
	}, [isAuthenticated, navigate]);

	// Optionally, you could render null if unauthenticated for a cleaner UI
	return isAuthenticated ? children : null;
}
