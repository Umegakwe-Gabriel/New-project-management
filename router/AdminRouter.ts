import express, { Router } from "express"
import { deleteAdmin, registerAdmin, signInAdmin, viewAdmin, viewOneAdmin } from "../controller/AdminController"
import { upload } from "../utils/multer"

const router: Router = express()

router.route("/register").post(upload, registerAdmin)
router.route("/sign-in").post(signInAdmin)
router.route("/:adminID/view-one-admin").get(viewOneAdmin)
router.route("/view").get(viewAdmin)
router.route("/:adminID/delete-admin").delete(deleteAdmin);

export default router