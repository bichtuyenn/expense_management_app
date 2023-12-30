const ExpensesModel = require("../models/expensesModel");
const financeModel = require("../models/financeModel");
const dotenv = require("dotenv");
const validIdMongo = require("../utils/validMongoDB");
dotenv.config();

module.exports = {
  addExpenses: async (req, res) => {
    try {
      const { userId, categoriesExpenses, date, value, note } = req.body;
      validIdMongo(userId);
      const newExpenses = await ExpensesModel.create({ categoriesExpenses, date, value, note });
      // Tìm người dùng theo userId
      const user = await financeModel.findById(userId);
      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Thêm chi phí vào mảng Expenses của người dùng
      user.expenses.push(newExpenses);
      // Lưu thay đổi vào cơ sở dữ liệu
      await user.save();
      res.status(201).json(newExpenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add Expenses' });
    }
  },
  deleteExpenses: async (req, res) => {
    try {
      const { userId, expensesId } = req.body;
      validIdMongo(userId);
      validIdMongo(expensesId);
      console.log(userId)
      console.log(expensesId)
      const user = await financeModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const expensesIndex = user.expenses.findIndex(expenses => expenses._id.toString() === expensesId);

      if (expensesIndex === -1) {
        return res.status(404).json({ error: 'Expenses not found' });
      }
      const deletedExpenses = user.expenses.splice(expensesIndex, 1)[0];
      await user.save();
      // Xoá chi phí khỏi cơ sở dữ liệu
      await ExpensesModel.findByIdAndDelete(expensesId);
      res.status(200).json(deletedExpenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Expenses' });
    }
  },

  getExpense: async (req, res) => {
    try {
      const { userId, expensesId } = req.body;
      validIdMongo(userId);
      validIdMongo(expensesId);
      const user = await financeModel.findById(userId).populate('expenses');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const expenses = user.expenses.find(expenses => expenses._id.toString() === expensesId);
      if (!expenses) {
        return res.status(404).json({ error: 'expenses not found' });
      }
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get expenses' });
    }
  },

  getExpenses: async (req, res) => {
    try {
      const { userId } = req.body;
      validIdMongo(userId);
  
      const user = await financeModel.findById(userId).populate('expenses');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const expenses = user.expenses.filter((expenses) => expenses !== null);
  
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get expenses' });
    }
  },
  

  getExpensesByMonthAndYear: async (req, res) => {
    try {
      const { userId, month, year } = req.body;
      validIdMongo(userId);
  
      console.log('Selected Month and Year:', month, year);
  
      const formattedMonth = new Date(`${year}-${month}-01`).toISOString().slice(0, 7);
  
      const firstDayOfMonth = new Date(`${formattedMonth}-01`);
      const lastDayOfMonth = new Date(`${formattedMonth}-31`);
  
      const user = await financeModel
        .findById(userId)
        .populate({
          path: 'expenses',
          match: {
            date: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
          }
        });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Lọc ra các chi phí không phải null
      const expenses = user.expenses.filter(expenses => expenses !== null);
  
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get expenses for the month and year' });
    }
  },
  

  updateExpenses: async (req, res) => {
    try {
      const { userId, expensesId, categoriesExpenses, date, value, note } = req.body;
      validIdMongo(userId);
      validIdMongo(expensesId);
      const user = await financeModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const expensesIndex = user.expenses.findIndex(expenses => expenses._id.toString() === expensesId);
      if (expensesIndex === -1) {
        return res.status(404).json({ error: 'expenses not found' });
      }
      console.log(user.expenses[expensesIndex])
      // Cập nhật thông tin chi phí trong mảng expenses của người dùng
      user.expenses[expensesIndex].categoriesExpenses = categoriesExpenses;
      user.expenses[expensesIndex].date = date;
      user.expenses[expensesIndex].value = value;
      user.expenses[expensesIndex].note = note;
      await user.save();
      // Cập nhật thông tin chi phí trong cơ sở dữ liệu
      const updatedExpenses = await ExpensesModel.findByIdAndUpdate(expensesId, { categoriesExpenses, date, value, note }, { new: true });
      res.status(200).json(updatedExpenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update expenses' });
    }
  },

  deleteAllExpenses: async (req, res) => {
    try {
      const { userId } = req.body;
      validIdMongo(userId);
      const user = await financeModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Lấy danh sách các chi phí
      const expensesIds = user.expenses.map(expenses => expenses._id);
      // Xoá tất cả chi phí từ mảng expenses của người dùng
      user.expenses = [];
      await user.save();
      // Xoá tất cả chi phí từ cơ sở dữ liệu
      await ExpensesModel.deleteMany({ _id: { $in: expensesIds } });
      res.status(200).json({ message: 'All expenses deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete all expenses' });
    }
  },
};
