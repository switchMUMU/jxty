// EventEnum
// 
var key = 0xA001
function genEventKey(){
	key++;
	return key.toString()
}
module.exports = {
	LoginRsp:genEventKey(),
	
}