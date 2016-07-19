const { Router } = require('express');
const router = new Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/chart', (req, res) => {
  // res.render('plotIndex', { title: 'React Stockcharts - AreaChart Example' });
  res.sendfile('./views/plotIndex.html');
});

router.get('/chart2', (req, res) => {
  // res.render('plotIndex', { title: 'React Stockcharts - AreaChart Example' });
  res.sendfile('./views/plotIndex2.html');
});

module.exports = router;
