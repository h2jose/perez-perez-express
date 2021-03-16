import routerx from "express-promise-router";
import userController from "../controllers/UserController";
import auth from "../middlewares/auth";
const router = routerx();

router.post('/add', auth.verifyAdministrator, userController.add);
//router.post('/add', userController.add);
router.post('/register', userController.register);
router.get('/query', auth.verifyAdministrator, userController.query);

router.post("/login", userController.login);

export default router;
