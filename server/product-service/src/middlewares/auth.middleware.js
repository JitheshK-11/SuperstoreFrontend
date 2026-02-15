const resolveAuthServiceUrl = () => {
  return process.env.AUTH_SERVICE_URL || "http://localhost:4000";
};


export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const authUrl = resolveAuthServiceUrl();
    const response = await fetch(`${authUrl}/auth/verify`, {
      method: "GET",
      headers: {
        authorization: authHeader,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    const data = await response.json();
    if (!data?.user?.userId) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    req.user = data.user;
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
