import { Router } from "express";
import { signup } from "./auth/signup";
import { signupValidationChain } from "../../middlewares/auth";
import { checkValidation } from "../../middlewares/validations";

const router = Router();

router.post("/signup", signupValidationChain, checkValidation, signup);

export default router;
