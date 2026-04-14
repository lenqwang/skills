;(function(W,D){'use strict';
var T=W.__TK, INS=T.INS;
var getVar=T.getVar, setVar=T.setVar, getSelector=T.getSelector;
var isToolkitEl=T.isToolkitEl, getElRect=T.getElRect;
var insRgbToHex=T.insRgbToHex, insHexLum=T.insHexLum;
var LABELS=T.LABELS, _vars=T._vars;

/* ═══ INSPECTOR / ANNOTATION MODE ═══ */

function insInjectCSS(){
  var s=D.getElementById('ins-style');
  if(s) return;
  s=D.createElement('style');s.id='ins-style';
  s.textContent=[
    '.ins-highlight-box{position:absolute;pointer-events:none;z-index:10249;border:2px solid #3B82F6;background:rgba(59,130,246,.08);transition:all .05s;border-radius:2px}',
    '.ins-highlight-box::after{content:attr(data-tag);position:absolute;top:-22px;left:0;padding:2px 8px;border-radius:4px;font-size:10px;font-family:monospace;color:#fff;background:#3B82F6;white-space:nowrap;line-height:16px}',
    '#ins-info{position:fixed;z-index:10252;pointer-events:none;min-width:220px;max-width:320px;background:rgba(13,15,20,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 12px;font-family:Inter,system-ui,sans-serif;font-size:11px;color:rgba(255,255,255,.7);line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.5);display:none}',
    '#ins-info .ins-i-tag{font-size:11px;font-weight:600;color:#3B82F6;font-family:monospace;margin-bottom:6px}',
    '#ins-info .ins-i-size{font-size:10px;color:rgba(255,255,255,.4);margin-bottom:6px}',
    '#ins-info .ins-i-row{display:flex;align-items:center;gap:6px;margin-top:3px}',
    '#ins-info .ins-i-swatch{width:12px;height:12px;border-radius:2px;border:1px solid rgba(255,255,255,.15);flex-shrink:0}',
    '#ins-info .ins-i-label{color:rgba(255,255,255,.35);width:32px;flex-shrink:0;font-size:10px}',
    '#ins-info .ins-i-val{color:rgba(255,255,255,.7);font-family:monospace;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '#ins-info .ins-i-var{color:#10B981;font-size:10px}',
    '#ins-info .ins-i-sep{height:1px;background:rgba(255,255,255,.06);margin:6px 0}',
    '.ins-sel-box{position:absolute;pointer-events:none;z-index:10248;border:2px solid #F59E0B;background:rgba(245,158,11,.06);border-radius:2px}',
    '.ins-sel-badge{position:absolute;top:-10px;right:-10px;width:20px;height:20px;border-radius:50%;background:#F59E0B;color:#000;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;pointer-events:none}',
    '.ins-pinned-box{position:absolute;pointer-events:none;z-index:10246;border:2px solid #10B981;background:rgba(16,185,129,.08);border-radius:2px}',
    '.ins-pinned-badge{position:absolute;top:-12px;right:-12px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:#10B981;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;pointer-events:auto;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3)}',
    '.ins-pinned-badge:hover{transform:scale(1.15)}',
    '.ins-pinned-tip{position:absolute;bottom:-24px;left:0;max-width:200px;padding:2px 8px;border-radius:4px;font-size:10px;color:#fff;background:rgba(16,185,129,.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;line-height:18px}',
    '.ins-comment-pop{position:fixed;z-index:10250;width:320px;background:#1a1c22;border:1px solid rgba(255,255,255,.12);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif;overflow:hidden}',
    '.ins-comment-pop textarea{width:100%;height:72px;padding:12px;border:none;background:transparent;color:#fff;font-size:13px;font-family:Inter,system-ui,sans-serif;resize:vertical;outline:none}',
    '.ins-comment-pop textarea::placeholder{color:rgba(255,255,255,.3)}',
    '.ins-act-bar{display:flex;gap:4px;padding:8px 12px 4px;flex-wrap:wrap}',
    '.ins-act-btn{padding:4px 10px;border-radius:5px;font-size:10px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.45);transition:all .15s;line-height:1.4}',
    '.ins-act-btn:hover{border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7)}',
    '.ins-act-btn.active{background:#3B82F6;border-color:#3B82F6;color:#fff}',
    '.ins-act-btn[data-act="delete"].active{background:#EF4444;border-color:#EF4444}',
    '.ins-act-btn[data-act="insert-before"].active,.ins-act-btn[data-act="insert-after"].active{background:#10B981;border-color:#10B981}',
    '.ins-act-btn[data-act="replace"].active{background:#F59E0B;border-color:#F59E0B;color:#000}',
    '.ins-pop-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid rgba(255,255,255,.06)}',
    '.ins-pop-btn{padding:6px 14px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;border:none}',
    '.ins-pop-save{background:#3B82F6;color:#fff}',
    '.ins-pop-save:hover{background:#2563EB}',
    '.ins-pop-cancel{background:transparent;color:rgba(255,255,255,.4)}',
    '.ins-pop-cancel:hover{color:rgba(255,255,255,.7)}',
    '#ins-panel{position:fixed;top:0;left:0;z-index:10260;height:100%;width:280px;transform:translateX(-100%);transition:transform .3s ease-in-out;background:#0D0F14;border-right:1px solid rgba(255,255,255,.08);font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column}',
    '#ins-panel.open{transform:translateX(0)}',
    '#ins-tab{position:fixed;top:50%;left:0;z-index:10261;transform:translateY(-50%);transition:left .3s ease-in-out;writing-mode:vertical-rl;padding:12px 6px;border-radius:0 8px 8px 0;background:#0D0F14;border:1px solid rgba(255,255,255,.08);border-left:none;color:rgba(255,255,255,.6);font-size:11px;font-weight:600;cursor:pointer;font-family:Inter,system-ui,sans-serif;letter-spacing:.05em;display:flex;align-items:center;gap:6px}',
    '#ins-tab:hover{color:#fff;background:#1a1c22}',
    '#ins-tab.shifted{left:280px}',
    '.ins-tab-count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#3B82F6;color:#fff;font-size:10px;font-weight:700;writing-mode:horizontal-tb}',
    '.ins-ann-card{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.06);cursor:pointer;transition:background .15s}',
    '.ins-ann-card:hover{background:rgba(255,255,255,.04)}',
    '.ins-ann-sel{font-size:10px;font-family:monospace;color:rgba(255,255,255,.35);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ins-ann-txt{font-size:13px;color:rgba(255,255,255,.8);margin-top:4px;line-height:1.5}',
    '.ins-ann-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:6px;font-size:10px;color:rgba(255,255,255,.25)}',
    '.ins-ann-actions{margin-left:auto;display:flex;align-items:center;gap:6px;flex-shrink:0}',
    '.ins-ann-edit{padding:2px 8px;border-radius:4px;font-size:10px;color:rgba(255,255,255,.35);background:rgba(255,255,255,.04);border:none;cursor:pointer}',
    '.ins-ann-edit:hover{color:#3B82F6;background:rgba(59,130,246,.12)}',
    '.ins-ann-del{padding:2px 8px;border-radius:4px;font-size:10px;color:rgba(255,255,255,.3);background:rgba(255,255,255,.04);border:none;cursor:pointer}',
    '.ins-ann-del:hover{color:#EF4444;background:rgba(239,68,68,.1)}',
    '.ins-badge-float{position:absolute;z-index:10247;width:22px;height:22px;border-radius:50%;background:#F59E0B;color:#000;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:transform .15s}',
    '.ins-badge-float:hover{transform:scale(1.2)}',
    '#ins-toolbar-hint{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:10271;padding:8px 20px;border-radius:8px;background:rgba(59,130,246,.9);color:#fff;font-size:12px;font-family:Inter,system-ui,sans-serif;pointer-events:none;opacity:0;transition:opacity .3s}',
    '#ins-toolbar-hint.show{opacity:1;pointer-events:auto}',
    '#ins-layer-picker{position:fixed;z-index:10255;min-width:200px;max-width:320px;background:rgba(13,15,20,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:4px 0;font-family:Inter,system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.6)}',
    '.ins-lp-title{padding:8px 12px 6px;font-size:10px;font-weight:600;color:rgba(255,255,255,.35);letter-spacing:.05em;text-transform:uppercase}',
    '.ins-lp-row{display:flex;align-items:center;justify-content:space-between;padding:6px 12px;cursor:pointer;transition:background .1s}',
    '.ins-lp-row:hover{background:rgba(59,130,246,.15)}',
    '.ins-lp-tag{font-size:11px;font-family:monospace;color:rgba(255,255,255,.8);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px}',
    '.ins-lp-dim{font-size:10px;color:rgba(255,255,255,.3);font-family:monospace;white-space:nowrap;margin-left:8px}',
    '#ins-shortcuts{padding:10px 16px;border-top:1px solid rgba(255,255,255,.06);font-family:Inter,system-ui,sans-serif}',
    '#ins-shortcuts .ins-sc-title{font-size:10px;font-weight:600;color:rgba(255,255,255,.25);margin-bottom:6px;letter-spacing:.04em}',
    '#ins-shortcuts .ins-sc-row{display:flex;justify-content:space-between;align-items:center;padding:2px 0}',
    '#ins-shortcuts .ins-sc-key{font-size:10px;font-family:monospace;color:rgba(255,255,255,.5);background:rgba(255,255,255,.06);padding:1px 6px;border-radius:3px;border:1px solid rgba(255,255,255,.08)}',
    '#ins-shortcuts .ins-sc-desc{font-size:10px;color:rgba(255,255,255,.35)}',
    '#ins-breadcrumb{position:fixed;bottom:0;left:0;right:0;z-index:10255;height:28px;display:none;align-items:center;gap:2px;padding:0 12px;background:rgba(13,15,20,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,.1);font-family:monospace;font-size:11px;overflow-x:auto;white-space:nowrap;scrollbar-width:none}',
    '#ins-breadcrumb::-webkit-scrollbar{display:none}',
    '#ins-breadcrumb.show{display:flex}',
    '.ins-bc-item{color:rgba(255,255,255,.45);cursor:pointer;padding:2px 4px;border-radius:3px;transition:all .1s;flex-shrink:0}',
    '.ins-bc-item:hover{color:rgba(255,255,255,.8);background:rgba(255,255,255,.08)}',
    '.ins-bc-item.ins-bc-active{color:#3B82F6;font-weight:600}',
    '.ins-bc-sep{color:rgba(255,255,255,.15);padding:0 1px;flex-shrink:0}',
    '.ins-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.06)}',
    '.ins-panel-title{font-size:13px;font-weight:600;color:#fff}',
    '.ins-panel-actions{display:flex;gap:6px}',
    '.ins-btn-share{padding:5px 10px;border-radius:6px;font-size:10px;font-weight:500;color:#10B981;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.15);cursor:pointer;transition:all .15s}',
    '.ins-btn-share:hover{background:rgba(16,185,129,.15);border-color:rgba(16,185,129,.3)}',
    '.ins-btn-sm{padding:5px 10px;border-radius:6px;font-size:10px;font-weight:500;color:rgba(255,255,255,.55);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:all .15s}',
    '.ins-btn-sm:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8)}',
    '.ins-btn-sm.danger:hover{color:#EF4444;border-color:rgba(239,68,68,.2);background:rgba(239,68,68,.06)}',
    '.ins-panel-list{flex:1;overflow-y:auto;scrollbar-width:thin}',
    '.ins-panel-footer{padding:10px 16px;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:8px}',
    '.ins-btn-apply{flex:1;padding:10px;border-radius:8px;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(135deg,#3B82F6,#8B5CF6);border:none;cursor:pointer;box-shadow:0 2px 12px rgba(59,130,246,.25);transition:all .2s}',
    '.ins-btn-apply:hover{opacity:.9;box-shadow:0 4px 16px rgba(59,130,246,.35)}',
    '.ins-empty{padding:40px 20px;text-align:center;color:rgba(255,255,255,.2);font-size:13px}',
    '.ins-empty-sub{font-size:11px;margin-top:4px;display:block;color:rgba(255,255,255,.12)}',
    '.ins-ann-action{display:inline-block;padding:1px 6px;border-radius:3px;font-size:9px;font-weight:700;color:#fff;margin-right:4px}',
    '.ins-ann-id{color:#F59E0B;margin-right:4px}',
    '.ins-pop-attach{padding:0 12px 8px;display:flex;gap:8px;align-items:center}',
    '.ins-pop-attach-hint{font-size:9px;color:rgba(255,255,255,.25)}',
    '.ins-pop-file-btn{font-size:10px;padding:3px 8px;cursor:pointer}',
    '.ins-relation-title{font-size:10px;font-weight:600;color:#F59E0B;margin-bottom:4px}',
    '.ins-sel-box{cursor:grab}',
    '.ins-sel-box.dragging{cursor:grabbing;border-style:dashed;opacity:.7}',
    '.ins-sel-box.resizing{border-style:dashed;opacity:.8}',
    '.ins-drag-hint{position:fixed;bottom:40px;left:50%;transform:translateX(-50%);z-index:10272;padding:6px 16px;border-radius:6px;background:rgba(245,158,11,.9);color:#000;font-size:11px;font-weight:600;font-family:Inter,system-ui,sans-serif;pointer-events:none;opacity:0;transition:opacity .2s}',
    '.ins-drag-hint.show{opacity:1}',
    '.ins-ctx-bar{position:absolute;z-index:10253;display:flex;align-items:center;gap:3px;padding:4px 6px;border-radius:10px;background:rgba(13,15,20,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);box-shadow:0 4px 20px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif;pointer-events:auto;flex-wrap:wrap;max-width:calc(100vw - 24px)}',
    '.ins-ctx-btn{position:relative;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:7px;border:none;background:transparent;color:rgba(255,255,255,.55);font-size:14px;cursor:pointer;transition:all .12s;padding:0;line-height:1}',
    '.ins-ctx-btn:hover{background:rgba(255,255,255,.1);color:#fff}',
    '.ins-ctx-btn.active{background:#3B82F6;color:#fff}',
    '.ins-ctx-btn::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%) scale(.92);padding:4px 8px;border-radius:5px;background:rgba(13,15,20,.95);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:10px;white-space:nowrap;pointer-events:none;opacity:0;transition:all .15s ease;letter-spacing:.02em}',
    '.ins-ctx-btn:hover::after{opacity:1;transform:translateX(-50%) scale(1)}',
    '.ins-ctx-sep{width:1px;height:20px;background:rgba(255,255,255,.1);margin:0 3px}',
    '.ins-type-badge{position:absolute;z-index:10250;padding:1px 5px;border-radius:3px;font-size:9px;font-weight:700;font-family:Inter,system-ui,sans-serif;pointer-events:none;line-height:14px;letter-spacing:.02em}',
    '.ins-type-badge.type-text{background:rgba(16,185,129,.85);color:#fff}',
    '.ins-type-badge.type-color{background:rgba(168,85,247,.85);color:#fff}',
    '.ins-type-badge.type-image{background:rgba(245,158,11,.85);color:#000}',
    '.ins-hl-text .ins-highlight-box{border-color:#10B981;border-style:dashed}',
    '.ins-hl-color .ins-highlight-box{border-color:#A855F7}',
    '.ins-hl-image .ins-highlight-box{border-color:#F59E0B}',
    '.ins-inline-edit{outline:2px solid #10B981;outline-offset:2px;border-radius:2px;min-width:20px;cursor:text !important}',
    '.ins-color-picker{position:absolute;z-index:10254;padding:8px;border-radius:10px;background:rgba(13,15,20,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);box-shadow:0 8px 32px rgba(0,0,0,.6);font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;gap:8px;pointer-events:auto}',
    '.ins-cp-preview{display:flex;align-items:center;gap:8px}',
    '.ins-cp-swatch{width:32px;height:32px;border-radius:6px;border:2px solid rgba(255,255,255,.15);cursor:pointer;flex-shrink:0}',
    '.ins-cp-val{font-size:11px;font-family:monospace;color:rgba(255,255,255,.7)}',
    '.ins-cp-input{width:0;height:0;opacity:0;position:absolute;pointer-events:none}',
    '.ins-cp-actions{display:flex;gap:4px;justify-content:flex-end}',
    '.ins-cp-btn{padding:4px 10px;border-radius:5px;font-size:10px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.5);transition:all .12s}',
    '.ins-cp-btn:hover{background:rgba(255,255,255,.1);color:#fff}',
    '.ins-cp-btn.primary{background:#3B82F6;border-color:#3B82F6;color:#fff}',
    '.ins-cp-btn.primary:hover{background:#2563EB}',
    '.ins-cp-token{opacity:.85}',
    '.ins-cp-token:hover{opacity:1;transform:scale(1.15);z-index:1}',
    '.ins-cp-token.active{border-color:#fff !important;opacity:1;box-shadow:0 0 0 1px rgba(255,255,255,.4)}',
    '.tk-guide{position:fixed;z-index:10290;pointer-events:none;background:#FF1493}',
    '.tk-guide-h{height:2px}',
    '.tk-guide-v{width:2px}',
    '.tk-guide.snap{background:#FF1493;box-shadow:0 0 10px rgba(255,20,147,.7)}',
    '.tk-dist-label{position:fixed;z-index:10291;pointer-events:none;padding:2px 8px;border-radius:4px;background:rgba(255,20,147,.9);color:#fff;font-size:11px;font-weight:700;font-family:Inter,system-ui,sans-serif;white-space:nowrap;line-height:1.4}',
    '.tk-dist-label.snap{background:#FF1493;box-shadow:0 0 10px rgba(255,20,147,.6)}',
    '.tk-dist-line{position:fixed;z-index:10289;pointer-events:none;background:rgba(255,20,147,.5)}',
    '.tk-dist-line.snap{background:#FF1493;box-shadow:0 0 8px rgba(255,20,147,.5)}',
    '.tk-dist-line-h{height:1px}',
    '.tk-dist-line-v{width:1px}'
  ].join('\n');
  D.head.appendChild(s);
}

function insCreateHL(){
  INS.hlBox=D.createElement('div');
  INS.hlBox.className='ins-highlight-box';
  INS.hlBox.style.display='none';
  D.body.appendChild(INS.hlBox);
  INS.infoEl=D.createElement('div');
  INS.infoEl.id='ins-info';
  D.body.appendChild(INS.infoEl);
  if(!D.getElementById('ins-breadcrumb')){
    var bc=D.createElement('div');bc.id='ins-breadcrumb';
    D.body.appendChild(bc);
  }
}

function insTraceVar(el,prop){
  var cur=el;
  while(cur && cur!==D.documentElement){
    var style=cur.getAttribute('style')||'';
    var re=new RegExp(prop+'\\s*:\\s*var\\((--[\\w-]+)');
    var m=re.exec(style);
    if(m) return m[1];
    var sheets=D.styleSheets;
    try{
      for(var i=sheets.length-1;i>=0;i--){
        var rules;try{rules=sheets[i].cssRules||[];}catch(e){continue;}
        for(var j=rules.length-1;j>=0;j--){
          var r=rules[j];
          if(!r.style||!r.selectorText) continue;
          try{if(!cur.matches(r.selectorText))continue;}catch(e){continue;}
          var val=r.style.getPropertyValue(prop);
          if(val){
            var vm=/var\((--[\w-]+)/.exec(val);
            if(vm) return vm[1];
          }
        }
      }
    }catch(e){}
    cur=cur.parentElement;
  }
  return null;
}

function insHexLum(hex){
  if(!hex||hex.length<7) return 0;
  var r=parseInt(hex.substr(1,2),16)/255,g=parseInt(hex.substr(3,2),16)/255,b=parseInt(hex.substr(5,2),16)/255;
  return 0.299*r+0.587*g+0.114*b;
}

function insRgbToHex(rgb){
  if(!rgb||rgb==='transparent'||rgb.indexOf('rgb')<0) return rgb;
  var m=rgb.match(/\d+/g);
  if(!m||m.length<3) return rgb;
  return '#'+m.slice(0,3).map(function(n){return ('0'+parseInt(n).toString(16)).slice(-2);}).join('').toUpperCase();
}

function insBuildInfo(el){
  var cs=getComputedStyle(el);
  var tag=el.tagName.toLowerCase();
  if(el.className&&typeof el.className==='string'){
    var cls=el.className.split(/\s+/).filter(function(c){return c.indexOf('tk-')!==0&&c.indexOf('ins-')!==0;}).slice(0,3).join('.');
    if(cls)tag+='.'+cls;
  }
  var rect=el.getBoundingClientRect();
  var w=Math.round(rect.width);
  var h=Math.round(rect.height);

  var rows='<div class="ins-i-tag">'+tag+'</div>';
  rows+='<div class="ins-i-size">'+w+' × '+h+' px';
  var pad=cs.padding;if(pad&&pad!=='0px') rows+='  |  pad: '+pad;
  var gap=cs.gap;if(gap&&gap!=='normal') rows+='  |  gap: '+gap;
  rows+='</div>';

  var pos=cs.position;
  rows+='<div class="ins-i-row"><span class="ins-i-label">pos</span><span class="ins-i-val">'+pos;
  if(pos!=='static'){
    var t=cs.top,l=cs.left,b=cs.bottom,r=cs.right;
    var parts=[];
    if(t&&t!=='auto') parts.push('T:'+t);
    if(l&&l!=='auto') parts.push('L:'+l);
    if(b&&b!=='auto') parts.push('B:'+b);
    if(r&&r!=='auto') parts.push('R:'+r);
    if(parts.length) rows+=' ('+parts.join(' ')+')';
  }
  rows+='</span></div>';

  rows+='<div class="ins-i-row"><span class="ins-i-label">xy</span><span class="ins-i-val">x:'+Math.round(rect.left)+' y:'+Math.round(rect.top)+' (viewport)</span></div>';

  var pEl=el.offsetParent;
  if(pEl){
    var pTag=pEl.tagName.toLowerCase();
    if(pEl.className&&typeof pEl.className==='string'){
      var pCls=pEl.className.split(/\s+/).filter(function(c){return c.indexOf('tk-')!==0&&c.indexOf('ins-')!==0;}).slice(0,2).join('.');
      if(pCls) pTag+='.'+pCls;
    }
    rows+='<div class="ins-i-row"><span class="ins-i-label">off</span><span class="ins-i-val">T:'+el.offsetTop+'px L:'+el.offsetLeft+'px → '+pTag+'</span></div>';
  }

  rows+='<div class="ins-i-sep"></div>';

  if(INS.selections.length>0){
    var lastSel=INS.selections[INS.selections.length-1];
    if(lastSel.el!==el){
      var sr=lastSel.el.getBoundingClientRect();
      var gapH=Math.round(rect.left-sr.right);
      var gapV=Math.round(rect.top-sr.bottom);
      if(gapH<0) gapH=Math.round(sr.left-rect.right);
      if(gapV<0) gapV=Math.round(sr.top-rect.bottom);
      var overlapX=!(rect.right<sr.left||rect.left>sr.right);
      var overlapY=!(rect.bottom<sr.top||rect.top>sr.bottom);
      rows+='<div class="ins-i-sep"></div>';
      rows+='<div class="ins-relation-title">↔ 与选中 #'+lastSel.num+' 的关系</div>';
      if(overlapX){
        var dy=Math.round(rect.top-sr.top);
        var dBottom=Math.round(rect.top-sr.bottom);
        rows+='<div class="ins-i-row"><span class="ins-i-label" style="color:#F59E0B">↕ V</span><span class="ins-i-val">间距:'+dBottom+'px | 顶部差:'+dy+'px</span></div>';
      }
      if(overlapY){
        var dx=Math.round(rect.left-sr.left);
        var dRight=Math.round(rect.left-sr.right);
        rows+='<div class="ins-i-row"><span class="ins-i-label" style="color:#F59E0B">↔ H</span><span class="ins-i-val">间距:'+dRight+'px | 左侧差:'+dx+'px</span></div>';
      }
      if(!overlapX&&!overlapY){
        rows+='<div class="ins-i-row"><span class="ins-i-label" style="color:#F59E0B">gap</span><span class="ins-i-val">H:'+gapH+'px V:'+gapV+'px</span></div>';
      }
      rows+='<div class="ins-i-sep"></div>';
    }
  }

  var color=cs.color;
  var colorHex=insRgbToHex(color);
  var colorVar=insTraceVar(el,'color');
  rows+='<div class="ins-i-row"><div class="ins-i-swatch" style="background:'+color+'"></div><span class="ins-i-label">color</span><span class="ins-i-val">'+colorHex+'</span>';
  if(colorVar) rows+=' <span class="ins-i-var">'+colorVar+'</span>';
  rows+='</div>';

  var bg=cs.backgroundColor;
  if(bg&&bg!=='rgba(0, 0, 0, 0)'){
    var bgHex=insRgbToHex(bg);
    var bgVar=insTraceVar(el,'background')||insTraceVar(el,'background-color');
    rows+='<div class="ins-i-row"><div class="ins-i-swatch" style="background:'+bg+'"></div><span class="ins-i-label">bg</span><span class="ins-i-val">'+bgHex+'</span>';
    if(bgVar) rows+=' <span class="ins-i-var">'+bgVar+'</span>';
    rows+='</div>';
  }

  var fs=cs.fontSize,fw=cs.fontWeight,lh=cs.lineHeight;
  rows+='<div class="ins-i-row"><span class="ins-i-label">font</span><span class="ins-i-val">'+fs+' / '+fw+' / lh:'+lh+'</span></div>';

  var br=cs.borderRadius;
  if(br&&br!=='0px'){
    var brVar=insTraceVar(el,'border-radius');
    rows+='<div class="ins-i-row"><span class="ins-i-label">rad</span><span class="ins-i-val">'+br+'</span>';
    if(brVar) rows+=' <span class="ins-i-var">'+brVar+'</span>';
    rows+='</div>';
  }

  var disp=cs.display;
  if(disp!=='block'||pos!=='static'){
    rows+='<div class="ins-i-row"><span class="ins-i-label">lay</span><span class="ins-i-val">'+disp+(pos!=='static'?' / '+pos:'')+'</span></div>';
  }

  var op=cs.opacity;
  if(op!=='1'){
    rows+='<div class="ins-i-row"><span class="ins-i-label">opa</span><span class="ins-i-val">'+op+'</span></div>';
  }

  return rows;
}

function insShowHL(el){
  if(!INS.hlBox) return;
  var r=getElRect(el);
  INS.hlBox.style.display='block';
  INS.hlBox.style.top=r.top+'px';INS.hlBox.style.left=r.left+'px';
  INS.hlBox.style.width=r.width+'px';INS.hlBox.style.height=r.height+'px';
  var tag=el.tagName.toLowerCase();
  if(el.className && typeof el.className==='string'){
    var cls=el.className.split(/\s+/).filter(function(c){return c.indexOf('tk-')!==0 && c.indexOf('ins-')!==0;}).slice(0,2).join('.');
    if(cls) tag+='.'+cls;
  }
  INS.hlBox.setAttribute('data-tag',tag);

  if(INS.infoEl){
    cancelAnimationFrame(INS.infoRAF);
    INS.infoRAF=requestAnimationFrame(function(){
      INS.infoEl.innerHTML=insBuildInfo(el);
      INS.infoEl.style.display='block';
      var vr=el.getBoundingClientRect();
      var iw=260,ih=INS.infoEl.offsetHeight||160;
      var top=vr.bottom+8,left=vr.right+8;
      if(left+iw>W.innerWidth) left=vr.left-iw-8;
      if(left<4) left=4;
      if(top+ih>W.innerHeight) top=Math.max(4,vr.top-ih-8);
      INS.infoEl.style.top=top+'px';INS.infoEl.style.left=left+'px';
    });
  }
}

function insHideHL(){
  if(INS.hlBox) INS.hlBox.style.display='none';
  if(INS.infoEl) INS.infoEl.style.display='none';
}

function insGetElType(el){
  if(el.tagName==='IMG') return 'image';
  var cs=getComputedStyle(el);
  if(cs.backgroundImage&&cs.backgroundImage!=='none'&&el.children.length===0&&el.textContent.trim().length===0) return 'image';
  var hasText=el.childElementCount===0&&el.textContent.trim().length>0;
  if(hasText) return 'text';
  var bg=cs.backgroundColor;
  if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'&&el.textContent.trim().length===0&&el.offsetWidth<300&&el.offsetHeight<300) return 'color';
  return 'generic';
}

function insShowTypeBadge(el,type){
  insHideTypeBadge();
  if(type==='generic') return;
  INS.typeBadge=D.createElement('div');
  INS.typeBadge.className='ins-type-badge type-'+type;
  var labels={text:'T',color:'C',image:'IMG'};
  INS.typeBadge.textContent=labels[type]||'';
  var r=el.getBoundingClientRect();
  INS.typeBadge.style.top=(r.top+W.scrollY-16)+'px';
  INS.typeBadge.style.left=(r.left+W.scrollX+r.width-20)+'px';
  D.body.appendChild(INS.typeBadge);
}
function insHideTypeBadge(){
  if(INS.typeBadge&&INS.typeBadge.parentNode) INS.typeBadge.parentNode.removeChild(INS.typeBadge);
  INS.typeBadge=null;
}

function insOnHover(e){
  if(!INS.on||INS.inlineEditing) return;
  var el=e.target;
  if(isToolkitEl(el)){insHideHL();INS.hoverEl=null;insHideTypeBadge();return;}
  var deep=_deepProbe(e.clientX,e.clientY,el);
  if(deep) el=deep;
  INS.hoverEl=el;
  INS.navEl=el;
  var type=insGetElType(el);
  var cursorMap={text:'text',color:'crosshair',image:'pointer',generic:'crosshair'};
  e.target.style.cursor=cursorMap[type]||'crosshair';
  if(INS.hlBox){
    INS.hlBox.classList.remove('ins-hl-text','ins-hl-color','ins-hl-image');
    if(type!=='generic') INS.hlBox.classList.add('ins-hl-'+type);
  }
  insShowHL(el);
  insShowTypeBadge(el,type);
  T.insBuildBreadcrumb(el);
}

function _deepProbe(cx,cy,surface){
  var tag=surface.tagName;
  var isContainer=tag==='SECTION'||tag==='DIV'||tag==='MAIN'||tag==='ARTICLE'||tag==='HEADER'||tag==='FOOTER'||tag==='NAV';
  if(!isContainer) return null;
  var node=surface;
  var best=null, bestArea=0;
  while(node&&node!==D.body&&node!==D.documentElement){
    var children=node.children;
    for(var i=0;i<children.length;i++){
      var x=children[i];
      if(x===surface||isToolkitEl(x)) continue;
      var cs=getComputedStyle(x);
      if(cs.pointerEvents!=='none'||cs.display==='none'||cs.visibility==='hidden') continue;
      var r=x.getBoundingClientRect();
      if(r.width<=0||r.height<=0) continue;
      if(cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom){
        var area=r.width*r.height;
        if(area>bestArea){best=x;bestArea=area;}
      }
    }
    if(best) return best;
    node=node.parentElement;
  }
  return null;
}

function insOnClick(e){
  if(!INS.on||INS.inlineEditing) return;
  if(e.detail>=2) return;
  var el=e.target;
  if(isToolkitEl(el)) return;
  e.preventDefault();e.stopPropagation();
  INS._clickX=e.clientX;INS._clickY=e.clientY;
  insHideColorPicker();insHidePropPanel();

  /* Alt+Click: 图层穿透选择（同 Figma deep-select） */
  if(e.altKey){
    var allEls=D.elementsFromPoint(e.clientX,e.clientY).filter(function(x){
      return !isToolkitEl(x) && x!==D.body && x!==D.documentElement;
    });
    if(allEls.length>1){ insShowLayerPicker(e.clientX,e.clientY,allEls); return; }
  }

  var deep=_deepProbe(e.clientX,e.clientY,el);
  if(deep) el=deep;

  /* Shift+Click: 追加/移除（Figma 多选） */
  if(e.shiftKey){
    insToggleSelectOnly(el);
    if(INS.selections.length===0){insHideColorPicker();insHidePropPanel();}
    insUpdateCtxBar();
    return;
  }

  /* 普通 Click: 替换选中（Figma 单选） */
  var alreadySelected=INS.selections.findIndex(function(s){return s.el===el;})>=0;
  if(alreadySelected && INS.selections.length===1){
    T.insClearSelections();
    insHideCtxBar();insHideColorPicker();insHidePropPanel();
  } else {
    T.insClearSelections();
    insAddSelection(el);
    insUpdateCtxBar();
  }
}

function insOnDblClick(e){
  if(!INS.on) return;
  var el=e.target;
  if(isToolkitEl(el)) return;
  e.preventDefault();e.stopPropagation();
  var type=insGetElType(el);
  if(type==='text'){
    if(INS.selections.length===0) insToggleSelectOnly(el);
    insInlineTextEdit(el);
    return;
  }
  if(INS.selections.length===0) insToggleSelectOnly(el);
  T.insShowCommentPop();
}

function insShowLayerPicker(mx,my,els){
  insHideLayerPicker();
  INS.layerPicker=D.createElement('div');INS.layerPicker.id='ins-layer-picker';
  var h='<div class="ins-lp-title">选择图层 ('+els.length+')</div>';
  els.forEach(function(el,i){
    var r=el.getBoundingClientRect();
    var tag=el.tagName.toLowerCase();
    var cls=el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).slice(0,2).join('.'):'';
    var w=Math.round(r.width),ht=Math.round(r.height);
    var zIdx=getComputedStyle(el).zIndex;
    var zStr=zIdx&&zIdx!=='auto'?' z:'+zIdx:'';
    h+='<div class="ins-lp-row" data-idx="'+i+'">'
      +'<span class="ins-lp-tag">'+tag+cls+'</span>'
      +'<span class="ins-lp-dim">'+w+'\u00d7'+ht+zStr+'</span>'
      +'</div>';
  });
  INS.layerPicker.innerHTML=h;
  var vw=W.innerWidth,vh=W.innerHeight;
  var lx=mx+12,ly=my+12;
  INS.layerPicker.style.left=lx+'px';INS.layerPicker.style.top=ly+'px';
  D.body.appendChild(INS.layerPicker);
  var pr=INS.layerPicker.getBoundingClientRect();
  if(pr.right>vw) INS.layerPicker.style.left=Math.max(4,mx-pr.width-4)+'px';
  if(pr.bottom>vh) INS.layerPicker.style.top=Math.max(4,my-pr.height-4)+'px';

  var rows=INS.layerPicker.querySelectorAll('.ins-lp-row');
  rows.forEach(function(row){
    row.addEventListener('mouseenter',function(){
      var idx=parseInt(row.dataset.idx);
      insShowHL(els[idx]);
    });
    row.addEventListener('click',function(ev){
      ev.stopPropagation();
      var idx=parseInt(row.dataset.idx);
      insToggleSelect(els[idx]);
      insHideLayerPicker();
    });
  });
  setTimeout(function(){
    D.addEventListener('click',insHideLayerPicker,true);
  },0);
}
function insHideLayerPicker(){
  if(INS.layerPicker&&INS.layerPicker.parentNode) INS.layerPicker.parentNode.removeChild(INS.layerPicker);
  INS.layerPicker=null;
  D.removeEventListener('click',insHideLayerPicker,true);
}

function insAddSelection(el){
  var num=INS.selections.length+1;
  var box=D.createElement('div');box.className='ins-sel-box';
  var badge=D.createElement('div');badge.className='ins-sel-badge';badge.textContent=num;
  box.appendChild(badge);
  D.body.appendChild(box);
  var sel={el:el,box:box,badge:badge,num:num,selector:getSelector(el)};
  INS.selections.push(sel);
  insPositionSelBox(sel);
  T.insDragInit(sel);
}

function insToggleSelectOnly(el){
  var idx=INS.selections.findIndex(function(s){return s.el===el;});
  if(idx>=0){
    T.insRemoveSelBox(INS.selections[idx]);
    INS.selections.splice(idx,1);
    T.insRenumber();
  } else {
    insAddSelection(el);
  }
  if(INS.selections.length===0) T.insHideCommentPop();
}

function insToggleSelect(el){
  insToggleSelectOnly(el);
  if(INS.selections.length===0){insHideColorPicker();insHidePropPanel();}
  insUpdateCtxBar();
}

/* ═══ CONTEXT BAR (follows selection) ═══ */
function insUpdateCtxBar(){
  insHideCtxBar();
  if(INS.selections.length===0) return;
  var sel=INS.selections[INS.selections.length-1];
  var el=sel.el;
  var type=insGetElType(el);
  var multi=INS.selections.length>1;
  var allTypes=INS.selections.map(function(s){return insGetElType(s.el);});
  var allText=allTypes.every(function(t){return t==='text';});
  var allImage=allTypes.every(function(t){return t==='image';});

  INS.ctxBar=D.createElement('div');INS.ctxBar.className='ins-ctx-bar';

  var actions=[];
  if(type==='text'&&!multi) actions.push({icon:'T',title:'编辑文字',act:'edit-text'});
  if(allText&&multi) actions.push({icon:'T<small style="font-size:8px;vertical-align:super">+</small>',title:'批量改文字 ('+INS.selections.length+')',act:'batch-text'});
  if(type==='image'||allImage) actions.push({icon:'<span style="font-size:13px">&#128444;</span>',title:multi?'批量换图 ('+INS.selections.length+')':'换图',act:'edit-image'});
  if(type==='color'||type==='generic'||type==='text'){
    var cs=getComputedStyle(el);
    var bg=cs.backgroundColor;
    if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')
      actions.push({icon:'<span style="display:inline-block;width:12px;height:12px;border-radius:3px;border:1px solid rgba(255,255,255,.3);background:'+bg+'"></span>',title:'改背景色',act:'edit-bg'});
    var bc=cs.borderColor;
    var bw=parseFloat(cs.borderWidth);
    if(bw>0&&bc&&bc!=='rgba(0, 0, 0, 0)'&&bc!=='transparent')
      actions.push({icon:'<span style="display:inline-block;width:10px;height:10px;border-radius:2px;border:2px solid '+bc+';background:transparent"></span>',title:'改描边色',act:'edit-border'});
    if(type==='text')
      actions.push({icon:'<span style="display:inline-block;width:12px;height:12px;border-radius:3px;border:1px solid rgba(255,255,255,.3);background:'+cs.color+'"></span>',title:'改文字色',act:'edit-color'});
  }
  actions.push({icon:'&#9998;',title:'添加标注',act:'annotate'});
  actions.push({icon:'&#128247;',title:'截取选中元素为标注图（动效区域优先）',act:'screenshot-el'});
  actions.push({icon:'&#8943;',title:'复制 CSS',act:'copy-css'});

  var sep2={act:'_sep2'};
  actions.push(sep2);
  if(type==='text')
    actions.push({icon:'<span style="font-size:11px;font-weight:700;line-height:1">A<small style="font-size:8px">z</small></span>',title:'改字号',act:'edit-fontsize'});
  actions.push({icon:'<span style="display:inline-block;width:12px;height:12px;border:1px dashed rgba(255,255,255,.4);border-radius:2px;position:relative"><span style="position:absolute;inset:2px;border:1px solid rgba(255,255,255,.25);border-radius:1px"></span></span>',title:'改间距',act:'edit-spacing'});
  actions.push({icon:'<span style="display:inline-flex;flex-direction:column;gap:1px;width:12px;height:12px;justify-content:center"><span style="height:3px;background:rgba(255,255,255,.5);border-radius:1px"></span><span style="height:3px;background:rgba(255,255,255,.3);border-radius:1px;width:8px"></span><span style="height:3px;background:rgba(255,255,255,.5);border-radius:1px"></span></span>',title:'布局',act:'edit-layout'});
  actions.push({icon:'<span style="display:inline-block;width:12px;height:12px;border:1px solid rgba(255,255,255,.4);border-radius:2px;position:relative"><span style="position:absolute;top:1px;left:1px;width:5px;height:5px;border:1px solid rgba(255,255,255,.5);border-radius:1px"></span><span style="position:absolute;bottom:0;right:0;width:4px;height:4px;border-top:1px solid rgba(255,255,255,.4);border-left:1px solid rgba(255,255,255,.4)"></span></span>',title:'尺寸/位置',act:'edit-geometry'});

  actions.forEach(function(a,i){
    if(a.act==='_sep2'||( i>0&&(a.act==='annotate'))) {
      var sep=D.createElement('div');sep.className='ins-ctx-sep';INS.ctxBar.appendChild(sep);
      if(a.act==='_sep2') return;
    }
    var btn=D.createElement('button');btn.className='ins-ctx-btn';
    btn.innerHTML=a.icon;btn.dataset.tip=a.title;btn.dataset.act=a.act;
    btn.addEventListener('click',function(ev){
      ev.stopPropagation();ev.preventDefault();
      insCtxAction(a.act,sel);
    });
    INS.ctxBar.appendChild(btn);
  });

  D.body.appendChild(INS.ctxBar);
  insPositionCtxBar(sel);
}

function insPositionCtxBar(sel){
  if(!INS.ctxBar) return;
  var r=sel.el.getBoundingClientRect();
  var barW=INS.ctxBar.offsetWidth||200, barH=INS.ctxBar.offsetHeight||34;
  var vw=W.innerWidth, vh=W.innerHeight;
  var oversized=r.width>vw*1.5||r.height>vh*1.5||r.left<-vw*0.3||r.right>vw*1.3;
  var top,left;
  if(oversized&&INS._clickX!=null){
    top=INS._clickY+W.scrollY+12;
    left=INS._clickX+W.scrollX-barW/2;
  } else {
    top=r.bottom+W.scrollY+6;
    left=r.left+W.scrollX+r.width/2-barW/2;
    if(r.bottom+barH+10>vh) top=r.top+W.scrollY-barH-6;
  }
  if(left<4) left=4;
  if(left+barW>vw+W.scrollX-4) left=vw+W.scrollX-barW-4;
  if(left<W.scrollX+4) left=W.scrollX+4;
  if(top<W.scrollY+4) top=W.scrollY+4;
  if(top+barH>W.scrollY+vh-4) top=W.scrollY+vh-barH-4;
  INS.ctxBar.style.top=top+'px';INS.ctxBar.style.left=left+'px';
}

function insHideCtxBar(){
  if(INS.ctxBar&&INS.ctxBar.parentNode) INS.ctxBar.parentNode.removeChild(INS.ctxBar);
  INS.ctxBar=null;
}

function insCtxAction(act,sel){
  var el=sel.el;
  var allEls=INS.selections.map(function(s){return s.el;});
  switch(act){
    case 'edit-text': insInlineTextEdit(el); break;
    case 'batch-text': insInlineBatchTextEdit(allEls); break;
    case 'edit-image': insInlineImageEdit(allEls); break;
    case 'edit-bg': insInlineColorEdit(allEls,'backgroundColor'); break;
    case 'edit-border': insInlineColorEdit(allEls,'borderColor'); break;
    case 'edit-color': insInlineColorEdit(allEls,'color'); break;
    case 'edit-fontsize': insInlinePropEdit(allEls,'fontSize'); break;
    case 'edit-spacing': insInlinePropEdit(allEls,'spacing'); break;
    case 'edit-layout': insInlineLayoutEdit(el); break;
    case 'edit-geometry': insInlineGeometryEdit(el); break;
    case 'annotate': T.insShowCommentPop(); break;
    case 'screenshot-el': insScreenshotElement(el); break;
    case 'copy-css': insCtxCopyCSS(el); break;
  }
}

function insScreenshotElement(el){
  if(!el) return;
  T.insShowHint('截取选中元素…');
  insHideCtxBar();
  T.insLoadH2C().then(function(html2canvas){
    return html2canvas(el,{
      useCORS:true,
      backgroundColor:null,
      scale:Math.min(2,W.devicePixelRatio||1),
      logging:false
    });
  }).then(function(canvas){
    return new Promise(function(resolve,reject){
      canvas.toBlob(function(blob){
        if(!blob) reject(new Error('empty blob'));
        else resolve(blob);
      },'image/png');
    });
  }).then(function(blob){
    var url=URL.createObjectURL(blob);
    var name='element-'+Date.now()+'.png';
    T.insClearSelections();
    insHideCtxBar();
    INS.action='modify';
    INS.attachedImage=name;
    var ann={
      id:++INS.annId,
      action:'modify',
      targets:[{
        selector:getSelector(el),
        tagName:el.tagName.toLowerCase(),
        outerHTML:(el.outerHTML||'').substring(0,400),
        computedStyle:T.insGetKeyStyles(el),
        rect:getElRect(el)
      }],
      comment:'',
      image:name,
      _screenshotUrl:url,
      author:'User',
      timestamp:Date.now(),
      status:'pending'
    };
    INS.annotations.push(ann);
    T.insRenderPanel();T.insUpdateTabCount();
    T.insShowScreenshotPop(ann,url);
    T.insShowHint('已截取当前元素，填写说明后保存（动效内容建议用此方式）');
  }).catch(function(err){
    console.error('insScreenshotElement',err);
    T.insShowHint('元素截图失败，请按 S 键框选视口区域');
  });
}

function insCtxCopyCSS(el){
  var cs=getComputedStyle(el);
  var props=['color','background-color','background','font-size','font-weight','line-height','padding','margin','border-radius','display','position','width','height','gap','opacity','border'];
  var lines=[];
  props.forEach(function(p){
    var v=cs.getPropertyValue(p);
    if(v&&v!=='normal'&&v!=='none'&&v!=='0px'&&v!=='auto'&&v!=='static'&&v!=='1'&&v!=='visible'&&v!=='rgba(0, 0, 0, 0)') lines.push(p+': '+v+';');
  });
  var css=lines.join('\n');
  if(navigator.clipboard){
    navigator.clipboard.writeText(css).then(function(){T.insShowHint('CSS 已复制 ('+lines.length+' 条)');});
  } else {
    T.insShowHint('复制失败：需要 HTTPS 环境');
  }
}

/* ═══ INLINE TEXT EDIT ═══ */
function insInlineTextEdit(el){
  if(INS.inlineEditing) return;
  INS.inlineEditing=true;
  insHideCtxBar();T.insHideCommentPop();

  var origText=el.textContent;
  el.contentEditable='true';
  el.classList.add('ins-inline-edit');
  el.focus();

  var range=D.createRange();
  range.selectNodeContents(el);
  var s=W.getSelection();s.removeAllRanges();s.addRange(range);

  function finish(save){
    el.contentEditable='false';
    el.classList.remove('ins-inline-edit');
    INS.inlineEditing=false;
    el.removeEventListener('keydown',onKey);
    el.removeEventListener('blur',onBlur);

    var newText=el.textContent;
    if(save&&newText!==origText){
      var ann={
        id:++INS.annId,
        action:'text-edit',
        targets:[{
          selector:getSelector(el),
          tagName:el.tagName.toLowerCase(),
          outerHTML:el.outerHTML.substring(0,300),
          computedStyle:T.insGetKeyStyles(el),
          from:{text:origText},
          to:{text:newText}
        }],
        comment:'文字修改: "'+origText.substring(0,30)+'" → "'+newText.substring(0,30)+'"',
        author:'User',
        timestamp:Date.now(),
        status:'pending'
      };
      INS.annotations.push(ann);
      T.undoPush({el:el,type:'text',prevText:origText});
      T.insRenderPanel();T.insUpdateTabCount();
      T.insShowHint('[文字] 标注 #'+ann.id+' · 已修改');
    } else if(!save){
      el.textContent=origText;
    }
    insUpdateCtxBar();
  }

  function onKey(ev){
    if(ev.key==='Enter'&&!ev.shiftKey){ev.preventDefault();finish(true);}
    if(ev.key==='Escape'){ev.preventDefault();finish(false);}
  }
  function onBlur(){setTimeout(function(){if(INS.inlineEditing)finish(true);},150);}
  el.addEventListener('keydown',onKey);
  el.addEventListener('blur',onBlur);
}

/* ═══ BATCH TEXT EDIT (多选批量改文字) ═══ */
function insInlineBatchTextEdit(els){
  insHidePropPanel();insHideColorPicker();
  var panel=D.createElement('div');panel.className='ins-prop-panel';
  panel.style.cssText='position:fixed;z-index:2147483640;background:rgba(20,20,28,.95);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:14px;color:#fff;font-size:13px;min-width:280px;max-width:340px;backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,.5)';
  panel.innerHTML='<div style="font-weight:600;margin-bottom:10px;font-size:14px">批量改文字 <span style="opacity:.5;font-weight:400">('+els.length+' 个元素)</span></div>'
    +'<div style="display:flex;gap:6px;margin-bottom:10px">'
    +'<button class="ins-bt-mode" data-mode="replace" style="flex:1;padding:5px 0;border-radius:6px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.15);color:#fff;cursor:pointer;font-size:12px">统一替换</button>'
    +'<button class="ins-bt-mode" data-mode="find" style="flex:1;padding:5px 0;border-radius:6px;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(255,255,255,.6);cursor:pointer;font-size:12px">查找替换</button>'
    +'</div>'
    +'<div id="ins-bt-fields"></div>'
    +'<div id="ins-bt-preview" style="max-height:120px;overflow-y:auto;margin:8px 0;font-size:11px;opacity:.6"></div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">'
    +'<button id="ins-bt-cancel" style="padding:4px 12px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);cursor:pointer;font-size:12px">取消</button>'
    +'<button id="ins-bt-apply" style="padding:4px 14px;border-radius:6px;border:none;background:#3b82f6;color:#fff;cursor:pointer;font-size:12px;font-weight:600">应用</button>'
    +'</div>';

  var mode='replace';
  var fieldsEl=panel.querySelector('#ins-bt-fields');
  var previewEl=panel.querySelector('#ins-bt-preview');

  function renderFields(){
    if(mode==='replace'){
      fieldsEl.innerHTML='<input id="ins-bt-val" placeholder="输入新文字（应用到全部）" style="width:100%;box-sizing:border-box;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:#fff;font-size:13px;outline:none">';
    } else {
      fieldsEl.innerHTML='<input id="ins-bt-find" placeholder="查找..." style="width:100%;box-sizing:border-box;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:#fff;font-size:13px;outline:none;margin-bottom:6px">'
        +'<input id="ins-bt-rep" placeholder="替换为..." style="width:100%;box-sizing:border-box;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:#fff;font-size:13px;outline:none">';
    }
    updatePreview();
    var inputs=fieldsEl.querySelectorAll('input');
    inputs.forEach(function(inp){inp.addEventListener('input',updatePreview);});
    if(inputs[0]) inputs[0].focus();
  }

  function updatePreview(){
    var lines=[];
    els.forEach(function(e,i){
      var orig=e.textContent;var next;
      if(mode==='replace'){
        var v=(fieldsEl.querySelector('#ins-bt-val')||{}).value||'';
        next=v||orig;
      } else {
        var f=(fieldsEl.querySelector('#ins-bt-find')||{}).value||'';
        var r=(fieldsEl.querySelector('#ins-bt-rep')||{}).value||'';
        next=f?orig.split(f).join(r):orig;
      }
      var changed=next!==orig;
      lines.push('<div style="padding:2px 0;'+(changed?'color:#3b82f6':'')+'"><span style="opacity:.4">'+(i+1)+'.</span> '+(changed?'"'+orig.substring(0,20)+'" → "'+next.substring(0,20)+'"':'"'+orig.substring(0,30)+'"')+'</div>');
    });
    previewEl.innerHTML=lines.join('');
  }

  panel.querySelectorAll('.ins-bt-mode').forEach(function(btn){
    btn.addEventListener('click',function(ev){
      ev.stopPropagation();
      mode=btn.dataset.mode;
      panel.querySelectorAll('.ins-bt-mode').forEach(function(b){
        var active=b.dataset.mode===mode;
        b.style.background=active?'rgba(255,255,255,.15)':'transparent';
        b.style.color=active?'#fff':'rgba(255,255,255,.6)';
        b.style.borderColor=active?'rgba(255,255,255,.2)':'rgba(255,255,255,.1)';
      });
      renderFields();
    });
  });

  panel.querySelector('#ins-bt-cancel').addEventListener('click',function(ev){ev.stopPropagation();closeBT();});
  panel.querySelector('#ins-bt-apply').addEventListener('click',function(ev){
    ev.stopPropagation();
    var changed=0;
    var targets=[];
    els.forEach(function(e){
      var orig=e.textContent;var next;
      if(mode==='replace'){
        next=(fieldsEl.querySelector('#ins-bt-val')||{}).value||orig;
      } else {
        var f=(fieldsEl.querySelector('#ins-bt-find')||{}).value||'';
        var r=(fieldsEl.querySelector('#ins-bt-rep')||{}).value||'';
        next=f?orig.split(f).join(r):orig;
      }
      if(next!==orig){
        T.undoPush({el:e,type:'text',prevText:orig});
        e.textContent=next;
        changed++;
        targets.push({selector:getSelector(e),tagName:e.tagName.toLowerCase(),from:{text:orig},to:{text:next}});
      }
    });
    if(changed>0){
      var ann={id:++INS.annId,action:'batch-text-edit',targets:targets,
        comment:'批量文字修改: '+changed+' 个元素',author:'User',timestamp:Date.now(),status:'pending'};
      INS.annotations.push(ann);
      T.insRenderPanel();T.insUpdateTabCount();
      T.insShowHint('批量修改了 '+changed+' 个文字元素');
    }
    closeBT();
  });

  function closeBT(){
    if(panel.parentNode) panel.parentNode.removeChild(panel);
    D.removeEventListener('click',outsideBT,true);
  }
  function outsideBT(ev){if(!panel.contains(ev.target)) closeBT();}
  setTimeout(function(){D.addEventListener('click',outsideBT,true);},50);

  D.body.appendChild(panel);
  renderFields();

  var lastSel=INS.selections[INS.selections.length-1];
  var r=lastSel.el.getBoundingClientRect();
  var pw=panel.offsetWidth||300;
  var left=r.left+r.width/2-pw/2;
  if(left<4) left=4;
  if(left+pw>W.innerWidth) left=W.innerWidth-pw-4;
  var top=r.bottom+8;
  if(r.bottom+panel.offsetHeight+10>W.innerHeight) top=r.top-panel.offsetHeight-8;
  panel.style.top=top+'px';panel.style.left=left+'px';
}

/* ═══ INLINE IMAGE EDIT (单选/多选换图) ═══ */
function insInlineImageEdit(els){
  insHidePropPanel();insHideColorPicker();
  var panel=D.createElement('div');panel.className='ins-prop-panel';
  panel.style.cssText='position:fixed;z-index:2147483640;background:rgba(20,20,28,.95);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:14px;color:#fff;font-size:13px;min-width:280px;max-width:360px;backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,.5)';
  var multi=els.length>1;

  panel.innerHTML='<div style="font-weight:600;margin-bottom:10px;font-size:14px">换图'+(multi?' <span style="opacity:.5;font-weight:400">('+els.length+' 个)</span>':'')+'</div>'
    +'<div style="margin-bottom:8px">'
    +'<input id="ins-img-url" placeholder="粘贴图片 URL..." style="width:100%;box-sizing:border-box;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:#fff;font-size:13px;outline:none">'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
    +'<label style="flex:1;text-align:center;padding:8px;border-radius:6px;border:1px dashed rgba(255,255,255,.2);cursor:pointer;font-size:12px;color:rgba(255,255,255,.5);transition:all .2s">'
    +'<input id="ins-img-file" type="file" accept="image/*" style="display:none"> 点击上传本地图片'
    +'</label>'
    +'</div>'
    +'<div id="ins-img-preview" style="margin-bottom:8px"></div>'
    +'<div style="display:flex;gap:8px;justify-content:flex-end">'
    +'<button id="ins-img-cancel" style="padding:4px 12px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);cursor:pointer;font-size:12px">取消</button>'
    +'<button id="ins-img-apply" style="padding:4px 14px;border-radius:6px;border:none;background:#3b82f6;color:#fff;cursor:pointer;font-size:12px;font-weight:600">应用</button>'
    +'</div>';

  var _imgSrc='';
  var previewEl=panel.querySelector('#ins-img-preview');
  var urlInput=panel.querySelector('#ins-img-url');
  var fileInput=panel.querySelector('#ins-img-file');

  function showThumb(src){
    _imgSrc=src;
    previewEl.innerHTML=src?'<img src="'+src+'" style="max-width:100%;max-height:80px;border-radius:4px;object-fit:contain">':'';
  }

  urlInput.addEventListener('input',function(){showThumb(urlInput.value.trim());});
  urlInput.addEventListener('paste',function(){setTimeout(function(){showThumb(urlInput.value.trim());},0);});

  fileInput.addEventListener('change',function(){
    var file=fileInput.files&&fileInput.files[0];
    if(!file) return;
    var reader=new FileReader();
    reader.onload=function(ev){
      showThumb(ev.target.result);
      urlInput.value='(本地上传)';
    };
    reader.readAsDataURL(file);
  });

  panel.querySelector('#ins-img-cancel').addEventListener('click',function(ev){ev.stopPropagation();closeImg();});
  panel.querySelector('#ins-img-apply').addEventListener('click',function(ev){
    ev.stopPropagation();
    if(!_imgSrc){T.insShowHint('请提供图片');return;}
    var changed=0;var targets=[];
    els.forEach(function(e){
      var isImg=e.tagName==='IMG';
      var cs=getComputedStyle(e);
      var origSrc=isImg?e.src:cs.backgroundImage;
      if(isImg){
        T.undoPush({el:e,type:'prop',prop:'src',prevVal:e.getAttribute('src')});
        e.src=_imgSrc;
      } else {
        T.undoPush({el:e,type:'prop',prop:'backgroundImage',prevVal:e.style.backgroundImage});
        e.style.backgroundImage='url('+_imgSrc+')';
      }
      changed++;
      targets.push({selector:getSelector(e),tagName:e.tagName.toLowerCase(),from:{src:origSrc},to:{src:_imgSrc.substring(0,200)}});
    });
    if(changed>0){
      var ann={id:++INS.annId,action:'image-edit',targets:targets,
        comment:'换图: '+changed+' 个元素',author:'User',timestamp:Date.now(),status:'pending'};
      INS.annotations.push(ann);
      T.insRenderPanel();T.insUpdateTabCount();
      T.insShowHint('已替换 '+changed+' 张图片');
    }
    closeImg();
  });

  function closeImg(){
    if(panel.parentNode) panel.parentNode.removeChild(panel);
    D.removeEventListener('click',outsideImg,true);
  }
  function outsideImg(ev){if(!panel.contains(ev.target)) closeImg();}
  setTimeout(function(){D.addEventListener('click',outsideImg,true);},50);

  D.body.appendChild(panel);
  urlInput.focus();

  var lastSel=INS.selections[INS.selections.length-1];
  var r=lastSel.el.getBoundingClientRect();
  var pw=panel.offsetWidth||300;
  var left=r.left+r.width/2-pw/2;
  if(left<4) left=4;
  if(left+pw>W.innerWidth) left=W.innerWidth-pw-4;
  var top=r.bottom+8;
  if(r.bottom+panel.offsetHeight+10>W.innerHeight) top=r.top-panel.offsetHeight-8;
  panel.style.top=top+'px';panel.style.left=left+'px';
}

/* ═══ INLINE COLOR EDIT ═══ */
function insInlineColorEdit(elsOrEl,prop){
  insHideColorPicker();
  var els=Array.isArray(elsOrEl)?elsOrEl:[elsOrEl];
  var el=els[0];
  var cs=getComputedStyle(el);
  var origVal=prop==='color'?cs.color:prop==='borderColor'?cs.borderColor:cs.backgroundColor;
  var origHex=insRgbToHex(origVal);
  var _tokenRef=null;
  var _cssProp=prop==='color'?'color':prop==='borderColor'?'border-color':'background-color';
  var _cssClear=prop==='color'?'color':prop==='borderColor'?'borderColor':'backgroundColor';
  var _boundVar=insTraceVar(el,_cssProp)||(prop==='backgroundColor'?insTraceVar(el,'background'):null);
  var _propLabel=prop==='color'?'文字色':prop==='borderColor'?'描边色':'背景色';

  var origVals=els.map(function(e){
    var c=getComputedStyle(e);
    return prop==='color'?c.color:prop==='borderColor'?c.borderColor:c.backgroundColor;
  });

  INS.colorPicker=D.createElement('div');INS.colorPicker.className='ins-color-picker';
  INS.colorPicker.id='ins-color-picker';

  var preview=D.createElement('div');preview.className='ins-cp-preview';
  var swatch=D.createElement('div');swatch.className='ins-cp-swatch';swatch.style.background=origVal;
  var valLabel=D.createElement('div');valLabel.className='ins-cp-val';
  var countHint=els.length>1?' ('+els.length+'个元素)':'';
  valLabel.textContent=(prop==='color'?'文字':prop==='borderColor'?'描边':'背景')+': '+origHex+countHint;
  preview.appendChild(swatch);preview.appendChild(valLabel);

  var input=D.createElement('input');input.type='color';input.className='ins-cp-input';
  input.value=origHex.length===7?origHex:'#000000';

  function applyColor(c,tokenName){
    _tokenRef=tokenName||null;
    swatch.style.background=c;
    var label=(prop==='color'?'文字':prop==='borderColor'?'描边':'背景')+': '+c.toUpperCase()+countHint;
    if(tokenName) label+=' ('+tokenName+')';
    valLabel.textContent=label;
    els.forEach(function(e){e.style[_cssClear]=c;});
    if(/^#[0-9a-fA-F]{6}$/.test(c)) input.value=c;
    if(palette) palette.querySelectorAll('.ins-cp-token').forEach(function(t){
      t.classList.toggle('active',t.dataset.var===tokenName);
    });
  }

  input.addEventListener('input',function(){
    applyColor(input.value,null);
  });
  swatch.addEventListener('click',function(){input.click();});

  var tokenColors=[];
  var _hexSeen={};
  var _cKeys=Object.keys(T._vars).filter(function(k){return k.indexOf('--c-')===0;});
  _cKeys.forEach(function(k){
    var v=_vars[k];
    if(!v) return;
    var hex=(/^#[0-9a-fA-F]{3,8}$/.test(v))?v:null;
    if(!hex&&/^rgba?\(/.test(v)) hex=insRgbToHex(v);
    if(!hex) return;
    var key=hex.toUpperCase();
    if(_hexSeen[key]){
      _hexSeen[key].vars.push(k);
      _hexSeen[key].labels.push(LABELS[k]||k.replace(/^--c-/,''));
      return;
    }
    var entry={name:k,label:LABELS[k]||k.replace(/^--c-/,''),hex:hex,raw:v,vars:[k],labels:[LABELS[k]||k.replace(/^--c-/,'')]};
    _hexSeen[key]=entry;
    tokenColors.push(entry);
  });

  var moduleColors=[];
  var _modSec=el.closest('section[id]');
  var _modPrefix=null;
  if(_modSec){
    var sid=_modSec.id;
    var prefixes=[];
    Object.keys(_vars).forEach(function(k){
      if(k.indexOf('--c-')===0||k.indexOf('--g-')===0||k.indexOf('--f-')===0||k.indexOf('--r-')===0||k.indexOf('--s-')===0) return;
      var m=k.match(/^--([a-zA-Z]+)-/);
      if(m&&prefixes.indexOf(m[1])<0) prefixes.push(m[1]);
    });
    var sectionEl=_modSec;
    var sectionHtml=(sectionEl.getAttribute('style')||'')+(sectionEl.innerHTML.substring(0,2000));
    prefixes.forEach(function(pf){
      if(sectionHtml.indexOf('var(--'+pf+'-')>=0) _modPrefix=_modPrefix||pf;
    });
    if(!_modPrefix){
      var candidateMap={'hero':'banner','userbar':'banner','flow':'activitySummary','lottery':'lot',
        'task1':'taskCard','task23':'taskCard','task4':'taskCard','task5':'taskCard',
        'finance':'activityCard','faq':'activityRule'};
      _modPrefix=candidateMap[sid]||null;
    }
  }
  if(_modPrefix){
    var _modHexSeen={};
    Object.keys(_vars).forEach(function(k){
      if(k.indexOf('--'+_modPrefix+'-')!==0) return;
      var v=_vars[k];
      if(!v) return;
      var hex=(/^#[0-9a-fA-F]{3,8}$/.test(v))?v:null;
      if(!hex&&/^rgba?\(/.test(v)) hex=insRgbToHex(v);
      if(!hex) return;
      var key=hex.toUpperCase();
      if(_modHexSeen[key]){
        _modHexSeen[key].vars.push(k);
        _modHexSeen[key].labels.push(LABELS[k]||k.replace(/^--[\w]+-/,''));
        return;
      }
      var entry={name:k,label:LABELS[k]||k.replace(/^--[\w]+-/,''),hex:hex,raw:v,vars:[k],labels:[LABELS[k]||k.replace(/^--[\w]+-/,'')]};
      _modHexSeen[key]=entry;
      moduleColors.push(entry);
    });
  }

  function buildColorGrid(colors,onPick){
    var grid=D.createElement('div');
    grid.style.cssText='display:flex;flex-wrap:wrap;gap:4px;max-height:96px;overflow-y:auto;scrollbar-width:thin';
    colors.forEach(function(tc){
      var dot=D.createElement('div');dot.className='ins-cp-token';
      dot.dataset.var=tc.name;
      var tipLines=tc.labels.join(', ')+'\n'+tc.vars.join('\n')+'\n'+tc.hex;
      if(tc.vars.length>1) tipLines+=' ('+tc.vars.length+'个变量共用)';
      dot.title=tipLines;
      dot.style.cssText='width:22px;height:22px;border-radius:4px;cursor:pointer;border:2px solid transparent;transition:all .12s;flex-shrink:0;position:relative';
      dot.style.background=tc.hex;
      var lum=insHexLum(tc.hex);
      if(lum>0.85) dot.style.borderColor='rgba(255,255,255,.2)';
      dot.addEventListener('click',function(ev){
        ev.stopPropagation();
        onPick(tc);
      });
      grid.appendChild(dot);
    });
    return grid;
  }

  var palette=null;
  if(tokenColors.length>0||moduleColors.length>0){
    palette=D.createElement('div');palette.className='ins-cp-palette';
    palette.style.cssText='border-top:1px solid rgba(255,255,255,.06);padding:8px 0 0;margin-top:4px;max-width:220px';

    if(moduleColors.length>0){
      var mtitle=D.createElement('div');
      mtitle.style.cssText='font-size:9px;color:rgba(2,85,255,.8);margin-bottom:2px;letter-spacing:.04em;font-weight:600';
      mtitle.textContent=(_modPrefix||'模块')+' 变量 ('+moduleColors.length+')';
      var mdesc=D.createElement('div');
      mdesc.style.cssText='font-size:8px;color:rgba(255,255,255,.45);margin-bottom:4px;line-height:1.3';
      mdesc.textContent='点选色块取色到当前元素';
      palette.appendChild(mtitle);palette.appendChild(mdesc);
      palette.appendChild(buildColorGrid(moduleColors,function(tc){applyColor(tc.hex,tc.name);}));
    }

    if(tokenColors.length>0){
      var ptitle=D.createElement('div');
      ptitle.style.cssText='font-size:9px;color:rgba(255,255,255,.3);margin-bottom:2px;letter-spacing:.04em'+(moduleColors.length>0?';margin-top:8px':'');
      ptitle.textContent='基础 Token ('+tokenColors.length+')';
      var pdesc=D.createElement('div');
      pdesc.style.cssText='font-size:8px;color:rgba(255,255,255,.4);margin-bottom:4px;line-height:1.3';
      pdesc.textContent='点选色块取色到当前元素';
      palette.appendChild(ptitle);palette.appendChild(pdesc);
      palette.appendChild(buildColorGrid(tokenColors,function(tc){applyColor(tc.hex,tc.name);}));
    }
  }

  var bindHint=null;
  if(_boundVar){
    bindHint=D.createElement('div');
    bindHint.style.cssText='font-size:9px;color:rgba(255,255,255,.3);padding:4px 0 0;border-top:1px solid rgba(255,255,255,.06);margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
    bindHint.textContent='绑定变量: '+_boundVar;
    bindHint.title=_boundVar;
  }

  var acts=D.createElement('div');acts.className='ins-cp-actions';
  var cancelBtn=D.createElement('button');cancelBtn.className='ins-cp-btn';cancelBtn.textContent='取消';
  cancelBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    els.forEach(function(e,i){e.style[_cssClear]='';});
    insHideColorPicker();
  });

  var applyBtn=D.createElement('button');applyBtn.className='ins-cp-btn primary';applyBtn.textContent='应用';
  applyBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    var newHex=input.value.toUpperCase();
    var fromToken=_tokenRef||null;

    if(newHex!==origHex||fromToken){
      var targets=els.map(function(e,i){
        return {
          selector:getSelector(e),
          tagName:e.tagName.toLowerCase(),
          outerHTML:e.outerHTML.substring(0,300),
          computedStyle:T.insGetKeyStyles(e),
          from:{prop:prop,value:insRgbToHex(origVals[i]),boundVar:null},
          to:{prop:prop,value:newHex,hex:newHex,fromToken:fromToken||null}
        };
      });
      var ann={
        id:++INS.annId,
        action:'color-edit',
        targets:targets,
        comment:_propLabel+': '+origHex+' → '+newHex+(els.length>1?' ('+els.length+'个元素)':'')+(fromToken?' (取自 '+fromToken+')':''),
        author:'User',
        timestamp:Date.now(),
        status:'pending'
      };
      INS.annotations.push(ann);
      els.forEach(function(e,i){
        T.undoPush({el:e,type:'color',prop:prop,prevVal:origVals[i]});
      });
      T.insRenderPanel();T.insUpdateTabCount();

      var hint='[颜色] 标注 #'+ann.id+' · '+_propLabel+' → '+newHex;
      if(els.length>1) hint+=' ('+els.length+'个元素)';
      if(fromToken) hint+=' (取自 '+fromToken+')';
      T.insShowHint(hint);
    }
    insHideColorPicker();
  });
  acts.appendChild(cancelBtn);acts.appendChild(applyBtn);

  INS.colorPicker.appendChild(preview);
  INS.colorPicker.appendChild(input);
  if(palette) INS.colorPicker.appendChild(palette);
  if(bindHint) INS.colorPicker.appendChild(bindHint);
  INS.colorPicker.appendChild(acts);
  D.body.appendChild(INS.colorPicker);

  var r=el.getBoundingClientRect();
  var pw=INS.colorPicker.offsetWidth||200, ph=INS.colorPicker.offsetHeight||200;
  var top=r.top-ph-8;
  if(top<8) top=r.bottom+8;
  if(top+ph>W.innerHeight-8) top=Math.max(8,W.innerHeight-ph-8);
  var left=r.left;
  if(left+pw>W.innerWidth) left=W.innerWidth-pw-8;
  if(left<4) left=4;
  INS.colorPicker.style.position='fixed';
  INS.colorPicker.style.top=top+'px';INS.colorPicker.style.left=left+'px';

  setTimeout(function(){D.addEventListener('click',insColorPickerOutside,true);},0);
}

function insColorPickerOutside(e){
  if(INS.colorPicker&&!INS.colorPicker.contains(e.target)&&!isToolkitEl(e.target)){
    insHideColorPicker();
  }
}

function insHideColorPicker(){
  if(INS.colorPicker&&INS.colorPicker.parentNode) INS.colorPicker.parentNode.removeChild(INS.colorPicker);
  INS.colorPicker=null;
  D.removeEventListener('click',insColorPickerOutside,true);
}

function insPositionSelBox(sel){
  var r=getElRect(sel.el);
  sel.box.style.top=r.top+'px';sel.box.style.left=r.left+'px';
  sel.box.style.width=r.width+'px';sel.box.style.height=r.height+'px';
}

/* ═══ INLINE PROP EDIT (fontSize / spacing) ═══ */
var _propPanel=null;
/* ═══ GEOMETRY EDIT (精准尺寸/位置) ═══ */
function insInlineGeometryEdit(el){
  insHidePropPanel();insHideColorPicker();
  var cs=getComputedStyle(el);
  var origW=el.offsetWidth, origH=el.offsetHeight;
  var origL=parseInt(cs.left)||0, origT=parseInt(cs.top)||0;
  var origPos=cs.position;
  var ratio=origW/origH||1;
  var locked=true;

  _propPanel=D.createElement('div');_propPanel.className='ins-prop-panel';
  _propPanel.style.cssText='position:fixed;z-index:2147483640;background:rgba(20,20,28,.95);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px;color:#fff;font-size:13px;width:240px;backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif';

  var title=D.createElement('div');
  title.style.cssText='font-weight:600;margin-bottom:8px;font-size:13px;display:flex;align-items:center;justify-content:space-between';
  title.innerHTML='尺寸 / 位置';

  var lockBtn=D.createElement('button');
  lockBtn.style.cssText='background:none;border:1px solid rgba(255,255,255,.2);border-radius:4px;color:#fff;font-size:11px;padding:2px 8px;cursor:pointer;transition:all .12s;display:flex;align-items:center;gap:4px';
  function _updateLockBtn(){
    lockBtn.innerHTML=(locked?'&#128279;':'&#128280;')+'<span style="font-size:10px">'+(locked?'等比':'自由')+'</span>';
    lockBtn.style.borderColor=locked?'#3B82F6':'rgba(255,255,255,.2)';
    lockBtn.style.color=locked?'#60A5FA':'rgba(255,255,255,.5)';
  }
  _updateLockBtn();
  lockBtn.addEventListener('click',function(ev){ev.stopPropagation();locked=!locked;_updateLockBtn();});
  title.appendChild(lockBtn);

  function _makeRow(label,val){
    var row=D.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:4px';
    var sp=D.createElement('span');sp.style.cssText='width:14px;text-align:right;font-weight:600;font-size:11px;color:rgba(255,255,255,.5);flex-shrink:0';
    sp.textContent=label;
    var inp=D.createElement('input');inp.type='number';inp.value=Math.round(val);
    inp.style.cssText='flex:1;min-width:0;width:100%;padding:4px 6px;border-radius:5px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:12px;font-family:monospace;outline:none;text-align:right;-moz-appearance:textfield';
    inp.addEventListener('focus',function(){inp.style.borderColor='#3B82F6';});
    inp.addEventListener('blur',function(){inp.style.borderColor='rgba(255,255,255,.15)';});
    row.appendChild(sp);row.appendChild(inp);
    return{row:row,input:inp};
  }

  var wRow=_makeRow('W',origW), hRow=_makeRow('H',origH);
  var xRow=_makeRow('X',origL), yRow=_makeRow('Y',origT);
  var inputs={width:wRow.input,height:hRow.input,left:xRow.input,top:yRow.input};

  var sizeRow=D.createElement('div');sizeRow.style.cssText='display:flex;gap:6px';
  var sizeL=D.createElement('div');sizeL.style.cssText='flex:1;min-width:0';sizeL.appendChild(wRow.row);
  var sizeR=D.createElement('div');sizeR.style.cssText='flex:1;min-width:0';sizeR.appendChild(hRow.row);
  sizeRow.appendChild(sizeL);sizeRow.appendChild(sizeR);

  var posRow=D.createElement('div');posRow.style.cssText='display:flex;gap:6px;margin-top:2px';
  var posL=D.createElement('div');posL.style.cssText='flex:1;min-width:0';posL.appendChild(xRow.row);
  var posR=D.createElement('div');posR.style.cssText='flex:1;min-width:0';posR.appendChild(yRow.row);
  posRow.appendChild(posL);posRow.appendChild(posR);

  var _lastChanged=null;

  function _onWChange(){
    _lastChanged='w';
    if(locked){
      var nw=parseInt(inputs.width.value)||origW;
      inputs.height.value=Math.round(nw/ratio);
    }
    _geoApplyLive();
  }
  function _onHChange(){
    _lastChanged='h';
    if(locked){
      var nh=parseInt(inputs.height.value)||origH;
      inputs.width.value=Math.round(nh*ratio);
    }
    _geoApplyLive();
  }

  function _bindInput(inp,changeFn){
    inp.addEventListener('input',changeFn);
    inp.addEventListener('keydown',function(ev){
      if(ev.key==='ArrowUp'||ev.key==='ArrowDown'){
        ev.preventDefault();
        var step=ev.shiftKey?10:1;
        inp.value=parseInt(inp.value||0)+(ev.key==='ArrowUp'?step:-step);
        changeFn();
      }
      if(ev.key==='Enter') _geoApplyLive();
    });
  }
  _bindInput(inputs.width,_onWChange);
  _bindInput(inputs.height,_onHChange);
  _bindInput(inputs.left,_geoApplyLive);
  _bindInput(inputs.top,_geoApplyLive);

  function _geoApplyLive(){
    var nw=parseInt(inputs.width.value)||origW;
    var nh=parseInt(inputs.height.value)||origH;
    var nl=parseInt(inputs.left.value)||0;
    var nt=parseInt(inputs.top.value)||0;
    if(origPos==='static') el.style.position='relative';
    el.style.width=nw+'px';el.style.height=nh+'px';
    el.style.left=nl+'px';el.style.top=nt+'px';
    var sel=INS.selections.find(function(s){return s.el===el;});
    if(sel) T.insPositionSelBox(sel);
  }

  var hint=D.createElement('div');
  hint.style.cssText='margin-top:6px;font-size:10px;color:rgba(255,255,255,.3);line-height:1.4';
  hint.textContent='方向键 ±1 · Shift ±10 · 回车确认';

  var acts=D.createElement('div');
  acts.style.cssText='display:flex;gap:4px;justify-content:flex-end;margin-top:8px';
  var cancelBtn=D.createElement('button');cancelBtn.className='ins-cp-btn';cancelBtn.textContent='重置';
  cancelBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    el.style.width=origW+'px';el.style.height=origH+'px';
    el.style.left=origL+'px';el.style.top=origT+'px';
    if(origPos==='static') el.style.position='';
    inputs.width.value=origW;inputs.height.value=origH;
    inputs.left.value=origL;inputs.top.value=origT;
    var sel=INS.selections.find(function(s){return s.el===el;});
    if(sel) T.insPositionSelBox(sel);
  });
  var applyBtn=D.createElement('button');applyBtn.className='ins-cp-btn primary';applyBtn.textContent='应用';
  applyBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    var finalW=parseInt(inputs.width.value)||origW;
    var finalH=parseInt(inputs.height.value)||origH;
    var finalL=parseInt(inputs.left.value)||0;
    var finalT=parseInt(inputs.top.value)||0;
    var ann={
      id:++INS.annId,
      action:'resize',
      targets:[{
        selector:getSelector(el),
        tagName:el.tagName.toLowerCase(),
        outerHTML:el.outerHTML.substring(0,300),
        computedStyle:insGetKeyStyles(el),
        from:{width:origW,height:origH,left:origL,top:origT},
        to:{width:finalW,height:finalH,left:finalL,top:finalT}
      }],
      comment:'精准调整 '+origW+'x'+origH+' \u2192 '+finalW+'x'+finalH+' pos('+finalL+','+finalT+')',
      author:'User',timestamp:Date.now(),status:'pending'
    };
    INS.annotations.push(ann);
    insRenderPanel();T.insUpdateTabCount();
    T.insShowHint('[尺寸] 标注 #'+ann.id+' \xb7 '+finalW+'\xd7'+finalH);
    insHidePropPanel();
  });
  acts.appendChild(cancelBtn);acts.appendChild(applyBtn);

  _propPanel.appendChild(title);_propPanel.appendChild(sizeRow);
  _propPanel.appendChild(posRow);_propPanel.appendChild(hint);_propPanel.appendChild(acts);

  D.body.appendChild(_propPanel);
  var cx=INS._clickX!=null?INS._clickX:W.innerWidth/2;
  var cy=INS._clickY!=null?INS._clickY:W.innerHeight/2;
  var panelW=_propPanel.offsetWidth||240, panelH=_propPanel.offsetHeight||180;
  var pt=cy+W.scrollY+12, pl=cx+W.scrollX-panelW/2;
  if(pl<4) pl=4;
  if(pl+panelW>W.innerWidth+W.scrollX-4) pl=W.innerWidth+W.scrollX-panelW-4;
  if(pt+panelH>W.scrollY+W.innerHeight-4) pt=cy+W.scrollY-panelH-12;
  _propPanel.style.top=pt+'px';_propPanel.style.left=pl+'px';
  setTimeout(function(){D.addEventListener('click',_propPanelOutside,true);},0);
  inputs.width.focus();inputs.width.select();
}

function insHidePropPanel(){
  if(_propPanel&&_propPanel.parentNode) _propPanel.parentNode.removeChild(_propPanel);
  _propPanel=null;
  D.removeEventListener('click',_propPanelOutside,true);
}
function _propPanelOutside(ev){
  if(_propPanel&&!_propPanel.contains(ev.target)&&!isToolkitEl(ev.target)) insHidePropPanel();
}

/* ── 断点感知推荐引擎（基于 ui-craft 设计体系 R5-R15） ── */
/* ── _UC, _getBPInfo, _makeRecBtn, _makeBPTag, _analyzeModule, _getSmartLayoutRec 已迁移到 _smart-layout.js ── */
var _UC=T._UC,_getBPInfo=T._getBPInfo,_makeRecBtn=T._makeRecBtn,_makeBPTag=T._makeBPTag,_analyzeModule=T._analyzeModule,_getSmartLayoutRec=T._getSmartLayoutRec;

function insInlinePropEdit(elsOrEl,mode){
  insHidePropPanel();insHideColorPicker();
  var els=Array.isArray(elsOrEl)?elsOrEl:[elsOrEl];
  var el=els[0];
  var cs=getComputedStyle(el);

  _propPanel=D.createElement('div');_propPanel.className='ins-color-picker';
  _propPanel.style.minWidth='220px';

  if(mode==='fontSize'){
    var origPx=parseFloat(cs.fontSize)||16;
    var origVals=els.map(function(e){return parseFloat(getComputedStyle(e).fontSize)||16;});
    var countHint=els.length>1?' ('+els.length+'个元素)':'';
    var bp=_getBPInfo();

    var title=D.createElement('div');
    title.style.cssText='font-size:11px;color:#fff;font-weight:600;margin-bottom:2px;display:flex;align-items:center';
    title.textContent='字号'+countHint;
    title.appendChild(_makeBPTag(bp.label));

    /* R10: 按元素标签匹配 ui-craft 排版规则精确值 */
    var elTag=el.tagName;var typo=bp.typo;
    var recVal=typo[elTag]||Math.round(origPx*(bp.bpKey===375?0.65:bp.bpKey===768?0.82:1));
    var recHint=typo[elTag]?(elTag+' @ '+bp.label):'按比例缩放';
    var recRow=D.createElement('div');recRow.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:6px;padding:4px 0';
    var recLabel=D.createElement('span');recLabel.style.cssText='font-size:9px;color:rgba(255,255,255,.4)';recLabel.textContent='R10 推荐 '+recVal+'px ('+recHint+')';
    recRow.appendChild(recLabel);
    recRow.appendChild(_makeRecBtn('一键适配',function(){applyFS(recVal);}));

    var row=D.createElement('div');row.style.cssText='display:flex;align-items:center;gap:8px';
    var slider=D.createElement('input');slider.type='range';slider.min='10';slider.max='96';slider.step='1';slider.value=String(Math.round(origPx));
    slider.style.cssText='flex:1;accent-color:#0255FF;height:4px';
    var numInput=D.createElement('input');numInput.type='number';numInput.min='6';numInput.max='200';numInput.value=String(Math.round(origPx));
    numInput.style.cssText='width:48px;background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:4px;padding:2px 4px;font-size:11px;text-align:center';
    var unit=D.createElement('span');unit.textContent='px';unit.style.cssText='font-size:10px;color:rgba(255,255,255,.4)';

    function applyFS(v){
      slider.value=v;numInput.value=v;
      els.forEach(function(e){e.style.fontSize=v+'px';});
    }
    slider.addEventListener('input',function(){applyFS(slider.value);});
    numInput.addEventListener('input',function(){if(numInput.value) applyFS(numInput.value);});

    row.appendChild(slider);row.appendChild(numInput);row.appendChild(unit);

    var acts=D.createElement('div');acts.className='ins-cp-actions';acts.style.marginTop='8px';
    var cancelBtn=D.createElement('button');cancelBtn.className='ins-cp-btn';cancelBtn.textContent='取消';
    cancelBtn.addEventListener('click',function(ev){
      ev.stopPropagation();
      els.forEach(function(e){e.style.fontSize='';});
      insHidePropPanel();
    });
    var applyBtn=D.createElement('button');applyBtn.className='ins-cp-btn primary';applyBtn.textContent='应用';
    applyBtn.addEventListener('click',function(ev){
      ev.stopPropagation();
      var newVal=numInput.value+'px';
      var targets=els.map(function(e,i){
        return {selector:getSelector(e),tagName:e.tagName.toLowerCase(),from:{prop:'fontSize',value:origVals[i]+'px'},to:{prop:'fontSize',value:newVal}};
      });
      var ann={id:++INS.annId,action:'prop-edit',targets:targets,
        comment:'字号: '+Math.round(origPx)+'px → '+numInput.value+'px'+countHint+' ['+bp.label+']',
        author:'User',timestamp:Date.now(),status:'pending'};
      INS.annotations.push(ann);
      els.forEach(function(e,i){T.undoPush({el:e,type:'prop',prop:'fontSize',prevVal:origVals[i]+'px'});});
      T.insRenderPanel();T.insUpdateTabCount();
      T.insShowHint('[字号] 标注 #'+ann.id+' · '+numInput.value+'px'+countHint);
      insHidePropPanel();
    });
    acts.appendChild(cancelBtn);acts.appendChild(applyBtn);

    _propPanel.appendChild(title);_propPanel.appendChild(recRow);_propPanel.appendChild(row);_propPanel.appendChild(acts);

  } else if(mode==='spacing'){
    var origPad=cs.padding;var origGap=cs.gap||'0px';
    var pVals={top:parseFloat(cs.paddingTop)||0,right:parseFloat(cs.paddingRight)||0,bottom:parseFloat(cs.paddingBottom)||0,left:parseFloat(cs.paddingLeft)||0};
    var gapVal=parseFloat(origGap)||0;
    var countHint=els.length>1?' ('+els.length+'个元素)':'';
    var bp=_getBPInfo();

    var title=D.createElement('div');
    title.style.cssText='font-size:11px;color:#fff;font-weight:600;margin-bottom:2px;display:flex;align-items:center';
    title.textContent='间距'+countHint;
    title.appendChild(_makeBPTag(bp.label));

    /* R5-R7: 使用 ui-craft 间距体系精确值，对齐 Tailwind 4px 网格 */
    var sp=bp.space;
    function _snap4(v){return Math.round(v/4)*4;}
    var isCard=el.classList&&(/card|tile|panel/i.test(el.className)||el.getAttribute('role')==='article');
    var isSection=el.tagName==='SECTION'||el.closest('section')===el;
    var recPadVal=isCard?sp.cardPad:isSection?sp.sectionPad:_snap4(Math.max(pVals.top,pVals.bottom));
    var recPad={top:recPadVal,right:isSection?sp.sectionPad:_snap4(pVals.right||recPadVal),bottom:recPadVal,left:isSection?sp.sectionPad:_snap4(pVals.left||recPadVal)};
    var recGap=sp.gap;
    var recRow=D.createElement('div');recRow.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:6px;padding:4px 0';
    var recLabel=D.createElement('span');recLabel.style.cssText='font-size:9px;color:rgba(255,255,255,.4)';
    var padHint=isCard?'R5 卡片':isSection?'R7 区块':'R5 网格对齐';
    recLabel.textContent=padHint+' pad:'+recPad.top+'/'+recPad.right+'/'+recPad.bottom+'/'+recPad.left+' gap:'+recGap;
    recRow.appendChild(recLabel);
    recRow.appendChild(_makeRecBtn('一键适配',function(){
      padTop.slider.value=recPad.top;padTop.input.value=recPad.top;
      padRight.slider.value=recPad.right;padRight.input.value=recPad.right;
      padBottom.slider.value=recPad.bottom;padBottom.input.value=recPad.bottom;
      padLeft.slider.value=recPad.left;padLeft.input.value=recPad.left;
      gapRow.slider.value=recGap;gapRow.input.value=recGap;
      els.forEach(function(e){e.style.paddingTop=recPad.top+'px';e.style.paddingRight=recPad.right+'px';e.style.paddingBottom=recPad.bottom+'px';e.style.paddingLeft=recPad.left+'px';e.style.gap=recGap+'px';});
    }));

    function makeRow(label,val,max,onChg){
      var r=D.createElement('div');r.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:4px';
      var lb=D.createElement('span');lb.textContent=label;lb.style.cssText='width:28px;font-size:9px;color:rgba(255,255,255,.5);flex-shrink:0';
      var sl=D.createElement('input');sl.type='range';sl.min='0';sl.max=String(max);sl.step='1';sl.value=String(Math.round(val));
      sl.style.cssText='flex:1;accent-color:#0255FF;height:3px';
      var ni=D.createElement('input');ni.type='number';ni.min='0';ni.max='500';ni.value=String(Math.round(val));
      ni.style.cssText='width:40px;background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:4px;padding:1px 3px;font-size:10px;text-align:center';
      sl.addEventListener('input',function(){ni.value=sl.value;onChg(sl.value);});
      ni.addEventListener('input',function(){sl.value=ni.value;onChg(ni.value);});
      r.appendChild(lb);r.appendChild(sl);r.appendChild(ni);
      return {row:r,slider:sl,input:ni};
    }

    var padTop=makeRow('上',pVals.top,120,function(v){els.forEach(function(e){e.style.paddingTop=v+'px';});});
    var padRight=makeRow('右',pVals.right,120,function(v){els.forEach(function(e){e.style.paddingRight=v+'px';});});
    var padBottom=makeRow('下',pVals.bottom,120,function(v){els.forEach(function(e){e.style.paddingBottom=v+'px';});});
    var padLeft=makeRow('左',pVals.left,120,function(v){els.forEach(function(e){e.style.paddingLeft=v+'px';});});
    var gapRow=makeRow('gap',gapVal,80,function(v){els.forEach(function(e){e.style.gap=v+'px';});});

    var acts=D.createElement('div');acts.className='ins-cp-actions';acts.style.marginTop='8px';
    var cancelBtn=D.createElement('button');cancelBtn.className='ins-cp-btn';cancelBtn.textContent='取消';
    cancelBtn.addEventListener('click',function(ev){
      ev.stopPropagation();
      els.forEach(function(e){e.style.paddingTop='';e.style.paddingRight='';e.style.paddingBottom='';e.style.paddingLeft='';e.style.gap='';});
      insHidePropPanel();
    });
    var applyBtn=D.createElement('button');applyBtn.className='ins-cp-btn primary';applyBtn.textContent='应用';
    applyBtn.addEventListener('click',function(ev){
      ev.stopPropagation();
      var newPad=padTop.input.value+'px '+padRight.input.value+'px '+padBottom.input.value+'px '+padLeft.input.value+'px';
      var newGap=gapRow.input.value+'px';
      var changes='padding: '+newPad+', gap: '+newGap;
      var targets=els.map(function(e){
        return {selector:getSelector(e),tagName:e.tagName.toLowerCase(),from:{padding:origPad,gap:origGap},to:{padding:newPad,gap:newGap}};
      });
      var ann={id:++INS.annId,action:'spacing-edit',targets:targets,
        comment:'间距: '+changes+countHint,
        author:'User',timestamp:Date.now(),status:'pending'};
      INS.annotations.push(ann);
      T.insRenderPanel();T.insUpdateTabCount();
      T.insShowHint('[间距] 标注 #'+ann.id+' · '+changes);
      insHidePropPanel();
    });
    acts.appendChild(cancelBtn);acts.appendChild(applyBtn);

    _propPanel.appendChild(title);_propPanel.appendChild(recRow);
    _propPanel.appendChild(padTop.row);_propPanel.appendChild(padRight.row);
    _propPanel.appendChild(padBottom.row);_propPanel.appendChild(padLeft.row);
    var gapTitle=D.createElement('div');gapTitle.style.cssText='font-size:9px;color:rgba(255,255,255,.4);margin:6px 0 2px;border-top:1px solid rgba(255,255,255,.06);padding-top:6px';
    gapTitle.textContent='子元素间距 (gap)';
    _propPanel.appendChild(gapTitle);_propPanel.appendChild(gapRow.row);
    _propPanel.appendChild(acts);
  }

  D.body.appendChild(_propPanel);
  var r=el.getBoundingClientRect();
  var pw=_propPanel.offsetWidth||220,ph=_propPanel.offsetHeight||200;
  var top=r.top-ph-8;if(top<8) top=r.bottom+8;
  if(top+ph>W.innerHeight-8) top=Math.max(8,W.innerHeight-ph-8);
  var left=r.left;if(left+pw>W.innerWidth) left=W.innerWidth-pw-8;if(left<4) left=4;
  _propPanel.style.position='fixed';_propPanel.style.top=top+'px';_propPanel.style.left=left+'px';
  setTimeout(function(){D.addEventListener('click',_propPanelOutside,true);},0);
}

/* ═══ INLINE LAYOUT EDIT (Smart) ═══ */
function insInlineLayoutEdit(el){
  insHidePropPanel();insHideColorPicker();
  var cs=getComputedStyle(el);
  var origGap=cs.gap;
  var origStyles={display:el.style.display,flexDirection:el.style.flexDirection,justifyContent:el.style.justifyContent,alignItems:el.style.alignItems,gap:el.style.gap,flexWrap:el.style.flexWrap,gridTemplateColumns:el.style.gridTemplateColumns};
  var bp=_getBPInfo();
  var info=_analyzeModule(el);

  _propPanel=D.createElement('div');_propPanel.className='ins-color-picker';
  _propPanel.style.minWidth='260px';

  var title=D.createElement('div');
  title.style.cssText='font-size:11px;color:#fff;font-weight:600;margin-bottom:2px;display:flex;align-items:center';
  title.textContent='布局';
  title.appendChild(_makeBPTag(bp.label));

  /* ── 智能推荐区 ── */
  var smartRec=_getSmartLayoutRec(info,bp);
  var recSection=D.createElement('div');recSection.style.cssText='margin-bottom:8px;padding:6px 8px;background:rgba(2,85,255,.06);border:1px solid rgba(2,85,255,.12);border-radius:6px';
  var recTitle=D.createElement('div');recTitle.style.cssText='font-size:9px;color:#6BA1FF;font-weight:600;margin-bottom:4px';
  var _patLabel={hero:'Hero区',generic:'通用','card-grid':'卡片网格','table-section':'表格区','cta-section':'CTA区'};
  recTitle.textContent='ui-craft 推荐 · '+(_patLabel[info.pattern]||'通用')+' · '+info.childCount+'个子元素';
  recSection.appendChild(recTitle);

  var _activePreset=null;
  function activatePreset(p){
    _activePreset=p;
    grid.querySelectorAll('button').forEach(function(b){b.style.borderColor='rgba(255,255,255,.1)';b.style.background='rgba(255,255,255,.06)';b._recTag&&(b._recTag.style.display='none');});
    Object.keys(p.css).forEach(function(k){el.style[k]=p.css[k];});
  }

  smartRec.forEach(function(rec){
    var rb=D.createElement('button');
    rb.style.cssText='display:flex;align-items:center;gap:6px;width:100%;padding:4px 6px;margin-bottom:3px;background:rgba(2,85,255,.1);border:1px solid rgba(2,85,255,.2);border-radius:5px;color:#fff;font-size:9px;cursor:pointer;transition:all .12s;text-align:left';
    var rIcon=D.createElement('span');rIcon.textContent=rec.icon;rIcon.style.fontSize='14px';
    var rText=D.createElement('span');rText.style.cssText='flex:1';rText.textContent=rec.name;
    var rReason=D.createElement('span');rReason.style.cssText='font-size:8px;color:rgba(255,255,255,.35)';rReason.textContent=rec.reason;
    rb.appendChild(rIcon);rb.appendChild(rText);rb.appendChild(rReason);
    rb.addEventListener('click',function(ev){
      ev.stopPropagation();
      activatePreset(rec);
      recSection.querySelectorAll('button').forEach(function(b){b.style.borderColor='rgba(2,85,255,.2)';b.style.background='rgba(2,85,255,.1)';});
      rb.style.borderColor='#0255FF';rb.style.background='rgba(2,85,255,.25)';
    });
    rb.addEventListener('mouseenter',function(){rb.style.background='rgba(2,85,255,.2)';});
    rb.addEventListener('mouseleave',function(){if(_activePreset!==rec) rb.style.background='rgba(2,85,255,.1)';});
    recSection.appendChild(rb);
  });

  /* ── 手动预设网格 ── */
  var manualLabel=D.createElement('div');manualLabel.style.cssText='font-size:9px;color:rgba(255,255,255,.3);margin-bottom:4px';
  manualLabel.textContent='手动选择';

  var presets=[
    {name:'纵向堆叠',icon:'↓',css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:'16px'},minBP:0},
    {name:'横向排列',icon:'→',css:{display:'flex',flexDirection:'row',alignItems:'center',gap:'16px',flexWrap:'wrap'},minBP:0},
    {name:'居中',icon:'◎',css:{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'},minBP:0},
    {name:'两端对齐',icon:'⟷',css:{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'},minBP:375},
    {name:'等分两栏',icon:'▥',css:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'},minBP:500},
    {name:'等分三栏',icon:'▤',css:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'},minBP:768},
  ];

  var grid=D.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:8px';
  presets.forEach(function(p){
    var tooNarrow=bp.width<p.minBP;
    var btn=D.createElement('button');
    btn.style.cssText='display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;cursor:pointer;color:#fff;font-size:9px;transition:all .12s'+(tooNarrow?';opacity:.4':'');
    var ico=D.createElement('span');ico.textContent=p.icon;ico.style.fontSize='16px';
    var lab=D.createElement('span');lab.textContent=p.name;lab.style.cssText='font-size:8px;color:rgba(255,255,255,.5)';
    btn.appendChild(ico);btn.appendChild(lab);
    if(tooNarrow){
      var warn=D.createElement('span');warn.textContent='窄';warn.style.cssText='font-size:7px;color:#F59E0B;background:rgba(245,158,11,.15);padding:0 3px;border-radius:2px';
      btn.appendChild(warn);
    }
    btn.addEventListener('click',function(ev){
      ev.stopPropagation();
      grid.querySelectorAll('button').forEach(function(b){b.style.borderColor='rgba(255,255,255,.1)';b.style.background='rgba(255,255,255,.06)';});
      btn.style.borderColor='#0255FF';btn.style.background='rgba(2,85,255,.15)';
      _activePreset=p;
      Object.keys(p.css).forEach(function(k){el.style[k]=p.css[k];});
    });
    btn.addEventListener('mouseenter',function(){if(_activePreset!==p) btn.style.background='rgba(255,255,255,.1)';});
    btn.addEventListener('mouseleave',function(){if(_activePreset!==p) btn.style.background='rgba(255,255,255,.06)';});
    grid.appendChild(btn);
  });

  var gapSection=D.createElement('div');gapSection.style.cssText='border-top:1px solid rgba(255,255,255,.06);padding-top:6px;margin-top:4px';
  var gapLabel=D.createElement('div');gapLabel.textContent='子元素间距';gapLabel.style.cssText='font-size:9px;color:rgba(255,255,255,.4);margin-bottom:4px';
  var gapRow=D.createElement('div');gapRow.style.cssText='display:flex;align-items:center;gap:6px';
  var gapSlider=D.createElement('input');gapSlider.type='range';gapSlider.min='0';gapSlider.max='80';gapSlider.step='1';gapSlider.value=String(parseFloat(origGap)||0);
  gapSlider.style.cssText='flex:1;accent-color:#0255FF;height:3px';
  var gapInput=D.createElement('input');gapInput.type='number';gapInput.min='0';gapInput.max='200';gapInput.value=String(Math.round(parseFloat(origGap)||0));
  gapInput.style.cssText='width:40px;background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:4px;padding:1px 3px;font-size:10px;text-align:center';
  gapSlider.addEventListener('input',function(){gapInput.value=gapSlider.value;el.style.gap=gapSlider.value+'px';});
  gapInput.addEventListener('input',function(){gapSlider.value=gapInput.value;el.style.gap=gapInput.value+'px';});
  gapRow.appendChild(gapSlider);gapRow.appendChild(gapInput);
  gapSection.appendChild(gapLabel);gapSection.appendChild(gapRow);

  /* ── 一键优化子元素 ── */
  var optimizeSection=D.createElement('div');optimizeSection.style.cssText='border-top:1px solid rgba(255,255,255,.06);padding-top:6px;margin-top:6px';
  var optBtn=D.createElement('button');
  optBtn.style.cssText='width:100%;padding:6px;background:linear-gradient(135deg,rgba(2,85,255,.2),rgba(139,92,246,.2));border:1px solid rgba(2,85,255,.25);border-radius:6px;color:#fff;font-size:10px;cursor:pointer;transition:all .15s;font-weight:500';
  var patternLabel={hero:'Hero区',generic:'通用','card-grid':'卡片网格','table-section':'表格区','cta-section':'CTA区','prize-grid':'九宫格','timeline':'时间线','faq':'FAQ','tab-content':'Tab内容','stat-counter':'数据指标','testimonial':'留言/评价','feature-list':'特性列表','form-section':'表单','nav-bar':'导航','footer':'页脚','list-section':'列表'};
  optBtn.textContent='一键智能优化 · '+(patternLabel[info.pattern]||'模块');
  optBtn.addEventListener('mouseenter',function(){optBtn.style.background='linear-gradient(135deg,rgba(2,85,255,.35),rgba(139,92,246,.35))';});
  optBtn.addEventListener('mouseleave',function(){optBtn.style.background='linear-gradient(135deg,rgba(2,85,255,.2),rgba(139,92,246,.2))';});
  optBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    _smartOptimizeModule(el,bp,info);
  });
  optimizeSection.appendChild(optBtn);

  var acts=D.createElement('div');acts.className='ins-cp-actions';acts.style.marginTop='8px';
  var cancelBtn=D.createElement('button');cancelBtn.className='ins-cp-btn';cancelBtn.textContent='取消';
  cancelBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    Object.keys(origStyles).forEach(function(k){el.style[k]=origStyles[k];});
    insHidePropPanel();
  });
  var applyBtn=D.createElement('button');applyBtn.className='ins-cp-btn primary';applyBtn.textContent='应用';
  applyBtn.addEventListener('click',function(ev){
    ev.stopPropagation();
    var presetName=_activePreset?_activePreset.name:'自定义';
    var newGap=gapInput.value+'px';
    var ann={id:++INS.annId,action:'layout-edit',
      targets:[{selector:getSelector(el),tagName:el.tagName.toLowerCase(),preset:presetName,gap:newGap,bp:bp.label,childCount:info.childCount}],
      comment:'布局: '+presetName+', gap: '+newGap+' ['+bp.label+']',
      author:'User',timestamp:Date.now(),status:'pending'};
    INS.annotations.push(ann);
    T.insRenderPanel();T.insUpdateTabCount();
    T.insShowHint('[布局] 标注 #'+ann.id+' · '+presetName+', gap: '+newGap);
    insHidePropPanel();
  });
  acts.appendChild(cancelBtn);acts.appendChild(applyBtn);

  _propPanel.appendChild(title);_propPanel.appendChild(recSection);
  _propPanel.appendChild(manualLabel);_propPanel.appendChild(grid);
  _propPanel.appendChild(gapSection);_propPanel.appendChild(optimizeSection);_propPanel.appendChild(acts);

  D.body.appendChild(_propPanel);
  var r=el.getBoundingClientRect();
  var pw=_propPanel.offsetWidth||260,ph=_propPanel.offsetHeight||400;
  var top=r.top-ph-8;if(top<8) top=r.bottom+8;
  if(top+ph>W.innerHeight-8) top=Math.max(8,W.innerHeight-ph-8);
  var left=r.left;if(left+pw>W.innerWidth) left=W.innerWidth-pw-8;if(left<4) left=4;
  _propPanel.style.position='fixed';_propPanel.style.top=top+'px';_propPanel.style.left=left+'px';
  setTimeout(function(){D.addEventListener('click',_propPanelOutside,true);},0);
}


/* ── 一键优化模块 v3（利用 diagnostics + 降低阈值 + 子容器递归） ── */
function _smartOptimizeModule(el,bp,info){
  var typo=bp.typo;var sp=bp.space;var bpKey=bp.bpKey;

  /* 1. 快照当前状态（含孙辈） */
  var snapshot={};
  function saveStyle(node,key){
    if(!snapshot[key]) snapshot[key]=[];
    snapshot[key].push({el:node,orig:{fontSize:node.style.fontSize,lineHeight:node.style.lineHeight,padding:node.style.padding,gap:node.style.gap,display:node.style.display,gridTemplateColumns:node.style.gridTemplateColumns,flexDirection:node.style.flexDirection,alignItems:node.style.alignItems,justifyContent:node.style.justifyContent,flexWrap:node.style.flexWrap,maxWidth:node.style.maxWidth,marginLeft:node.style.marginLeft,marginRight:node.style.marginRight,borderRadius:node.style.borderRadius,textAlign:node.style.textAlign,overflowY:node.style.overflowY,maxHeight:node.style.maxHeight,width:node.style.width,paddingLeft:node.style.paddingLeft,paddingRight:node.style.paddingRight,overflow:node.style.overflow,minHeight:node.style.minHeight,minWidth:node.style.minWidth}});
  }
  saveStyle(el,'root');
  info.children.forEach(function(c,i){
    saveStyle(c,'child-'+i);
    Array.from(c.children).forEach(function(gc,j){
      if(!T.isToolkitEl(gc)) saveStyle(gc,'grandchild-'+i+'-'+j);
    });
  });

  var changes=[];

  /* 2. 布局优化：始终应用最佳推荐（分析器已经按置信度排序） */
  var recs=_getSmartLayoutRec(info,bp);
  if(recs.length>0){
    var best=recs[0];
    var shouldApply=info.pattern!=='generic'||info.confidence>=1||best.name.indexOf('修复')===0
      ||info.isOverflow||info.diagnostics.some(function(d){return d.severity==='high'||d.severity==='medium';});
    if(!shouldApply){
      var curD=getComputedStyle(el).display;
      var curFD=getComputedStyle(el).flexDirection;
      var cssKeys=Object.keys(best.css);
      shouldApply=cssKeys.some(function(k){
        if(k==='display'&&best.css[k]!==curD) return true;
        if(k==='flexDirection'&&best.css[k]!==curFD) return true;
        if(k==='gap'&&(!parseFloat(getComputedStyle(el).gap))) return true;
        if(k==='flexWrap'&&getComputedStyle(el).flexWrap==='nowrap'&&info.childCount>=3) return true;
        return false;
      });
    }
    if(shouldApply){
      Object.keys(best.css).forEach(function(k){el.style[k]=best.css[k];});
      changes.push({type:'布局',desc:best.name+' ('+best.reason+')'});
    }
  }

  /* 3. P3 诊断驱动修复 */
  if(info.diagnostics){
    info.diagnostics.forEach(function(d){
      if(d.type==='truncation'){
        var idx=parseInt((d.desc.match(/第(\d+)个/)||[])[1])||0;
        if(idx>0&&info.children[idx-1]){
          info.children[idx-1].style.overflow='visible';
          changes.push({type:'截断',desc:d.desc+' → overflow:visible'});
        }
      }
      if(d.type==='space-waste'&&info.childCount>=3){
        var ccs=getComputedStyle(el);
        if(ccs.display!=='grid'&&ccs.display!=='flex'){
          el.style.display='flex';el.style.flexWrap='wrap';el.style.gap=sp.gap+'px';
          changes.push({type:'布局',desc:'空间利用率低 → flex-wrap 填充'});
        }
      }
      /* frontend-animation-patterns.mdc: 宽度链断裂修复 */
      if(d.type==='width-chain'){
        var wIdx=parseInt((d.desc.match(/第(\d+)个/)||[])[1])||0;
        if(wIdx>0&&info.children[wIdx-1]){
          info.children[wIdx-1].style.width='100%';
          changes.push({type:'宽度链',desc:d.desc+' → width:100%'});
        }
      }
      /* ui-design-patterns.mdc: 左右失衡→改纵向 */
      if(d.type==='layout-imbalance'){
        el.style.flexDirection='column';el.style.alignItems='stretch';
        changes.push({type:'布局',desc:d.desc+' → 改纵向堆叠'});
      }
      /* rules.md R15: 触摸目标修复 — 交互元素 <44px 自动加 min-size */
      if(d.type==='touch-target'){
        var tIdx=parseInt((d.desc.match(/第(\d+)个/)||[])[1])||0;
        var tTarget=tIdx>0?info.children[tIdx-1]:null;
        if(!tTarget&&d.desc.indexOf('子容器#')>=0){
          var tSub=parseInt((d.desc.match(/子容器#(\d+)/)||[])[1])||0;
          if(tSub>0&&info.children[tSub-1]){
            info.children[tSub-1].querySelectorAll('button,a,[role="button"],input:not([type="hidden"])').forEach(function(btn){
              if(btn.offsetHeight<44) btn.style.minHeight='44px';
              if(btn.offsetWidth<44) btn.style.minWidth='44px';
            });
          }
        } else if(tTarget){
          if(tTarget.offsetHeight<44) tTarget.style.minHeight='44px';
          if(tTarget.offsetWidth<44) tTarget.style.minWidth='44px';
        }
        changes.push({type:'触摸',desc:d.desc+' → min 44px'});
      }
      /* rules.md R10: 标题跳级 — 调整中间缺失层级的字号 */
      if(d.type==='heading-skip'){
        var skipMatch=d.desc.match(/H(\d)→H(\d)/);
        if(skipMatch){
          var hFrom=parseInt(skipMatch[1]),hTo=parseInt(skipMatch[2]);
          for(var hLev=hFrom+1;hLev<hTo;hLev++){
            var hTag='H'+hLev;
            var hTarget=typo[hTag];
            if(!hTarget) continue;
            el.querySelectorAll('h'+hTo).forEach(function(hEl){
              var hCur=parseFloat(getComputedStyle(hEl).fontSize)||16;
              if(hCur<hTarget*0.8){
                hEl.style.fontSize=hTarget+'px';
                changes.push({type:'标题层级',desc:'H'+hTo+' 字号 '+Math.round(hCur)+'→'+hTarget+'px (补 H'+hLev+' 层级)'});
              }
            });
          }
        }
      }
      /* DT-layout: flex→grid 自动切换 */
      if(d.type==='flex-should-grid'){
        var sgCols=Math.min(info.childCount,bp.maxCols);
        el.style.display='grid';
        el.style.gridTemplateColumns='repeat('+sgCols+',1fr)';
        el.style.gap=_UC.patterns.cardGrid.colGap+'px';
        changes.push({type:'布局',desc:'flex→grid '+sgCols+'栏 (等分同构元素)'});
      }
      /* ui-design-patterns.mdc: 空间浪费→放大核心元素 */
      if(d.type==='space-enlarge'){
        info.children.forEach(function(child){
          child.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function(h){
            var hCur=parseFloat(getComputedStyle(h).fontSize)||16;
            var bump=Math.round(hCur*1.2);
            h.style.fontSize=bump+'px';
            changes.push({type:'放大',desc:h.tagName+' 字号 '+Math.round(hCur)+'→'+bump+'px (填充空间)'});
          });
          var childCs=getComputedStyle(child);
          var childGap=parseFloat(childCs.gap)||0;
          if(childGap>0&&childGap<24&&child.children.length>=2){
            child.style.gap=Math.round(childGap*1.5)+'px';
            changes.push({type:'放大',desc:'子间距 '+Math.round(childGap)+'→'+Math.round(childGap*1.5)+'px'});
          }
        });
      }
    });
  }

  /* 4. 排版修正：dynamic-theme.mdc 缩放系数 */
  var scale=_UC.typoScale[bpKey]||1;
  function checkTypo(node){
    var tag=node.tagName;var target=typo[tag];
    if(!target) return;
    var cur=parseFloat(getComputedStyle(node).fontSize)||16;
    var scaledTarget=Math.round(target*scale);
    var ratio=cur/scaledTarget;
    if(ratio>1.25||ratio<0.75){
      node.style.fontSize=scaledTarget+'px';
      changes.push({type:'字号',desc:tag+': '+Math.round(cur)+'→'+scaledTarget+'px'});
    }
    var lh=parseFloat(getComputedStyle(node).lineHeight)||0;
    if(scaledTarget>0&&lh/scaledTarget>1.8&&/^H[1-6]$/.test(tag)){
      node.style.lineHeight=String(typo.lineHeight.title);
      changes.push({type:'行高',desc:tag+' lineHeight→'+typo.lineHeight.title});
    }
  }
  info.children.forEach(function(child){
    checkTypo(child);
    child.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,button,li').forEach(checkTypo);
  });

  /* 5. 间距修正：dynamic-theme.mdc 5级层级匹配 */
  var sp5=_UC.spacing5[bpKey]||_UC.spacing5[1248];
  function pickSpaceLevel(node){
    var cc=node.children.length;
    var isSection=node.tagName==='SECTION'||/section|hero|footer/i.test(node.className||'');
    if(isSection) return sp5.section;
    if(cc>=3) return sp5.block;
    if(cc>=1) return sp5.element;
    return sp5.inline;
  }
  info.children.forEach(function(child){
    var ccs=getComputedStyle(child);
    var padTarget=pickSpaceLevel(child);
    var curPadT=parseFloat(ccs.paddingTop)||0;
    var curPadL=parseFloat(ccs.paddingLeft)||0;
    var avgPad=(curPadT+curPadL)/2;
    var needsPadFix=(avgPad===0&&child.children.length>=2)||(avgPad>padTarget*1.5||avgPad<padTarget*0.4);
    if(needsPadFix){
      child.style.padding=padTarget+'px';
      changes.push({type:'间距',desc:'padding '+Math.round(avgPad)+'→'+padTarget+'px ('+
        (padTarget===sp5.section?'section':padTarget===sp5.block?'block':'element')+'级)'});
    }
    var gapTarget=child.children.length>=3?sp5.element:sp5.inline;
    var curGap=parseFloat(ccs.gap)||0;
    var needsGapFix=(curGap===0&&child.children.length>=2)||(curGap>gapTarget*1.8||curGap<gapTarget*0.4);
    if(needsGapFix&&child.children.length>=2){
      child.style.gap=gapTarget+'px';
      changes.push({type:'间距',desc:'gap '+Math.round(curGap)+'→'+gapTarget+'px'});
    }

    /* flexWrap 自动补充：nowrap + 子元素>=3 + flex/inline-flex 时自动加 wrap 防溢出 */
    if(ccs.display.indexOf('flex')>=0&&ccs.flexWrap==='nowrap'&&child.children.length>=3){
      var childTotalW=0;
      Array.from(child.children).forEach(function(gc){childTotalW+=gc.offsetWidth;});
      if(childTotalW>child.clientWidth*0.95){
        child.style.flexWrap='wrap';
        changes.push({type:'布局',desc:'子容器 flex-wrap:wrap (防溢出)'});
      }
    }
  });

  /* 容器自身间距 */
  var elCS=getComputedStyle(el);
  var elGapTarget=pickSpaceLevel(el);
  var elGap=parseFloat(elCS.gap)||0;
  if((elGap===0&&info.childCount>=2)||(elGap>elGapTarget*2||elGap<elGapTarget*0.3)){
    el.style.gap=elGapTarget+'px';
    changes.push({type:'间距',desc:'容器 gap '+Math.round(elGap)+'→'+elGapTarget+'px'});
  }

  /* 容器 flexWrap 自动补充 */
  if(elCS.display.indexOf('flex')>=0&&elCS.flexWrap==='nowrap'&&info.childCount>=3&&info.isOverflow){
    el.style.flexWrap='wrap';
    changes.push({type:'布局',desc:'容器 flex-wrap:wrap (修复溢出)'});
  }

  /* 6. 圆角统一：结构检测 — 子元素有 >3 个孩子的按卡片处理 */
  info.children.forEach(function(c){
    var isCardLike=c.children.length>=3||/card|tile|panel|cell/i.test(c.className||'');
    if(!isCardLike) return;
    var curR=parseFloat(getComputedStyle(c).borderRadius)||0;
    if(curR>0&&Math.abs(curR-_UC.radius.card)>4){
      c.style.borderRadius=_UC.radius.card+'px';
      changes.push({type:'圆角',desc:Math.round(curR)+'→'+_UC.radius.card+'px'});
    }
  });

  /* 7. R13: 内容最大宽度 */
  if(el.clientWidth>_UC.layout.maxWidth&&info.pattern!=='hero'&&info.pattern!=='nav-bar'){
    el.style.maxWidth=_UC.layout.maxWidth+'px';
    el.style.marginLeft='auto';el.style.marginRight='auto';
    changes.push({type:'宽度',desc:'maxWidth '+_UC.layout.maxWidth+'px'});
  }

  /* 8. 子容器递归优化（1层） */
  info.children.forEach(function(child,idx){
    if(child.children.length<3) return;
    var subInfo=_analyzeModule(child);
    if(subInfo.pattern==='generic'&&subInfo.confidence===0&&!subInfo.diagnostics.length) return;
    var subRecs=_getSmartLayoutRec(subInfo,bp);
    if(subRecs.length>0&&(subInfo.pattern!=='generic'||subInfo.diagnostics.length>0)){
      var subBest=subRecs[0];
      Object.keys(subBest.css).forEach(function(k){child.style[k]=subBest.css[k];});
      changes.push({type:'子布局',desc:'子容器#'+(idx+1)+': '+subBest.name});
    }
    subInfo.diagnostics.forEach(function(d){
      if(d.type==='overflow'){
        child.style.overflow='hidden';child.style.flexWrap='wrap';
        changes.push({type:'子修复',desc:'子容器#'+(idx+1)+' '+d.desc});
      }
    });
  });

  /* 7. 对比预览弹窗 */
  if(changes.length===0){
    T.insShowHint('当前布局已基本合理，无需优化');
    return;
  }

  var overlay=D.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483645;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  var dialog=D.createElement('div');
  dialog.style.cssText='background:rgba(20,20,28,.97);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:20px;color:#fff;max-width:400px;width:90%;font-size:13px;box-shadow:0 16px 48px rgba(0,0,0,.6)';

  var patternLabel={hero:'Hero区',generic:'通用','card-grid':'卡片网格','cta-section':'CTA区','prize-grid':'九宫格','timeline':'时间线','faq':'FAQ','tab-content':'Tab内容','stat-counter':'数据指标','testimonial':'留言/评价','feature-list':'特性列表','form-section':'表单','nav-bar':'导航','footer':'页脚','list-section':'列表'};
  var title=D.createElement('div');
  title.style.cssText='font-size:15px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px';
  title.innerHTML='<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,rgba(2,85,255,.3),rgba(139,92,246,.3));font-size:14px">✦</span> 智能优化预览';
  dialog.appendChild(title);

  var meta=D.createElement('div');
  meta.style.cssText='font-size:11px;color:rgba(255,255,255,.5);margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap';
  meta.innerHTML='<span style="padding:2px 8px;border-radius:4px;background:rgba(2,85,255,.15);color:#6BA1FF">'+(patternLabel[info.pattern]||'通用')+'</span><span style="padding:2px 8px;border-radius:4px;background:rgba(255,255,255,.06)">'+bp.label+'</span><span style="padding:2px 8px;border-radius:4px;background:rgba(255,255,255,.06)">'+info.childCount+'个子元素</span>';
  dialog.appendChild(meta);

  var listEl=D.createElement('div');
  listEl.style.cssText='max-height:200px;overflow-y:auto;margin-bottom:16px';
  var dedup={};
  changes.forEach(function(c){
    var key=c.type+c.desc;
    if(dedup[key]) return;dedup[key]=true;
    var row=D.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px';
    var badge=D.createElement('span');
    badge.style.cssText='padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;flex-shrink:0;background:'+(c.type==='布局'?'rgba(59,130,246,.15);color:#60A5FA':c.type==='字号'?'rgba(168,85,247,.15);color:#C084FC':c.type==='间距'?'rgba(34,197,94,.15);color:#4ADE80':'rgba(255,255,255,.1);color:rgba(255,255,255,.6)');
    badge.textContent=c.type;
    var desc=D.createElement('span');desc.textContent=c.desc;desc.style.color='rgba(255,255,255,.8)';
    row.appendChild(badge);row.appendChild(desc);
    listEl.appendChild(row);
  });
  dialog.appendChild(listEl);

  var btns=D.createElement('div');
  btns.style.cssText='display:flex;gap:10px;justify-content:flex-end';
  var revertBtn=D.createElement('button');
  revertBtn.style.cssText='padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);cursor:pointer;font-size:12px';
  revertBtn.textContent='撤销还原';

  function _closeOverlay(){
    try{if(overlay.parentNode) overlay.parentNode.removeChild(overlay);}catch(e){}
  }
  revertBtn.onmousedown=function(ev){
    ev.stopPropagation();ev.stopImmediatePropagation();ev.preventDefault();
    Object.keys(snapshot).forEach(function(key){
      snapshot[key].forEach(function(s){
        var o=s.orig;
        Object.keys(o).forEach(function(k){s.el.style[k]=o[k];});
      });
    });
    if(T._writeFeedback&&recs.length>0) T._writeFeedback(info.pattern,bpKey,recs[0].name,false);
    _closeOverlay();
    T.insShowHint('已还原');
  };
  var acceptBtn=D.createElement('button');
  acceptBtn.style.cssText='padding:8px 20px;border-radius:8px;border:none;background:#3b82f6;color:#fff;cursor:pointer;font-size:12px;font-weight:600';
  acceptBtn.textContent='确认采用';
  acceptBtn.onmousedown=function(ev){
    ev.stopPropagation();ev.stopImmediatePropagation();ev.preventDefault();
    if(T._writeFeedback&&recs.length>0) T._writeFeedback(info.pattern,bpKey,recs[0].name,true);
    _closeOverlay();
    var uniqueChanges=[];var seen={};
    changes.forEach(function(c){var k=c.type+c.desc;if(!seen[k]){seen[k]=true;uniqueChanges.push(c);}});
    T.insShowHint('已应用 '+uniqueChanges.length+' 项优化');
  };
  btns.appendChild(revertBtn);btns.appendChild(acceptBtn);
  dialog.appendChild(btns);
  overlay.appendChild(dialog);
  D.body.appendChild(overlay);

  overlay.onmousedown=function(ev){
    if(ev.target===overlay){ev.stopPropagation();ev.stopImmediatePropagation();_closeOverlay();}
  };
}



T.insInjectCSS=insInjectCSS; T.insCreateHL=insCreateHL;
T.insShowHL=insShowHL; T.insHideHL=insHideHL;
T.insOnHover=insOnHover; T.insOnClick=insOnClick; T.insOnDblClick=insOnDblClick;
T.insToggleSelect=insToggleSelect; T.insToggleSelectOnly=insToggleSelectOnly;
T.insAddSelection=insAddSelection;
T.insUpdateCtxBar=insUpdateCtxBar; T.insHideCtxBar=insHideCtxBar;
T.insPositionCtxBar=insPositionCtxBar; T.insPositionSelBox=insPositionSelBox;
T.insInlineTextEdit=insInlineTextEdit;
T.insInlineBatchTextEdit=insInlineBatchTextEdit;
T.insInlineImageEdit=insInlineImageEdit;
T.insInlineColorEdit=insInlineColorEdit; T.insHideColorPicker=insHideColorPicker;
T.insInlinePropEdit=insInlinePropEdit; T.insInlineLayoutEdit=insInlineLayoutEdit; T.insInlineGeometryEdit=insInlineGeometryEdit; T.insHidePropPanel=insHidePropPanel;
T.insHideTypeBadge=insHideTypeBadge;
T.insScreenshotElement=insScreenshotElement;
T.insTraceVar=insTraceVar; T.insGetElType=insGetElType;
T.insShowLayerPicker=insShowLayerPicker; T.insHideLayerPicker=insHideLayerPicker;
T.insBuildInfo=insBuildInfo;

})(window,document);
