
cc.Class({
    extends: cc.Component,

    properties: {

    },

    statics: {
        showView(path){
            //Prefab的路徑
            //不過因為我們的MyPrefab直接就放在 /assets/resources/ 下，就直接寫
            //Ps. 假設你是放在在resources下的prefabs資料夾中，你就得寫 'prefabs/MyPrefab'
            var onResourceLoaded = function( errorMessage, loadedResource )
            {
                //一樣，養成檢查的好習慣
                if( errorMessage ) { cc.log( '載入Prefab失敗, 原因:' + errorMessage ); return; }
                if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你載入的不是Prefab, 你做了什麼事?' ); return; } //這個是型別的檢查
                var CanvasNode = cc.find( 'Canvas' );
                
                //接著，我們就可以進行實例化了
                var newMyPrefab = cc.instantiate( loadedResource );
                
                //我們先將這個建立出來的Prefab加入畫布裡
                newMyPrefab.parent = CanvasNode;
                newMyPrefab.x = 0
                newMyPrefab.y = 0
            };
            
            //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
            cc.loader.loadRes( path, onResourceLoaded );
        },

        closeView( view ){

            
        }
    },
});
