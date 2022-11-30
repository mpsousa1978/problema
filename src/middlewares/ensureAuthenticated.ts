import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError";

import { verify } from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRespository";


interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "fbcb5e17f7b60d1a91f2855c7a6c144a") as IPayload

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = { id: user_id };

    next();
  } catch {

    throw new AppError("Invalid token", 401);
  }

}
