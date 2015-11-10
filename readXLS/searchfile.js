var fs = require('fs');
var path = require('path');
var excelParser = require('excel-parser');
var dir = "/home/dishy/node/web/views/";
var fs = require('fs');
var results = [];
 
fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
	//console.log(list);
	list.forEach(function(e){
		var dirFile = dir + e;
		
		fs.stat(dirFile, function(err, stat) {
			if (err) return done(err);
			if (stat && stat.isDirectory()) {
				fs.readdir(dirFile, function(err, listfile) {
					if (err) return done(err);
					for(var j = 0;j< listfile.length;j++){
					
						results.push(dirFile + "/" +listfile[j])
					}
					
				})
			}
		})
	})
	setTimeout(function () {
		console.log(results);
		var len1 = results.length;
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
		
			for(var k = 0;k < len1;k++){
				wriefile(results[k],lenData,lenDataLenght);
			}
		})
	}, 2000);
	
  });
  
  function wriefile(fileName,lenData,lenDataLenght){
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
		   var reg =new RegExp( ch ,"g"); // re为/^\d+bl$/gim
	       data = data.replace(reg,val)
			
			
		}
		console.log(data);
		 fs.writeFile(fileName,data, function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		}) ;
	})
	  
  }

