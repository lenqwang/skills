/**
 * UI Craft Design Toolkit — _showcase.js
 * 组件总览系统：DOM 自动发现、弹层/隐藏 UI 管理、Showcase 面板
 */
;(function(W,D){'use strict';
var T=W.__TK;
var SC=T.SC, LABELS=T.LABELS, _vars=T._vars, CFG=T.CFG;
var tkEscHtml=T.tkEscHtml, insRgbToHex=T.insRgbToHex;

function scSection(t,id,h){
  return '<div id="sc-'+id+'" class="tk-sc-section"><div class="tk-sc-section-hd"><div class="tk-sc-accent-bar"></div><div><div class="tk-sc-kicker">SHOWCASE</div><h2 class="tk-sc-section-title">'+t+'</h2></div></div><div style="display:flex;flex-direction:column;gap:24px">'+h+'</div></div>';
}
function scCard(l,c,o){
  var w=(o&&o.width)||'max-width:520px';
  return '<div><div class="tk-sc-card-label">'+l+'</div><div class="tk-sc-card" style="'+w+'">'+c+'</div></div>';
}

/* ═══ SHOWCASE: DOM 自动发现（弹层 / 隐藏 UI） ═══ */
var TK_DEFAULT_OVERLAY_SELECTORS=[
  '[id$="-overlay"]',
  '.quiz-overlay',
  '.quiz-result-overlay',
  '.vid-overlay',
  '.gm-overlay',
  '.tr-overlay'
];
var TK_DEFAULT_HIDDEN_SELECTORS=[
  '#side-nav',
  '#mobile-tab-bar',
  '#h2-empty-state',
  '#h2-station-dropdown',
  '[id*="empty-state"]'
];
function tkLiveSlidersApply(spec,v){
  var full=(spec.template||'').replace(/\{v\}/g,String(v));
  full.split(';').forEach(function(part){
    part=part.trim();
    if(!part) return;
    var ix=part.indexOf(':');
    if(ix<0) return;
    var prop=part.slice(0,ix).trim();
    var val=part.slice(ix+1).trim();
    try{
      D.querySelectorAll(spec.selector||'').forEach(function(el){
        el.style.setProperty(prop,val);
      });
    }catch(_e){}
  });
}
if(typeof W.liveSliders!=='function'){
  W.liveSliders=function(specs){
    if(!Array.isArray(specs)||specs.length===0){
      return '<p style="font-size:11px;color:rgba(255,255,255,.4)">暂无调参项</p>';
    }
    var boxId='tk-live-sliders-'+((''+Math.random()).slice(2));
    var html='<div id="'+boxId+'">';
    specs.forEach(function(spec,i){
      var smin=spec.min!=null?spec.min:0;
      var smax=spec.max!=null?spec.max:100;
      var sstep=spec.step!=null?spec.step:1;
      var sval=spec.value!=null?spec.value:smin;
      var lbl=tkEscHtml(spec.label||('项 '+(i+1)));
      html+='<div style="margin-bottom:14px">';
      html+='<div style="font-size:11px;color:rgba(255,255,255,.55);margin-bottom:6px">'+lbl+'</div>';
      html+='<div style="display:flex;align-items:center;gap:10px">';
      html+='<input type="range" data-tk-ls-idx="'+i+'" min="'+smin+'" max="'+smax+'" step="'+sstep+'" value="'+sval+'" style="flex:1;accent-color:var(--c-accent,#3b6bff)"/>';
      html+='<span class="tk-live-slider-num" style="font-family:Menlo,monospace;font-size:11px;color:rgba(255,255,255,.65);min-width:52px;text-align:right">'+sval+'</span>';
      html+='</div></div>';
    });
    html+='</div>';
    setTimeout(function(){
      var root=D.getElementById(boxId);
      if(!root) return;
      root.querySelectorAll('input[type=range][data-tk-ls-idx]').forEach(function(inp){
        var idx=parseInt(inp.getAttribute('data-tk-ls-idx'),10);
        var spec=specs[idx];
        if(!spec) return;
        function sync(){
          tkLiveSlidersApply(spec,inp.value);
          var sp=inp.parentNode&&inp.parentNode.querySelector('.tk-live-slider-num');
          if(sp) sp.textContent=inp.value;
        }
        inp.addEventListener('input',sync);
        inp.addEventListener('change',sync);
        sync();
      });
    },0);
    return html;
  };
}
/* 素材矩阵表（组件总览「素材映射」卡片） */
if(typeof W.assetMatrix!=='function'){
  W.assetMatrix=function(cfg){
    if(!cfg||!Array.isArray(cfg.rows)||!Array.isArray(cfg.cols)||!cfg.map){
      return '<p style="font-size:11px;color:rgba(255,255,255,.4)">assetMatrix: 需要 rows[] / cols[] / map</p>';
    }
    var rows=cfg.rows, cols=cfg.cols, map=cfg.map;
    var html='<div class="tk-asset-matrix" style="display:inline-block;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden;font-size:11px;margin-top:4px">';
    html+='<table style="border-collapse:collapse;border-spacing:0"><thead><tr>';
    html+='<th style="padding:8px;border:1px solid rgba(255,255,255,.08)"></th>';
    cols.forEach(function(c){
      html+='<th style="padding:8px 12px;border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.55);font-weight:600">'+tkEscHtml(String(c))+'</th>';
    });
    html+='</tr></thead><tbody>';
    rows.forEach(function(r,ri){
      html+='<tr><th scope="row" style="padding:8px 12px;border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.55);font-weight:600;text-align:left;white-space:nowrap">'+tkEscHtml(String(r))+'</th>';
      cols.forEach(function(_c,ci){
        var key=ri+'-'+ci;
        var src=map[key];
        html+='<td style="padding:12px;border:1px solid rgba(255,255,255,.08);text-align:center;vertical-align:middle;background:rgba(0,0,0,.25)">';
        if(src) html+='<img src="'+tkEscHtml(String(src))+'" alt="" style="max-width:88px;max-height:88px;object-fit:contain;display:block;margin:0 auto"/>';
        else html+='<span style="color:rgba(255,255,255,.25)">—</span>';
        html+='</td>';
      });
      html+='</tr>';
    });
    html+='</tbody></table></div>';
    return html;
  };
}
/* Token 审计（组件总览「运行审计」按钮 → window.tokenAudit()） */
if(typeof W.tokenAudit!=='function'){
  W.tokenAudit=function(){
    function skipAudit(el){
      if(!el||el.nodeType!==1) return true;
      var t=el.tagName;
      if(t==='SCRIPT'||t==='STYLE'||t==='NOSCRIPT'||t==='LINK'||t==='META'||t==='HEAD') return true;
      if(el.closest('#tk-toolbar,#tk-panel,#tk-overlay,#tk-style,#ins-panel,#ins-toolbar,#ins-tab,#ins-layer-picker,#ins-info')) return true;
      if(el.closest('#tk-showcase')) return true;
      return false;
    }
    function topEntries(obj,title,max){
      var k=Object.keys(obj).sort(function(a,b){ return (obj[b]-obj[a])||(a.localeCompare(b)); });
      var h='<div style="margin-bottom:14px"><div style="font-size:11px;font-weight:600;color:rgba(255,255,255,.78);margin-bottom:8px">'+tkEscHtml(title)+'</div>';
      k.slice(0,max).forEach(function(key){
        h+='<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;font-size:11px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06)">'
          +'<code style="flex:1;word-break:break-word;color:rgba(255,255,255,.65)">'+tkEscHtml(key)+'</code>'
          +'<span style="flex-shrink:0;color:rgba(255,255,255,.35)">'+obj[key]+'</span></div>';
      });
      if(k.length>max) h+='<div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:6px">… 另有 '+(k.length-max)+' 项未展示</div>';
      h+='</div>';
      return h;
    }
    var fonts={}, weights={}, colors={}, ffam={};
    var nodes=D.body.querySelectorAll('*');
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i];
      if(skipAudit(el)) continue;
      var cs=W.getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity||'1')===0) continue;
      var r=el.getBoundingClientRect();
      if(r.width<1&&r.height<1) continue;
      var fs=cs.fontSize, fw=cs.fontWeight, col=T.insRgbToHex(cs.color)||cs.color;
      var ff=(cs.fontFamily||'').split(',')[0].replace(/["']/g,'').trim()||'(unset)';
      fonts[fs]=(fonts[fs]||0)+1;
      weights[fw]=(weights[fw]||0)+1;
      colors[col]=(colors[col]||0)+1;
      ffam[ff]=(ffam[ff]||0)+1;
    }
    return '<div>'
      +'<p style="font-size:11px;color:rgba(255,255,255,.45);margin:0 0 8px;line-height:1.5">已排除工具栏 / 设计面板 / 组件总览等 Toolkit 区域，仅统计页面主体里<strong>可见</strong>节点（略去零尺寸）。</p>'
      +topEntries(fonts,'字号 font-size · 次数',24)
      +topEntries(weights,'字重 font-weight · 次数',12)
      +topEntries(colors,'文本色 color · 次数',28)
      +topEntries(ffam,'首项 font-family · 次数',14)
      +'</div>';
  };
}
function tkDiscoverSkip(el){
  if(!el||el.nodeType!==1) return true;
  if(el.getAttribute('data-tk-skip-discover')==='1') return true;
  if(el.closest('#tk-toolbar,#tk-panel,#tk-showcase,#tk-style,#ins-panel,#ins-toolbar,#ins-tab,#ins-layer-picker')) return true;
  var sid=el.id;
  if(sid==='tk-overlay'||sid==='ins-ss-overlay') return true;
  return false;
}
function tkCollectBySelectors(selectors){
  var seen=new Set();
  var list=[];
  selectors.forEach(function(sel){
    try{
      D.querySelectorAll(sel).forEach(function(el){
        if(tkDiscoverSkip(el)) return;
        if(seen.has(el)) return;
        seen.add(el);
        list.push(el);
      });
    }catch(_e){}
  });
  return list;
}
function tkApplyShowOverlay(el){
  if(el.classList.contains('tr-overlay')){
    el.classList.add('open');
    if(W.trRender) W.trRender();
    return;
  }
  if(el.classList.contains('gm-overlay')){
    el.classList.add('open');
    return;
  }
  if(el.classList.contains('quiz-overlay')){
    if(typeof W.openQuiz==='function') W.openQuiz();
    else { el.style.display='flex'; D.body.style.overflow='hidden'; }
    return;
  }
  if(el.classList.contains('quiz-result-overlay')){
    el.style.display='flex';
    return;
  }
  if(el.classList.contains('vid-overlay')){
    el.classList.add('open');
    D.body.style.overflow='hidden';
    if(typeof W.openVidPlayer==='function') W.openVidPlayer(0);
    return;
  }
  el.classList.add('open');
  var d=el.style.display;
  if(d==='none'||!d) el.style.display='flex';
}
function tkApplyHideOverlay(el){
  if(el.classList.contains('tr-overlay')||el.classList.contains('gm-overlay')){
    el.classList.remove('open');
    return;
  }
  if(el.classList.contains('quiz-overlay')){
    if(typeof W.closeQuiz==='function') W.closeQuiz();
    else { el.style.display='none'; D.body.style.overflow=''; }
    return;
  }
  if(el.classList.contains('quiz-result-overlay')){
    if(typeof W.closeQuizResult==='function') W.closeQuizResult();
    else el.style.display='none';
    return;
  }
  if(el.classList.contains('vid-overlay')){
    if(typeof W.closeVidPlayer==='function') W.closeVidPlayer();
    else { el.classList.remove('open'); D.body.style.overflow=''; }
    return;
  }
  el.classList.remove('open');
  if(el.style.display==='flex') el.style.display='none';
}
function tkApplyToggleHidden(el){
  var sid=el.id;
  if(sid==='side-nav'||sid==='mobile-tab-bar'){
    el.classList.toggle('visible');
    return;
  }
  if(sid==='h2-station-dropdown'){
    var tr=D.getElementById('h2-station-trigger');
    if(tr) tr.classList.toggle('open');
    return;
  }
  if(sid==='h2-empty-state'||(el.className&&String(el.className).indexOf('empty-state')>=0)){
    var cs=getComputedStyle(el).display;
    el.style.display=(cs==='none')?'flex':'none';
    return;
  }
  try{ el.scrollIntoView({behavior:'smooth',block:'center'}); }catch(_e){}
}
W._tkAutoShowOverlayByIndex=function(i){
  var arr=W.__TK_AUTO_OVERLAY_ELS;
  if(!arr||arr[i]==null) return;
  tkApplyShowOverlay(arr[i]);
};
W._tkAutoHideOverlayByIndex=function(i){
  var arr=W.__TK_AUTO_OVERLAY_ELS;
  if(!arr||arr[i]==null) return;
  tkApplyHideOverlay(arr[i]);
};
W._tkAutoToggleHiddenByIndex=function(i){
  var arr=W.__TK_AUTO_HIDDEN_ELS;
  if(!arr||arr[i]==null) return;
  tkApplyToggleHidden(arr[i]);
};
W._tkAutoScrollToHiddenByIndex=function(i){
  var arr=W.__TK_AUTO_HIDDEN_ELS;
  if(!arr||arr[i]==null) return;
  try{ arr[i].scrollIntoView({behavior:'smooth',block:'center'}); }catch(_e){}
};

/* ── 通用隐藏组件扫描（display:none / hidden / aria-hidden / .open 等） ── */
function tkIsHiddenEl(el){
  var cs;
  try{ cs=W.getComputedStyle(el); }catch(_e){ return false; }
  if(cs.display==='none') return true;
  if(cs.visibility==='hidden') return true;
  if(el.hasAttribute('hidden')) return true;
  if(el.getAttribute('aria-hidden')==='true') return true;
  /* 有 open class 机制但当前未 open */
  var cls=el.className&&typeof el.className==='string'?el.className:'';
  if((/overlay|modal|dialog|drawer|popup|popover|dropdown|toast|tooltip|sidebar|menu/i).test(el.id||'')||
     (/overlay|modal|dialog|drawer|popup|popover|dropdown|toast|tooltip|sidebar|menu/i).test(cls)){
    if(cs.display==='none'||cs.visibility==='hidden'||cs.opacity==='0'||cs.pointerEvents==='none') return true;
  }
  return false;
}
/* 判定元素是否为有意义的组件（排除空容器、内联小元素） */
function tkIsMeaningful(el){
  var tag=el.tagName;
  if(tag==='SCRIPT'||tag==='STYLE'||tag==='NOSCRIPT'||tag==='LINK'||tag==='META'||tag==='BR'||tag==='HR') return false;
  /* 至少有子节点或有内容 */
  if(el.children.length===0&&(el.textContent||'').trim().length<2) return false;
  return true;
}
/* 推断组件类型标签 */
function tkGuessType(el){
  var id=(el.id||'').toLowerCase();
  var cls=((el.className&&typeof el.className==='string')?el.className:'').toLowerCase();
  var tag=el.tagName.toLowerCase();
  var all=id+' '+cls+' '+tag;
  if(tag==='dialog'||/modal/i.test(all)) return 'Modal';
  if(/dialog/i.test(all)) return 'Dialog';
  if(/overlay/i.test(all)) return 'Overlay';
  if(/drawer/i.test(all)) return 'Drawer';
  if(/popup|popover/i.test(all)) return 'Popup';
  if(/dropdown|menu/i.test(all)) return 'Dropdown';
  if(/toast|notification|snack/i.test(all)) return 'Toast';
  if(/tooltip/i.test(all)) return 'Tooltip';
  if(/sidebar|side-nav/i.test(all)) return 'Sidebar';
  if(/tab-bar|tabbar|bottom-bar|mobile-nav/i.test(all)) return 'TabBar';
  if(/empty/i.test(all)) return 'Empty State';
  if(/header|navbar|nav-bar/i.test(all)) return 'Header';
  if(/footer/i.test(all)) return 'Footer';
  return 'Hidden';
}
/* 收集所有隐藏组件（通用扫描） */
function tkScanHiddenComponents(){
  var seen=new Set();
  var results=[];
  /* 1. 先匹配配置和默认选择器 */
  var oSels=(CFG.autoOverlaySelectors&&CFG.autoOverlaySelectors.length)?CFG.autoOverlaySelectors:TK_DEFAULT_OVERLAY_SELECTORS;
  var hSels=(CFG.autoHiddenSelectors&&CFG.autoHiddenSelectors.length)?CFG.autoHiddenSelectors:TK_DEFAULT_HIDDEN_SELECTORS;
  oSels.concat(hSels).forEach(function(sel){
    try{
      D.querySelectorAll(sel).forEach(function(el){
        if(tkDiscoverSkip(el)||seen.has(el)) return;
        seen.add(el); results.push(el);
      });
    }catch(_e){}
  });
  /* 2. 通用语义选择器 */
  var genericSels=[
    'dialog','[role="dialog"]','[role="alertdialog"]',
    '[class*="modal"]','[class*="Modal"]','[id*="modal"]','[id*="Modal"]',
    '[class*="overlay"]','[id*="overlay"]',
    '[class*="drawer"]','[id*="drawer"]',
    '[class*="popup"]','[class*="popover"]','[id*="popup"]','[id*="popover"]',
    '[class*="dropdown"]','[id*="dropdown"]',
    '[class*="toast"]','[id*="toast"]',
    '[class*="tooltip"]','[id*="tooltip"]',
    '[class*="sidebar"]','[id*="sidebar"]','[id*="side-nav"]',
    '[class*="tab-bar"]','[id*="tab-bar"]','[id*="mobile-tab"]',
    '[class*="empty-state"]','[id*="empty-state"]','[class*="empty_state"]',
    '[aria-hidden="true"]','[hidden]'
  ];
  genericSels.forEach(function(sel){
    try{
      D.querySelectorAll(sel).forEach(function(el){
        if(tkDiscoverSkip(el)||seen.has(el)||!tkIsMeaningful(el)) return;
        seen.add(el); results.push(el);
      });
    }catch(_e){}
  });
  /* 3. 遍历 body 直接子元素 + .page 内一级子元素，找 display:none 的 */
  var containers=[D.body];
  var pageEl=D.querySelector('.page');
  if(pageEl) containers.push(pageEl);
  containers.forEach(function(root){
    for(var i=0;i<root.children.length;i++){
      var el=root.children[i];
      if(tkDiscoverSkip(el)||seen.has(el)||!tkIsMeaningful(el)) continue;
      if(tkIsHiddenEl(el)){ seen.add(el); results.push(el); }
    }
  });
  return results;
}
/* 收集可见的页面区块 */
function tkScanVisibleSections(){
  var results=[];
  var seen=new Set();
  /* 匹配页面中的 section / 带语义的 div */
  var sectionSels=[
    '.page > section','.page > div','section[id]','[class*="hero"]','[class*="Hero"]',
    '[class*="section"]','[id*="section"]',
    '[class*="card-grid"]','[class*="task"]','[class*="banner"]',
    '[class*="rules"]','[class*="faq"]','[class*="notice"]',
    '[class*="cross-promo"]','[class*="footer"]'
  ];
  sectionSels.forEach(function(sel){
    try{
      D.querySelectorAll(sel).forEach(function(el){
        if(tkDiscoverSkip(el)||seen.has(el)||!tkIsMeaningful(el)) return;
        /* 只收集非隐藏的 */
        try{
          var cs=W.getComputedStyle(el);
          if(cs.display==='none'||cs.visibility==='hidden') return;
        }catch(_e){ return; }
        var r=el.getBoundingClientRect();
        if(r.height<20) return;
        seen.add(el); results.push(el);
      });
    }catch(_e){}
  });
  return results;
}
/* 构建克隆预览卡片（隐藏组件平铺展示） */
function tkBuildCloneCard(el,idx,type){
  var idDisp=el.id?('#'+tkEscHtml(el.id)):('&lt;'+el.tagName.toLowerCase()+'&gt;');
  var cls=el.className&&typeof el.className==='string'?el.className:String(el.className||'');
  if(cls.length>80) cls=cls.slice(0,80)+'…';
  var typeBadge='<span style="display:inline-block;padding:1px 6px;border-radius:4px;background:rgba(59,107,255,.2);color:#6b9fff;font-size:10px;font-weight:500;margin-left:6px">'+tkEscHtml(type)+'</span>';
  var label=idDisp+typeBadge;
  /* 克隆内容预览 */
  var previewHtml='';
  try{
    var clone=el.cloneNode(true);
    /* 移除克隆中的 script */
    clone.querySelectorAll('script').forEach(function(s){s.remove();});
    /* 强制可见 */
    clone.style.cssText='display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;pointer-events:none;max-height:400px;overflow:auto;transform:none!important;';
    clone.removeAttribute('hidden');
    clone.removeAttribute('aria-hidden');
    previewHtml='<div class="tk-sc-clone-wrap" data-tk-clone-idx="'+idx+'" style="border:1px solid rgba(255,255,255,.08);border-radius:8px;overflow:hidden;max-height:400px;margin-bottom:8px">'+clone.outerHTML+'</div>';
  }catch(_e){
    previewHtml='<p style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:8px">(克隆预览失败)</p>';
  }
  var meta='<p style="font-size:10px;color:rgba(255,255,255,.35);margin:0 0 8px;line-height:1.5;word-break:break-all">class: '+tkEscHtml(cls)+'</p>';
  var btns='<button type="button" style="padding:5px 10px;border-radius:6px;background:#3b6bff;color:#fff;border:none;cursor:pointer;font-size:11px;margin-right:6px" onclick="window._tkAutoShowOverlayByIndex('+idx+')">页面中显示</button>'
    +'<button type="button" style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.12);cursor:pointer;font-size:11px" onclick="window._tkAutoHideOverlayByIndex('+idx+')">隐藏</button>';
  return scCard(label,previewHtml+meta+btns,{width:'width:100%'});
}
/* 构建可见区块卡片 */
function tkBuildVisibleCard(el,idx){
  var idDisp=el.id?('#'+tkEscHtml(el.id)):('&lt;'+el.tagName.toLowerCase()+'&gt;');
  var cls=el.className&&typeof el.className==='string'?el.className:String(el.className||'');
  if(cls.length>80) cls=cls.slice(0,80)+'…';
  /* 提取首个标题作为描述 */
  var heading='';
  var h=el.querySelector('h1,h2,h3,h4');
  if(h) heading=tkEscHtml((h.textContent||'').trim().slice(0,60));
  var label=idDisp+(heading?' <span style="opacity:.55;font-weight:400;font-size:11px">'+heading+'</span>':'');
  var meta='<p style="font-size:10px;color:rgba(255,255,255,.35);margin:0 0 6px;word-break:break-all">class: '+tkEscHtml(cls)+'</p>';
  var r=el.getBoundingClientRect();
  var dims='<span style="font-family:Menlo,monospace;font-size:10px;color:rgba(255,255,255,.3)">'+Math.round(r.width)+'×'+Math.round(r.height)+'</span>';
  var btns='<button type="button" style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.12);cursor:pointer;font-size:11px" onclick="window._tkAutoScrollToHiddenByIndex('+idx+')">滚到视口</button> '+dims;
  return scCard(label,meta+btns,{});
}

function buildAutoDiscoverHtml(){
  var hiddenEls=tkScanHiddenComponents();
  var visibleEls=tkScanVisibleSections();
  W.__TK_AUTO_OVERLAY_ELS=hiddenEls;
  W.__TK_AUTO_HIDDEN_ELS=visibleEls;
  var chunks=[];
  /* 隐藏组件（克隆平铺展示） */
  if(hiddenEls.length){
    var cards=hiddenEls.map(function(el,idx){
      return tkBuildCloneCard(el,idx,tkGuessType(el));
    }).join('');
    chunks.push(scSection('隐藏组件 · 自动发现 <span style="font-size:12px;color:rgba(255,255,255,.4);font-weight:400">('+hiddenEls.length+' 个)</span>','auto-hidden',cards));
  }
  /* 可见区块 */
  if(visibleEls.length){
    var cardsV=visibleEls.map(function(el,idx){
      return tkBuildVisibleCard(el,idx);
    }).join('');
    var gridV='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">'+cardsV+'</div>';
    chunks.push(scSection('可见区块 · 页面结构 <span style="font-size:12px;color:rgba(255,255,255,.4);font-weight:400">('+visibleEls.length+' 个)</span>','auto-visible',gridV));
  }
  if(chunks.length===0) return '';
  return chunks.join('<div class="tk-sc-divider" style="margin:16px 0"></div>');
}

function buildShowcase(){
  var autoHtml=buildAutoDiscoverHtml();
  var hasManual=SC.length>0;
  var hasAuto=!!autoHtml;
  if(!hasManual&&!hasAuto){
    return '<div class="tk-sc-wrap"><div class="tk-sc-header"><h1 class="tk-sc-h1">Component Showcase</h1></div><div class="tk-sc-divider" style="margin-bottom:32px"></div><div class="tk-sc-empty"><div class="tk-sc-empty-title">暂无可展示组件</div><div class="tk-sc-empty-sub">使用 _sc() / scRegister() 注册，或确保页面存在 [id$="-overlay"] 等可识别节点</div></div></div>';
  }
  var parts=['<div class="tk-sc-wrap"><div class="tk-sc-header"><h1 class="tk-sc-h1">Component Showcase</h1></div><div class="tk-sc-divider" style="margin-bottom:32px"></div>'];
  if(hasManual){
    parts.push(SC.map(function(sec){
      var cards=sec.items.map(function(it){
        var h=typeof it.build==='function'?it.build():'';
        return it.raw?h:scCard(it.label,h,{width:it.width});
      }).join('');
      var grid=sec.cols>1?'<div style="display:grid;grid-template-columns:repeat('+sec.cols+',1fr);gap:24px">'+cards+'</div>':cards;
      return scSection(sec.title,sec.id,grid);
    }).join('<div class="tk-sc-divider" style="margin:16px 0"></div>'));
  }
  if(hasAuto){
    if(hasManual) parts.push('<div class="tk-sc-divider" style="margin:16px 0"></div>');
    parts.push(autoHtml);
  }
  parts.push('</div>');
  return parts.join('');
}

function tkWireShowcaseInlineHandlers(root){
  if(!root||!root.querySelectorAll) return;
  var list=root.querySelectorAll('[onclick]');
  for(var i=0;i<list.length;i++){
    var node=list[i];
    var oc=node.getAttribute('onclick');
    if(!oc||!String(oc).trim()) continue;
    node.removeAttribute('onclick');
    (function(n,code){
      n.addEventListener('click',function(ev){
        try{
          (new W.Function('event', code)).call(n,ev);
        }catch(err){
          console.error('[toolkit showcase onclick]',err);
        }
      });
    })(node,oc);
  }
}

var _scOn=false;
function enterShowcase(){
  var el=D.getElementById('tk-showcase');if(!el)return;
  var html;
  try{ html=buildShowcase(); }
  catch(err){
    console.error('[toolkit] buildShowcase failed',err);
    html='<div class="tk-sc-wrap"><div class="tk-sc-header"><h1 class="tk-sc-h1">Component Showcase</h1></div><div class="tk-sc-divider" style="margin-bottom:24px"></div>'
      +'<div style="padding:0 24px 24px;max-width:720px"><p style="color:#f87171;font-size:14px;margin-bottom:8px">组件总览生成失败</p>'
      +'<p style="font-size:12px;color:rgba(255,255,255,.5);line-height:1.6">'+tkEscHtml(err&&err.message?err.message:String(err))+'</p>'
      +'<pre style="margin-top:16px;padding:12px;border-radius:8px;background:rgba(0,0,0,.35);font-size:10px;color:rgba(255,255,255,.45);overflow:auto;max-height:240px">'+tkEscHtml(err&&err.stack?err.stack:'')+'</pre></div></div>';
  }
  el.innerHTML=html;
  tkWireShowcaseInlineHandlers(el);
  el.style.display='block';
  el.style.pointerEvents='auto';
  _scOn=true;
  var btnSc=D.getElementById('tk-btn-sc');
  if(btnSc) btnSc.textContent='返回页面';
  W.scrollTo(0,0); history.replaceState(null,'','#showcase');
}
function exitShowcase(){
  var el=D.getElementById('tk-showcase');if(el)el.style.display='none';
  _scOn=false;
  D.getElementById('tk-btn-sc').textContent='组件总览';
  W.scrollTo(0,0); history.replaceState(null,'',location.pathname+location.search);
}
function toggleShowcase(){_scOn?exitShowcase():enterShowcase();}

/* ═══ EXPORTS ═══ */
T.scOn = function(){ return _scOn; };
T.enterShowcase = enterShowcase;
T.exitShowcase = exitShowcase;
T.toggleShowcase = toggleShowcase;
T.scSection = scSection;
T.scCard = scCard;

})(window,document);
