;(function(W,D){'use strict';
var T=W.__TK, INS=T.INS;
var getVar=T.getVar, getElRect=T.getElRect;

/* ═══ ANNOTATION PERSISTENCE (URL Hash) ═══ */
function insCompressAnns(anns){
  var slim=anns.filter(function(a){return a.status==='pending';}).map(function(a){
    return {i:a.id,a:a.action||'modify',c:a.comment,
      t:a.targets.map(function(t){
        var o={s:t.selector,g:t.tagName,h:t.outerHTML?t.outerHTML.substring(0,200):'',cs:t.computedStyle};
        if(t.from) o.fr=t.from;
        if(t.to) o.to=t.to;
        return o;
      })
    };
  });
  return btoa(unescape(encodeURIComponent(JSON.stringify(slim))));
}

function insDecompressAnns(hash){
  try{
    var json=decodeURIComponent(escape(atob(hash)));
    var slim=JSON.parse(json);
    return slim.map(function(a){
      return {id:a.i,action:a.a,comment:a.c,author:'Shared',timestamp:Date.now(),status:'pending',
        targets:a.t.map(function(t){
          var o={selector:t.s,tagName:t.g,outerHTML:t.h,computedStyle:t.cs};
          if(t.fr) o.from=t.fr;
          if(t.to) o.to=t.to;
          return o;
        })
      };
    });
  }catch(e){return [];}
}

function insShareLink(){
  var pending=INS.annotations.filter(function(a){return a.status==='pending';});
  if(pending.length===0){alert('暂无标注可分享');return;}
  var encoded=insCompressAnns(INS.annotations);
  var base=location.origin+location.pathname;
  var url=base+'#ann='+encoded;
  T.tkCopy(url,pending.length+' 条标注链接已复制，发给同事即可查看');
}

function insRestoreFromHash(){
  var h=location.hash;
  if(h.indexOf('#ann=')<0) return;
  var encoded=h.substring(5);
  var data=insDecompressAnns(encoded);
  if(data.length===0) return;
  INS.annotations=data;
  INS.annId=data.reduce(function(mx,a){return Math.max(mx,a.id||0);},0);
  insUpdateTabCount();
  insRestoreVisuals();
  history.replaceState(null,'',location.pathname+location.search);
}

function insRestoreFromHTML(){
  var script=D.getElementById('tk-annotations');
  if(!script) return;
  try{
    var data=JSON.parse(script.textContent);
    if(!Array.isArray(data)||data.length===0) return;
    INS.annotations=data;
    INS.annId=data.reduce(function(mx,a){return Math.max(mx,a.id||0);},0);
    insUpdateTabCount();
    insRestoreVisuals();
  }catch(e){}
}

function insRestoreVisuals(){
  if(INS.annotations.length===0) return;
  T.insInjectCSS();
  INS.annotations.forEach(function(ann){
    if(ann.status!=='pending') return;
    ann.targets.forEach(function(t){
      var el;
      try{el=D.querySelector(t.selector);}catch(e){return;}
      if(!el) return;

      if(ann.action==='color-edit'&&t.to&&t.to.prop&&t.to.value){
        var val=t.to.value;
        if(val.indexOf('var(')===0){
          var vn=val.replace(/^var\(/,'').replace(/\)$/,'');
          val=getVar(vn)||t.to.hex||val;
        }
        if(t.to.prop==='color') el.style.color=val;
        else el.style.backgroundColor=val;
      }
      if(ann.action==='text-edit'&&t.to&&t.to.text!=null){
        el.textContent=t.to.text;
      }

      var r=T.getElRect(el);
      var box=D.createElement('div');
      box.className='ins-pinned-box';
      box.style.top=r.top+'px';box.style.left=r.left+'px';
      box.style.width=r.width+'px';box.style.height=r.height+'px';
      var badge=D.createElement('div');badge.className='ins-pinned-badge';
      badge.textContent='#'+ann.id;
      badge.onclick=function(){T.insScrollToAnn(ann.id);};
      box.appendChild(badge);
      var tip=D.createElement('div');tip.className='ins-pinned-tip';
      var actLabels={modify:'修改','insert-before':'前插','insert-after':'后插',replace:'替换','delete':'删除','color-edit':'颜色','text-edit':'文字'};
      var prefix=ann.action&&ann.action!=='modify'?'['+(actLabels[ann.action]||ann.action)+'] ':'';
      tip.textContent=prefix+(ann.comment.length>25?ann.comment.substring(0,25)+'...':ann.comment);
      box.appendChild(tip);
      D.body.appendChild(box);
      T._pinnedBoxes.push({annId:ann.id,box:box,el:el});
    });
  });
}

function insUpdateTabCount(){
  var tc=D.getElementById('ins-tab-count');
  var pending=INS.annotations.filter(function(a){return a.status==='pending';});
  if(tc) tc.textContent=pending.length;
}

function insToggle(){
  INS.on=!INS.on;
  var btn=D.getElementById('tk-btn-ins');
  var hint=D.getElementById('ins-toolbar-hint');
  if(INS.on){
    T.insInjectCSS();T.insCreateHL();T.insInjectPanel();
    D.body.style.cursor='crosshair';
    D.addEventListener('mouseover',T.insOnHover,true);
    D.addEventListener('click',T.insOnClick,true);
    D.addEventListener('dblclick',T.insOnDblClick,true);
    D.addEventListener('keydown',insOnKey,true);
    if(btn){btn.textContent='退出编辑';btn.classList.add('tk-ins-active');}
    if(hint){hint.textContent='编辑模式：点击选中 · Shift+点击多选 · 双击编辑文字 · ⌘Z 撤销';hint.classList.add('show');setTimeout(function(){hint.classList.remove('show');},3000);}
    var tab=D.getElementById('ins-tab');if(tab)tab.style.display='';
    var bc=D.getElementById('ins-breadcrumb');if(bc)bc.classList.add('show');
    T.insRenderBadges();insUpdateTabCount();
  } else {
    D.body.style.cursor='';
    D.removeEventListener('mouseover',T.insOnHover,true);
    D.removeEventListener('click',T.insOnClick,true);
    D.removeEventListener('dblclick',T.insOnDblClick,true);
    D.removeEventListener('keydown',insOnKey,true);
    T.insHideHL();T.insClearSelections();T.insClearAllPinned();
    T.insHideCtxBar();T.insHideColorPicker();T.insHidePropPanel();T.insHideTypeBadge();
    T.snapClear();
    if(T.SNAP.container&&T.SNAP.container.parentNode){T.SNAP.container.parentNode.removeChild(T.SNAP.container);T.SNAP.container=null;}
    INS.navEl=null;
    var bc2=D.getElementById('ins-breadcrumb');if(bc2){bc2.classList.remove('show');bc2.innerHTML='';}
    if(btn){btn.textContent='编辑模式';btn.classList.remove('tk-ins-active');}
    if(INS.panelOpen) T.insTogglePanel();
    var tab2=D.getElementById('ins-tab');if(tab2)tab2.style.display='none';
  }
}

function insBuildBreadcrumb(el){
  var bar=D.getElementById('ins-breadcrumb');
  if(!bar) return;
  var path=[], cur=el, depth=0;
  while(cur && cur!==D.documentElement && depth<8){
    if(cur===D.body){path.unshift({el:cur,label:'body'});break;}
    var tag=cur.tagName.toLowerCase();
    var cls=cur.className&&typeof cur.className==='string'?cur.className.trim().split(/\s+/).filter(function(c){return c.indexOf('tk-')!==0&&c.indexOf('ins-')!==0;}).slice(0,1).join(''):'';
    if(cls) tag+='.'+cls;
    path.unshift({el:cur,label:tag});
    cur=cur.parentElement;depth++;
  }
  bar.innerHTML='';
  path.forEach(function(item,i){
    if(i>0){var sep=D.createElement('span');sep.className='ins-bc-sep';sep.textContent='\u203a';bar.appendChild(sep);}
    var span=D.createElement('span');span.className='ins-bc-item';
    if(item.el===el) span.classList.add('ins-bc-active');
    span.textContent=item.label;
    span.addEventListener('click',function(ev){
      ev.stopPropagation();
      INS.navEl=item.el;
      T.insShowHL(item.el);
      insBuildBreadcrumb(item.el);
    });
    span.addEventListener('mouseenter',function(){T.insShowHL(item.el);});
    span.addEventListener('mouseleave',function(){T.insShowHL(el);});
    bar.appendChild(span);
  });
  bar.scrollLeft=bar.scrollWidth;
}

function insOnKey(e){
  /* 输入框/textarea 中不拦截 */
  var tag=e.target.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||e.target.contentEditable==='true') return;

  /* Escape: 逐层退出（面板→选中→编辑模式），同 Figma */
  if(e.key==='Escape'){
    if(INS.popEl){ T.insHideCommentPop(); return; }
    T.insHideColorPicker();T.insHidePropPanel();
    if(INS.selections.length>0){ T.insClearSelections();T.insHideCtxBar(); return; }
    insToggle();
    return;
  }
  /* Cmd/Ctrl+Z: 撤销 */
  if(e.key==='z'&&(e.ctrlKey||e.metaKey)&&!e.shiftKey){
    e.preventDefault();T.insDragUndo();return;
  }
  /* Cmd/Ctrl+A: 全选同层子元素（Figma 同层全选） */
  if(e.key==='a'&&(e.ctrlKey||e.metaKey)&&INS.selections.length>0){
    e.preventDefault();
    var parent=INS.selections[0].el.parentElement;
    if(parent){
      T.insClearSelections();
      Array.from(parent.children).forEach(function(c){
        if(!T.isToolkitEl(c)&&getComputedStyle(c).display!=='none') T.insAddSelection(c);
      });
      T.insUpdateCtxBar();
    }
    return;
  }
  /* Enter: 打开标注面板 */
  if(e.key==='Enter'&&INS.selections.length>0){
    e.preventDefault();T.insShowCommentPop();return;
  }
  /* Delete/Backspace: 隐藏选中元素（可撤销） */
  if((e.key==='Delete'||e.key==='Backspace')&&INS.selections.length>0){
    e.preventDefault();
    INS.selections.forEach(function(sel){
      T.undoPush({el:sel.el,type:'prop',prop:'display',prevVal:sel.el.style.display});
      sel.el.style.display='none';
    });
    T.insClearSelections();T.insHideCtxBar();
    T.insShowHint('已隐藏元素 (\u2318Z 撤销)');
    return;
  }
  /* 方向键+选中: Nudge 微调位移（Shift=10px 步进，同 Figma） */
  if(INS.selections.length>0&&(e.key==='ArrowUp'||e.key==='ArrowDown'||e.key==='ArrowLeft'||e.key==='ArrowRight')){
    e.preventDefault();
    var step=e.shiftKey?10:1;
    INS.selections.forEach(function(sel){
      var el=sel.el;
      var cs=getComputedStyle(el);
      if(cs.position==='static') el.style.position='relative';
      var curL=parseInt(el.style.left)||0, curT=parseInt(el.style.top)||0;
      T.undoPush({el:el,prevPos:cs.position,prevLeft:el.style.left,prevTop:el.style.top});
      if(e.key==='ArrowLeft') el.style.left=(curL-step)+'px';
      else if(e.key==='ArrowRight') el.style.left=(curL+step)+'px';
      else if(e.key==='ArrowUp') el.style.top=(curT-step)+'px';
      else if(e.key==='ArrowDown') el.style.top=(curT+step)+'px';
      T.insPositionSelBox(sel);
    });
    return;
  }
  /* 无选中时方向键: DOM 层级导航 */
  var nav=INS.navEl||INS.hoverEl;
  if(!nav) return;
  var next=null;
  if(e.key==='ArrowUp') next=nav.parentElement;
  else if(e.key==='ArrowDown') next=nav.firstElementChild;
  else if(e.key==='ArrowLeft') next=nav.previousElementSibling;
  else if(e.key==='ArrowRight') next=nav.nextElementSibling;
  if(!next || next===D.body || next===D.documentElement || T.isToolkitEl(next)) return;
  e.preventDefault();
  INS.navEl=next;
  T.insShowHL(next);
  insBuildBreadcrumb(next);
  next.scrollIntoView({behavior:'smooth',block:'nearest'});
}




T.insCompressAnns=insCompressAnns; T.insDecompressAnns=insDecompressAnns;
T.insShareLink=insShareLink;
T.insRestoreFromHash=insRestoreFromHash; T.insRestoreFromHTML=insRestoreFromHTML;
T.insRestoreVisuals=insRestoreVisuals;
T.insToggle=insToggle; T.insUpdateTabCount=insUpdateTabCount;
T.insOnKey=insOnKey; T.insBuildBreadcrumb=insBuildBreadcrumb;

})(window,document);
