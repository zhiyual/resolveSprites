/**
 * 工厂类
 * 作用是拆解图集
 */
class factory {
    _spr;
    _cfg;
    _resolveRsl;

    constructor(spr, cfg) {
        this.formatCfg(cfg);
        this._spr = spr;
    }

    /**
     * 格式化配置文件
     * 使用时必须结合自己的JSON格式重写这个方法，使之能正确转换出需要的数据格式
     * @param {*} cfg 
     */
    formatCfg(cfg) {
        console.error("你必须重写这个方法！");
        alert("请先重写formatCfg方法！");

        let cfgObj = JSON.parse(cfg);
        this._cfg = [];
        for (let p in cfgObj.frames) {
            this._cfg.push({
                name: p,
                x: cfgObj.frames[p].x - cfgObj.frames[p].offX,
                y: cfgObj.frames[p].y - cfgObj.frames[p].offY,
                w: cfgObj.frames[p].sourceW,
                h: cfgObj.frames[p].sourceH
            })
        }
    }

    /**
     * 切分图集
     */
    resolveSprs() {
        let _this = this;
        this._resolveRsl = [];
        this._cfg.forEach(v => {
            this._resolveRsl.push({
                name: v.name,
                imgUrl: _this.clipImg(this._spr, v.x, v.y, v.w, v.h)
            })
        })
    }

    /**
     * 获取切分后的数据
     */
    get resImgs() {
        return this._resolveRsl;
    }
    
    /**
     * 切图方法
     * @param {*} img 原始图集
     * @param {*} x 单图左上角于图集中坐标x
     * @param {*} y 单图左上角于图集中坐标y
     * @param {*} width 单图于图集中所占宽度
     * @param {*} height 单图于图集中所占高度
     */
    clipImg(img, x, y, width, height) {
        let cvs = document.createElement("canvas");
        cvs.width = width;
        cvs.height = height;
        let ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0 - x, 0 - y);
        return cvs.toDataURL();
    }
}