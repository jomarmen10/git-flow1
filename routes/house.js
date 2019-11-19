const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houses")

router.get('/', houseController.index)
router.get('/new', houseController.newHouse)
router.post('/', houseController.create)
router.get('/:id', houseController.show)
router.get('/:id/edit', houseController.edit)
router.put('/:id', houseController.update)
router.delete('/:id', houseController.deleteOne)



module.exports = router;
