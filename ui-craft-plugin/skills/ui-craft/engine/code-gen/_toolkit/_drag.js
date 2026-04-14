;(function(W,D){'use strict';
var T=W.__TK, INS=T.INS;
var getSelector=T.getSelector, isToolkitEl=T.isToolkitEl, getElRect=T.getElRect;
var tkCopy=T.tkCopy;

/* ═══ DRAG & RESIZE SYSTEM ═══ */
var _dragHintEl=null;
var _EDGE=10;
var _CURSOR_MAP={'nw':'nw-resize','n':'n-resize','ne':'ne-resize','e':'e-resize','se':'se-resize','s':'s-resize','sw':'sw-resize','w':'w-resize','':'grab'};

function _detectEdge(box,e){
  var r=box.getBoundingClientRect();
  var x=e.clientX-r.left, y=e.clientY-r.top;
  var w=r.width, h=r.height;
  var dir='';
  if(y<_EDGE) dir+='n'; else if(y>h-_EDGE) dir+='s';
  if(x<_EDGE) dir+='w'; else if(x>w-_EDGE) dir+='e';
  return dir;
}

function insDragInit(sel){
  sel.box.style.pointerEvents='auto';
  var _didAction=false;

  sel.box.addEventListener('mousemove',function(e){
    if(_didAction) return;
    var dir=_detectEdge(sel.box,e);
    sel.box.style.cursor=_CURSOR_MAP[dir]||'grab';
  });

  sel.box.addEventListener('mousedown',function(e){
    if(e.button!==0||e.altKey) return;
    e.preventDefault();e.stopPropagation();
    _didAction=false;
    var dir=_detectEdge(sel.box,e);
    if(dir){
      insResizeStart(sel,dir,e,function(){_didAction=true;});
    } else {
      insDragStart(sel,e,function(){_didAction=true;});
    }
  });
  sel.box.addEventListener('click',function(e){
    e.stopPropagation();
    if(_didAction) return;
    /* Shift+Click on sel-box: toggle (remove from multi-select) */
    if(e.shiftKey){
      var idx=INS.selections.findIndex(function(s){return s===sel;});
      if(idx>=0){T.insRemoveSelBox(sel);INS.selections.splice(idx,1);T.insRenumber();}
      if(INS.selections.length===0){T.insHideCommentPop();T.insHideCtxBar();T.insHideColorPicker();T.insHidePropPanel();}
      else T.insUpdateCtxBar();
      return;
    }
    /* Click on sel-box of sole selection: deselect */
    if(INS.selections.length===1&&INS.selections[0]===sel){
      T.insClearSelections();T.insHideCtxBar();T.insHideColorPicker();T.insHidePropPanel();
    }
  });
}

function insDragStart(sel,e,onDragCb){
  var el=sel.el;
  var cs=getComputedStyle(el);
  var origPos=cs.position;
  if(origPos==='static'){el.style.position='relative';}
  var startX=e.clientX, startY=e.clientY;
  var origLeft=parseInt(cs.left)||0, origTop=parseInt(cs.top)||0;
  var _dragging=false;
  var _siblings=null;

  function onMove(ev){
    var dx=ev.clientX-startX, dy=ev.clientY-startY;
    if(!_dragging){
      if(Math.abs(dx)<3&&Math.abs(dy)<3) return;
      _dragging=true;
      if(onDragCb) onDragCb();
      _siblings=T.snapGetSiblings(el);
      insHideCommentPop();
      sel.box.classList.add('dragging');
      insDragShowHint('拖动中... \u2318Z 撤销');
    }
    el.style.left=(origLeft+dx)+'px';
    el.style.top=(origTop+dy)+'px';
    T.insPositionSelBox(sel);
    INS.selections.forEach(function(s){if(s!==sel)T.insPositionSelBox(s);});

    if(_siblings&&_siblings.length>0){
      var snap=T.snapCalc(el,_siblings);
      if(snap.snapDx||snap.snapDy){
        dx=Math.round(dx+snap.snapDx); dy=Math.round(dy+snap.snapDy);
        el.style.left=(origLeft+dx)+'px';
        el.style.top=(origTop+dy)+'px';
        T.insPositionSelBox(sel);
      }
      T.snapRender(snap.guides,snap.dists);
    }
  }
  function onUp(ev){
    D.removeEventListener('mousemove',onMove,true);
    D.removeEventListener('mouseup',onUp,true);
    T.snapClear();
    if(!_dragging){
      if(origPos==='static') el.style.position='';
      return;
    }
    sel.box.classList.remove('dragging');
    insDragHideHint();
    var finalLeft=parseInt(el.style.left)||0, finalTop=parseInt(el.style.top)||0;
    var dx=finalLeft-origLeft, dy=finalTop-origTop;
    undoPush({el:el,prevPos:origPos,prevLeft:origPos==='static'?'':origLeft+'px',prevTop:origPos==='static'?'':origTop+'px'});
    T.insPositionSelBox(sel);

    var ann={
      id:++INS.annId,
      action:'move',
      targets:[{
        selector:getSelector(el),
        tagName:el.tagName.toLowerCase(),
        outerHTML:el.outerHTML.substring(0,300),
        computedStyle:insGetKeyStyles(el),
        from:{left:origLeft,top:origTop},
        to:{left:finalLeft,top:finalTop}
      }],
      comment:'拖拽移动 dx='+dx+'px, dy='+dy+'px',
      author:'User',
      timestamp:Date.now(),
      status:'pending'
    };
    INS.annotations.push(ann);
    insRenderPanel();T.insUpdateTabCount();
    insShowHint('[移动] 标注 #'+ann.id+' · '+dx+'px, '+dy+'px · \u2318Z 撤销');
  }
  D.addEventListener('mousemove',onMove,true);
  D.addEventListener('mouseup',onUp,true);
}

/* ═══ RESIZE SYSTEM ═══ */
function insResizeStart(sel,dir,e,onResizeCb){
  var el=sel.el;
  var cs=getComputedStyle(el);
  var startX=e.clientX, startY=e.clientY;
  var origW=el.offsetWidth, origH=el.offsetHeight;
  var origLeft=parseInt(cs.left)||0, origTop=parseInt(cs.top)||0;
  var origPos=cs.position;
  if(origPos==='static'){el.style.position='relative';}
  var ratio=origW/origH||1;
  var _resizing=false;
  var hasN=dir.indexOf('n')>=0, hasS=dir.indexOf('s')>=0;
  var hasW=dir.indexOf('w')>=0, hasE=dir.indexOf('e')>=0;

  function onMove(ev){
    var dx=ev.clientX-startX, dy=ev.clientY-startY;
    if(!_resizing){
      if(Math.abs(dx)<3&&Math.abs(dy)<3) return;
      _resizing=true;
      if(onResizeCb) onResizeCb();
      insHideCommentPop();
      sel.box.classList.add('resizing');
      D.body.style.cursor=_CURSOR_MAP[dir]||'';
      insDragShowHint('缩放中... Shift 等比 · \u2318Z 撤销');
    }
    var newW=origW, newH=origH, newL=origLeft, newT=origTop;
    if(hasE) newW=Math.max(20,origW+dx);
    if(hasW){newW=Math.max(20,origW-dx);newL=origLeft+origW-newW;}
    if(hasS) newH=Math.max(20,origH+dy);
    if(hasN){newH=Math.max(20,origH-dy);newT=origTop+origH-newH;}

    if(ev.shiftKey){
      var wDelta=newW-origW, hDelta=newH-origH;
      if(Math.abs(wDelta)>Math.abs(hDelta)){
        newH=Math.max(20,Math.round(newW/ratio));
        if(hasN) newT=origTop+origH-newH;
      } else {
        newW=Math.max(20,Math.round(newH*ratio));
        if(hasW) newL=origLeft+origW-newW;
      }
    }

    el.style.width=newW+'px';
    el.style.height=newH+'px';
    if(hasW) el.style.left=newL+'px';
    if(hasN) el.style.top=newT+'px';
    T.insPositionSelBox(sel);
    INS.selections.forEach(function(s){if(s!==sel)T.insPositionSelBox(s);});
  }

  function onUp(){
    D.removeEventListener('mousemove',onMove,true);
    D.removeEventListener('mouseup',onUp,true);
    if(!_resizing){
      if(origPos==='static') el.style.position='';
      return;
    }
    sel.box.classList.remove('resizing');
    D.body.style.cursor='';
    insDragHideHint();

    var finalW=el.offsetWidth, finalH=el.offsetHeight;
    var dw=finalW-origW, dh=finalH-origH;

    undoPush({
      type:'resize',el:el,
      prevWidth:origW+'px',prevHeight:origH+'px',
      prevLeft:origLeft+'px',prevTop:origTop+'px',
      prevPos:origPos
    });
    T.insPositionSelBox(sel);

    var ann={
      id:++INS.annId,
      action:'resize',
      targets:[{
        selector:getSelector(el),
        tagName:el.tagName.toLowerCase(),
        outerHTML:el.outerHTML.substring(0,300),
        computedStyle:insGetKeyStyles(el),
        from:{width:origW,height:origH},
        to:{width:finalW,height:finalH}
      }],
      comment:'缩放元素 '+origW+'×'+origH+' → '+finalW+'×'+finalH+' (dw='+dw+', dh='+dh+')',
      author:'User',
      timestamp:Date.now(),
      status:'pending'
    };
    INS.annotations.push(ann);
    insRenderPanel();T.insUpdateTabCount();
    insShowHint('[缩放] 标注 #'+ann.id+' · '+finalW+'×'+finalH+' · \u2318Z 撤销');
  }

  D.addEventListener('mousemove',onMove,true);
  D.addEventListener('mouseup',onUp,true);
}

var _UNDO_MAX=50;
function undoPush(entry){
  var u=T.DRAG.undo;
  /* 连续 nudge 同一元素 → 合并（只保留最早的 prevLeft/prevTop） */
  if(!entry.type&&u.length>0){
    var prev=u[u.length-1];
    if(!prev.type&&prev.el===entry.el){return;}
  }
  u.push(entry);
  if(u.length>_UNDO_MAX) u.splice(0,u.length-_UNDO_MAX);
}

function insDragUndo(){
  var last=T.DRAG.undo.pop();
  if(!last){insShowHint('没有可撤销的操作');return;}
  var el=last.el;
  if(last.type==='text'){
    el.textContent=last.prevText;
    insShowHint('已撤销文字修改');
  } else if(last.type==='color'){
    if(last.prop==='color') el.style.color=last.prevVal;
    else el.style.backgroundColor=last.prevVal;
    insShowHint('已撤销颜色修改');
  } else if(last.type==='prop'){
    if(last.prop==='src') el.setAttribute('src',last.prevVal||'');
    else el.style[last.prop]=last.prevVal||'';
    insShowHint('已撤销属性修改');
  } else if(last.type==='resize'){
    el.style.width=last.prevWidth;
    el.style.height=last.prevHeight;
    el.style.left=last.prevLeft;
    el.style.top=last.prevTop;
    if(last.prevPos==='static'){el.style.position='';}
    insShowHint('已撤销缩放');
  } else {
    if(last.prevPos==='static'){el.style.position='';el.style.left='';el.style.top='';}
    else{el.style.left=last.prevLeft;el.style.top=last.prevTop;}
    insShowHint('已撤销移动');
  }
  INS.selections.forEach(function(s){T.insPositionSelBox(s);});
  T.insUpdateCtxBar();
}

function insDragShowHint(msg){
  if(!_dragHintEl){
    _dragHintEl=D.createElement('div');_dragHintEl.className='ins-drag-hint';
    D.body.appendChild(_dragHintEl);
  }
  _dragHintEl.textContent=msg;_dragHintEl.classList.add('show');
}
function insDragHideHint(){
  if(_dragHintEl)_dragHintEl.classList.remove('show');
}

function insRemoveSelBox(sel){
  if(sel.box && sel.box.parentNode) sel.box.parentNode.removeChild(sel.box);
}

function insRenumber(){
  INS.selections.forEach(function(s,i){s.num=i+1;s.badge.textContent=i+1;});
}

function insClearSelections(){
  INS.selections.forEach(function(s){insRemoveSelBox(s);});
  INS.selections=[];
  insHideCommentPop();
}

var _ACT_MAP=[
  {key:'modify',label:'修改'},
  {key:'insert-before',label:'前插'},
  {key:'insert-after',label:'后插'},
  {key:'replace',label:'替换'},
  {key:'delete',label:'删除'}
];

function insSetAction(btn){
  INS.action=btn.dataset.act;
  var btns=btn.parentElement.querySelectorAll('.ins-act-btn');
  for(var i=0;i<btns.length;i++) btns[i].classList.remove('active');
  btn.classList.add('active');
  var ta=D.getElementById('ins-comment-input');
  if(ta){
    if(INS.action==='delete'){ta.placeholder='确认删除？可留空直接保存';} 
    else if(INS.action==='insert-before'||INS.action==='insert-after'){ta.placeholder='描述要插入的内容...';}
    else if(INS.action==='replace'){ta.placeholder='描述替换后的内容...';}
    else{ta.placeholder='留下你的修改意见...';}
    ta.focus();
  }
}

function insShowCommentPop(){
  insHideCommentPop();
  INS.action='modify';
  INS.attachedImage=null;
  var last=INS.selections[INS.selections.length-1];
  if(!last) return;
  var vr=last.el.getBoundingClientRect();
  INS.popEl=D.createElement('div');INS.popEl.className='ins-comment-pop';
  var selInfo=INS.selections.length===1?
    '<span class="ins-ann-sel" style="padding:8px 12px 0;display:block">'+last.selector+'</span>':
    '<span class="ins-ann-id" style="padding:8px 12px 0;display:block;font-size:10px">'+INS.selections.length+' 个元素已选中</span>';
  var actBtns=_ACT_MAP.map(function(a){
    return '<button type="button" class="ins-act-btn'+(a.key==='modify'?' active':'')+'" data-act="'+a.key+'" onclick="window._tk.insSetAction(this)">'+a.label+'</button>';
  }).join('');
  INS.popEl.innerHTML=selInfo
    +'<div class="ins-act-bar">'+actBtns+'</div>'
    +'<textarea id="ins-comment-input" placeholder="留下你的修改意见..."></textarea>'
    +'<div id="ins-img-preview"></div>'
    +'<div class="ins-pop-attach"><input type="file" id="ins-file-input" accept="image/*" style="display:none" /><label for="ins-file-input" class="ins-pop-btn ins-pop-file-btn">附图</label><span class="ins-pop-attach-hint">从本机选图 · 图片请放 _ref/</span>'
    +'<span class="ins-pop-attach-hint" style="display:block;margin-top:4px;line-height:1.4">截图给 AI：选中元素后点工具条 <b>相机</b> 图标</span></div>'
    +'<div class="ins-pop-bar">'
    +'<button type="button" class="ins-pop-btn ins-pop-cancel" onclick="window._tk.insPopCancel()">取消</button>'
    +'<button type="button" class="ins-pop-btn ins-pop-save" onclick="window._tk.insPopSave()">保存标注</button>'
    +'</div>';
  var popH=200, popW=320;
  var top=vr.bottom+8, left=vr.left;
  if(top+popH>W.innerHeight) top=Math.max(8,vr.top-popH-8);
  if(left+popW>W.innerWidth) left=W.innerWidth-popW-8;
  if(left<8) left=8;
  INS.popEl.style.top=top+'px';
  INS.popEl.style.left=left+'px';
  D.body.appendChild(INS.popEl);
  setTimeout(function(){var ta=D.getElementById('ins-comment-input');if(ta){ta.focus();ta.addEventListener('paste',function(e){var items=(e.clipboardData||{}).items;if(!items)return;for(var i=0;i<items.length;i++){if(items[i].type.indexOf('image')===0){var f=items[i].getAsFile();insSetPreview(f.name||('paste-'+Date.now()+'.png'),URL.createObjectURL(f));e.preventDefault();break;}}});}},50);
  var fi=D.getElementById('ins-file-input');
  if(fi) fi.addEventListener('change',function(){if(fi.files&&fi.files[0]){var f=fi.files[0];insSetPreview(f.name,URL.createObjectURL(f));}});
}

function insHideCommentPop(){
  if(INS.popEl && INS.popEl.parentNode) INS.popEl.parentNode.removeChild(INS.popEl);
  INS.popEl=null;
}

function insPopCancel(){
  insClearSelections();
}

function insSetPreview(name,previewUrl){
  INS.attachedImage=name;
  var p=D.getElementById('ins-img-preview');
  if(p) p.innerHTML='<img src="'+previewUrl+'" style="max-width:280px;max-height:100px;border-radius:6px;margin:4px 12px 0;display:block" /><span class="ins-pop-attach-hint" style="padding:0 12px;display:block">_ref/'+name+'</span>';
  var saveBtn=D.querySelector('.ins-pop-save');
  if(saveBtn) saveBtn.textContent='保存标注 (含图)';
}

var _pinnedBoxes=[];

function insPopSave(){
  var ta=D.getElementById('ins-comment-input');
  var comment=ta?ta.value.trim():'';
  if(!comment && INS.action!=='delete'){ta&&ta.focus();return;}
  if(!comment && INS.action==='delete') comment='删除此元素';
  var ann={
    id:++INS.annId,
    action:INS.action,
    targets:INS.selections.map(function(s){
      return {
        selector:s.selector,
        tagName:s.el.tagName.toLowerCase(),
        outerHTML:s.el.outerHTML.substring(0,300),
        computedStyle:insGetKeyStyles(s.el),
        rect:T.getElRect(s.el)
      };
    }),
    relations:INS.selections.length>1?insCalcRelations(INS.selections):null,
    comment:comment,
    author:'User',
    timestamp:Date.now(),
    status:'pending'
  };
  if(INS.attachedImage){ann.image=INS.attachedImage;INS.attachedImage=null;}
  INS.annotations.push(ann);
  insHideCommentPop();
  insPinSelections(ann);
  INS.selections=[];
  insRenderPanel();
  T.insUpdateTabCount();
  var actLabel=_ACT_MAP.filter(function(a){return a.key===INS.action;})[0];
  insShowHint((actLabel?'['+actLabel.label+'] ':'')+'标注 #'+ann.id+' 已保存');
}

function insPinSelections(ann){
  INS.selections.forEach(function(s){
    var box=s.box;
    box.className='ins-pinned-box';
    box.innerHTML='';
    var badge=D.createElement('div');badge.className='ins-pinned-badge';
    badge.textContent='#'+ann.id;
    badge.onclick=function(){insScrollToAnn(ann.id);};
    box.appendChild(badge);
    var tip=D.createElement('div');tip.className='ins-pinned-tip';
    tip.textContent=ann.comment.length>30?ann.comment.substring(0,30)+'...':ann.comment;
    box.appendChild(tip);
    _pinnedBoxes.push({annId:ann.id,box:box,el:s.el});
  });
}

function insRemovePinnedByAnn(id){
  _pinnedBoxes=_pinnedBoxes.filter(function(p){
    if(p.annId===id){if(p.box.parentNode)p.box.parentNode.removeChild(p.box);return false;}
    return true;
  });
}

function insClearAllPinned(){
  _pinnedBoxes.forEach(function(p){if(p.box.parentNode)p.box.parentNode.removeChild(p.box);});
  _pinnedBoxes=[];
}

function insGetKeyStyles(el){
  var cs=getComputedStyle(el);
  var rect=el.getBoundingClientRect();
  return {
    color:cs.color,background:cs.background,
    fontSize:cs.fontSize,fontWeight:cs.fontWeight,
    padding:cs.padding,margin:cs.margin,
    borderRadius:cs.borderRadius,
    width:cs.width,height:cs.height,
    display:cs.display,position:cs.position,
    top:cs.top,left:cs.left,bottom:cs.bottom,right:cs.right,
    viewportX:Math.round(rect.left),viewportY:Math.round(rect.top),
    offsetTop:el.offsetTop,offsetLeft:el.offsetLeft
  };
}

function insCalcRelations(sels){
  if(sels.length<2) return null;
  var pairs=[];
  for(var i=0;i<sels.length;i++){
    for(var j=i+1;j<sels.length;j++){
      var a=sels[i].el.getBoundingClientRect();
      var b=sels[j].el.getBoundingClientRect();
      var gapH,gapV;
      if(b.left>=a.right) gapH=Math.round(b.left-a.right);
      else if(a.left>=b.right) gapH=Math.round(a.left-b.right);
      else gapH=-Math.round(Math.min(a.right,b.right)-Math.max(a.left,b.left));
      if(b.top>=a.bottom) gapV=Math.round(b.top-a.bottom);
      else if(a.top>=b.bottom) gapV=Math.round(a.top-b.bottom);
      else gapV=-Math.round(Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
      pairs.push({
        from:'#'+sels[i].num+' '+sels[i].selector.split('>').pop().trim(),
        to:'#'+sels[j].num+' '+sels[j].selector.split('>').pop().trim(),
        horizontalGap:gapH,
        verticalGap:gapV,
        overlap:gapH<0||gapV<0
      });
    }
  }
  return pairs;
}

function insShowHint(msg){
  var h=D.getElementById('ins-toolbar-hint');
  if(!h) return;
  h.textContent=msg;h.classList.add('show');
  setTimeout(function(){h.classList.remove('show');},2000);
}

/* Floating badges on annotated elements */
var _badges=[];
function insRenderBadges(){
  _badges.forEach(function(b){if(b.parentNode)b.parentNode.removeChild(b);});
  _badges=[];
  INS.annotations.forEach(function(ann){
    if(ann.status!=='pending') return;
    var t=ann.targets[0];if(!t) return;
    var el=D.querySelector(t.selector);
    if(!el) return;
    var r=T.getElRect(el);
    var b=D.createElement('div');b.className='ins-badge-float';
    b.textContent=ann.id;
    b.style.top=(r.top-11)+'px';b.style.left=(r.left+r.width-11)+'px';
    b.onclick=function(){insScrollToAnn(ann.id);};
    D.body.appendChild(b);
    _badges.push(b);
  });
}

/* Annotation panel */
function insInjectPanel(){
  if(D.getElementById('ins-panel')) return;
  var p=D.createElement('div');p.id='ins-panel';
  p.innerHTML='<div class="ins-panel-hd">'
    +'<div class="ins-panel-title">Annotations</div>'
    +'<div class="ins-panel-actions">'
    +'<button type="button" onclick="window._tk.insShareLink()" class="ins-btn-share" title="生成带标注的分享链接">分享</button>'
    +'<button type="button" onclick="window._tk.insExport()" class="ins-btn-sm">Export</button>'
    +'<button type="button" onclick="window._tk.insClearAll()" class="ins-btn-sm danger">Clear</button>'
    +'</div></div>'
    +'<div id="ins-panel-list" class="ins-panel-list"></div>'
    +'<div class="ins-panel-footer">'
    +'<button type="button" onclick="window._tk.insApply()" class="ins-btn-apply">Apply (<span id="ins-count">0</span>)</button>'
    +'</div>'
    +'<div id="ins-shortcuts">'
    +'<div class="ins-sc-title">快捷键 (Figma 风格)</div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">选中元素</span><span class="ins-sc-key">Click</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">取消选中</span><span class="ins-sc-key">再次 Click / Esc</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">多选追加/移除</span><span class="ins-sc-key">Shift + Click</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">全选同层</span><span class="ins-sc-key">⌘A</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">穿透选择图层</span><span class="ins-sc-key">Alt + Click</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">拖拽移动</span><span class="ins-sc-key">选中后拖动</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">微调位移 1px</span><span class="ins-sc-key">\u2190\u2191\u2192\u2193</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">微调位移 10px</span><span class="ins-sc-key">Shift + \u2190\u2191\u2192\u2193</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">编辑文字</span><span class="ins-sc-key">Double Click</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">打开标注</span><span class="ins-sc-key">Enter</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">隐藏元素</span><span class="ins-sc-key">Delete</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">撤销</span><span class="ins-sc-key">⌘Z</span></div>'
    +'<div class="ins-sc-row"><span class="ins-sc-desc">逐层退出</span><span class="ins-sc-key">Esc</span></div>'
    +'</div>';
  D.body.appendChild(p);
  var tab=D.createElement('div');tab.id='ins-tab';
  tab.innerHTML='<span class="ins-tab-count" id="ins-tab-count">0</span> 标注';
  tab.onclick=function(){window._tk.insTogglePanel();};
  D.body.appendChild(tab);
}

function insRenderPanel(){
  var list=D.getElementById('ins-panel-list');
  if(!list) return;
  var cnt=D.getElementById('ins-count');
  var pending=INS.annotations.filter(function(a){return a.status==='pending';});
  if(cnt) cnt.textContent=pending.length;
  if(pending.length===0){
    list.innerHTML='<div class="ins-empty">暂无标注<span class="ins-empty-sub">点击页面元素开始标注</span></div>';
    return;
  }
  var actColors={modify:'#3B82F6','insert-before':'#10B981','insert-after':'#10B981',replace:'#F59E0B','delete':'#EF4444'};
  var actLabels={modify:'修改','insert-before':'前插','insert-after':'后插',replace:'替换','delete':'删除'};
  list.innerHTML=INS.annotations.map(function(ann){
    if(ann.status!=='pending') return '';
    var sels=ann.targets.map(function(t){return t.selector;}).join(', ');
    var time=new Date(ann.timestamp);
    var ts=String(time.getHours()).padStart(2,'0')+':'+String(time.getMinutes()).padStart(2,'0');
    var act=ann.action||'modify';
    var actTag='<span class="ins-ann-action" style="background:'+(actColors[act]||'#3B82F6')+'">'+(actLabels[act]||act)+'</span>';
    return '<div class="ins-ann-card" data-ann="'+ann.id+'" onclick="window._tk.insHighlightAnn('+ann.id+')">'
      +'<div class="ins-ann-sel" title="'+sels.replace(/"/g,'&quot;')+'">'+actTag+'<span class="ins-ann-id">#'+ann.id+'</span>'+sels+'</div>'
      +'<div class="ins-ann-txt">'+ann.comment.replace(/</g,'&lt;')+'</div>'
      +'<div class="ins-ann-meta"><span>'+ts+'</span><span>'+ann.targets.length+' target(s)</span>'
      +'<div class="ins-ann-actions">'
      +'<button type="button" class="ins-ann-edit" onclick="event.stopPropagation();window._tk.insEditAnn('+ann.id+')">Edit</button>'
      +'<button type="button" class="ins-ann-del" onclick="event.stopPropagation();window._tk.insDelAnn('+ann.id+')">Delete</button>'
      +'</div></div></div>';
  }).join('');
}

function insScrollToAnn(id){
  if(!INS.panelOpen) insTogglePanel();
  var card=D.querySelector('.ins-ann-card[data-ann="'+id+'"]');
  if(card) card.scrollIntoView({behavior:'smooth',block:'center'});
}

function insHighlightAnn(id){
  var ann=INS.annotations.find(function(a){return a.id===id;});
  if(!ann) return;
  ann.targets.forEach(function(t){
    var el=D.querySelector(t.selector);
    if(!el) return;
    el.style.outline='3px solid #F59E0B';
    el.style.outlineOffset='2px';
    el.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(function(){el.style.outline='';el.style.outlineOffset='';},2000);
  });
}

function insSyncPinnedTipForAnn(annId){
  var ann=INS.annotations.find(function(a){return a.id===annId;});
  if(!ann) return;
  var tipText=ann.comment.length>30?ann.comment.substring(0,30)+'...':ann.comment;
  _pinnedBoxes.forEach(function(p){
    if(p.annId!==annId) return;
    var tip=p.box.querySelector('.ins-pinned-tip');
    if(tip) tip.textContent=tipText;
  });
}

function insEditAnn(id){
  var ann=INS.annotations.find(function(a){return a.id===id;});
  if(!ann||ann.status!=='pending') return;
  insHideCommentPop();
  INS.popEl=D.createElement('div');INS.popEl.className='ins-comment-pop';
  INS.popEl.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;z-index:10281';
  INS.popEl.innerHTML='<div style="padding:12px 16px 8px;font-size:13px;font-weight:600;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)">编辑标注 #'+id+'</div>'
    +'<textarea id="ins-edit-ann-input" placeholder="修改说明…" style="width:100%;min-height:100px;padding:12px;border:none;background:transparent;color:#fff;font-size:13px;font-family:Inter,system-ui,sans-serif;resize:vertical;outline:none;box-sizing:border-box"></textarea>'
    +'<div class="ins-pop-bar">'
    +'<button type="button" class="ins-pop-btn ins-pop-cancel" onclick="window._tk.insEditAnnCancel()">取消</button>'
    +'<button type="button" class="ins-pop-btn ins-pop-save" onclick="window._tk.insEditAnnSave('+id+')">保存</button>'
    +'</div>';
  D.body.appendChild(INS.popEl);
  var ta=D.getElementById('ins-edit-ann-input');
  if(ta) ta.value=ann.comment||'';
  setTimeout(function(){var t=D.getElementById('ins-edit-ann-input');if(t)t.focus();},50);
}

function insEditAnnSave(id){
  var ta=D.getElementById('ins-edit-ann-input');
  var v=ta?ta.value.trim():'';
  var ann=INS.annotations.find(function(a){return a.id===id;});
  if(ann) ann.comment=v;
  insHideCommentPop();
  insSyncPinnedTipForAnn(id);
  insRenderPanel();
  insShowHint('标注 #'+id+' 已更新');
}

function insEditAnnCancel(){
  insHideCommentPop();
}

function insDelAnn(id){
  INS.annotations=INS.annotations.filter(function(a){return a.id!==id;});
  insRemovePinnedByAnn(id);
  insRenderBadges();insRenderPanel();T.insUpdateTabCount();
}

function insClearAll(){
  if(INS.annotations.length>0 && !confirm('清空所有标注？')) return;
  INS.annotations=[];INS.annId=0;
  insClearAllPinned();
  insRenderBadges();insRenderPanel();T.insUpdateTabCount();
}

function insExport(){
  var pending=INS.annotations.filter(function(a){return a.status==='pending';});
  if(pending.length===0){alert('暂无待处理标注');return;}
  var payload={
    file:location.pathname.split('/').pop(),
    url:location.href,
    exportedAt:new Date().toISOString(),
    annotations:pending.map(function(a){
      var o={
        id:a.id,
        action:a.action||'modify',
        comment:a.comment,
        targets:a.targets.map(function(t){
          return {selector:t.selector,tagName:t.tagName,outerHTML:t.outerHTML,computedStyle:t.computedStyle};
        })
      };
      if(a.image) o.image=a.image;
      return o;
    })
  };
  tkCopy(JSON.stringify(payload,null,2),pending.length+' 条标注已复制到剪贴板');
}

function insApply(){
  var pending=INS.annotations.filter(function(a){return a.status==='pending';});
  if(pending.length===0){alert('暂无待处理标注');return;}
  var payload={
    file:location.pathname.split('/').pop(),
    url:location.href,
    exportedAt:new Date().toISOString(),
    annotations:pending.map(function(a){
      var o={id:a.id,action:a.action||'modify',comment:a.comment,
        targets:a.targets.map(function(t){
          return {selector:t.selector,tagName:t.tagName,outerHTML:t.outerHTML,computedStyle:t.computedStyle};
        })};
      return o;
    })
  };
  var json=JSON.stringify(payload,null,2);
  tkCopy(json,pending.length+' 条标注已复制，粘贴到输入框即可执行');
}

function insTogglePanel(){
  INS.panelOpen=!INS.panelOpen;
  var p=D.getElementById('ins-panel');
  var tab=D.getElementById('ins-tab');
  if(p) p.classList.toggle('open',INS.panelOpen);
  if(tab) tab.classList.toggle('shifted',INS.panelOpen);
  if(INS.panelOpen) insRenderPanel();
}



T.insDragInit=insDragInit; T.insDragUndo=insDragUndo;
T.insDragShowHint=insDragShowHint; T.insDragHideHint=insDragHideHint;
T.insRemoveSelBox=insRemoveSelBox; T.insRenumber=insRenumber;
T.insClearSelections=insClearSelections;
T.insShowCommentPop=insShowCommentPop; T.insHideCommentPop=insHideCommentPop;
T.insPopSave=insPopSave; T.insPopCancel=insPopCancel;
T.insSetAction=insSetAction;
T.insPinSelections=insPinSelections; T.insRemovePinnedByAnn=insRemovePinnedByAnn;
T.insClearAllPinned=insClearAllPinned; T._pinnedBoxes=_pinnedBoxes;
T.insGetKeyStyles=insGetKeyStyles; T.insCalcRelations=insCalcRelations;
T.insShowHint=insShowHint; T.undoPush=undoPush;
T.insRenderBadges=insRenderBadges;
T.insTogglePanel=insTogglePanel;
T.insInjectPanel=insInjectPanel; T.insRenderPanel=insRenderPanel;
T.insScrollToAnn=insScrollToAnn; T.insHighlightAnn=insHighlightAnn;
T.insEditAnn=insEditAnn; T.insEditAnnSave=insEditAnnSave; T.insEditAnnCancel=insEditAnnCancel;
T.insDelAnn=insDelAnn; T.insClearAll=insClearAll;
T.insExport=insExport; T.insApply=insApply;
T.insSetPreview=insSetPreview;
T.insSyncPinnedTipForAnn=insSyncPinnedTipForAnn;

})(window,document);
