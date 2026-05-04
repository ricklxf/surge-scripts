const args = Object.fromEntries(
    ($argument || "").split("&").filter(Boolean).map(i => i.split("=")).map(([k, v]) => [k, decodeURIComponent(v)])
);
const url = args.url;

$httpClient.get({ url }, (error, resp, body) => {
    if (error) {
        $done({ title: "订阅信息", content: `请求失败：${error}` });
        return;
    }

    try {
        const decoded = atob(body.trim());
        const lines = decoded.split(/\r?\n/);
        let remaining = null;
        let resetDays = null;
        let expire = null;

        for (const line of lines) {
            const hashIndex = line.lastIndexOf("#");
            if (hashIndex === -1) continue;
            const name = decodeURIComponent(line.slice(hashIndex + 1).trim());

            if (!remaining) {
                const m = name.match(/剩余流量[：:]\s*([\d.]+\s*\w+)/);
                if (m) remaining = m[1];
            }
            if (!resetDays) {
                const m = name.match(/重置剩余[：:]\s*(\d+)\s*天/);
                if (m) resetDays = m[1];
            }
            if (!expire) {
                const m = name.match(/到期[：:]\s*(\S+)/);
                if (m) expire = m[1];
            }

            if (remaining && resetDays && expire) break;
        }

        const output = [];
        if (remaining) output.push(`剩余流量：${remaining}`);
        if (resetDays) output.push(`距重置：${resetDays} 天`);
        if (expire) output.push(`到期：${expire}`);

        $done({
            title: args.title || "订阅信息",
            content: output.length > 0 ? output.join("\n") : "未找到流量信息",
            icon: args.icon || "airplane.circle",
            "icon-color": args.color || "#007aff",
        });
    } catch (e) {
        $done({ title: "订阅信息", content: `解析失败：${e}` });
    }
});
