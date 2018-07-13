require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  AudioScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0847x3o8lL06kmKU3NC8x1", "AudioScript");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        isOpen: true,
        gameAudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.isOpen = true;
        cc.audioEngine.playMusic(this.gameAudio, true);
      },
      checkMusic: function checkMusic() {
        return isOpen;
      },
      setCp: function setCp(pos) {
        var rec = cc.rectContainsPoint(this.node.getBoundingBoxToWorld(), pos);
        if (rec) if (this.isOpen) {
          cc.audioEngine.pauseMusic();
          cc.log("暂停正在播放音乐");
          this.isOpen = false;
        } else {
          cc.audioEngine.resumeMusic();
          cc.log("恢复背景音乐");
          this.isOpen = true;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  BgMove: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8885zlcytIVLWHlqEri++j", "BgMove");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      setMoveAction: function setMoveAction(height) {
        var moveHeight = height;
        var moveAction = cc.moveBy(this.jumpTimes, cc.p(0, -moveHeight));
        return moveAction;
      },
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  ExitScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60eb0SIXGFKVp1lYyEb5Oan", "ExitScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      ExitScene: function ExitScene() {
        cc.director.end();
      }
    });
    cc._RF.pop();
  }, {} ],
  GAME: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dda94/+bIJDr5DHy7oO/rJK", "GAME");
    "use strict";
    var HeroPlayer = require("HeroPlayer");
    var MoveBg = require("BgMove");
    var bgmu = require("AudioScript");
    cc.Class({
      extends: cc.Component,
      properties: {
        bgmusic: {
          default: null,
          type: cc.Node
        },
        gameAudio: {
          default: null,
          url: cc.AudioClip
        },
        gameOverAudio: {
          default: null,
          url: cc.AudioClip
        },
        player: {
          default: null,
          type: cc.Node
        },
        bgsprite1: {
          default: null,
          type: cc.Node
        },
        bgsprite2: {
          default: null,
          type: cc.Node
        },
        scoreDisplay: {
          default: null,
          type: cc.Label
        }
      },
      setEventControl: function setEventControl() {
        var self = this;
        var hero = self.player.getComponent(HeroPlayer);
        var bg1 = self.bgsprite1.getComponent(MoveBg);
        var bg2 = self.bgsprite2.getComponent(MoveBg);
        var mus = self.bgmusic.getComponent(bgmu);
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            cc.log("当前点击坐标" + locationInNode);
            mus.setCp(touch.getLocation());
            hero.node.runAction(hero.setJumpUpAction());
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            if (self.player.getPositionY() > 0) {
              var height = self.player.getPositionY();
              self.player.setPositionY(height / 2);
              self.gainScore();
              bg1.node.runAction(bg1.setMoveAction(height));
              bg2.node.runAction(bg2.setMoveAction(height));
            }
          }
        }, self.node);
      },
      onLoad: function onLoad() {
        this.setEventControl();
        this.score = 0;
        this.isMoving = true;
      },
      update: function update(dt) {
        this.setBgMoveCreate();
        if (this.player.getPositionY() <= -cc.view.getVisibleSize().height / 2) {
          this.unscheduleAllCallbacks();
          cc.audioEngine.playEffect(this.gameOverAudio, false);
          if (this.isMoving) {
            this.gameOver();
            this.isMoving = false;
          }
        }
        if (this.bgmusic.getComponent(bgmu).isOpen) {
          cc.log("恢复现在正在播放的所有音效");
          cc.audioEngine.resumeAllEffects();
        } else {
          cc.log("暂停现在正在播放的所有音效");
          cc.audioEngine.pauseAllEffects();
        }
      },
      gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = this.score.toString();
        cc.sys.localStorage.setItem("ScoreDis", this.scoreDisplay.string);
      },
      gameOver: function gameOver() {
        cc.eventManager.removeAllListeners();
        this.player.stopAllActions();
        cc.director.loadScene("GameOver");
      },
      setBgMoveCreate: function setBgMoveCreate() {
        this.bgsprite1.getPositionY() < -500 && this.bgsprite2.setPositionY(this.bgsprite1.getPositionY() + this.bgsprite1.getContentSize().height);
        this.bgsprite2.getPositionY() < -500 && this.bgsprite1.setPositionY(this.bgsprite2.getPositionY() + this.bgsprite2.getContentSize().height);
      }
    });
    cc._RF.pop();
  }, {
    AudioScript: "AudioScript",
    BgMove: "BgMove",
    HeroPlayer: "HeroPlayer"
  } ],
  GameOverScore: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41777b1hs5BbIHBcDLfMUsQ", "GameOverScore");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Scores: {
          default: null,
          type: cc.Label
        }
      },
      disScore: function disScore() {
        this.score = cc.sys.localStorage.getItem("ScoreDis");
        this.Scores.string = "Score: " + this.score.toString();
      },
      onLoad: function onLoad() {
        this.disScore();
      }
    });
    cc._RF.pop();
  }, {} ],
  HeroPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3f36kzYf5NPq4DfTxYWMLy", "HeroPlayer");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        jumpHeight: 0,
        jumpTimes: 0,
        maxMoveSpeed: 0,
        accel: 0
      },
      setJumpUpAction: function setJumpUpAction() {
        var jumpUp = cc.moveBy(this.jumpTimes, cc.p(0, this.jumpHeight));
        return jumpUp;
      },
      setJumpDownAction: function setJumpDownAction() {
        var jumpDown = cc.moveBy(this.jumpTimes, cc.p(0, -this.maxMoveSpeed));
        return jumpDown;
      },
      setJumpRunAction: function setJumpRunAction() {
        this.jumpAction = this.setJumpUpAction();
        this.maxMoveSpeed = this.setJumpDownAction();
        var seq = cc.sequence(this.jumpAction, this.maxMoveSpeed);
        this.node.runAction(seq);
      },
      heroDownMove: function heroDownMove() {
        var heroDown = cc.moveBy(.8, cc.p(0, -5));
        return heroDown;
      },
      onLoad: function onLoad() {
        this.setJumpRunAction();
      },
      noteBox: function noteBox() {
        return this.node.getBoundingBox();
      },
      update: function update(dt) {
        this.node.runAction(this.heroDownMove());
      }
    });
    cc._RF.pop();
  }, {} ],
  MainGamebg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7be27300VOkIUd76uJRLHb", "MainGamebg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  guaiwuleft: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7045fCuwGxELrvPEGWJGcGG", "guaiwuleft");
    "use strict";
    var hero2 = require("HeroPlayer");
    cc.Class({
      extends: cc.Component,
      properties: {
        times: 0,
        pengAudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.moveRight();
        cc.audioEngine.setEffectsVolume(.2);
      },
      moveRight: function moveRight() {
        var seq = cc.repeatForever(cc.sequence(cc.moveBy(this.times, cc.p(240, 0)), cc.moveBy(this.times, cc.p(-240, 0))));
        this.node.runAction(seq);
      },
      noteBox: function noteBox() {
        return this.node.getBoundingBoxToWorld();
      },
      update: function update(dt) {
        var _label = cc.find("Canvas/hero").getComponent(hero2);
        if (cc.rectIntersectsRect(_label.node.getBoundingBoxToWorld(), this.noteBox())) {
          cc.audioEngine.playEffect(this.pengAudio, false);
          cc.eventManager.removeAllListeners();
        }
      }
    });
    cc._RF.pop();
  }, {
    HeroPlayer: "HeroPlayer"
  } ],
  guaiwuright: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8fea1qH7nhLBbJbHQVueXHU", "guaiwuright");
    "use strict";
    var hero2 = require("HeroPlayer");
    cc.Class({
      extends: cc.Component,
      properties: {
        times: 0,
        pengAudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.moveRight();
        cc.audioEngine.setEffectsVolume(.2);
      },
      moveRight: function moveRight() {
        var seq = cc.repeatForever(cc.sequence(cc.moveBy(this.times, cc.p(-240, 0)), cc.moveBy(this.times, cc.p(240, 0))));
        this.node.runAction(seq);
      },
      noteBox: function noteBox() {
        return this.node.getBoundingBoxToWorld();
      },
      update: function update(dt) {
        var _label = cc.find("Canvas/hero").getComponent(hero2);
        if (cc.rectIntersectsRect(_label.node.getBoundingBoxToWorld(), this.noteBox())) {
          cc.audioEngine.playEffect(this.pengAudio, false);
          cc.eventManager.removeAllListeners();
        }
      }
    });
    cc._RF.pop();
  }, {
    HeroPlayer: "HeroPlayer"
  } ],
  playGo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "044acynMb9IS5Gub+IDuQoo", "playGo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      toScene: function toScene() {
        cc.director.loadScene("MainScene");
      }
    });
    cc._RF.pop();
  }, {} ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "877a56IG5pGmpzV6DkHwgfw", "test");
    "use strict";
    cc.Class({
      extends: cc.Component,
      _brushs: null,
      _target: null,
      _lastLocation: null,
      _counter: 0,
      properties: {},
      onLoad: function onLoad() {
        this.lineWidth = 5;
        this.strokeColor = cc.color(0, 0, 0);
        this.isClearMode = false;
        this.group = this.addComponent("R.group");
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: this.onTouchBegan.bind(this),
          onTouchMoved: this.onTouchMoved.bind(this),
          onTouchEnded: this.onTouchEnded.bind(this)
        }, this.node);
      },
      onTouchBegan: function onTouchBegan(touch, event) {
        this.dataDict = {};
        this.dataDict.dataEvent = "draw";
        this.dataDict.startTime = new Date().getTime();
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        var path = this.group.addPath();
        path.fillColor = "none";
        if (this.isClearMode) {
          path.lineWidth = 15;
          path.strokeColor = cc.color(255, 255, 255);
        } else {
          path.lineWidth = this.lineWidth;
          path.strokeColor = this.strokeColor;
        }
        this.dataDict.strokeColor = path.strokeColor.toHEX("#rrggbb");
        this.dataDict.lineWidth = path.lineWidth;
        this.points = [ touchLoc ];
        return true;
      },
      onTouchMoved: function onTouchMoved(touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.points.push(touchLoc);
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);
      },
      onTouchEnded: function onTouchEnded(touch, event) {
        var path = this.group.children[this.group.children.length - 1];
        path.points(this.points);
        this.dataDict.endTime = new Date().getTime();
        this.pointDicts = [];
        for (var i = 0; i < this.points.length; i++) {
          var point = this.points[i];
          var pointDict = {};
          pointDict.x = point.x / this.node.width;
          pointDict.y = point.y / this.node.height;
          this.pointDicts.push(pointDict);
        }
        this.dataDict.points = this.pointDicts;
        var sendData = this.dataDict;
        if (window.room_user) {
          var drawAction = gameAction.getDrawDataAction(window.room_user, sendData);
          happySocket.sendData(drawAction);
        }
      },
      start: function start() {},
      drawInLocation: function drawInLocation(location) {
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
              rotation: 360 * Math.random(),
              color: cc.color(255 * Math.random(), 255, 255),
              scale: Math.random() + .25,
              opacity: 20
            });
            sprite.retain();
            this._brushs.push(sprite);
          }
          for (var i = 0; i < distance; i++) this._brushs[i].visit();
          this._target.end();
        }
        this._lastLocation = location;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "AudioScript", "BgMove", "ExitScene", "GAME", "GameOverScore", "HeroPlayer", "MainGamebg", "guaiwuleft", "guaiwuright", "playGo", "test" ]);