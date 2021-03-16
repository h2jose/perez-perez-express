import routerx from "express-promise-router";
import userRouter from "./user";
import carRouter from './car';
import orderRouter from './order';
import customerRouter from './customer';

const router = routerx();

router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/order", orderRouter);
router.use("/customer", customerRouter);

export default router;
