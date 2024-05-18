import express from "express";

import * as errController from "../../controllers/web/error-controller";

const router = express.Router();

router.get("/404", errController.error404);
router.get("/403", errController.error403);

export default router;
