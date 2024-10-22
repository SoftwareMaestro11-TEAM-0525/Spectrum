import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";

export class AuthController {
  static login = async (req, res, next) => {
    const { user_email, user_pw } = req.body;

    try {
      const User = await UserService.findOneByUserEmail(user_email);

      const input_pw = User.user_pw;
      await AuthService.verifyUserPw({ user_pw, input_pw });

      const userObj = {
        user_id: User.user_id,
        user_email: user_email,
      };

      const token = await AuthService.createToken(userObj);
      return res.status(200).json({
        success: true,
        message: "login success",
        result: {
          token: token,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static check = async (req, res, next) => {
    return res.status(200).json({
      success: true,
      result: req.decoded,
    });
  };
}
