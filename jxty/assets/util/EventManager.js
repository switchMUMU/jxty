
cc.Class({
    extends: cc.Component,

    properties: {

    },
    statics: {
        _listeners:[],
        _eventDispatcher:new cc.EventTarget(),
        on(name, callFunc, target){
            const handle = function( event ){
                callFunc.call(target, event)
            };
            if (this._listeners[name] == null){
                this._listeners[name] = 0;
            }
            this._listeners[name]++;
            this._eventDispatcher.on(name, handle)
            return handle;
        },

        dispatch( name, data ){
            if ( this._listeners[name] && this._listeners[name] > 0 ){
                this._eventDispatcher.dispatchEvent(name, data)
            }
        },

        off(name, handle){
            this._listeners[name]--;
            if (this.listeners[protoid] < 0){
                this.listeners[protoid] = 0;
            }
            this.notification.off(name, handle)  
        },
    },
});
