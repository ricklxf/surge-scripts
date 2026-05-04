# sub-info

Surge 面板模块，用于显示机场订阅的剩余流量、距重置天数和套餐到期时间。

适用于将流量信息编码在节点名称中的机场（不依赖 `subscription-userinfo` 响应头）。

## 效果

```
剩余流量：9976.5 GB
距重置：27 天
到期：2099-12-31
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `sub-info.sgmodule` | Surge 模块文件 |
| `Scripts/sub-info.js` | 脚本文件 |

## 使用方法

### 1. 下载文件

将以下两个文件放到 `iCloud Drive/Surge/` 目录下：

- `sub-info.sgmodule` → 放到 `iCloud Drive/Surge/`
- `sub-info.js` → 放到 `iCloud Drive/Surge/Scripts/`

### 2. 配置订阅链接

编辑 `sub-info.sgmodule`，找到 `argument=url=` 这一行，将后面的内容替换为你的订阅链接：

```ini
argument=url=https://你的订阅链接
```

### 3. 启用模块

在 Surge → 模块 中找到 `sub-info` 并启用。

## 工作原理

部分机场不在 HTTP 响应头中返回 `subscription-userinfo` 字段，而是将流量信息编码在节点名称中，例如：

- `剩余流量：9976.5 GB`
- `距离下次重置剩余：27 天`
- `套餐到期：2099-12-31`

本脚本通过 GET 请求获取订阅内容，base64 解码后逐行解析节点名称，提取上述信息并显示在 Surge 面板中。

## 自定义

在 `sub-info.sgmodule` 的 `argument` 中支持以下参数，用 `&` 连接：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `url` | 订阅链接 | 必填 |
| `title` | 面板标题 | `订阅信息` |
| `icon` | SF Symbols 图标名称 | `airplane.circle` |
| `color` | 图标颜色（十六进制） | `#007aff` |

示例：

```ini
argument=url=https://你的订阅链接&title=我的机场&icon=wifi&color=#ff6600
```
