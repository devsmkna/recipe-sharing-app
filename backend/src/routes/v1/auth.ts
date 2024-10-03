import { Router } from "express";
import { confirmEmailVC, signupVC } from "../../middlewares/auth";
import { validate } from "../../middlewares/validations";
import signup from "./auth/signup";
import confirmEmail from "./auth/confirmEmail";

const router = Router();

router.get("/confirm", confirmEmailVC, validate, confirmEmail);
router.post("/signup", signupVC, validate, signup);

export default router;
