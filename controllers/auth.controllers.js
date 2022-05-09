import authService from "../service/auth.service";

class AuthController {
  async login(req, res) {
    const { login, password } = req.body;
    const userData = await authService.login(login, password);
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

export default new AuthController();
