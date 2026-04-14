;(function(W,D){'use strict';
var T=W.__TK;

/* ═══ DOM INJECTION ═══ */
function injectCSS(){
  var s=D.createElement('style');s.id='tk-style';
  s.textContent=[
    '#tk-toolbar{position:fixed;bottom:24px;right:16px;z-index:10270;display:flex;gap:8px;padding:6px;border-radius:12px;background:rgba(0,0,0,.78);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);box-shadow:0 4px 24px rgba(0,0,0,.4);font-family:Inter,system-ui,sans-serif;transition:all .25s ease}',
    '#tk-toolbar.tk-collapsed{padding:0;border-radius:50%;width:36px;height:36px;align-items:center;justify-content:center;opacity:.55}',
    '#tk-toolbar.tk-collapsed:hover{opacity:1}',
    '#tk-toolbar.tk-collapsed .tk-collapse-inner{display:none}',
    '#tk-toolbar .tk-collapse-btn{width:28px;height:28px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0}',
    '#tk-toolbar.tk-collapsed .tk-collapse-btn{width:36px;height:36px;border-radius:50%}',
    '#tk-toolbar button{padding:8px 16px;border-radius:8px;font-size:12px;font-weight:500;color:rgba(255,255,255,.7);background:transparent;border:none;cursor:pointer;transition:all .15s;white-space:nowrap}',
    '#tk-toolbar button:hover{background:rgba(255,255,255,.1);color:#fff}',
    '#tk-toolbar .tk-pri{background:var(--c-accent,#3B82F6);color:#fff}',
    '#tk-toolbar .tk-pri:hover{opacity:.85;background:var(--c-accent,#3B82F6)}',
    '#tk-toolbar .tk-ins-active{background:#F59E0B;color:#000}',
    '#tk-toolbar .tk-ins-active:hover{background:#D97706;color:#000}',
    '#tk-toolbar .tk-bp-on{background:#0255FF;color:#fff;font-family:Menlo,monospace;font-size:11px}',
    '#tk-toolbar .tk-bp-on:hover{background:#0040CC;color:#fff}',
    '.tk-sec-title{font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:rgba(255,255,255,.4);margin-bottom:8px}',
    '.tk-row{display:flex;align-items:center;gap:8px}',
    '.tk-field-lbl{font-size:11px;color:rgba(255,255,255,.5);width:72px;flex-shrink:0}',
    '.tk-color-input{width:24px;height:24px;border-radius:4px;cursor:pointer;border:1px solid rgba(255,255,255,.1);background:transparent;padding:0;flex-shrink:0}',
    '.tk-text-input{flex:1;height:28px;padding:0 8px;border-radius:6px;font-size:11px;font-family:monospace;color:rgba(255,255,255,.8);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);outline:none}',
    '.tk-text-input:focus{border-color:rgba(255,255,255,.2)}',
    '.tk-num-input{width:72px;height:28px;padding:0 8px;border-radius:6px;font-size:11px;font-family:monospace;color:rgba(255,255,255,.8);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);outline:none;text-align:center}',
    '.tk-num-input:focus{border-color:rgba(255,255,255,.2)}',
    '.tk-exp-btn{flex:1;padding:8px;border-radius:8px;font-size:11px;font-weight:500;color:rgba(255,255,255,.7);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);cursor:pointer}',
    '.tk-exp-btn:hover{background:rgba(255,255,255,.08)}',
    '.tk-dp-preset{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);cursor:pointer;text-align:center;transition:all .15s}',
    '.tk-dp-preset:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.12)}',
    '.tk-dp-preset.active{border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.06)}',
    '.tk-dp-preset-dot{width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,255,255,.15)}',
    '.tk-dp-preset-name{font-size:9px;color:rgba(255,255,255,.5);line-height:1.3}',
    '.tk-dp-preset.active .tk-dp-preset-name{color:rgba(255,255,255,.8)}',
    '.tk-btn-primary{width:100%;margin-top:8px;padding:10px;border-radius:8px;font-size:12px;font-weight:600;color:#fff;background:linear-gradient(135deg,var(--c-accent,#3B82F6),var(--c-accent-l,#60A5FA));border:none;cursor:pointer;box-shadow:0 2px 8px rgba(59,130,246,.25);transition:all .2s}',
    '.tk-btn-primary:hover{opacity:.9;box-shadow:0 4px 12px rgba(59,130,246,.35)}',
    '.tk-btn-secondary{width:100%;margin-top:8px;padding:10px;border-radius:8px;font-size:12px;font-weight:600;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:all .15s}',
    '.tk-btn-secondary:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18)}',
    '.tk-btn-ghost{width:100%;margin-top:8px;padding:8px;border-radius:8px;font-size:11px;font-weight:500;color:rgba(255,255,255,.35);background:transparent;border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:all .15s}',
    '.tk-btn-ghost:hover{color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.12)}',
    '.tk-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:20px 20px 12px;position:sticky;top:0;z-index:10;background:#0D0F14}',
    '.tk-panel-title{font-size:13px;font-weight:600;color:#fff;letter-spacing:.03em}',
    '.tk-panel-close{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:8px;color:rgba(255,255,255,.4);background:transparent;border:none;cursor:pointer;transition:all .15s}',
    '.tk-panel-close:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.7)}',
    '.tk-dp-body{padding:0 20px 24px;display:flex;flex-direction:column;gap:20px}',
    '.tk-preset-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}',
    '.tk-export-grid{display:flex;gap:8px;flex-wrap:wrap}',
    '.tk-cta-pv{padding:12px 40px;border-radius:9999px;font-size:14px;font-weight:600;color:#fff;border:none;cursor:pointer;transition:all .2s}',
    '.tk-cta-pv:hover{opacity:.9;transform:translateY(-1px)}',
    '.tk-del-badge{position:absolute;top:-6px;right:-6px;width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.06);color:rgba(255,255,255,.35);font-size:10px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:all .15s}',
    '.tk-del-badge:hover{background:rgba(239,68,68,.15);color:#EF4444}',
    '.tk-sc-wrap{max-width:960px;margin:0 auto;padding:40px 24px}',
    '.tk-sc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}',
    '.tk-sc-h1{font-size:28px;font-weight:700;margin:0;color:var(--c-txt,#fff)}',
    '.tk-sc-divider{height:1px;background:linear-gradient(to right,transparent,rgba(255,255,255,.1),transparent)}',
    '.tk-sc-section{margin-bottom:40px}',
    '.tk-sc-section-hd{display:flex;align-items:center;gap:12px;margin-bottom:24px}',
    '.tk-sc-accent-bar{width:4px;height:24px;border-radius:9999px;background:var(--c-accent,#3B82F6)}',
    '.tk-sc-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.18em;margin-bottom:4px;color:var(--c-accent-l,#60A5FA)}',
    '.tk-sc-section-title{font-size:24px;font-weight:600;margin:0;color:var(--c-txt,#fff)}',
    '.tk-sc-card-label{font-size:11px;margin-bottom:8px;font-family:monospace;color:var(--c-txt-s,#71717A)}',
    '.tk-sc-card{border-radius:16px;border:1px solid rgba(255,255,255,.08);padding:32px;background:var(--c-card,#141416)}',
    '.tk-sc-empty{max-width:960px;margin:0 auto;padding:80px 24px;text-align:center}',
    '.tk-sc-empty-title{font-size:16px;font-weight:500;color:var(--c-txt-s,#71717A)}',
    '.tk-sc-empty-sub{font-size:13px;margin-top:8px;color:var(--c-muted,#27272A)}'
  ].join('\n');
  D.head.appendChild(s);
}

function injectToolbar(){
  var b=D.createElement('div');b.id='tk-toolbar';
  var collapsed=sessionStorage.getItem('_tk_collapsed')==='1';
  if(collapsed) b.classList.add('tk-collapsed');
  b.innerHTML='<button type="button" class="tk-collapse-btn" onclick="window._tk.tbToggle()" title="收起/展开工具栏">'
    +'<svg style="width:16px;height:16px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/></svg>'
    +'</button>'
    +'<span class="tk-collapse-inner">'
    +'<button type="button" id="tk-btn-ins" onclick="window._tk.insToggle()">编辑模式</button>'
    +'<button type="button" id="tk-btn-bp" onclick="window._tk.bpToggle()">断点</button>'
    +'<button type="button" id="tk-btn-sc">组件总览</button>'
    +'<button type="button" id="tk-btn-dp" class="tk-pri">'
    +'<svg style="display:inline;width:14px;height:14px;margin-right:4px;vertical-align:-2px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
    +'设计面板</button></span>';
  D.body.appendChild(b);
  var hint=D.createElement('div');hint.id='ins-toolbar-hint';
  D.body.appendChild(hint);
}

function tbToggle(){
  var b=D.getElementById('tk-toolbar');if(!b)return;
  var isCollapsed=b.classList.toggle('tk-collapsed');
  sessionStorage.setItem('_tk_collapsed',isCollapsed?'1':'0');
}

function injectPanel(){
  var p=D.createElement('div');p.id='tk-panel';
  p.style.cssText='position:fixed;top:0;right:0;z-index:10260;height:100%;width:340px;transform:translateX(100%);transition:transform .3s ease-in-out;background:#0D0F14;border-left:1px solid rgba(255,255,255,.08);font-family:Inter,system-ui,sans-serif';
  p.innerHTML='<div style="height:100%;display:flex;flex-direction:column;overflow-y:auto;scrollbar-width:thin">'
    +'<div class="tk-panel-hd">'
    +'<div class="tk-panel-title">Design Panel</div>'
    +'<button type="button" id="tk-btn-close" class="tk-panel-close">'
    +'<svg style="width:16px;height:16px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg></button></div>'
    +'<div id="tk-dp-body" class="tk-dp-body"></div></div>';
  D.body.appendChild(p);
}

function injectOverlay(){
  var o=D.createElement('div');o.id='tk-overlay';
  o.style.cssText='position:fixed;inset:0;z-index:10259;background:rgba(0,0,0,.4);display:none';
  D.body.appendChild(o);
}

function injectShowcase(){
  var s=D.createElement('div');s.id='tk-showcase';
  s.style.cssText='position:fixed;inset:0;z-index:10258;overflow-y:auto;display:none;background:var(--c-bg,#0A0A0B);font-family:Inter,system-ui,sans-serif;pointer-events:auto';
  D.body.appendChild(s);
}

T.injectCSS = injectCSS;
T.injectToolbar = injectToolbar;
T.injectPanel = injectPanel;
T.injectOverlay = injectOverlay;
T.injectShowcase = injectShowcase;
T.tbToggle = tbToggle;

})(window,document);
