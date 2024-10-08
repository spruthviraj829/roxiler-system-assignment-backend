const express = require('express');
const router = express.Router();

const getDataByMonth = require("../controller/getDataByMonth")
const {statisticsController , barChartDataController ,pieChartController} =require("../controller/dataController");

router.get("/statictics/:month", statisticsController);
router.get("/get-month-data/:month",getDataByMonth );
router.get("/bar-chart/:month", barChartDataController);
router.get("/pie-chart/:month", pieChartController);

module.exports=router;  