const express = require('express');
const timeLineManager = require('../vima_mwr/timeLineManager');
const router = express.Router();
const fs = require('fs');


// on routes that end in /timeLines
// ----------------------------------------------------
router.route('/timeLines')

    // Add timeLine (accessed at POST http://localhost:1337/api/timeLines)
    .post(function(req, res, next) {
        console.log(req.body.jsonElem);
        var timeLineId  = timeLineManager.addTimeLine(req.body.jsonElem);
        res.json({ message: 'timeLine added with id : ' + JSON.stringify(timeLineId)});
    })
    // get all timeLines (accessed at GET http://localhost:1337/api/timeLines)
    .get(function(req, res, next) {
        var timeLines = timeLineManager.getAllTimeLines();
        res.json(timeLines);
    })
    // update timeLine (accessed at PUT http://localhost:1337/api/timeLines)
    .put(function(req, res, next) {
        var timeLineId  = timeLineManager.updateTimeLine(req.body.jsonElem);
        res.json({ message: 'timeLine added with id : ' + JSON.stringify(timeLineId)});
    });

router.route('/timeLines/:timeLineId')

    // Add timeLine (accessed at POST http://localhost:1337/api/timeLines)
    .post(function(req, res, next) {
    })
    // get one timeLines (accessed at GET http://localhost:1337/api/timeLines)
    .get(function(req, res, next) {
        var timeLine = timeLineManager.findTimeLineById(req.params.timeLineId);
        res.json(timeLine);
    })
    // delete one timeLines (accessed at GET http://localhost:1337/api/timeLines)
    .delete(function(req, res, next) {
        var timeLine = timeLineManager.deleteTimeLineByFindId(req.params.timeLineId);
        res.json(timeLine);
    })
    // update timeLine (accessed at PUT http://localhost:1337/api/timeLines)
    .put(function(req, res, next) {
        var timeLineId  = timeLineManager.updateTimeLine(req.params.timeLineId, req.body.updateJson);
        res.json({ message: 'timeLine added with id : ' + JSON.stringify(timeLineId)});
    });

module.exports = router;