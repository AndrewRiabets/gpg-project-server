import authService from "../service/auth.service";

class AuthController {
  async login(req, res) {
    const { login, password } = req.body;
    const userData = await authService.login(login, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(userData);
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json(token);
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    const userData = await authService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 2592000000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(userData);
  }
}

export default new AuthController();
