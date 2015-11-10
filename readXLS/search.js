var excelParser = require('excel-parser');
var path = require('path');
var fs = require('fs');
var fileName = '/home/routes/pages.js';
var getXlsData = function (xls,callback) {
    excelParser.parse({
        inFile: xls,
        worksheet: 1,
        skipEmpty: true,
        searchFor: {
            type:'loose'
        }
    },function(err, records){
        if(err){
            return callback(err,null);
        }
        //delete records[0];
        return callback(null, records);
    });
}
// 单独调用getXlsData函数，结果正常，获得一个二位数组值。
getXlsData('xls/ynFY.xls', function(err, ret){
	if(err){
		console.log(err);
	}
    console.log(ret.length);
	var len = ret.length;
	var lenData = [];
	for(var i = 0;i< len;i++){
		if(ret[i].length > 1){
			lenData.push({'ch': ret[i][1],'val': ret[i][0]})
		}
	}
	//console.log(lenData);
	var lenDataLenght = lenData.length;
	console.log("开始读取文件");    
	fs.readFile(fileName,'utf-8',function(err,data){  
		if(err){  
			console.log(data);  
		}else{  
			//console.log(data);    
		}  
	
      var reg =new RegExp( lenData[10].ch ,"g"); 
      var res = data.match(reg); //使用g选项，全局匹配   
      //console.log(res)
	for(var j=0;j<lenDataLenght;j++){
			var ch = lenData[j].ch;
			var val = lenData[j].val;
		   var reg =new RegExp( ch ,"g"); 
	       data = data.replace(reg,val)
			
			
		}
		console.log(data);
		 fs.writeFile(fileName,data, function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		}) ;
	})
})
  

