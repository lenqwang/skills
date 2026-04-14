;(function(W,D){'use strict';
var T=W.__TK;
var getVar=T.getVar, setVar=T.setVar, refreshC=T.refreshC;
var _presets=T._presets, _vars=T._vars, CFG=T.CFG;
var _defaultSnap=T._defaultSnap;
var COMPONENT_MAP=T.COMPONENT_MAP, COMPONENT_MAP_REV=T.COMPONENT_MAP_REV;
var categorizeVars=T.categorizeVars, tkCopy=T.tkCopy, insRgbToHex=T.insRgbToHex;

/* ═══ TOAST 通知（替代 alert） ═══ */
var _toastTimer=0;
function tkToast(msg,type){
  type=type||'success';
  var el=D.getElementById('tk-toast');
  if(!el){
    el=D.createElement('div');el.id='tk-toast';
    el.style.cssText='position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:10300;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:500;font-family:Inter,system-ui,sans-serif;color:#fff;pointer-events:none;opacity:0;transition:opacity .25s ease';
    D.body.appendChild(el);
  }
  el.style.background=type==='error'?'rgba(239,68,68,.92)':'rgba(34,197,94,.92)';
  el.textContent=msg;
  el.style.opacity='1';
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(function(){el.style.opacity='0';},3000);
}

/* ═══ 变量影响范围高亮 ═══ */
var _hlStyleEl=null;
function ensureHlStyle(){
  if(_hlStyleEl)return;
  _hlStyleEl=D.createElement('style');_hlStyleEl.id='tk-var-hl-style';
  _hlStyleEl.textContent='.tk-var-highlight{outline:2px solid #3b6bff !important;outline-offset:-1px;box-shadow:inset 0 0 0 9999px rgba(59,107,255,.08) !important}';
  D.head.appendChild(_hlStyleEl);
}
function hlVarEnter(varName){
  ensureHlStyle();
  /* 遍历页面元素，检查 computed style 中是否引用了该变量 */
  var all=D.querySelectorAll('body *');
  for(var i=0;i<all.length;i++){
    var el=all[i];
    /* 排除 toolkit 自身元素 */
    if(T.isToolkitEl(el))continue;
    /* 检查内联 style 属性和 stylesheet 中是否使用了该变量 */
    var style=el.getAttribute('style')||'';
    var hit=style.indexOf('var('+varName+')')>=0||style.indexOf('var( '+varName+' )')>=0;
    if(!hit){
      /* 检查匹配的 stylesheet 规则中是否引用了该变量 */
      try{
        var sheets=D.styleSheets;
        for(var s=0;s<sheets.length;s++){
          try{
            var rules=sheets[s].cssRules||[];
            for(var r=0;r<rules.length;r++){
              var rule=rules[r];
              if(rule.cssText&&rule.cssText.indexOf(varName)>=0){
                if(rule.selectorText&&el.matches(rule.selectorText)){hit=true;break;}
              }
            }
          }catch(e){/* 跨域样式表跳过 */}
          if(hit)break;
        }
      }catch(e){}
    }
    if(hit)el.classList.add('tk-var-highlight');
  }
}
function hlVarLeave(){
  var els=D.querySelectorAll('.tk-var-highlight');
  for(var i=0;i<els.length;i++)els[i].classList.remove('tk-var-highlight');
}

/* ═══ DESIGN PANEL ═══ */
var _dpOpen=false, _curPreset=Object.keys(_presets)[0]||'', _dpFields=[];

function buildDPFields(){
  var cat=categorizeVars(); _dpFields=[];
  _dpFields.push({section:'预设 Presets',type:'presets'});
  cat.order.forEach(function(p){_dpFields.push(cat.secs[p]);});
  _dpFields.push({section:'导出 Export',type:'export'});
}

function buildDP(){
  var h='';
  /* 统计 diff：当前值 vs 初始快照 */
  var diffCount=0, totalCount=0;
  _dpFields.forEach(function(sec){
    if(sec.fields)sec.fields.forEach(function(f){
      var cur=getVar(f.v)||'';
      if(!cur)return;
      totalCount++;
      if(_defaultSnap[f.v]&&cur!==_defaultSnap[f.v])diffCount++;
    });
  });

  _dpFields.forEach(function(sec){
    if(sec.type==='presets'){
      h+='<div><div class="tk-sec-title">'+sec.section+'</div><div class="tk-preset-grid">';
      Object.keys(_presets).forEach(function(id){
        var p=_presets[id], a=_curPreset===id;
        h+='<button type="button" onclick="window._tk.preset(\''+id+'\')" class="tk-dp-preset'+(a?' active':'')+'" data-preset="'+id+'"><div class="tk-dp-preset-dot" style="background:'+(p['--c-bg']||'#000')+'"></div><span class="tk-dp-preset-name">'+(p.name||id)+'</span></button>';
      });
      h+='</div></div>'; return;
    }
    if(sec.type==='export'){
      h+='<div><div class="tk-sec-title">'+sec.section+'</div>'
        +'<div class="tk-export-grid"><button type="button" onclick="window._tk.expCSS()" class="tk-exp-btn">导出 CSS</button><button type="button" onclick="window._tk.expJSON()" class="tk-exp-btn">导出组件 JSON</button><button type="button" onclick="window._tk.expVarJSON()" class="tk-exp-btn">导出变量 JSON</button><button type="button" onclick="window._tk.expComponentJSON()" class="tk-exp-btn">导出组件 Token</button></div>'
        /* 导出 Diff 按钮 */
        +'<button type="button" onclick="window._tk.expDiff()" class="tk-exp-btn" style="width:100%;margin-top:4px'+(diffCount===0?';opacity:.35;cursor:not-allowed':'')+'">导出 Diff（'+diffCount+' 项修改）</button>'
        +'<button type="button" onclick="window._tk.expHTML()" class="tk-btn-primary">导出完整 HTML</button>'
        +'<button type="button" onclick="window._tk.impJSON()" class="tk-btn-secondary">导入主题</button>'
        +'<button type="button" onclick="window._tk.saveAs()" class="tk-btn-secondary">保存为新预设</button>'
        +'<button type="button" onclick="window._tk.reset()" class="tk-btn-ghost">重置为当前预设</button>'
        +'<div class="tk-sec-title" style="margin-top:16px">工具 Tools</div>'
        +'<div class="tk-export-grid"><button type="button" onclick="window._tk.abToggle()" class="tk-exp-btn" id="tk-ab-btn">A/B 对比</button><button type="button" onclick="window._tk.calToggle()" class="tk-exp-btn" id="tk-cal-btn">校准参考图</button><button type="button" onclick="window._tk.rulesCheck()" class="tk-exp-btn">规则速检</button></div>'
        +'<div id="tk-rules-result"></div>'
        /* 修改统计 */
        +'<div style="text-align:center;font-size:11px;color:rgba(255,255,255,.35);margin-top:8px">修改 '+diffCount+' / 共 '+totalCount+' 变量</div>'
        +'</div>'; return;
    }
    var fieldHtml='';
    sec.fields.forEach(function(f){
      var v=getVar(f.v)||'';
      if(!v) return;
      /* diff 标记：当前值与初始快照不同时显示蓝色圆点 */
      var changed=_defaultSnap[f.v]&&v!==_defaultSnap[f.v];
      var dot=changed?'<span style="color:#3b6bff;font-size:14px;line-height:1;flex-shrink:0;margin-right:-4px" title="已修改（原始值：'+T.tkEscHtml(_defaultSnap[f.v])+'）">\u25cf</span>':'';
      var lbl='<span class="tk-field-lbl" data-hl-var="'+f.v+'">'+f.label+'</span>';
      if(f.type==='color'){
        var hv=(/^#[0-9a-fA-F]{3,8}$/.test(v))?v:(/^rgba?\(/.test(v)?T.insRgbToHex(v):v);
        fieldHtml+='<label class="tk-row">'+dot+lbl+'<input type="color" value="'+(hv.length===7?hv:'#000000')+'" data-var="'+f.v+'" onchange="window._tk.chgColor(this)" oninput="window._tk.chgColor(this)" class="tk-color-input"><input type="text" value="'+hv+'" data-var="'+f.v+'" oninput="window._tk.chgHex(this)" class="tk-text-input" spellcheck="false"></label>';
      }
      else if(f.type==='num')
        fieldHtml+='<label class="tk-row">'+dot+lbl+'<input type="number" value="'+v+'" data-var="'+f.v+'" oninput="window._tk.chgNum(this)" class="tk-num-input" step="1"><span style="font-size:10px;color:rgba(255,255,255,.3)">'+(f.suffix||'')+'</span></label>';
      else
        fieldHtml+='<label class="tk-row">'+dot+lbl+'<input type="text" value="'+v+'" data-var="'+f.v+'" oninput="window._tk.chgTxt(this)" class="tk-text-input" spellcheck="false"></label>';
    });
    if(fieldHtml) h+='<div><div class="tk-sec-title">'+sec.section+'</div><div style="display:flex;flex-direction:column;gap:6px">'+fieldHtml+'</div></div>';
  });
  if(_vars['--g-cta-from']||_vars['--c-accent']){
    var fr=getVar('--g-cta-from')||getVar('--c-accent')||'#3B82F6';
    var to=getVar('--g-cta-to')||getVar('--c-accent-l')||'#60A5FA';
    var dir=getVar('--g-cta-dir')||'90deg';
    h+='<div><div class="tk-sec-title">CTA 预览</div><div style="display:flex;justify-content:center"><button type="button" id="tk-cta-pv" class="tk-cta-pv" style="background:linear-gradient('+dir+','+fr+','+to+')">示例按钮</button></div></div>';
  }
  D.getElementById('tk-dp-body').innerHTML=h;
  D.querySelectorAll('.tk-dp-preset[data-preset^="custom-"]').forEach(function(btn){
    var w=D.createElement('div');w.style.cssText='position:relative';
    btn.parentNode.insertBefore(w,btn);w.appendChild(btn);
    var x=D.createElement('button');
    x.className='tk-del-badge';
    x.textContent='\u00d7';x.title='删除';
    x.onclick=function(e){e.stopPropagation();delPreset(btn.dataset.preset);};
    w.appendChild(x);
  });

  /* 绑定字段 label 的 hover 高亮事件 */
  D.querySelectorAll('[data-hl-var]').forEach(function(lbl){
    var varName=lbl.getAttribute('data-hl-var');
    lbl.style.cursor='help';
    lbl.addEventListener('mouseenter',function(){hlVarEnter(varName);});
    lbl.addEventListener('mouseleave',function(){hlVarLeave();});
  });
}

function toggleDP(){
  _dpOpen=!_dpOpen;
  var p=D.getElementById('tk-panel'),o=D.getElementById('tk-overlay');
  if(!p||!o)return;
  if(_dpOpen){buildDPFields();buildDP();p.style.transform='translateX(0)';o.style.display='block';}
  else{p.style.transform='translateX(100%)';o.style.display='none';}
}

function dpApply(){
  T.refreshC();
  if(typeof W.renderAll==='function')W.renderAll();
  try{D.dispatchEvent(new CustomEvent('toolkit:theme-change'));}catch(e){}
  dpSave(); updCTA();
}
function chgColor(el){var v=el.value;T.setVar(el.dataset.var,v);var t=el.parentElement.querySelector('input[type=text]');if(t)t.value=v;dpApply();}
function chgHex(el){var v=el.value;if(/^#[0-9a-fA-F]{6}$/.test(v)){T.setVar(el.dataset.var,v);var c=el.parentElement.querySelector('input[type=color]');if(c)c.value=v;dpApply();}}
function chgNum(el){T.setVar(el.dataset.var,el.value);dpApply();}
function chgTxt(el){T.setVar(el.dataset.var,el.value);dpApply();}
function updCTA(){var p=D.getElementById('tk-cta-pv');if(p){var f=getVar('--g-cta-from')||getVar('--c-accent')||'#3B82F6',t=getVar('--g-cta-to')||getVar('--c-accent-l')||'#60A5FA',d=getVar('--g-cta-dir')||'90deg';p.style.background='linear-gradient('+d+','+f+','+t+')';}}

function applyPreset(id){
  var p=_presets[id];if(!p)return;
  _curPreset=id;
  Object.keys(p).forEach(function(k){if(k.startsWith('--'))T.setVar(k,p[k]);});
  T.refreshC();
  if(typeof W.renderAll==='function')W.renderAll();
  try{D.dispatchEvent(new CustomEvent('toolkit:theme-change'));}catch(e){}
  buildDPFields();buildDP();dpSave();
}
function dpReset(){applyPreset(_curPreset);}

/* ═══ EXPORT / IMPORT ═══ */
function getAllVars(){
  var v={};
  _dpFields.forEach(function(s){if(s.fields)s.fields.forEach(function(f){v[f.v]=getVar(f.v);});});
  return v;
}
function expCSS(){
  var v=getAllVars(),css=':root {\n';
  Object.keys(v).forEach(function(k){css+='  '+k+': '+v[k]+';\n';});
  css+='}';
  T.tkCopy(css,'CSS 变量已复制到剪贴板');
}
function expJSON(){
  var v=getAllVars();
  var result={components:{}};
  Object.keys(v).forEach(function(k){
    var path=COMPONENT_MAP[k];
    if(!path)return;
    var parts=path.split('.');
    if(!result.components[parts[0]])result.components[parts[0]]={};
    result.components[parts[0]][parts[1]]=v[k];
  });
  var hasComp=Object.keys(result.components).length>0;
  var out=hasComp?result:v;
  if(!hasComp){out._preset=_curPreset;}
  T.tkCopy(JSON.stringify(out,null,2),hasComp?'组件 JSON 已复制到剪贴板':'CSS 变量 JSON 已复制到剪贴板');
}
function expVarJSON(){
  var v=getAllVars();v._preset=_curPreset;
  T.tkCopy(JSON.stringify(v,null,2),'CSS 变量 JSON 已复制到剪贴板');
}
function expComponentJSON(){
  var map=CFG.exportMap;
  if(!map){tkToast('当前页面未配置 exportMap，请在 __TOOLKIT__.exportMap 中定义组件映射','error');return;}
  var vars=getAllVars();
  function resolve(node){
    if(typeof node==='string'){
      if(node.startsWith('--'))return vars[node]||getVar(node)||node;
      return node;
    }
    if(node&&node.type==='gradient'){
      return node.template.replace(/\{(--[\w-]+)\}/g,function(_,v){return vars[v]||getVar(v)||v;});
    }
    if(Array.isArray(node))return node.map(resolve);
    if(node&&typeof node==='object'){
      var out={};Object.keys(node).forEach(function(k){out[k]=resolve(node[k]);});return out;
    }
    return node;
  }
  var result=resolve(map);
  T.tkCopy(JSON.stringify(result,null,2),'组件 Token JSON 已复制到剪贴板');
}
function expHTML(){
  var v=getAllVars(),rc=':root{\n';
  Object.keys(v).forEach(function(k){rc+='  '+k+':'+v[k]+';\n';});rc+='}';
  var cl=D.documentElement.cloneNode(true);
  cl.querySelectorAll('style').forEach(function(s){s.textContent=s.textContent.replace(/:root\s*\{[^}]*\}/,rc);});
  ['tk-toolbar','tk-panel','tk-overlay','tk-showcase','tk-style'].forEach(function(id){
    var e=cl.querySelector('#'+id);if(e)e.parentNode.removeChild(e);
  });
  cl.querySelectorAll('script').forEach(function(s){
    if((s.src&&s.src.indexOf('_toolkit')>=0)||s.textContent.indexOf('__TOOLKIT__')>=0)
      s.parentNode.removeChild(s);
  });
  var htmlStr='<!DOCTYPE html>\n'+cl.outerHTML;

  var assetPaths=new Set();
  var assetRe=/(?:url\(["']?|src=["']|href=["'])(assets\/[^"')}\s]+)/gi;
  var mm;while((mm=assetRe.exec(htmlStr))!==null)assetPaths.add(mm[1]);
  D.querySelectorAll('[style*="assets/"]').forEach(function(el){
    var st=el.getAttribute('style')||'';var m3;var re3=/assets\/[^"')}\s;]+/gi;
    while((m3=re3.exec(st))!==null)assetPaths.add(m3[0]);
  });
  D.querySelectorAll('style').forEach(function(s){
    var t=s.textContent;var m2;var re2=/url\(["']?(assets\/[^"')}\s]+)["']?\)/gi;
    while((m2=re2.exec(t))!==null)assetPaths.add(m2[1]);
  });

  if(assetPaths.size===0){
    var blob=new Blob([htmlStr],{type:'text/html;charset=utf-8'});
    var u=URL.createObjectURL(blob);
    var a=D.createElement('a');a.href=u;
    a.download=(D.title||'page').replace(/[^\w\u4e00-\u9fff-]/g,'-').replace(/-+/g,'-')+'.html';
    D.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
    return;
  }

  var loadJSZip=new Promise(function(resolve,reject){
    if(window.JSZip)return resolve(window.JSZip);
    var s=D.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js';
    s.onload=function(){resolve(window.JSZip);};
    s.onerror=function(){reject(new Error('JSZip CDN load failed'));};
    D.head.appendChild(s);
  });

  var pageName=(D.title||'page').replace(/[^\w\u4e00-\u9fff-]/g,'-').replace(/-+/g,'-');
  var btn=D.querySelector('[onclick*="expHTML"]');
  if(btn){btn.textContent='打包中...';btn.disabled=true;}

  loadJSZip.then(function(JSZip){
    var zip=new JSZip();
    zip.file(pageName+'.html',htmlStr);
    var fetches=[];
    assetPaths.forEach(function(p){
      fetches.push(
        fetch(p).then(function(r){
          if(!r.ok)throw new Error(p+' '+r.status);
          return r.blob().then(function(b){zip.folder('assets').file(p.replace('assets/',''),b);});
        }).catch(function(e){console.warn('skip asset:',p,e);})
      );
    });
    return Promise.all(fetches).then(function(){
      return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}});
    });
  }).then(function(zipBlob){
    var u=URL.createObjectURL(zipBlob);
    var a=D.createElement('a');a.href=u;
    a.download=pageName+'.zip';
    D.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
  }).catch(function(e){
    console.error('export zip failed:',e);
    tkToast('ZIP 导出失败: '+e.message+'，回退为单文件导出','error');
    var blob=new Blob([htmlStr],{type:'text/html;charset=utf-8'});
    var u=URL.createObjectURL(blob);
    var a=D.createElement('a');a.href=u;
    a.download=pageName+'.html';
    D.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
  }).finally(function(){
    if(btn){btn.textContent='导出完整 HTML';btn.disabled=false;}
  });
}
function normalizeJSON(raw){
  if(typeof raw!=='object'||raw===null)return null;
  if(Object.keys(raw).some(function(k){return k.startsWith('--');})){
    var v={};Object.keys(raw).forEach(function(k){if(k.startsWith('--'))v[k]=String(raw[k]);});return v;
  }
  if(raw.components&&typeof raw.components==='object'){
    var cv={};
    Object.keys(raw.components).forEach(function(comp){
      var obj=raw.components[comp];
      if(typeof obj!=='object'||obj===null)return;
      Object.keys(obj).forEach(function(prop){
        var path=comp+'.'+prop;
        var cssVar=COMPONENT_MAP_REV[path];
        if(cssVar)cv[cssVar]=String(obj[prop]);
      });
    });
    return Object.keys(cv).length>0?cv:null;
  }
  var PM={color:'c',gradient:'g',radius:'r',spacing:'s',border:'b'},flat={};
  function walk(o,path){
    if(o&&(o.value!==undefined||o['$value']!==undefined)){
      var val=o.value!==undefined?o.value:o['$value'];
      var pfx=PM[path[0]]||path[0];
      flat['--'+pfx+'-'+path.slice(1).join('-')]=String(val).replace(/px$/,'');return;
    }
    if(typeof o==='object'&&o!==null)Object.keys(o).forEach(function(k){walk(o[k],path.concat(k));});
  }
  walk(raw,[]);return Object.keys(flat).length>0?flat:null;
}
function impJSON(){
  var json=prompt('粘贴主题 JSON（支持 CSS 变量格式 / Figma Token 格式）：');if(!json)return;
  try{
    var data=JSON.parse(json),vars=normalizeJSON(data);
    if(!vars||Object.keys(vars).length===0){tkToast('未识别到有效的主题变量','error');return;}
    var name=prompt('给这个主题起个名字：',data._preset||'自定义主题');if(!name)return;
    var id='custom-'+Date.now();
    _presets[id]=Object.assign({name:name},vars);
    saveCustom();applyPreset(id);
  }catch(e){tkToast('JSON 解析失败：'+e.message,'error');}
}

/* 覆盖 tkCopy：用 Toast 替代 alert */
function tkCopyToast(text,msg){
  function fallback(){
    var ta=D.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;left:-9999px;top:-9999px';
    D.body.appendChild(ta);ta.select();
    try{D.execCommand('copy');tkToast(msg);}catch(e){prompt('复制失败，请手动复制：',text);}
    D.body.removeChild(ta);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){tkToast(msg);},fallback);
  }else{fallback();}
}
T.tkCopy=tkCopyToast;
tkCopy=tkCopyToast;

/* 导出 Diff：只导出修改过的变量 */
function expDiff(){
  var diff={};
  _dpFields.forEach(function(sec){
    if(sec.fields)sec.fields.forEach(function(f){
      var cur=getVar(f.v)||'';
      if(!cur)return;
      if(_defaultSnap[f.v]&&cur!==_defaultSnap[f.v]){
        diff[f.v]={from:_defaultSnap[f.v],to:cur};
      }
    });
  });
  if(Object.keys(diff).length===0){tkToast('没有修改过的变量','error');return;}
  /* 同时生成可直接使用的 CSS 变量格式 */
  var css=':root {\n';
  Object.keys(diff).forEach(function(k){css+='  '+k+': '+diff[k].to+'; /* was: '+diff[k].from+' */\n';});
  css+='}';
  tkCopyToast(css,'Diff（'+Object.keys(diff).length+' 项修改）已复制到剪贴板');
}

/* ═══ PERSISTENCE ═══ */
function dpSave(){try{localStorage.setItem('tk-theme',JSON.stringify({preset:_curPreset,vars:getAllVars()}));}catch(e){}}
function dpRestore(){
  try{var raw=localStorage.getItem('tk-theme');if(!raw)return;
    var d=JSON.parse(raw);if(d.preset)_curPreset=d.preset;
    if(d.vars)Object.keys(d.vars).forEach(function(k){if(k.startsWith('--'))T.setVar(k,d.vars[k]);});
    T.refreshC();
  }catch(e){}
}
function saveCustom(){
  try{var c={};Object.keys(_presets).forEach(function(id){if(id.startsWith('custom-'))c[id]=_presets[id];});
    localStorage.setItem('tk-custom-presets',JSON.stringify(c));}catch(e){}
}
function loadCustom(){try{var r=localStorage.getItem('tk-custom-presets');if(r)Object.assign(_presets,JSON.parse(r));}catch(e){}}
function delPreset(id){
  if(!id||id.indexOf('custom-')!==0)return;
  if(!confirm('确定删除主题「'+(_presets[id]&&_presets[id].name||id)+'」？'))return;
  delete _presets[id];
  if(_curPreset===id)applyPreset(Object.keys(_presets)[0]);
  saveCustom();buildDPFields();buildDP();
}

function saveAsPreset(){
  var vars=getAllVars();
  var base=_presets[_curPreset];
  var baseName=base&&base.name?base.name+'（调整版）':'自定义主题';
  var name=prompt('保存当前配色为新预设，请命名：',baseName);
  if(!name)return;
  var id='custom-'+Date.now();
  _presets[id]=Object.assign({name:name},vars);
  _curPreset=id;
  saveCustom();buildDPFields();buildDP();
}

/* ═══ A/B 对比模式 ═══ */
var _abTimer=null;
function abToggle(){
  var btn=D.getElementById('tk-ab-btn');
  if(_abTimer){
    clearInterval(_abTimer);_abTimer=null;
    applyPreset(_curPreset);
    if(btn)btn.textContent='A/B 对比';
    return;
  }
  var keys=Object.keys(_presets).filter(function(k){return k!==_curPreset;});
  if(keys.length===0){tkToast('只有一个预设，无法对比','error');return;}
  var bId=keys[0];
  var isA=true;
  if(btn)btn.textContent='停止对比';
  _abTimer=setInterval(function(){
    isA=!isA;
    applyPreset(isA?_curPreset:bId);
    if(btn)btn.textContent=(isA?'A':'B')+' · 停止对比';
  },1000);
}

/* ═══ 校准参考图叠加 ═══ */
var _calOverlay=null;
function calToggle(){
  var btn=D.getElementById('tk-cal-btn');
  if(_calOverlay){if(_calOverlay._slider)_calOverlay._slider.remove();_calOverlay.remove();_calOverlay=null;if(btn)btn.textContent='校准参考图';return;}
  var inp=D.createElement('input');inp.type='file';inp.accept='image/*';
  inp.onchange=function(){
    var f=inp.files[0];if(!f)return;
    var reader=new FileReader();
    reader.onload=function(e){
      _calOverlay=D.createElement('div');
      _calOverlay.id='tk-cal-overlay';
      _calOverlay.style.cssText='position:fixed;inset:0;z-index:10240;pointer-events:none;opacity:0.35;background-image:url('+e.target.result+');background-size:contain;background-repeat:no-repeat;background-position:center top';
      D.body.appendChild(_calOverlay);
      if(btn)btn.textContent='关闭参考图';
      /* 透明度滑块 */
      var slider=D.createElement('input');slider.type='range';slider.min='0';slider.max='100';slider.value='35';
      slider.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:10241;width:200px;pointer-events:auto;accent-color:#3B82F6';
      slider.id='tk-cal-slider';
      slider.oninput=function(){if(_calOverlay)_calOverlay.style.opacity=String(parseInt(slider.value)/100);};
      D.body.appendChild(slider);
      _calOverlay._slider=slider;
    };
    reader.readAsDataURL(f);
  };
  inp.click();
}

/* ═══ 规则速检面板 ═══ */
function rulesCheck(){
  var results=[];
  var cs=getComputedStyle;

  /* 1. 内联 style 检测 */
  var inlineEls=D.querySelectorAll('body [style]');
  var inlineCount=0;
  inlineEls.forEach(function(el){if(!T.isToolkitEl(el))inlineCount++;});
  results.push({name:'内联 style',status:inlineCount===0?'pass':inlineCount<=5?'warn':'fail',detail:inlineCount===0?'无内联样式':inlineCount+'个元素使用了内联 style'});

  /* 2. 字号一致性 */
  var fontSizes={};
  D.querySelectorAll('body *').forEach(function(el){
    if(T.isToolkitEl(el))return;
    var fs=cs(el).fontSize;if(fs)fontSizes[fs]=(fontSizes[fs]||0)+1;
  });
  var fsCount=Object.keys(fontSizes).length;
  results.push({name:'字号一致性',status:fsCount<=8?'pass':'fail',detail:fsCount+'种字号'+(fsCount>8?'（建议 <=8）':'')});

  /* 3. 颜色数量 */
  var colors={};
  D.querySelectorAll('body *').forEach(function(el){
    if(T.isToolkitEl(el))return;
    var s=cs(el);
    var c=s.color;if(c)colors[c]=1;
    var bg=s.backgroundColor;if(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')colors[bg]=1;
  });
  var clrCount=Object.keys(colors).length;
  results.push({name:'颜色数量',status:clrCount<=12?'pass':clrCount<=20?'warn':'fail',detail:clrCount+'种颜色'+(clrCount>12?'（建议 <=12）':'')});

  /* 4. 触摸目标尺寸 */
  var smallTargets=[];
  D.querySelectorAll('button,a,[role="button"]').forEach(function(el){
    if(T.isToolkitEl(el))return;
    var r=el.getBoundingClientRect();
    if(r.width>0&&r.height>0&&(r.width<44||r.height<44))smallTargets.push(T.getSelector(el));
  });
  results.push({name:'触摸目标',status:smallTargets.length===0?'pass':'warn',detail:smallTargets.length===0?'所有可交互元素 >=44px':smallTargets.length+'个元素 <44px'});

  /* 5. 图片无 alt */
  var noAlt=D.querySelectorAll('img:not([alt])');
  var noAltCount=0;noAlt.forEach(function(el){if(!T.isToolkitEl(el))noAltCount++;});
  results.push({name:'图片 alt',status:noAltCount===0?'pass':'fail',detail:noAltCount===0?'所有图片都有 alt':noAltCount+'张图片缺少 alt'});

  /* 6. 对比度检查 */
  var lowContrast=0;
  function luminance(r,g,b){
    var a=[r,g,b].map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
    return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];
  }
  function parseColor(str){
    var m=str.match(/\d+/g);
    return m?[parseInt(m[0]),parseInt(m[1]),parseInt(m[2])]:null;
  }
  function contrastRatio(c1,c2){
    if(!c1||!c2)return 21;
    var l1=luminance(c1[0],c1[1],c1[2]),l2=luminance(c2[0],c2[1],c2[2]);
    var lighter=Math.max(l1,l2),darker=Math.min(l1,l2);
    return(lighter+0.05)/(darker+0.05);
  }
  D.querySelectorAll('body p,body span,body h1,body h2,body h3,body h4,body h5,body h6,body li,body td,body th,body label,body a').forEach(function(el){
    if(T.isToolkitEl(el)||!el.textContent.trim())return;
    var s=cs(el);
    var fg=parseColor(s.color),bg=parseColor(s.backgroundColor);
    if(!bg){
      /* 向上查找最近有背景色的祖先 */
      var p=el.parentElement;
      while(p&&p!==D.body){
        var pb=cs(p).backgroundColor;
        if(pb&&pb!=='rgba(0, 0, 0, 0)'&&pb!=='transparent'){bg=parseColor(pb);break;}
        p=p.parentElement;
      }
    }
    if(fg&&bg&&contrastRatio(fg,bg)<4.5)lowContrast++;
  });
  results.push({name:'对比度',status:lowContrast===0?'pass':lowContrast<=3?'warn':'fail',detail:lowContrast===0?'所有文字对比度 >=4.5':lowContrast+'处对比度不足 4.5'});

  /* 7. 最大宽度检查 */
  var mainContainer=D.querySelector('main')||D.querySelector('.container')||D.querySelector('[class*="content"]')||D.querySelector('body>div:not([id^="tk-"])');
  var hasMaxW=false;
  if(mainContainer){
    var mw=cs(mainContainer).maxWidth;
    hasMaxW=mw&&mw!=='none';
  }
  results.push({name:'最大宽度',status:hasMaxW||!mainContainer?'pass':'warn',detail:hasMaxW?'主容器设置了 max-width':'主容器未设置 max-width'});

  /* 8. 字重范围 */
  var badWeights=[];
  D.querySelectorAll('body *').forEach(function(el){
    if(T.isToolkitEl(el))return;
    var fw=parseInt(cs(el).fontWeight)||400;
    if(fw<400||fw>700){badWeights.push(fw);}
  });
  var uniqueBadW=[]; badWeights.forEach(function(w){if(uniqueBadW.indexOf(w)<0)uniqueBadW.push(w);});
  results.push({name:'字重范围',status:uniqueBadW.length===0?'pass':'warn',detail:uniqueBadW.length===0?'所有字重在 400-700':'异常字重: '+uniqueBadW.join(', ')});

  /* 9. emoji 检测 */
  var emojiRe=/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
  var emojiCount=0;
  D.querySelectorAll('body *').forEach(function(el){
    if(T.isToolkitEl(el))return;
    if(el.childNodes.length===1&&el.childNodes[0].nodeType===3){
      if(emojiRe.test(el.textContent))emojiCount++;
    }
  });
  results.push({name:'emoji 检测',status:emojiCount===0?'pass':'warn',detail:emojiCount===0?'未检测到 emoji':emojiCount+'处包含 emoji'});

  /* 10. CTA 文案检查 */
  var vagueCTA=['点击这里','点击','click here','click','submit','了解更多','more','详情','learn more'];
  var badCTA=[];
  D.querySelectorAll('button,a[role="button"],[type="submit"]').forEach(function(el){
    if(T.isToolkitEl(el))return;
    var txt=(el.textContent||'').trim().toLowerCase();
    if(vagueCTA.indexOf(txt)>=0)badCTA.push('"'+el.textContent.trim()+'"');
  });
  results.push({name:'CTA 文案',status:badCTA.length===0?'pass':'warn',detail:badCTA.length===0?'所有 CTA 文案语义清晰':'模糊文案: '+badCTA.join(', ')});

  /* 渲染结果 */
  var passC=0,warnC=0,failC=0;
  var rHtml='<div style="margin-top:12px;padding:12px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-size:11px">';
  rHtml+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><span style="font-weight:600;color:rgba(255,255,255,.7)">规则速检结果</span><button type="button" onclick="this.parentElement.parentElement.style.display=\'none\'" style="background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;font-size:14px">\u00d7</button></div>';
  results.forEach(function(r){
    var icon=r.status==='pass'?'\u2705':r.status==='warn'?'\u26a0\ufe0f':'\u274c';
    var color=r.status==='pass'?'#22c55e':r.status==='warn'?'#f59e0b':'#ef4444';
    if(r.status==='pass')passC++;else if(r.status==='warn')warnC++;else failC++;
    rHtml+='<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.04)"><span>'+icon+'</span><span style="color:'+color+';min-width:72px">'+r.name+'</span><span style="color:rgba(255,255,255,.4)">'+r.detail+'</span></div>';
  });
  rHtml+='<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.5);font-weight:500">'+passC+'/10 通过 | '+failC+' 阻断 | '+warnC+' 警告</div>';
  rHtml+='</div>';
  var container=D.getElementById('tk-rules-result');
  if(container)container.innerHTML=rHtml;
  else tkToast('速检完成: '+passC+'/10 通过');
}

T.toggleDP = toggleDP;
T.buildDPFields = buildDPFields;
T.buildDP = buildDP;
T.dpSave = dpSave;
T.dpRestore = dpRestore;
T.loadCustom = loadCustom;
T.getAllVars = getAllVars;
T.applyPreset = applyPreset;
T.dpApply = dpApply;
T.chgColor = chgColor;
T.chgHex = chgHex;
T.chgNum = chgNum;
T.chgTxt = chgTxt;
T.expCSS = expCSS;
T.expJSON = expJSON;
T.expVarJSON = expVarJSON;
T.expComponentJSON = expComponentJSON;
T.expHTML = expHTML;
T.impJSON = impJSON;
T.saveAsPreset = saveAsPreset;
T.dpReset = dpReset;
T.abToggle = abToggle;
T.calToggle = calToggle;
T.rulesCheck = rulesCheck;
T.expDiff = expDiff;
T.tkToast = tkToast;

})(window,document);
