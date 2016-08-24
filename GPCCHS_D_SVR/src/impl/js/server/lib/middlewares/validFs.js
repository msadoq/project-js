const debug = require('../io/debug')('documents:workspaces', 'documents:pages', 'documents:views')
const ApiError = require('../utils/apiError');
const fs = require ('fs');
 
module.exports = (req, res, next) => {
  
  /* FILE FOR A WORKSPACE */
       
    if (typeof req.body.path === 'undefined' || typeof req.body.oId === 'undefined') {
      return next(new ApiError(400,'path or oId required', '/body'));
    }     
    if (typeof req.body !== fs.stat('../documentManager/schema/WS.schema.json')){
      return next(new ApiError(400,'no existing file', '/body'));
    }
    if (typeof req.body !== fs.access('../documentManager/schema/WS.schema.json')){
       return next(new ApiError(400,'no access to this file', '/body'));
    }
    if (typeof req.body !== fs.readFile('../documentManager/schema/WS.schema.json')){
      return next(new ApiError(400,'can/t read this file', '/body'));
    }
        
    const  fileExist = fs.stat(stats);
    if (fileExist){
      fs.access('../documentManager/schema/WS.schema.json', fs.constants.R_OK);  
    }
    
     const accessFile = fs.access(constants.R_OK);
    if (accessFile){
      fs.readFile('../documentManager/schema/WS.schema.json', data);
      
      req.validated = Object.assign({}, req.validated, { data });
      return next();
    }
  }
 
 
 /* TODO => FILE FOR A PAGE ? (with params path or oId)*/
 

 
 /* TODO => FILE FOR A TEXTVIEW ? (warning : no params path or oId for the views)  */
 

 