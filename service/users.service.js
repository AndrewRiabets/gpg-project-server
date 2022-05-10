import bcrypt from "bcryptjs";

import ApiError from "../error-handling/api.error";
import UserModel from "../model/user.model";

class UsersService {
  async createUser(login, password, name, role) {
    const newLogin = login.trim().toLocaleLowerCase();
    const candidateLogin = await UserModel.findOne({ login: newLogin });
    if (candidateLogin) {
      throw ApiError.Conflict(`Пользователь с логином ${login} уже существует`);
    }

    const candidateName = await UserModel.findOne({ name });
    if (candidateName) {
      throw ApiError.Conflict(`Пользователь с именем ${name} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
      login: newLogin,
      password: hashPassword,
      name,
      role,
    });
    return { name: user.name, id: user.id };
  }
  async allUsers() {
    const users = await UserModel.find({}, { name: true }).sort({
      name: 1,
    });
    return users;
  }
}

export default new UsersService();
