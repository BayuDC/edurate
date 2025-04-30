import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class AuthController {
  async login({ request, auth, response }: HttpContext) {
    if (auth.user) {
      return response.noContent();
    }

    const { username, password } = request.only(['username', 'password']);

    const user = await User.verifyCredentials(username, password);
    const token = await auth.use('api').createToken(user);

    return token;
  }
  async logout({ auth, response }: HttpContext) {
    const user = auth.user;
    if (!user) {
      return;
    }

    await auth.use('api').invalidateToken();

    response.noContent();
  }
  async me({ auth }: HttpContext) {
    const user = auth.user!;

    return user.serialize();
  }
}
