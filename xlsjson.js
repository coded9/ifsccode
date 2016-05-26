xlsxj = require("xlsx-to-json");
  xlsxj({
    input: "bank.xlsx", 
    output: "sbi.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
    }
  });