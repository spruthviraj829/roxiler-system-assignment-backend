const mongoose = require('mongoose');
const info = require('../model/infoMode'); 

const getDataByMonth = async (req, res) => {
  try {
    const { month } = req.params; 
    const monthNumber = parseInt(month); 

    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ message: 'Invalid month provided' });
    }

    const infos = await info.aggregate([
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" } 
        }
      },
      {
        $match: {
          monthOfSale: monthNumber 
        }
      }
    ]);

    res.status(200).json(infos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = getDataByMonth;
