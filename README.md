# surge-scripts

个人 Surge 脚本和模块收藏。

---

## 模块列表

### 📊 订阅流量信息

在 Surge 面板中显示订阅的剩余流量、距重置天数和到期时间。

**安装链接**

```
https://raw.githubusercontent.com/ricklxf/surge-scripts/master/sub-info.sgmodule
```

**安装步骤**

1. 打开 Surge → 首页 → 模块 → 安装新模块
2. 粘贴上方链接，点击 ok
3. 在参数设置页面填写订阅链接（`url` 字段), 其他参数可保持默认
4. 保存后回到首页，即可在面板中看到流量信息

**参数说明**

| 参数 | 说明 | 默认值 |
|------|------|--------|
| url | 订阅链接（必填） | — |
| title | 面板标题 | 订阅信息 |
| icon | SF Symbol 图标名 | airplane.circle |
| color | 图标颜色（十六进制） | #007aff |

**面板示例**

```
剩余流量：9976.12 GB
距重置：26 天
到期：2099-12-31
```

**说明**

该模块通过解析订阅链接返回的 Base64 内容提取流量信息，适用于在节点名称中包含流量信息的机场订阅格式。面板每小时自动刷新一次。

---

## 目录结构

```
surge-scripts/
├── sub-info.sgmodule          # 订阅流量信息模块
├── Scripts/
│   └── sub-info.js            # 订阅流量信息脚本
└── README.md
```

---

## License

MIT
