# vscode-paste-image-to-qiniu

克隆项目至[vscode-qiniu-upload-image](https://github.com/favers/vscode-qiniu-upload-image)

一个可以支持截图粘贴上传图片到七牛、让你写用vscode写markdown有更好的体验。

![screenshot](./screenshot/screenshot.gif)

主要更新如下：
1. 升级dependencies为最新（2019-11-26）。
2. 增加七牛云zone配置项，默认为"Zone_z1"。
3. 新增选项delLocalPath，设置是否删除本地文件，默认为true。
4. 优化上传到七牛云文件路径为相对于工作空间目录的位置。

## 安装
输入命令：
```bash
ext install paste-image-to-qiniu
```
或者在插件应用商店搜索paste-image-to-qiniu安装

## 参数设置
```js
{
    // 七牛云AccessKey
    "pasteImageToQiniu.access_key": "*****************************************",

    // 七牛云SecretKey
    "pasteImageToQiniu.secret_key": "*****************************************",

    // 七牛云图片上传空间
    "pasteImageToQiniu.bucket": "blog",

    // 七牛云空间对应的机房
    "pasteImageToQiniu.zone": "Zone_z1",

    // 七牛云图片上传路径，参数化命名，支持 ${fileName}、${filePath}、${date}、${dateTime}、${year}、${month}、${day}
    // 示例：
    //   ${fileName}-${date} -> picName-20160725.jpg
    //   ${filePath}-${dateTime} -> markdownfilepath-20170412222810.jpg
    "pasteImageToQiniu.remotePath": "{filePath}/${fileName}",

    // 七牛图床域名
    "pasteImageToQiniu.domain": "http://xxxxx.xxxx.com",

    // 上传图片时本地保存位置
    "pasteImageToQiniu.localPath":"./img",

    // 上传完成后是否删除本地保存文件
    "pasteImageToQiniu.delLocalPath": true
}
```

一直使用vscode来开发、写笔记文章、但是用了几款vscode的图床插件都不是很符合我的需求。今天本来想看看书写点笔记、但是发现截图了去处理图片太过于麻烦、于是有了这个插件、仅仅是想体验一下vscode插件的开发流程、也可以方便自己的写体验。

将[vscode-paste-image](https://github.com/mushanshitiancai/vscode-paste-image)和[vscode-qiniu-upload-image](https://github.com/yscoder/vscode-qiniu-upload-image)综合改成了现在这个插件。

如果用的开心给个star也不错！