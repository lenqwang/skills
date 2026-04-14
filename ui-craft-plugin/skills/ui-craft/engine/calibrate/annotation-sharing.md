# 标注分享方案

## 当前方案（方案 A）：URL Hash 编码

标注数据通过 base64 编码嵌入 URL hash，纯前端实现，零服务器依赖。

### 流程
1. 用户标注完成后点「分享」
2. 标注 JSON 压缩为精简格式 → `btoa()` 编码 → 拼接到 `#ann=` 后
3. 链接自动复制到剪贴板
4. 接收方打开链接 → `insRestoreFromHash()` 解码 → `insRestoreVisuals()` 渲染绿色标记

### 限制
- URL 长度：现代浏览器支持 ~64KB，约 30-50 条标注
- 单向传递：每次新增标注需要生成新链接

---

## 升级方案（方案 B）：ngrok 隧道 + 服务端持久化

适用场景：多人实时协作，标注量大。

### 架构

```
[你的电脑]
  Python server (localhost:8765)
    ├── GET  /pages/*.html      → 返回 HTML 页面
    ├── GET  /api/annotations    → 读取标注 JSON
    └── POST /api/annotations    → 写入标注 JSON
  ↓
  ngrok http 8765
  ↓
[公网 URL: https://abc123.ngrok.io]
  ↓
产品/研发直接在线标注
```

### 实现步骤

#### 1. Python server 加 API 端点

```python
# server.py 中增加
import json, os

ANNOTATIONS_DIR = './annotations'

class AnnotationHandler(NoCacheHandler):
    def do_GET(self):
        if self.path.startswith('/api/annotations'):
            page = self.path.split('?page=')[-1] if '?page=' in self.path else 'default'
            fpath = os.path.join(ANNOTATIONS_DIR, f'{page}.json')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            if os.path.exists(fpath):
                with open(fpath, 'r') as f:
                    self.wfile.write(f.read().encode())
            else:
                self.wfile.write(b'[]')
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/annotations'):
            page = self.path.split('?page=')[-1] if '?page=' in self.path else 'default'
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            os.makedirs(ANNOTATIONS_DIR, exist_ok=True)
            fpath = os.path.join(ANNOTATIONS_DIR, f'{page}.json')
            with open(fpath, 'w') as f:
                f.write(body.decode())
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        else:
            self.send_error(404)
```

#### 2. _toolkit.js 加服务端同步

```javascript
function insSyncToServer(){
  var page = location.pathname.split('/').pop().replace('.html','');
  fetch('/api/annotations?page=' + page, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(_annotations)
  });
}

function insLoadFromServer(){
  var page = location.pathname.split('/').pop().replace('.html','');
  fetch('/api/annotations?page=' + page)
    .then(function(r){ return r.json(); })
    .then(function(data){
      if(data.length > 0){
        _annotations = data;
        _annId = data.reduce(function(mx,a){return Math.max(mx, a.id||0);}, 0);
        insUpdateTabCount();
        insRestoreVisuals();
      }
    });
}
```

#### 3. 暴露到公网

```bash
# 安装 ngrok（一次性）
brew install ngrok

# 启动隧道
ngrok http 8765

# 输出类似：
# Forwarding https://abc123.ngrok.io -> http://localhost:8765
```

把 `https://abc123.ngrok.io/pages/lantern-festival.html` 发给同事即可。

### 注意事项
- ngrok 免费版每次重启 URL 会变，付费版可绑定固定域名
- 替代方案：Cloudflare Tunnel（免费固定域名）、localtunnel
- 你的电脑必须保持开机和 server 运行
- 多人同时编辑同一条标注可能冲突，可加简单的乐观锁（timestamp 比对）
