'use strict';

var segmentParseHelper = function () {
  this.invoiceData = "";
};


segmentParseHelper.prototype.setInvoiceData = function(data) {
  this.invoiceData = data;
}

segmentParseHelper.prototype.parseInvoices = function() {
  var responseData = "";

  var invoices = this.invoiceData.split("\n");

  // console.log(invoices);

  for(var i=0; i<invoices.length; i++ ) {
    var sevenSegment = [
      [],
      [], 
      [], 
      [], 
      [], 
      [], 
      [], 
      [], 
      []
     ];

    if (invoices[i] == null || invoices[i] == undefined) {
      continue;
    }
    
    var p = 0;
    var line = invoices[i].split('');
    
    for(var j=0 ; j<line.length ; j++) {  /*Loop for reading the line 1 of the invoice no*/

      j++;
      
      if(line[j] == '_') {
        sevenSegment[p][0] = 1;
      }

      j++;
      p++;
    }

    if(i < invoices.length) {
      i++ /*Moving to the line 2 of the invocie no */ 
        
      if (invoices[i] == null || invoices[i] == undefined) {
        continue;  
      }

      var p = 0;
      var line = invoices[i].split('');
      // console.log("line 2:",line);
      for(var j=0 ; j<line.length ; j++) {  /*Loop for reading the line 2 of the invoice no*/

        if(line[j] == '|') {
          sevenSegment[p][5] = 1
        }

        j++;                
        
        if (line[j] == '_') {
          sevenSegment[p][6] = 1;
        }
          
        j++;

        if (line[j] == '|') {
          sevenSegment[p][1] = 1;
        }

        p++;
      }
    }


    if(i < invoices.length) {
      i++ /*Moving to the line 3 of the invocie no */ 
        
      if (invoices[i] == null || invoices[i] == undefined) {
        continue;  
      }

      var p = 0;
      var line = invoices[i].split('');
      // console.log("line 3:",line);
      for(var j=0 ; j<line.length ; j++) {  /*Loop for reading the line 3 of the invoice no*/

        if(line[j] == '|') {
          sevenSegment[p][4] = 1
        }
        
        j++;

        if (line[j] == '_') {
          sevenSegment[p][3] = 1;
        }
        
        j++;

        if (line[j] == '|') {
          sevenSegment[p][2] = 1;
        }

        p++;
      }
    }

    var illegalInvoice = false;

    /*Parsing of the ascii string to digits */
    for(var k=0; k<sevenSegment.length; k++) {
      var weight = 0; 
      for(var u = 0; u<sevenSegment[k].length; u++) {
        if (sevenSegment[k][u] == 1) {
         weight += Math.pow(2,u);
        }
      }
      var number = weightMap(weight);
      responseData += "" + number;
      if(number == '?') {
        illegalInvoice = true;
      }

    }
    if(illegalInvoice) {
      responseData += " ILLEGAL\n"  
    } else {
      responseData += "\n";
    }
    i++;
  }

  return responseData;	
}


var weightMap = function(weight) {

  switch (weight) {
    case 63:
      return 0;
    case 6:
      return 1;
    case 91:
      return 2;
    case 79:
      return 3;
    case 102:
      return 4;
    case 109:
      return 5;
    case 125:
      return 6;
    case 7:
      return 7;
    case 127:
      return 8;
    case 111:
      return 9;
    default:
      return '?';
  }
}

module.exports = new segmentParseHelper();
