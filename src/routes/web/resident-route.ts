import express from "express"

import * as residentController from '../../controllers/web/resident-controller'

const router = express.Router()

router.get("/",residentController.getresidentAll)
router.get("/create",residentController.residentAdd)
router.get("/:nik/edit",residentController.residentUpdate)
export default router