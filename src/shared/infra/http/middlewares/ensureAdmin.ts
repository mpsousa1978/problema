import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";



export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;
  const userRespotory = new UsersRepository();
  const user = await userRespotory.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin")
  }

  return next();
}