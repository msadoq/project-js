const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  if (!req.body || (typeof req.body.path === 'undefined' && typeof req.body.oId === 'undefined')) {
    return next(new ApiError(400, 'path or oId required', '/body'));
  }
  if (typeof req.body.path !== 'undefined' && typeof req.body.oId !== 'undefined') {
    return next(new ApiError(400, 'path OR oId is required (not both)', '/body'));
  }
  // TODO : impement additional test for path and id validity

  if (typeof req.body.path !== 'undefined') {
    // eslint-disable-next-line no-param-reassign
    req.validated = Object.assign({}, req.validated, { path: req.body.path });
  } else {
    // eslint-disable-next-line no-param-reassign
    req.validated = Object.assign({}, req.validated, { oId: req.body.oId });
  }

  return next();
};







































// const fs = require('fs');
// // Asynchronous Read
// console.log("File Asynchronous Read Start");
// let fileData = fs.readFile('file.txt', function(error, data) {
//   if (error) {
//     return console.error(error);
//   }
//   console.log(data.toString());
// });
// console.log("!! Finish");
//
// console.log("file opened successfully!!");
// fs.open('file.txt', 'r', function(error, data) {
//   if (error) {
//       console.log("Error occur");
//   }
//     console.log(data);
// });
// console.log("finish!!");
//
// console.log("File Asynchronous Read Start");
//  fileData = fs.readFile('file.txt', "utf-8", function(error, data) {
//     if (error) {
//         return console.error(error);
//     }
//     console.log(data);
// });
// console.log("!! Finish");
//
//
//
//
//
//
//
//
//
// const fs = require('fs');
// const Buffr = new Buffer(2048);
// fs.open("file.txt", "r", function(error, data) {
//     if (error) {
//         console.log(error);
//     }
//     console.log("File opened in raed mode");
//     fs.read(data, Buffr, 0, Buffr.length, 0, function(eror, data_) {
//         if (eror) {
//             console.log(eror);
//         }
//         console.log(Buffr.slice(0, data_).toString());
//         console.log("File Read Successfully");
//     })
//     fs.close(data, function(error_) {
//         if (error_) {
//             console.log(error_);
//         }
//         console.log("File Closed");
//     })
// })
