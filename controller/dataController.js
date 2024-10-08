const info = require("../model/infoMode");
// const info = require('../model/infoMode'); 

const dataByMonth=async (monthNumber)=>{
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
  return infos ;
}

const statisticsController = async(req , res)=>{
   try {    
    const { month } = req.params; 
    const monthNumber = parseInt(month); 
    const data =await dataByMonth(monthNumber);

    let cost=0 ;
    let soldItems=0 ;
    let unSoldItems=0 ;
    data.forEach((item)=>{
        if(item.sold){
           soldItems++;
           cost = cost+ item.price ;
        }
        if(!item.sold){
           unSoldItems++ ;
        }
    })

    res.status(200).json({
       cost : cost ,
       soldItems :soldItems ,
       unSoldItems: unSoldItems
    })

   }catch(err){
     res.status(500).json({ message : "server error" , err})
   }
}
exports.statisticsController = statisticsController;

const barChartDataController = async (req, res) => {
  try {
    const { month } = req.params; 
    const monthNumber = parseInt(month); 
    const data =await dataByMonth(monthNumber);
    
    const priceRanges = [
      { range: "0 - 100", min: 0, max: 100 },
      { range: "101 - 200", min: 101, max: 200 },
      { range: "201 - 300", min: 201, max: 300 },
      { range: "301 - 400", min: 301, max: 400 },
      { range: "401 - 500", min: 401, max: 500 },
      { range: "501 - 600", min: 501, max: 600 },
      { range: "601 - 700", min: 601, max: 700 },
      { range: "701 - 800", min: 701, max: 800 },
      { range: "801 - 900", min: 801, max: 900 },
      { range: "901 - above", min: 901, max: Infinity }
    ];

    // Initialize result object
    let result = priceRanges.map(range => ({ _id: range.range, count: 0 }));

    // Loop through the data and classify each item into the appropriate price range
    data.forEach((item) => {
      const price = item.price;
      for (let i = 0; i < priceRanges.length; i++) {
        if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
          result[i].count += 1;
          break; // Exit loop after finding the correct range
        }
      }
    });

    // Send the calculated statistics as a response
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
exports.barChartDataController = barChartDataController;


const pieChartController = async (req, res) => {
  try {
    const { month } = req.params;
    const monthNumber = parseInt(month); 

    
    const data = await dataByMonth(monthNumber);

    const categoryCounts = {};

    data.forEach(item => {
      const category = item.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1; 
      }
    });

    const categorizedData = Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));
    
    res.status(200).json(categorizedData);

  } catch (err) {

    res.status(500).json({ message: "Server error", error: err });
  }
};
exports.pieChartController =pieChartController;

