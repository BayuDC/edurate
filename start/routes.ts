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
const ClassController = () => import('#controllers/class_controller');
const CourseController = () => import('#controllers/course_controller');
const StudentController = () => import('#controllers/student_controller');

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

    router
      .group(() => {
        router.resource('/periods', PeriodController).apiOnly();
        router.get('/periods/active', () => {});

        router.resource('/courses', CourseController).apiOnly();

        router.resource('/classes', ClassController).apiOnly();
        router.get('/classes/:id/students', [ClassController, 'listStudents']);
        router.post('/classes/:id/students', [ClassController, 'storeStudent']);
        router.delete('/classes/:id/students', [ClassController, 'removeStudent']);

        router.get('/students/available', [StudentController, 'available']);
        router.resource('/students', StudentController).apiOnly();
      })
      .use(middleware.gate({ role: 'admin' }));
  })
  .use([middleware.auth({ guards: ['api'] })]);
