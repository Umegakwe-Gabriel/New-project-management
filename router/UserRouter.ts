import express, { Router } from "express"
import { deleteUser, registerUser, signInUser, viewOneUser, viewUsers } from "../controller/UserController"
import { upload } from "../utils/multer"

const router: Router = express()

router.route("/register").post(upload, registerUser)
router.route("/sign-in").post(signInUser)
router.route("/:userID/view-one-user").get(viewOneUser)
router.route("/view").get(viewUsers)
router.route("/:userID/delete-user").delete(deleteUser)

export default router