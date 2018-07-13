// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    _brushs: null,
    _target: null,
    _lastLocation: null,
    _counter: 0,
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // 初始化参数
        this.lineWidth = 5;
        this.strokeColor = cc.color(0, 0, 0);
        this.isClearMode = false;
        this.group = this.addComponent('R.group');

        // 绑定触摸通知事件通知
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this.node);
    },
    onTouchBegan: function (touch, event) {

        // 初始一条线的数据
        this.dataDict = {};
        this.dataDict.dataEvent = 'draw';

        // 获取开始时间点
        this.dataDict.startTime = new Date().getTime();

        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        // 从group获取一条Path实例
        var path = this.group.addPath();
        path.fillColor = 'none';

        // 判断是否是橡皮擦状态
        if (this.isClearMode) {

            path.lineWidth = 15;
            path.strokeColor = cc.color(255, 255, 255);
        } else {

            path.lineWidth = this.lineWidth;
            path.strokeColor = this.strokeColor;
        }

        this.dataDict.strokeColor = path.strokeColor.toHEX("#rrggbb");
        this.dataDict.lineWidth = path.lineWidth;

        // 初始化点数组，并赋值开始位置的点
        this.points = [touchLoc];

        return true;
    },
    onTouchMoved: function (touch, event) {

        // 获取触摸点数据
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        // 添加到点数组内
        this.points.push(touchLoc);

        // 获取当前画的path实例，并更新内部展现点数据
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);
    },
    onTouchEnded: function(touch, event) {

        // 获取触摸点数据
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);

        // 获取结束时间点
        this.dataDict.endTime = new Date().getTime();

        // 将点数组转化为相对于node宽高的映射位置
        this.pointDicts = [];
        for (var i = 0; i < this.points.length; i++) {

            let point = this.points[i];
            var pointDict = {};
            pointDict.x = point.x / this.node.width;
            pointDict.y = point.y / this.node.height;
            this.pointDicts.push(pointDict);
        }
        this.dataDict.points = this.pointDicts;

        let sendData = this.dataDict;

        // 本地测试同步数据
        // this.lookDraw.startDraw(sendData);

        // 网络同步数据
        if (window.room_user) {

            var drawAction = gameAction.getDrawDataAction(window.room_user, sendData)
            happySocket.sendData(drawAction)

        }

    },
    start() {

    },

    // update (dt) {},

    drawInLocation(location) {
        var distance = cc.pDistance(location, this._lastLocation);

        if (distance > 1) {
            var locLastLocation = this._lastLocation;
            this._target.begin();
            this._brushs = [];
            for (var i = 0; i < distance; ++i) {
                var diffX = locLastLocation.x - location.x;
                var diffY = locLastLocation.y - location.y;
                var delta = i / distance;
                var sprite = new cc.Sprite("point.png");
                sprite.attr({
                    x: location.x + diffX * delta,
                    y: location.y + diffY * delta,
                    rotation: Math.random() * 360,
                    color: cc.color(Math.random() * 255, 255, 255),
                    scale: Math.random() + 0.25,
                    opacity: 20
                });
                sprite.retain();
                this._brushs.push(sprite);
            }
            for (var i = 0; i < distance; i++) {
                this._brushs[i].visit();
            }
            this._target.end();
        }
        this._lastLocation = location;
    },

});