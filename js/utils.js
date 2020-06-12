class utils {
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
    

    static saveImg(imgUrl, filename) {
        // 创建隐藏的可下载链接
        var eleLink = utils.createDownLink(imgUrl, filename, "none");
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    static createDownLink(src, filename, display) {
        var link = document.createElement("a");
        link.download = filename;
        link.style.display = display || "block";
        link.href = src;
        return link;
    }
}