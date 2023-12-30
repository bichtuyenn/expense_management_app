const router = require("express").Router();

const incomeController = require("../controllers/incomeControllers");

router.post("/addIncome", incomeController.addIncome);
router.delete("/deleteIncome", incomeController.deleteIncome);
router.get("/getIncome", incomeController.getIncome)
router.get("/getIncomes", incomeController.getIncomes)
router.get("/getIncomeByMonthAndYear", incomeController.getIncomeByMonthAndYear)
router.put("/updateIncome", incomeController.updateIncome);
router.delete("/deleteAllIncome", incomeController.deleteAllIncome);

module.exports = router;
