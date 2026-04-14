;(function(W,D){'use strict';
var T=W.__TK, INS=T.INS;

/* ═══ PUBLIC API ═══ */
W._tk={
  preset:function(id){T.applyPreset(id);}, reset:function(){T.dpReset();},
  chgColor:function(el){T.chgColor(el);}, chgHex:function(el){T.chgHex(el);},
  chgNum:function(el){T.chgNum(el);}, chgTxt:function(el){T.chgTxt(el);},
  expCSS:function(){T.expCSS();}, expJSON:function(){T.expJSON();},
  expVarJSON:function(){T.expVarJSON();}, expComponentJSON:function(){T.expComponentJSON();},
  expHTML:function(){T.expHTML();}, impJSON:function(){T.impJSON();},
  saveAs:function(){T.saveAsPreset();},
  insToggle:function(){T.insToggle();},
  insPopSave:function(){T.insPopSave();}, insPopCancel:function(){T.insPopCancel();},
  insSetAction:function(btn){T.insSetAction(btn);},
  insExport:function(){T.insExport();}, insApply:function(){T.insApply();},
  insClearAll:function(){T.insClearAll();},
  insDelAnn:function(id){T.insDelAnn(id);}, insHighlightAnn:function(id){T.insHighlightAnn(id);},
  insTogglePanel:function(){T.insTogglePanel();}, insShareLink:function(){T.insShareLink();},
  insDragUndo:function(){T.insDragUndo();},
  insScreenshot:function(){T.insScreenshotStart();},
  insSSConfirm:function(id){T.insSSConfirm(id);},
  insSSCancel:function(id){T.insSSCancel(id);},
  insEditAnn:function(id){T.insEditAnn(id);},
  insEditAnnSave:function(id){T.insEditAnnSave(id);},
  insEditAnnCancel:function(){T.insEditAnnCancel();},
  bpToggle:bpToggle,
  tbToggle:function(){T.tbToggle();},
  abToggle:function(){T.abToggle();},
  calToggle:function(){T.calToggle();},
  rulesCheck:function(){T.rulesCheck();}
};

/* ═══ BREAKPOINT PREVIEW（iframe 真实视口 + postMessage 代理编辑模式） ═══ */
var _bpList=[375,768,1248];
var _isBpFrame=(function(){try{return W.self!==W.top&&W.parent.__TK_BP_ACTIVE}catch(e){return false}})();
var _bpIndex=(function(){
  if(_isBpFrame) return -1;
  var stored=sessionStorage.getItem('_tk_bpIdx');
  if(stored!==null){
    var idx=parseInt(stored,10);
    if(idx>=0&&idx<_bpList.length){
      D.documentElement.setAttribute('data-bp',String(_bpList[idx]));
      return idx;
    }
  }
  return -1;
})();
T.BP={list:_bpList,getIndex:function(){return _bpIndex;},getCurrent:function(){return _bpIndex>=0?_bpList[_bpIndex]:W.innerWidth;}};
function bpToggle(){
  if(_isBpFrame) return;
  _bpIndex++;
  if(_bpIndex>=_bpList.length) _bpIndex=-1;
  if(_bpIndex===-1){
    sessionStorage.removeItem('_tk_bp');
    sessionStorage.removeItem('_tk_bpIdx');
    location.reload();
    return;
  }
  var w=_bpList[_bpIndex];
  sessionStorage.setItem('_tk_bp',String(w));
  sessionStorage.setItem('_tk_bpIdx',String(_bpIndex));
  location.reload();
}

function _bpProxyToFrame(action){
  var f=D.getElementById('tk-bp-frame');
  if(f&&f.contentWindow) f.contentWindow.postMessage({_tkAction:action},'*');
}

function _bpRestore(){
  if(_bpIndex<0) return;
  W.__TK_BP_ACTIVE=true;
  var w=_bpList[_bpIndex];
  var btn=D.getElementById('tk-btn-bp');
  if(btn){btn.textContent=w+'px';btn.classList.add('tk-bp-on');}

  var insBtn=D.getElementById('tk-btn-ins');
  if(insBtn) insBtn.onclick=function(){_bpProxyToFrame('insToggle');};

  var container=D.createElement('div');
  container.id='tk-bp-container';
  container.style.cssText='position:fixed;inset:0;z-index:10250;display:flex;flex-direction:column;align-items:center;background:#141414';

  var header=D.createElement('div');
  header.style.cssText='flex:none;width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 0;background:#1a1a1a;border-bottom:1px solid #333;font-family:Menlo,monospace;font-size:12px;color:#888';
  var sizeHtml='<span style="color:#666;margin-right:4px">Responsive</span>';
  _bpList.forEach(function(bw,i){
    var on=i===_bpIndex;
    sizeHtml+='<button style="padding:3px 10px;border-radius:4px;border:1px solid '+(on?'#0255FF':'#444')+';background:'+(on?'#0255FF':'transparent')+';color:'+(on?'#fff':'#aaa')+';font-size:11px;font-family:Menlo,monospace;cursor:pointer" '
      +'onclick="sessionStorage.setItem(\'_tk_bpIdx\',\''+i+'\');sessionStorage.setItem(\'_tk_bp\',\''+bw+'\');location.reload()">'+bw+'</button>';
  });
  var ifrH=W.innerHeight-40;
  sizeHtml+='<span style="color:#4af;font-weight:600;margin-left:4px">'+w+' × '+ifrH+'</span>';
  sizeHtml+='<button style="padding:3px 10px;border-radius:4px;border:1px solid #555;background:transparent;color:#f66;font-size:11px;font-family:Menlo,monospace;cursor:pointer" '
    +'onclick="sessionStorage.removeItem(\'_tk_bp\');sessionStorage.removeItem(\'_tk_bpIdx\');location.reload()">✕</button>';
  header.innerHTML=sizeHtml;

  var wrap=D.createElement('div');
  wrap.style.cssText='flex:1;display:flex;justify-content:center;align-items:flex-start;padding:12px 0;overflow:hidden';
  var frame=D.createElement('iframe');
  frame.id='tk-bp-frame';
  frame.style.cssText='width:'+w+'px;height:'+ifrH+'px;border:none;border-radius:4px;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 8px 32px rgba(0,0,0,.5);background:#fff';
  frame.src=location.href.split('#')[0];
  wrap.appendChild(frame);
  container.appendChild(header);
  container.appendChild(wrap);
  D.body.appendChild(container);
  D.body.style.overflow='hidden';
}

function tkNavIsReload(){
  try{
    var nav=W.performance&&W.performance.getEntriesByType&&W.performance.getEntriesByType('navigation')[0];
    if(nav&&nav.type) return nav.type==='reload';
  }catch(e){}
  try{
    if(W.performance&&W.performance.navigation) return W.performance.navigation.type===1;
  }catch(e2){}
  return false;
}

function init(){
  T.detectRootVars(); T.refreshC();

  if(_isBpFrame){
    /* iframe 内：初始化样式和编辑系统，不显示工具栏 */
    T.injectCSS();
    T.injectPanel(); T.injectOverlay(); T.injectShowcase();
    T.loadCustom(); T.dpRestore();
    W.addEventListener('message',function(ev){
      if(!ev.data||!ev.data._tkAction) return;
      var a=ev.data._tkAction;
      if(a==='insToggle') T.insToggle();
      else if(a==='toggleDP') T.toggleDP();
      else if(a==='toggleShowcase') T.toggleShowcase();
    });
    T.insRestoreFromHash();
    if(INS.annotations.length===0) T.insRestoreFromHTML();
    return;
  }

  T.injectCSS(); T.injectToolbar(); T.injectPanel(); T.injectOverlay(); T.injectShowcase();
  T.loadCustom(); T.dpRestore();
  _bpRestore();
  D.getElementById('tk-btn-sc').addEventListener('click',function(){
    if(_bpIndex>=0) _bpProxyToFrame('toggleShowcase');
    else T.toggleShowcase();
  });
  D.getElementById('tk-btn-dp').addEventListener('click',function(){
    if(_bpIndex>=0) _bpProxyToFrame('toggleDP');
    else T.toggleDP();
  });
  D.getElementById('tk-overlay').addEventListener('click',function(){
    if(_bpIndex>=0) _bpProxyToFrame('toggleDP');
    else T.toggleDP();
  });
  D.getElementById('tk-btn-close').addEventListener('click',function(){
    if(_bpIndex>=0) _bpProxyToFrame('toggleDP');
    else T.toggleDP();
  });
  W.addEventListener('hashchange',function(){
    if(location.hash==='#showcase') T.enterShowcase();
    else if(T.scOn()) T.exitShowcase();
  });
  if(location.hash==='#showcase'){
    if(tkNavIsReload()){
      try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){}
    }else{
      T.enterShowcase();
    }
  }
  var _tkHidden=false;
  D.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.isContentEditable)return;
    if(e.key==='h'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey){
      e.preventDefault();e.stopImmediatePropagation();
      _tkHidden=!_tkHidden;
      var ids=['tk-toolbar','tk-panel','tk-overlay','tk-showcase','tk-style','ins-style','ins-panel','ins-tab','ins-info','ins-toolbar-hint','ins-layer-picker','ins-breadcrumb'];
      ids.forEach(function(id){var el=D.getElementById(id);if(el)el.style.visibility=_tkHidden?'hidden':'';});
      D.querySelectorAll('.ins-highlight-box,.ins-sel-box,.ins-pinned-box,.ins-badge-float,.ins-comment-pop').forEach(function(el){el.style.visibility=_tkHidden?'hidden':'';});
    }
  },true);
  T.insRestoreFromHash();
  if(INS.annotations.length===0) T.insRestoreFromHTML();
}

if(D.readyState==='loading') D.addEventListener('DOMContentLoaded',init);
else init();

})(window,document);
