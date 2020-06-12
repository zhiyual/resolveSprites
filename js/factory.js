class factory {
    _spr;
    _cfg;
    _resolveRsl;

    constructor(spr, cfg) {
        this.formatCfg(cfg);
        this._spr = spr;
    }

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

    get resImgs() {
        return this._resolveRsl;
    }
    
    clipImg(img, x, y, width, height) {
        let cvs = document.createElement("canvas");
        cvs.width = width;
        cvs.height = height;
        let ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0 - x, 0 - y);
        return cvs.toDataURL();
    }
}