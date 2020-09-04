import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

export class AuthController {
  static login = async (req, res, next) => {
    const { user_id, user_pw } = req.body;

    try {
      const User = await UserService.findOneByUserId(user_id);

      const input_pw = User.user_pw;
      await AuthService.verifyUserPw({ user_pw, input_pw });

      const token = await AuthService.createToken(req.body);
      return res.status(200).json({
        success: true,
        message: "login success",
        result: {
          token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  static check = async (req, res, next) => {
    return res.status(200).json({
      success: true,
      info: req.decoded,
    });
  };
}
