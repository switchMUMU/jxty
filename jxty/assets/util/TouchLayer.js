cc.Class({
    extends: cc.Component,

    properties: {
        _isSwallow: true,
    },

    onLoad: function () {
        this.addTouchEvent();
    },

    addTouchEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log('node TOUCH_START');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // console.log('node TOUCH_MOVE');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // console.log('node TOUCH_END');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // console.log('node TOUCH_CANCEL');
        }, this);

        this.node.swallow = this._isSwallow;
    },
    // start() {},

    // update (dt) {},
});