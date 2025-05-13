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
const PeriodController = () => import('#controllers/period_controller');

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

    router.get('/check/admin', () => 'OK').use(middleware.gate({ role: 'admin' }));
    router.get('/check/student', () => 'OK').use(middleware.gate({ role: 'student' }));
    router.get('/check/teacher', () => 'OK').use(middleware.gate({ role: 'teacher' }));

    router.resource('/periods', PeriodController).apiOnly();
  })
  .use([middleware.auth({ guards: ['api'] })]);
