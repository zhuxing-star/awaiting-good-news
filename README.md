# 佳音，生日快乐

送给朱佳音的一份手机端生日祝福。

## 在线访问

[https://zhuxing-star.github.io/birthday-gift/](https://zhuxing-star.github.io/birthday-gift/)

## 页面内容

- 关键资源加载页与实时进度提示
- 农历生日倒计时与提前解锁入口
- 音乐提示和生日祝福开场动画
- 模拟发送生日祝福的互动情节
- 13 张沿途风景照片与对应文字说明
- 寿星照片和生日祝福
- 最后一封可继续修改内容的贺卡

页面主要为手机访问设计，同时兼容桌面浏览器。照片、音乐和字体均随项目托管，加载完成后才会进入正式内容。

## 项目说明

当前线上页面位于 `github-pages/`，使用 HTML、CSS、JavaScript 和 GSAP 制作，并通过 GitHub Actions 自动部署到 GitHub Pages。

全局字体使用 Ma Shan Zheng。图片已转换为 WebP，背景音乐使用 M4A，以减少手机端加载时间。

## 本地预览

在项目根目录运行静态文件服务器，并将目录指向 `github-pages/` 即可预览。

例如：

```bash
python3 -m http.server 4173 --directory github-pages
```

然后访问：

```text
http://localhost:4173/
```

## 致谢

部分页面创意和动画结构参考了 [abandon888/HappyBirthday](https://github.com/abandon888/HappyBirthday)，并依据当前故事、照片和移动端体验进行了重新设计。
