import ApiError from "../error-handling/api.error";
import tokenService from "../service/token.service";
import UserModel from "../model/user.model";

export default async function async(req, res, next) {
  try {
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const isValidToken = await tokenService.verifyToken(accessToken);
    if (!isValidToken) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = isValidToken;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
