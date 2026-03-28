/**
 * 通用版永久地址发布页 - 极致稳定与自定义版
 * 功能：多源随机美女背景、毛玻璃特效、可视化管理、容器缩放、访问统计
 * 管理后台: /admin
 */

const ADMIN_TOKEN = "xiaok_secret_token_2026"; 

const defaultData = {
  title: "永久地址发布页",
  subtitle: "收藏本页，防止迷路！",
  notice: "建议按下 <b>Ctrl+D</b> 收藏本页到浏览器收藏夹<br>每日更新最新资源，欢迎分享。",
  cardWidth: 480,
  zoomLevel: 1.0,
  sections: [
    {
      title: "官方入口",
      links: [
        { name: "官方主站地址", url: "https://example.com", note: "最新资源一网打尽", color: "#007bff" },
        { name: "备用发布地址", url: "https://example.net", note: "建议收藏，防止失效", color: "#007bff" },
        { name: "官方 YouTube 频道", url: "https://youtube.com", note: "精彩视频内容同步更新", color: "#ff0000" }
      ]
    },
    {
      title: "合作伙伴与推荐",
      links: [
        { name: "【高速稳定加速器推荐】", url: "https://example.com/vpn", color: "#ff4d4d", note: "全平台支持，超低延迟" }
      ]
    }
  ],
  footer: "© 2021-2026 资源分享. All Rights Reserved"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!env.KV) return new Response("Error: KV namespace not bound.", { status: 500 });

    if (url.pathname === "/") return await renderIndex(env);
    if (url.pathname === "/admin") return await renderAdmin(env);
    if (url.pathname === "/api/get-data") return await handleGetData(env);
    if (url.pathname === "/api/save-data" && request.method === "POST") return await handleSaveData(request, env);
    
    return new Response("Not Found", { status: 404 });
  }
};

// --- 多源背景图片逻辑 ---
async function getGirlWallpaper() {
  const apis = [
    "https://api.btstu.cn/sjbz/api.php?lx=meizi&format=images",
    "https://imgapi.cn/api.php?zd=pc&fl=meizi&gs=images",
    "https://api.uomg.com/api/rand.img?sort=%E7%BE%8E%E5%A5%B3&format=images",
    "https://api.vvhan.com/api/wallpaper/meizi"
  ];
  return apis[Math.floor(Math.random() * apis.length)];
}

// --- 前端渲染 ---
async function renderIndex(env) {
  await env.KV.put("v_count", (parseInt(await env.KV.get("v_count") || "0") + 1).toString());
  const dataStr = await env.KV.get("site_config");
  const data = dataStr ? JSON.parse(dataStr) : defaultData;
  const bgUrl = await getGirlWallpaper();

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>${data.title}</title>
    <style>
        body {
            margin: 0; display: flex; justify-content: center; min-height: 100vh;
            background: #f0f2f5 url('${bgUrl}') no-repeat center center fixed; background-size: cover;
            font-family: -apple-system, sans-serif;
        }
        body::before {
            content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255, 255, 255, 0.1); backdrop-filter: brightness(0.95); z-index: -1;
        }
        .w { 
            width: 100%; 
            max-width: ${data.cardWidth || 480}px; 
            padding: 40px 15px; box-sizing: border-box; 
        }
        .c { 
            zoom: ${data.zoomLevel || 1.0}; transform-origin: top center;
            background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.15); 
            padding: 35px 25px; text-align: center; border: 1px solid rgba(255,255,255,0.4);
        }
        .t { color: #ff4d4d; font-size: 26px; font-weight: bold; margin-bottom: 5px; }
        .st { color: #444; font-size: 14px; margin-bottom: 25px; font-weight: 500; }
        .nb { border: 1px dashed #ff4d4d; background: rgba(255, 240, 240, 0.7); color: #ff4d4d; padding: 12px; border-radius: 12px; font-size: 13px; line-height: 1.6; margin-bottom: 25px; }
        .sec-t { font-size: 15px; color: #555; margin: 25px 0 12px; text-align: left; border-left: 5px solid #ff4d4d; padding-left: 12px; font-weight: bold; }
        .l-btn { 
            display: block; background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(238, 238, 238, 0.8); 
            border-radius: 15px; padding: 16px; margin-bottom: 14px; text-decoration: none; transition: all 0.3s ease; 
        }
        .l-btn:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(255, 77, 77, 0.15); border-color: #ff4d4d; background: #fff; }
        .l-t { font-size: 16px; font-weight: 600; display: block; margin-bottom: 4px; }
        .l-n { font-size: 12px; color: #888; }
        .f { margin-top: 35px; font-size: 12px; color: #666; border-top: 1px solid rgba(0,0,0,0.08); padding-top: 25px; }
    </style>
</head>
<body>
    <div class="w"><div class="c">
        <div class="t">${data.title}</div><div class="st">${data.subtitle}</div><div class="nb">${data.notice}</div>
        ${data.sections.map(s => `
            <div class="sec-t">${s.title}</div>
            ${s.links.map(l => `
                <a href="${l.url}" class="l-btn" target="_blank">
                    <span class="l-t" style="color:${l.color||'#333'}">${l.name}</span>
                    ${l.note ? `<span class="l-n">${l.note}</span>` : ''}
                </a>
            `).join('')}
        `).join('')}
        <div class="f">${data.footer}</div>
    </div></div>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

// --- 后台渲染 ---
async function renderAdmin(env) {
  const count = await env.KV.get("v_count") || "0";
  return new Response(`
<!DOCTYPE html>
<html>
<head>
    <title>站点管理后台</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
        body{font-family:sans-serif;background:#f0f2f5;margin:0;padding:20px}
        .container{max-width:800px;margin:0 auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.1)}
        .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:2px solid #eee;padding-bottom:10px}
        .stat-badge{background:#eef2ff;color:#4f46e5;padding:5px 12px;border-radius:20px;font-size:13px;font-weight:bold}
        .form-group{margin-bottom:15px}
        label{display:block;margin-bottom:5px;font-weight:bold;color:#444}
        input,textarea{width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box}
        .section-box{border:1px solid #e5e7eb;padding:15px;border-radius:8px;margin-bottom:20px;background:#f9fafb}
        .link-row{display:grid;grid-template-columns:2fr 2fr 1fr 40px;gap:10px;margin-bottom:10px;background:#fff;padding:10px;border-radius:6px;border:1px solid #eee}
        .btn{padding:10px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:bold;transition:.2s}
        .btn-add{background:#10b981;color:white;margin-bottom:10px}
        .btn-save{background:#3b82f6;color:white;width:100%;font-size:16px;margin-top:20px}
        .btn-del{background:#ef4444;color:white;padding:5px 10px}
        #login-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;display:flex;justify-content:center;align-items:center;z-index:100}
    </style>
</head>
<body>
    <div id="login-overlay">
        <div style="text-align:center"><h3>🔑 请输入管理密钥</h3><input type="password" id="admin-token-input"><br><br><button class="btn btn-save" onclick="checkLogin()">进入系统</button></div>
    </div>
    <div class="container">
        <div class="header"><h2>⚙️ 站点内容管理</h2><span class="stat-badge">总访问量: ${count}</span></div>
        <div class="section-box" style="background:#fff7ed">
            <label>容器宽度 (px): <span id="val-width"></span></label>
            <input type="range" id="cfg-cardWidth" min="300" max="1000" step="10" oninput="document.getElementById('val-width').innerText=this.value">
            <label style="margin-top:10px">缩放比例: <span id="val-zoom"></span></label>
            <input type="range" id="cfg-zoomLevel" min="0.5" max="2" step="0.1" oninput="document.getElementById('val-zoom').innerText=this.value">
        </div>
        <div class="form-group"><label>标题</label><input type="text" id="cfg-title"></div>
        <div class="form-group"><label>副标题</label><input type="text" id="cfg-subtitle"></div>
        <div class="form-group"><label>公告 (支持 HTML)</label><textarea id="cfg-notice" rows="2"></textarea></div>
        <div id="sections-container"></div>
        <button class="btn btn-add" onclick="addSection()">+ 添加分组</button>
        <div class="form-group"><label>页脚</label><textarea id="cfg-footer" rows="2"></textarea></div>
        <button class="btn btn-save" onclick="saveData()">保存并全局发布</button>
    </div>
    <script>
        let configData = null;
        function checkLogin() {
            const token = document.getElementById('admin-token-input').value;
            if(token === "${ADMIN_TOKEN}") { localStorage.setItem('admin_token', token); document.getElementById('login-overlay').style.display = 'none'; loadData(); }
            else { alert('密钥错误'); }
        }
        if(localStorage.getItem('admin_token') === "${ADMIN_TOKEN}") { document.getElementById('login-overlay').style.display = 'none'; loadData(); }
        async function loadData() {
            const res = await fetch('/api/get-data'); configData = await res.json();
            document.getElementById('cfg-title').value = configData.title;
            document.getElementById('cfg-subtitle').value = configData.subtitle;
            document.getElementById('cfg-notice').value = configData.notice;
            document.getElementById('cfg-footer').value = configData.footer;
            document.getElementById('cfg-cardWidth').value = configData.cardWidth || 480;
            document.getElementById('val-width').innerText = configData.cardWidth || 480;
            document.getElementById('cfg-zoomLevel').value = configData.zoomLevel || 1.0;
            document.getElementById('val-zoom').innerText = configData.zoomLevel || 1.0;
            renderSections();
        }
        function renderSections() {
            const container = document.getElementById('sections-container'); container.innerHTML = '';
            configData.sections.forEach((sec, sIdx) => {
                const div = document.createElement('div'); div.className = 'section-box';
                div.innerHTML = \`<div style="display:flex;justify-content:space-between;margin-bottom:10px"><input type="text" value="\${sec.title}" onchange="configData.sections[\${sIdx}].title=this.value" style="font-weight:bold;width:70%"><button class="btn btn-del" onclick="removeSection(\${sIdx})">删除组</button></div><div id="links-\${sIdx}"></div><button class="btn btn-add" style="font-size:12px" onclick="addLink(\${sIdx})">+ 添加链接</button>\`;
                container.appendChild(div);
                const linkContainer = div.querySelector(\`#links-\${sIdx}\`);
                sec.links.forEach((link, lIdx) => {
                    const row = document.createElement('div'); row.className = 'link-row';
                    row.innerHTML = \`<input type="text" value="\${link.name}" onchange="configData.sections[\${sIdx}].links[\${lIdx}].name=this.value"><input type="text" value="\${link.url}" onchange="configData.sections[\${sIdx}].links[\${lIdx}].url=this.value"><input type="color" value="\${link.color||'#333333'}" onchange="configData.sections[\${sIdx}].links[\${lIdx}].color=this.value"><button class="btn btn-del" onclick="removeLink(\${sIdx}, \${lIdx})">×</button><input type="text" placeholder="备注" value="\${link.note||''}" style="grid-column: span 3;font-size:12px" onchange="configData.sections[\${sIdx}].links[\${lIdx}].note=this.value">\`;
                    linkContainer.appendChild(row);
                });
            });
        }
        function addSection() { configData.sections.push({title:'新分组', links:[]}); renderSections(); }
        function removeSection(idx) { configData.sections.splice(idx,1); renderSections(); }
        function addLink(sIdx) { configData.sections[sIdx].links.push({name:'', url:'', color:'#007bff', note:''}); renderSections(); }
        function removeLink(sIdx, lIdx) { configData.sections[sIdx].links.splice(lIdx,1); renderSections(); }
        async function saveData() {
            configData.title = document.getElementById('cfg-title').value;
            configData.subtitle = document.getElementById('cfg-subtitle').value;
            configData.notice = document.getElementById('cfg-notice').value;
            configData.footer = document.getElementById('cfg-footer').value;
            configData.cardWidth = parseInt(document.getElementById('cfg-cardWidth').value);
            configData.zoomLevel = parseFloat(document.getElementById('cfg-zoomLevel').value);
            const res = await fetch('/api/save-data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token: localStorage.getItem('admin_token'), data: configData })
            });
            if((await res.json()).success) { alert('保存成功！'); location.reload(); }
        }
    </script>
</body>
</html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

async function handleGetData(env) {
  const data = await env.KV.get("site_config");
  return new Response(data || JSON.stringify(defaultData), { headers: { "Content-Type": "application/json" } });
}

async function handleSaveData(request, env) {
  const body = await request.json();
  if (body.token !== ADMIN_TOKEN) return new Response(JSON.stringify({ success: false, msg: "验证失效" }), { status: 401 });
  await env.KV.put("site_config", JSON.stringify(body.data));
  return new Response(JSON.stringify({ success: true }));
}
