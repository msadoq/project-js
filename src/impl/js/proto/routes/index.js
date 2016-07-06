const express = require('express');
const router = express.Router();

router.get('/historyView', function(req, res, next) {
  res.render('historyView', { title: 'electron-with-express test' });
  //res.sendfile('./views/pagesIndex.html');
});

router.get('/parameters', function(req, res, next) {
  res.render('parametersView', { title: 'electron-with-express test' });
  //res.sendfile('./views/pagesIndex.html');
});

router.get('/timeLines', function(req, res, next) {
  res.sendfile('./views/timeLines.html');
});

router.get('/chart', function(req, res, next) {
  //res.render('plotIndex', { title: 'React Stockcharts - AreaChart Example' });
  res.sendfile('./views/plotIndex.html');
});

router.get('/chart2', function(req, res, next) {
  //res.render('plotIndex', { title: 'React Stockcharts - AreaChart Example' });
  res.sendfile('./views/plotIndex2.html');
});


module.exports = router;
