
cc.Class({
    extends: cc.Component,
    ctor:function(){
        
    },

    properties: {
       
    },

    convertParams:function( data ){
        let rs = "";
        let list = Object.keys(data)

        list.forEach(function(element, index, array) {
               rs = rs + element + "=" + data[element] + "&";
            });
        rs = rs.substr(0, rs.length-1);
        return rs
    },

    post:function(url, params, callBack ) {
        console.log("Http post")
        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                let msg = JSON.parse(response);
                if (typeof(callBack) == "function"){
                    callBack(msg);
                }
            }
         };
         xhr.open("POST", url, true);
         let content = this.convertParams(params);
         xhr.send(content);
    },

    get:function(url, params, callBack) {
        console.log("Http get")
        var xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response)
                let msg = JSON.parse(response);
                if (typeof(callBack) == "function"){
                    callBack(msg);
                }
            }
         };
         let content = this.convertParams(params);
         url = url + "?" + content;
         xhr.open("GET", url, true);
         xhr.send();
    },


});
