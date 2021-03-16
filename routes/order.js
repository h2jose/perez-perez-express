import routerx from 'express-promise-router';
import orderController from '../controllers/OrderController';
import auth from "../middlewares/auth";

const router = routerx();

router.post('/add',    auth.verifyAdministrator, orderController.add);
router.get('/query',   auth.verifyAdministrator, orderController.query);
router.get('/list',    auth.verifyAdministrator, orderController.list);
router.put('/update',  auth.verifyAdministrator, orderController.update);
router.post('/remove', auth.verifyAdministrator, orderController.remove);


export default router;