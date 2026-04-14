;(function(W,D){'use strict';
var T=W.__TK, INS=T.INS;
var isToolkitEl=T.isToolkitEl;

/* ═══ SCREENSHOT ANNOTATION (edit mode sub-feature, press S key) ═══ */
var _ssActive=false, _ssOverlay=null;

function insLoadH2C(){
  return new Promise(function(resolve,reject){
    if(W.html2canvas) return resolve(W.html2canvas);
    var s=D.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    s.onload=function(){resolve(W.html2canvas);};
    s.onerror=function(){reject(new Error('html2canvas CDN load failed'));};
    D.head.appendChild(s);
  });
}

function insScreenshotStart(){
  if(_ssActive) return;
  _ssActive=true;
  T.insHideHL();
  D.removeEventListener('mouseover',T.insOnHover,true);
  D.removeEventListener('click',T.insOnClick,true);
  D.removeEventListener('dblclick',T.insOnDblClick,true);

  _ssOverlay=D.createElement('div');
  _ssOverlay.id='ins-ss-overlay';
  _ssOverlay.style.cssText='position:fixed;inset:0;z-index:10280;cursor:crosshair;background:transparent;touch-action:none';
  var sel=D.createElement('div');sel.id='ins-ss-sel';
  sel.style.cssText='position:absolute;border:2px dashed #3B82F6;background:rgba(59,130,246,.12);display:none;pointer-events:none;border-radius:3px';
  _ssOverlay.appendChild(sel);
  var hint=D.createElement('div');
  hint.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:16px 28px;border-radius:10px;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);color:#fff;font-size:14px;font-weight:500;font-family:Inter,system-ui,sans-serif;pointer-events:none;text-align:center;line-height:1.6;max-width:min(92vw,360px)';
  hint.innerHTML='<div style="font-size:16px;margin-bottom:4px">框选截图区域</div><div style="font-size:12px;color:rgba(255,255,255,.5)">松手瞬间截取视口 · 动效内容请选中元素后点工具条相机 · Esc 取消</div>';
  hint.id='ins-ss-hint';
  _ssOverlay.appendChild(hint);
  D.body.appendChild(_ssOverlay);

  var sx=0,sy=0,dragging=false,_capPtr=null;
  function xyFrom(e){
    if(e.touches&&e.touches[0]) return {x:e.touches[0].clientX,y:e.touches[0].clientY};
    if(e.changedTouches&&e.changedTouches[0]) return {x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};
    return {x:e.clientX,y:e.clientY};
  }
  function tryCapture(pid){
    if(pid==null||!_ssOverlay.setPointerCapture) return;
    try{_ssOverlay.setPointerCapture(pid);_capPtr=pid;}catch(x){_capPtr=null;}
  }
  function tryRelease(pid){
    if(pid==null||!_ssOverlay.releasePointerCapture) return;
    try{_ssOverlay.releasePointerCapture(pid);}catch(x){}
    _capPtr=null;
  }
  function onDown(e){
    if(e.pointerType==='mouse'&&e.button!==0) return;
    e.preventDefault();e.stopPropagation();
    var o=xyFrom(e);
    sx=o.x;sy=o.y;dragging=true;
    tryCapture(e.pointerId);
    sel.style.display='block';
    sel.style.left=sx+'px';sel.style.top=sy+'px';sel.style.width='0';sel.style.height='0';
    var h=D.getElementById('ins-ss-hint');if(h)h.style.display='none';
  }
  function onMove(e){
    if(!dragging) return;
    e.preventDefault();
    var o=e.touches&&e.touches[0]?xyFrom(e):{x:e.clientX,y:e.clientY};
    var x=Math.min(sx,o.x),y=Math.min(sy,o.y);
    var w=Math.abs(o.x-sx),h=Math.abs(o.y-sy);
    sel.style.left=x+'px';sel.style.top=y+'px';sel.style.width=w+'px';sel.style.height=h+'px';
  }
  function onUp(e){
    if(!dragging) return;
    var o=xyFrom(e);
    tryRelease(e.pointerId!=null?e.pointerId:_capPtr);
    dragging=false;
    var x=Math.min(sx,o.x),y=Math.min(sy,o.y);
    var w=Math.abs(o.x-sx),h=Math.abs(o.y-sy);
    insScreenshotEnd();
    if(w<10||h<10){T.insShowHint('选区太小，已取消');return;}
    insScreenshotCapture({x:x,y:y,w:w,h:h});
  }
  function onKey(e){
    if(e.key==='Escape'){insScreenshotEnd();e.preventDefault();e.stopPropagation();}
  }
  function onPtrCancel(e){
    if(!dragging) return;
    tryRelease(e.pointerId!=null?e.pointerId:_capPtr);
    dragging=false;
    insScreenshotEnd();
  }
  if(W.PointerEvent){
    _ssOverlay.addEventListener('pointerdown',onDown);
    _ssOverlay.addEventListener('pointermove',onMove);
    _ssOverlay.addEventListener('pointerup',onUp);
    _ssOverlay.addEventListener('pointercancel',onPtrCancel);
  } else {
    _ssOverlay.addEventListener('mousedown',onDown);
    _ssOverlay.addEventListener('mousemove',onMove);
    _ssOverlay.addEventListener('mouseup',onUp);
    function ts(ev){ev.preventDefault();onDown(ev);}
    function tm(ev){if(dragging) ev.preventDefault();onMove(ev);}
    function te(ev){ev.preventDefault();if(dragging) onUp(ev);}
    _ssOverlay.addEventListener('touchstart',ts,{passive:false});
    _ssOverlay.addEventListener('touchmove',tm,{passive:false});
    _ssOverlay.addEventListener('touchend',te,{passive:false});
    _ssOverlay._touchCleanup=function(){
      _ssOverlay.removeEventListener('touchstart',ts);
      _ssOverlay.removeEventListener('touchmove',tm);
      _ssOverlay.removeEventListener('touchend',te);
    };
  }
  D.addEventListener('keydown',onKey,true);
  _ssOverlay._cleanup=function(){
    if(W.PointerEvent){
      _ssOverlay.removeEventListener('pointerdown',onDown);
      _ssOverlay.removeEventListener('pointermove',onMove);
      _ssOverlay.removeEventListener('pointerup',onUp);
      _ssOverlay.removeEventListener('pointercancel',onPtrCancel);
    } else {
      _ssOverlay.removeEventListener('mousedown',onDown);
      _ssOverlay.removeEventListener('mousemove',onMove);
      _ssOverlay.removeEventListener('mouseup',onUp);
      if(_ssOverlay._touchCleanup) _ssOverlay._touchCleanup();
    }
    D.removeEventListener('keydown',onKey,true);
  };
}

function insScreenshotEnd(){
  if(!_ssOverlay)return;
  _ssOverlay._cleanup();
  if(_ssOverlay.parentNode)_ssOverlay.parentNode.removeChild(_ssOverlay);
  _ssOverlay=null;_ssActive=false;
  D.addEventListener('mouseover',T.insOnHover,true);
  D.addEventListener('click',T.insOnClick,true);
  D.addEventListener('dblclick',T.insOnDblClick,true);
}

function insScreenshotCapture(rect){
  T.insShowHint('截图中...');
  insLoadH2C().then(function(html2canvas){
    var tkEls=['tk-toolbar','tk-panel','tk-overlay','tk-style','ins-style','ins-panel','ins-tab',
      'ins-info','ins-toolbar-hint','ins-breadcrumb','nb-toggle-bar'];
    var hidden=[];
    tkEls.forEach(function(id){var el=D.getElementById(id);if(el&&el.style.display!=='none'){hidden.push({el:el,vis:el.style.visibility});el.style.visibility='hidden';}});
    D.querySelectorAll('.ins-highlight-box,.ins-sel-box,.ins-pinned-box,.ins-badge-float,.ins-comment-pop').forEach(function(el){
      hidden.push({el:el,vis:el.style.visibility});el.style.visibility='hidden';
    });
    return html2canvas(D.body,{
      x:rect.x+W.scrollX,y:rect.y+W.scrollY,
      width:rect.w,height:rect.h,
      windowWidth:D.documentElement.scrollWidth,
      windowHeight:D.documentElement.scrollHeight,
      useCORS:true,allowTaint:true,
      scale:Math.min(W.devicePixelRatio||1,2)
    }).then(function(canvas){
      hidden.forEach(function(h){h.el.style.visibility=h.vis;});
      return canvas;
    }).catch(function(err){
      hidden.forEach(function(h){h.el.style.visibility=h.vis;});
      throw err;
    });
  }).then(function(canvas){
    canvas.toBlob(function(blob){
      if(!blob){T.insShowHint('截图失败');return;}
      var url=URL.createObjectURL(blob);
      var name='screenshot-'+Date.now()+'.png';
      T.insClearSelections();
      INS.action='modify';
      INS.attachedImage=name;
      var ann={
        id:++INS.annId,
        action:'modify',
        targets:[{
          selector:'screenshot:'+Math.round(rect.x)+','+Math.round(rect.y)+','+Math.round(rect.w)+'x'+Math.round(rect.h),
          tagName:'screenshot',
          outerHTML:'<screenshot area="'+Math.round(rect.x)+','+Math.round(rect.y)+','+Math.round(rect.w)+'x'+Math.round(rect.h)+'" />',
          computedStyle:{width:rect.w+'px',height:rect.h+'px',viewportX:Math.round(rect.x),viewportY:Math.round(rect.y)},
          rect:{top:rect.y+W.scrollY,left:rect.x+W.scrollX,width:rect.w,height:rect.h}
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
      insShowScreenshotPop(ann,url);
    },'image/png');
  }).catch(function(err){
    console.error('screenshot failed:',err);
    T.insShowHint('截图失败: '+err.message);
  });
}

function insShowScreenshotPop(ann,imgUrl){
  T.insHideCommentPop();
  INS.popEl=D.createElement('div');INS.popEl.className='ins-comment-pop';
  INS.popEl.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:380px';
  INS.popEl.innerHTML='<div style="padding:12px">'
    +'<img src="'+imgUrl+'" style="width:100%;border-radius:6px;max-height:240px;object-fit:contain;background:#111;display:block" />'
    +'</div>'
    +'<textarea id="ins-comment-input" placeholder="描述这个区域的问题或修改意见..." style="width:100%;height:72px;padding:12px;border:none;background:transparent;color:#fff;font-size:13px;font-family:Inter,system-ui,sans-serif;resize:vertical;outline:none;border-top:1px solid rgba(255,255,255,.06);box-sizing:border-box"></textarea>'
    +'<div class="ins-pop-bar">'
    +'<button type="button" class="ins-pop-btn ins-pop-cancel" onclick="window._tk.insSSCancel('+ann.id+')">取消</button>'
    +'<button type="button" class="ins-pop-btn ins-pop-save" onclick="window._tk.insSSConfirm('+ann.id+')">保存截图标注</button>'
    +'</div>';
  D.body.appendChild(INS.popEl);
  setTimeout(function(){var ta=D.getElementById('ins-comment-input');if(ta)ta.focus();},50);
}

function insSSConfirm(annId){
  var ta=D.getElementById('ins-comment-input');
  var comment=ta?ta.value.trim():'';
  if(!comment) comment='(截图标注)';
  var ann=INS.annotations.find(function(a){return a.id===annId;});
  if(ann) ann.comment=comment;
  T.insHideCommentPop();
  T.insRenderPanel();T.insUpdateTabCount();
  T.insShowHint('截图标注 #'+annId+' 已保存');
}

function insSSCancel(annId){
  INS.annotations=INS.annotations.filter(function(a){return a.id!==annId;});
  T.insHideCommentPop();
  T.insRenderPanel();T.insUpdateTabCount();
}



T.insLoadH2C=insLoadH2C;
T.insScreenshotStart=insScreenshotStart;
T.insScreenshotEnd=insScreenshotEnd;
T.insScreenshotCapture=insScreenshotCapture;
T.insShowScreenshotPop=insShowScreenshotPop;
T.insSSConfirm=insSSConfirm; T.insSSCancel=insSSCancel;

})(window,document);
