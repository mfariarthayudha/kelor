import { Request, Response, NextFunction } from "express";

// Middleware to check if the user has the required role
export const checkRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user!; // Assuming `req.user` is populated by some authentication middleware

    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (user.role !== requiredRole) {
      if (req.method == "GET") {
        return res.redirect("/error/403");
      } else {
        return res
          .status(403)
          .json({ errorMessages: "Akses ditolak: izin tidak mencukupi" });
      }
    }
    next();
  };
};
