const express = require("express");
const router = express.Router();
const realtorController = require("../controllers/realtors")


router.get('/:id', realtorController.show)
router.get('/', realtorController.index)
router.delete('/:id', realtorController.delete)
router.get('/:id/edit', realtorController.edit)
router.put('/:id', realtorController.update)




module.exports = router;
