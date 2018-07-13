let PbData = require('pbData')
let ErrorCode = require('errorCode')

const ProtoType = {
    C2s:1,
    S2c:2,
}

cc.Class({
    extends: cc.Component,

    properties: {
    },

    ctor:function() {
        this.queue = {};
        this.protos = {};
        this.listeners = {}; 
        this.requestId = 1;
        this.timeoutDuration = 10;
        this.notification = new cc.EventTarget();
    },

    onDestroy(){
        this.ws.close();
    },

    connect:function(host){
        console.log("socket start connect...")
        this.ws =  new WebSocket('ws://192.168.1.200:5901');
        this.ws.binaryType = "arraybuffer";
        this.ws.onmessage = this.message.bind(this);
        this.ws.onopen = this.onConnected.bind(this);
        this.ws.onerror = this.error.bind(this);
        this.ws.onclose = this.close.bind(this);
    },

    onConnected() {
        console.log('Socket connected');    
        this.notification.emit("0", true); 
    },

    getProtoById( id ){
        if (this.protos[id] != null){
            return this.protos[id]
        }
        let Proto = require('proto')
        for (var key in Proto){
            var module = Proto[key];
            for (var i in module) {
                var proto = module[i];
                if (id == proto.id){
                    this.protos[id] = proto;
                    return proto
                }
            }
        }
    },

    message(event) {
        console.log('Socket message');
        var header = this.decodeHeaderBuffer(event.data);
        if (header == null){
            return;
        }
        console.log(JSON.stringify(header))
        if (header !== null )
        {
            var proto = this.getProtoById(header.pbId);
            if (proto == null){
                console.log("socket error! can not find the proto by id", header.pbId);
                return 
            }
            if (proto.type == ProtoType.C2s){
                var callFunc = this.queue[header.reqId];
                if (callFunc == null){
                    console.log("socket error! can not find the request by id", header.reqId);
                    return 
                }
                delete this.queue[header.reqId];

                if (header.errorCode != ErrorCode.SystemError.success ){
                    callFunc({error:header.errorCode, data:null})
                    return
                }

                const buffer = event.data.slice(header.offset, event.data.byteLength);
                var rs = this.decodePbMessage(proto, buffer);
                callFunc(rs)
            }else{
                const buffer = event.data.slice(header.offset, event.data.byteLength);
                var rs = this.decodePbMessage(proto, buffer);
                if (rs.error == 0 ){
                    console.log('Socket response', JSON.stringify(rs));
                    if ( this.listeners[header.pbId] && this.listeners[header.pbId] > 0 ){
                        this.notification.emit(header.pbId, rs.data); 
                    }
                }
            }
        }
    },

    close(event){
        console.log('Socket close', JSON.stringify(event));
        this.notification.emit("0", false); 
    },

    error(event){
        console.log('Socket error', JSON.stringify(event));
    },

    on(protoid, callFunc, target) {
        const handle = function( event ){
            callFunc.call(target, event)
        };
        if (this.listeners[protoid] == null){
            this.listeners[protoid] = 0;
        }
        this.listeners[protoid]++;
        this.notification.on(protoid.toString(), handle)
        return handle;
    },

    off(protoid, handle) {
        this.listeners[protoid]--;
        if (this.listeners[protoid] < 0){
            this.listeners[protoid] = 0;
        }
        this.notification.off(protoid.toString(), handle)    
    },

    send(proto, params, callback) {
        if (this.ws.readyState !== WebSocket.OPEN){
            return
        }
        var dstBuffer = null;
        if (proto.request == null ){
            var buffer = new ArrayBuffer(1);
            dstBuffer = this.appendHeaderBuffer( proto.id, buffer)
        }else if (proto.request == "int32"){
            let buffer = new ArrayBuffer(8);
            var dv = new DataView(buffer);
            dv.setInt32(0, params, false);
            dstBuffer = this.appendHeaderBuffer( proto.id, buffer)
        }else if (proto.request == "int64"){
            let buffer = new ArrayBuffer(8);
            var dv = new DataView(buffer);
            dv.setFloat64(0, params, false);
            dstBuffer = this.appendHeaderBuffer( proto.id, buffer)
        }else{
            var buffer = this.genPbBuffer(proto, params);
            dstBuffer = this.appendHeaderBuffer( proto.id, buffer)
        }
        if (dstBuffer) {
            this.queue[this.requestId] = callback;
            this.ws.send(dstBuffer);
            var id = this.requestId;
            this.scheduleOnce(function() {
                var callFunc = this.queue[id];
                if (callFunc == null){
                    return 
                }
                // 超时
                delete this.queue[id];
                callFunc(ErrorCode.SystemError.timeout, null)
            }, this.timeoutDuration);
        }
    },

    genPbBuffer(proto, params){
        var info = proto.request.split(".");
        var moduleName = info[0];
        var pbName = info[1];
        let RequestData = require(moduleName)[moduleName][pbName];
        let request = new RequestData();
        for (var i in params) {
            request[i] = params[i];
        }
        return request.toArrayBuffer();
    },

    appendHeaderBuffer(pbId, pbBuffer){
        this.requestId += 1;
        if (this.requestId > 32767)
        {
            this.requestId = 1;
        }
        
        let pbArrayBuffer = new Int8Array(pbBuffer);
        let buffer = new ArrayBuffer(pbBuffer.byteLength + 6);
        var aBuffer =  new Int8Array(buffer);
        aBuffer.set(pbArrayBuffer, 6)

        var dv = new DataView(buffer);

        // 拼装消息包头
        console.log("byteLen",pbBuffer.byteLength, "pbId", pbId, "reqId", this.requestId)
        dv.setInt16(0, pbBuffer.byteLength + 4, false);
        dv.setInt16(2, pbId, false);
        dv.setInt16(4, this.requestId, false);
        return buffer;
    },

    decodeHeaderBuffer( pbBuffer ){
        if (pbBuffer.byteLength < 4){
            console.log("数据包异常！")
            return
        }
        var rs = {};
        var dv = new DataView(pbBuffer);
        rs.byteLen = dv.getUint16(0, false) + 2;
        rs.pbId = dv.getUint16(2, false);

        var proto = this.getProtoById(rs.pbId);
        if (proto == null){
            console.log("can not find this proto by id", rs.pbId)
            return
        }

        if (proto.type == ProtoType.C2s){
            var exlen = dv.getUint16(4 , false);
            rs.reqId = dv.getUint16(6 , false);
            rs.errorCode = dv.getUint16(8, false);
            rs.offset = 10 + exlen;
        }else{
            var exlen = dv.getUint16(4 , false);
            rs.offset = 6 + exlen;
        }
        return rs;
    },

    decodePbMessage( proto, buffer ){
        var response = undefined;
        var errorCode = ErrorCode.SystemError.success;
        if (proto.response == null || buffer.byteLength == 0 ){
            response = null;
        }else if (proto.response == "int32"){
            var dv = new DataView(buffer);
            response = dv.getInt32(0, false);
        }else if (proto.response == "int64"){
            var dv = new DataView(buffer);
            response = dv.getFloat64(0, false);
        }else{
            var info = proto.response.split(".");
            var moduleName = info[0];
            var pbName = info[1];
            console.log(moduleName, pbName)
            let PbData = require(moduleName)[moduleName][pbName];
            response = PbData.decode(buffer)
        }
        if (response === undefined){
            errorCode = ErrorCode.SystemError.serialize;
        }
        return { error:errorCode, data:response };
    }
});
