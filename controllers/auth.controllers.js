import authService from "../service/auth.service";

class UserController {
  async registration(req, res) {
    const { login, password, name, role } = req.body;
    const userData = await authService.registration(
      login,
      password,
      name,
      role
    );
    return res.status(201).json(userData);
  }

  async login(req, res) {
    const { login, password } = req.body;
    const userData = await authService.login(login, password);
    console.log(userData);
    return res.status(200).json(userData);
  }

  async refresh(req, res) {
    const userId = req.user;
    const userData = await authService.refresh(userId);
    return res.status(200).json(userData);
  }

  async logout(req, res) {
    await authService.logout(req.user.id, null);
    res.status(200).json({});
  }
}

export default new UserController();
