import type { AdminRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

import { verifyAdminToken } from "../lib/auth.js";

declare global {
  namespace Express {
    interface Request {
      admin?: {
        adminId: string;
        email: string;
        role: AdminRole;
      };
    }
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    req.admin = verifyAdminToken(authorization.slice("Bearer ".length));
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function requireAdminRole(...roles: AdminRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin || !roles.includes(req.admin.role as AdminRole)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    next();
  };
}
