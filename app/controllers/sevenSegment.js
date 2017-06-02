'use strict';

var _                 = require('lodash');
var async             = require('async');
var fs                = require('fs');    
var assign            = Object.assign;

// Helper
var baseHelper         = require('../utils/base.js'); // returning object prototype
var segmentParseHelper = require('../utils/segment.js'); // returning object prototype


exports.parse = function(req,res){
  try{
    
      var files = req.file; /*Assuming only one file is comming*/
      
      fs.readFile(files.path ,'utf8' , function(err,data){ 
          if(err){
            return baseHelper.response(res, baseHelper.error('File not parsed'), 422);
          }
          
          segmentParseHelper.setInvoiceData(data)
          var responseData = segmentParseHelper.parseInvoices();

          baseHelper.response(res, baseHelper.success(responseData));
      });
  }catch(err){
    return baseHelper.response(res, baseHelper.error(err.message), 422);
  }
};

exports.secret = function(req,res){
  try{

  }catch(err){
    return baseHelper.response(res, baseHelper.error(err.message), 422);
  }
};




