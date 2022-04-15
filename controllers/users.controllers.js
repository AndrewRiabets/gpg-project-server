import usersService from "../service/users.service";

class UsersController {
  async createUser(req, res) {
    const { login, password, name, role } = req.body;
    const userData = await usersService.createUser(login, password, name, role);
    return res.status(201).json(userData);
  }
  async getUsers(req, res) {
    const allUsers = await usersService.allUsers(req.query);
    return res.status(201).json(allUsers);
  }
}

export default new UsersController();
