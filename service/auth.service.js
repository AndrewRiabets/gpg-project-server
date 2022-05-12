import bcrypt from "bcryptjs";

import ApiError from "../error-handling/api.error";
import UserModel from "../model/user.model";
import tokenService from "./token.service";

class AuthService {
  async login(login, password) {
    const userData = await UserModel.findOne({ login });
    if (!userData) {
      throw ApiError.BadRequest("Ошибка авторизации");
    }
    const isEquals = await bcrypt.compare(password, userData.password);
    if (!isEquals) {
      throw ApiError.BadRequest("Ошибка авторизации");
    }
    const payload = { id: userData._id, login: userData.login };
    const tokens = tokenService.generateTokens(payload);
    await tokenService.saveToken(userData._id, tokens.refreshToken);
    const user = { id: userData.id, name: userData.name, role: userData.role };
    return { ...tokens, user };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.verifyRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const userInfo = await UserModel.findById(userData.id);
    const payload = { id: userInfo._id, login: userInfo.login };
    const tokens = tokenService.generateTokens(payload);
    await tokenService.saveToken(userInfo._id, tokens.refreshToken);
    const user = {
      id: userInfo.id,
      name: userInfo.name,
      role: userInfo.role,
    };
    return { ...tokens, user };
  }
}

export default new AuthService();
