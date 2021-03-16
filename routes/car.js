import routerx from 'express-promise-router';
import carController from '../controllers/CarController';
import auth from "../middlewares/auth";
const router = routerx();

router.post('/add', auth.verifyAdministrator, carController.add);
router.get('/query', auth.verifyAdministrator, carController.query);
router.get('/list', auth.verifyAdministrator, carController.list);
router.put('/update', auth.verifyAdministrator, carController.update);
router.post('/remove', auth.verifyAdministrator, carController.remove);

export default router;