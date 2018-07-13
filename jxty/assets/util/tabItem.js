cc.Class({
    extends: cc.Component,
    properties: {
        Text: {
            default: null,
            type: cc.Label
        },
        curStatus: 0,
        sprArray: {
            default: [],
            type: [cc.SpriteFrame],
        },
    },

    setItemText: function (text) {
        this.Text.string = text;
    },

    setItemStatus: function (curStatus) {
        curStatus = curStatus || this.curStatus;
        var spr = this.getComponent(cc.Sprite)
        spr.spriteFrame = this.sprArray[curStatus]
    },

    onLoad() {
        this.setItemStatus(this.curStatus);
    },
});
