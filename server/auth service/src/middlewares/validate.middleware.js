import { ZodError } from "zod";

export const validateRequest = (schema) => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			params: req.params,
			query: req.query
		});
		return next();
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json({
				error: "Validation error",
				issues: error.issues.map((issue) => ({
					path: issue.path.join("."),
					message: issue.message
				}))
			});
		}

		return res.status(400).json({ error: "Invalid request" });
	}
};
