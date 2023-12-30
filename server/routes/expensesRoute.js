const router = require("express").Router();

const expensesController = require("../controllers/expensesControllers");

router.post("/addExpenses", expensesController.addExpenses);
router.delete("/deleteExpenses", expensesController.deleteExpenses);
router.get("/getExpense", expensesController.getExpense)
router.get("/getExpenses", expensesController.getExpenses)
router.get("/getExpensesByMonthAndYear", expensesController.getExpensesByMonthAndYear)
router.put("/updateExpenses", expensesController.updateExpenses);
router.delete("/deleteAllExpenses", expensesController.deleteAllExpenses);
module.exports = router;


