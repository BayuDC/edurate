import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class GateMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { role: 'admin' | 'student' | 'teacher' }) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (ctx.auth.user!.role == options.role) {
      return await next();
    }
    ctx.response.unauthorized();
  }
}
