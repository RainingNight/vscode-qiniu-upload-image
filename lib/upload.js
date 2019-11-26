const qiniu = require('qiniu')
const path = require('path')
const url = require('url')

// 默认参数
const formatParam = (file, filePath) => {
    const dt = new Date()
    const y = dt.getFullYear()
    const m = dt.getMonth() + 1
    const d = dt.getDate()
    const h = dt.getHours()
    const mm = dt.getMinutes()
    const s = dt.getSeconds()

    const date = `${y}${m}${d}`
    var ext = path.extname(file)

    return {
        date,
        dateTime: `${date}${h}${mm}${s}`,
        fileName: path.basename(file, ext),
        ext,
        filePath,
        year: y,
        month: m,
        day: d
    }
}

const formatString = (tplString, data) => {
    const keys = Object.keys(data)
    const values = keys.map(k => data[k])

    return new Function(keys.join(','), 'return `' + tplString + '`').apply(null, values)
}

module.exports = (config, file, filePath) => {
    let access_key = config.access_key;
    let secret_key = config.secret_key;
    let bucket = config.bucket;
    let domain = config.domain;
    let remotePath = config.remotePath;
    let zone;
    switch (config.zone) {
        case 'Zone_z0':
            zone = qiniu.zone.Zone_z0;
            break;
        case 'Zone_z1':
            zone = qiniu.zone.Zone_z1;
            break;
        case 'Zone_z2':
            zone = qiniu.zone.Zone_z2;
            break;
        case 'Zone_na0':
            zone = qiniu.zone.Zone_na0;
            break;
        default:
            zone = qiniu.zone.Zone_z1;
            break;
    };

    let localFile = file;
    if (/^".+"$/.test(localFile)) {
        localFile = file.substring(1, file.length - 1)
    }

    // 预设参数值
    const param = formatParam(localFile, filePath)
    //上传到七牛后保存的文件名
    const saveFile = formatString(remotePath + '${ext}', param)

    //生成上传 Token
    var putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket
    });
    var mac = new qiniu.auth.digest.Mac(access_key, secret_key);
    const token = putPolicy.uploadToken(mac);

    return new Promise((resolve, reject) => {
        var extra = new qiniu.form_up.PutExtra();
        var config = new qiniu.conf.Config();
        config.zone = zone;
        var formUploader = new qiniu.form_up.FormUploader(config);

        formUploader.putFile(token, saveFile, localFile, extra, (err, { key }) => {
            if (!err) {
                // 上传成功， 处理返回值
                resolve({
                    name: path.basename(key, param.ext),
                    url: url.resolve(domain, saveFile)
                })
            } else {
                // 上传失败， 处理返回代码
                reject(err)
            }
        })
    })
}
