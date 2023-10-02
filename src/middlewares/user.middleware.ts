import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      req.res.locals = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();