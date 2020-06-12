class Main {
    inSpr;
    inCfg;
    preView;
    saveBtn;

    sprData;
    cfgData;

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

    initFactory() {
        if (this.sprData && this.cfgData) {
            this.factoryIns = new factory(this.sprData, this.cfgData);
            this.saveBtn.disabled = false;
        } else {
            this.factoryIns = null;
            this.saveBtn.disabled = true;
        }
    }

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
