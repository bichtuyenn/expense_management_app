const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, default: "name" },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'expensesModel' }], 
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'incomeModel' }],
  },
  {
    timestamps: true,
  }
);

const FinanceUserModel = mongoose.model("financeuser", financeSchema);

module.exports = FinanceUserModel;
