/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const AuthController = () => import('#controllers/auth_controller');

router.get('/', async () => {
  return {
    message: 'Hello world!',
  };
});

router.post('/auth/login', [AuthController, 'login']);

router
  .group(() => {
    router.post('/auth/logout', [AuthController, 'logout']);
    router.get('/auth/me', [AuthController, 'me']);
  })
  .use([middleware.auth({ guards: ['api'] })]);
