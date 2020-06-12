/**
 * 项目入口启动类
 */
class Main {
    /**input file 图集的DOM实例 */
    inSpr;
    /**input file 配置JSON的DOM实例 */
    inCfg;
    /**div#preview */
    preView;
    /**button#save */
    saveBtn;

    /**图集上传数据 */
    sprData;
    /**配置上传数据 */
    cfgData;

    /**class factory 实例 */
    factoryIns;

    constructor() {
        this.inSpr = document.getElementById("inSprites");
        this.inSpr.addEventListener("change", () => {
            this.onSpritesChange();
        });
        this.inCfg = document.getElementById("inConfig");
        this.inCfg.addEventListener("change", () => {
            this.onConfigChange();
        })
        this.preView = document.getElementById("preview");
        this.saveBtn = document.getElementById("save");
        this.saveBtn.addEventListener("click", () => {
            this.createSaveLinks();
        })
        this.saveBtn.disabled = true;
    }
    
    /**
     * 监听图集上传
     */
    onSpritesChange() {
        let _this = this;
        _this.sprData = null;
        utils.readSprites(this.inSpr)
        .then(res => {
            console.log(res);
            _this.sprData = new Image();
            _this.sprData.src = res;
            _this.sprData.onload = () => {
                _this.preView.innerHTML = "";
                _this.preView.appendChild(_this.sprData);
                _this.initFactory();
            }
        })
        .catch(() => {
            _this.preView.innerHTML = "";
            _this.initFactory();
        })
    }

    /**
     * 监听配置上传
     */
    onConfigChange() {
        let _this = this;
        _this.cfgData = null;
        utils.readConfig(this.inCfg)
        .then(res => {
            console.log(JSON.parse(res));
            _this.cfgData = res;
            _this.initFactory();
        })
        .catch(() => {
            _this.initFactory();
        })
    }

    /**
     * 初始化factory类
     */
    initFactory() {
        if (this.sprData && this.cfgData) {
            this.factoryIns = new factory(this.sprData, this.cfgData);
            this.saveBtn.disabled = false;
        } else {
            this.factoryIns = null;
            this.saveBtn.disabled = true;
        }
    }

    /**
     * 创建下载链接
     */
    createSaveLinks() {
        let _this = this;
        if (!this.factoryIns) return;
        this.factoryIns.resolveSprs();
        this.preView.innerHTML = "";
        this.factoryIns.resImgs.forEach(v => {
            let dlink = utils.createDownLink(v.imgUrl, v.name + ".png", "float");
            dlink.innerHTML = `<img style="background-color: black;" src="${v.imgUrl}"></img>`
            _this.preView.appendChild(dlink);
        })
    }
}

var main;
window.onload = () => {
    main = new Main();
}
