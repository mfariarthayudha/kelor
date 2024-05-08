import express from "express"

import * as errController from '../../controllers/web/error-controller'

const router = express.Router()

router.get("/404", errController.error404)
export default router