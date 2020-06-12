/**
 * 一些通用方法
 */
class utils {
    /**
     * 转换图片文件为访问地址
     * @param {*} file 图片文件
     */
    static getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    
    /**
     * 读取图片文件
     * @param {*} fileUpload input file
     */
    static readSprites(fileUpload) {
        return new Promise((resolve, reject) => {
            let __file = fileUpload.files[0];
            if (__file) {
                resolve(utils.getObjectURL(__file))
            } else {
                reject()
            }
        })
    }

    /**
     * 读取配置JSON
     * @param {*} fileUpload input file
     */
    static readConfig(fileUpload) {
        return new Promise((resolve, reject) => {
            let __file = fileUpload.files[0];
            if (__file) {
                let reader = new FileReader();
                reader.readAsText(__file, "UTF-8");
                reader.onload = e => {
                    resolve(e.target.result);
                }
            } else {
                reject();
            }
        })
    }
    
    /**
     * 自动保存图片
     * @param {*} imgUrl 图片地址
     * @param {*} filename 保存文件名
     */
    static saveImg(imgUrl, filename) {
        // 创建隐藏的可下载链接
        var eleLink = utils.createDownLink(imgUrl, filename, "none");
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    /**
     * 创建保存图片的链接
     * @param {string} src 图片地址
     * @param {string} filename 保存文件名
     * @param {string} display 生成链接DOM元素的display属性
     */
    static createDownLink(src, filename, display) {
        var link = document.createElement("a");
        link.download = filename;
        link.style.display = display || "block";
        link.href = src;
        return link;
    }
}