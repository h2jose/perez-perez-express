import routerx from "express-promise-router";
import customerController from "../controllers/CustomerController";
import auth from "../middlewares/auth";
const router = routerx();

router.post('/add', auth.verifyAdministrator, customerController.add);
router.get('/query', auth.verifyAdministrator, customerController.query);
router.get('/list', auth.verifyAdministrator, customerController.list);
router.put('/update', auth.verifyAdministrator, customerController.update);
router.post('/remove', auth.verifyAdministrator, customerController.remove);

export default router;
