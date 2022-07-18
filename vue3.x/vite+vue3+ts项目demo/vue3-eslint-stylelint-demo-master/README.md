新建  .vscode文件夹

创建 setting.json 文件，

这个文件的配置将于本地的 vscode 配置合并

```json
{
    // 保存时，自动对代码进行stylelint修复
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true, // eslint 自动格式化代码
        "source.fixAll.stylelint": true  // stylelint 格式化代码
    },
    "stylelint.validate": [
        "css",
        "less",
        "postcss",
        "vue" // necessary for stylelint diagnostics in .vue <style> tag
    ]
}
```

新建  extensions.json 文件， 故名思义，这是vscode的扩展文件

```json
{
  "recommendations": [ // 建议
    // "johnsoncodehk.volar", // 打开提示安装 volar插件
    "stylelint.vscode-stylelint", // 打开提示安装 styleint
    "dbaeumer.vscode-eslint"  // 打开提示安装 eslint
  ]
  // 也可以添加其他动作，比如打开后自动下载那些扩展
}
```