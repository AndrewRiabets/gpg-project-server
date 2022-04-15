import bcrypt from "bcryptjs";

import ApiError from "../error-handling/api.error";
import UserModel from "../model/user.model";
import tokenService from "./token.service";

class AuthService {
  async login(login, password) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.BadRequest("Ошибка авторизации");
    }
    const isEquals = await bcrypt.compare(password, user.password);
    if (!isEquals) {
      throw ApiError.BadRequest("Ошибка авторизации");
    }
    const payload = { id: user._id, login: user.login };
    const token = tokenService.generateTokens(payload);
    await tokenService.saveToken(user._id, token);
    const data = { user: { name: user.name, role: user.role }, token };
    return data;
  }

  async refresh(userId) {
    const user = await UserModel.findById(userId);
    const payload = { id: user._id, login: user.login };
    const token = tokenService.generateTokens(payload);
    await tokenService.saveToken(user._id, token);
    const data = { user: { name: user.name, role: user.role }, token };
    return data;
  }

  async logout(id, resetToken) {
    const token = await tokenService.saveToken(id, resetToken);
    return token;
  }
}

export default new AuthService();
