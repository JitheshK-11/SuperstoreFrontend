import { verifyAccessToken } from "../utils/jwt.util.js";

export const requireAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Authorization token required" });
	}

	const token = authHeader.slice("Bearer ".length).trim();
	try {
		const payload = verifyAccessToken(token);
		if (!payload?.userId) {
			return res.status(401).json({ error: "Invalid access token" });
		}
        
		req.user = { userId: payload.userId, role: payload.role };
		return next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid access token" });
	}
};

export const requireAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ error: "Authorization token required" });
	}

	if (req.user.role !== "admin") {
		return res.status(403).json({ error: "Admin access required" });
	}


	return next();
};
