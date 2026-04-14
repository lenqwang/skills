;(function(W,D){'use strict';
var T=W.__TK;

/* ═══ UI-CRAFT DESIGN SYSTEM TOKENS (_UC) v2 — 融合 mdc 经验规则 ═══ */
var _UC={
  typography:{
    375: {H1:32,H2:24,H3:20,P:14,SMALL:12,lineHeight:{title:1.2,body:1.5}},
    768: {H1:40,H2:32,H3:24,P:15,SMALL:13,lineHeight:{title:1.2,body:1.4}},
    1248:{H1:60,H2:40,H3:28,P:18,SMALL:14,lineHeight:{title:1.15,body:1.3}}
  },
  /* dynamic-theme.mdc: 字号响应式缩放系数 */
  typoScale:{375:0.54,640:0.64,768:0.86,1248:1},
  spacing:{
    375: {sectionPad:16,cardPad:16,gap:12,sectionGap:40},
    768: {sectionPad:24,cardPad:24,gap:16,sectionGap:64},
    1248:{sectionPad:32,cardPad:32,gap:24,sectionGap:96}
  },
  /* dynamic-theme.mdc: 5级间距层级 */
  spacing5:{
    375: {section:32,block:16,element:12,inline:8,tight:6},
    768: {section:40,block:20,element:16,inline:12,tight:8},
    1248:{section:48,block:24,element:16,inline:12,tight:8}
  },
  radius:{card:8,cardLg:32,control:8,input:6,modal:16,pill:9999},
  layout:{
    maxWidth:1200,
    breakpoints:{mobile:375,tablet:768,desktop:1248},
    maxCols:{375:1,768:2,1248:4},
    touchTarget:44
  },
  /* ui-design-patterns.mdc: 列表自适应布局阈值 */
  listAdaptive:{singleMax:4,doubleMax:10,pageSize:10},
  patterns:{
    hero:{textRatio:0.6,imageRatio:0.4,columnGap:48,verticalPad:80},
    cardGrid:{colGap:24,rowGap:32},
    ctaSection:{verticalPad:64,buttonGap:24},
    timeline:{gap:24,lineWidth:2,dotSize:12},
    faq:{gap:8,itemPad:16},
    prizeGrid:{cellSize:{375:90,768:130,1248:150},gap:{375:6,768:8,1248:10}},
    statCounter:{gap:32,numSize:{375:28,768:36,1248:48}},
    testimonial:{gap:16,cardPad:20},
    featureList:{gap:24,iconSize:48},
    formSection:{maxWidth:480,gap:16,inputHeight:44},
    listSection:{gap:12,itemPad:12}
  }
};

/* ═══ BREAKPOINT INFO ═══ */
function _getBPInfo(){
  var bp=T.BP?T.BP.getCurrent():W.innerWidth;
  var bpKey=bp<=375?375:bp<=768?768:1248;
  var labels={375:'移动端',768:'平板',1248:'桌面'};
  return {width:bp,bpKey:bpKey,label:labels[bpKey]+' ('+bp+'px)',typo:_UC.typography[bpKey],space:_UC.spacing[bpKey],maxCols:_UC.layout.maxCols[bpKey]};
}

/* ═══ UI HELPERS (used by layout panel in _inspector) ═══ */
function _makeRecBtn(text,onClick){
  var b=D.createElement('button');
  b.style.cssText='display:flex;align-items:center;gap:4px;padding:4px 8px;background:rgba(2,85,255,.12);border:1px solid rgba(2,85,255,.3);border-radius:5px;color:#6BA1FF;font-size:9px;cursor:pointer;transition:all .12s;white-space:nowrap';
  b.textContent=text;
  b.addEventListener('mouseenter',function(){b.style.background='rgba(2,85,255,.25)';});
  b.addEventListener('mouseleave',function(){b.style.background='rgba(2,85,255,.12)';});
  b.addEventListener('click',function(ev){ev.stopPropagation();onClick();});
  return b;
}
function _makeBPTag(label){
  var t=D.createElement('span');
  t.style.cssText='display:inline-block;padding:1px 6px;border-radius:3px;background:rgba(2,85,255,.15);color:#6BA1FF;font-size:8px;margin-left:4px;vertical-align:middle';
  t.textContent=label;
  return t;
}

/* ═══ SMART ANALYZER v3 (P0: structure-based + P3: diagnostics) ═══ */
function _analyzeModule(el){
  var children=Array.from(el.children).filter(function(c){return !T.isToolkitEl(c)&&getComputedStyle(c).display!=='none';});
  var cs=getComputedStyle(el);
  var cW=el.clientWidth;
  var n=children.length;

  /* ── 1. 信号采集 ── */
  var totalChildW=0;var hasImg=false;var hasText=false;var hasHeading=false;var hasCTA=false;var tagCounts={};
  var hasInput=false;var hasTable=false;var hasList=false;var hasAvatar=false;var childAspects=[];

  /* P0: 结构特征计数器（不依赖 class 名） */
  var struct={
    squareChildren:0,      /* 宽高比 0.7~1.3 的子元素 */
    childrenWithImg:0,      /* 内部含 img/svg 的子元素 */
    childrenWithHeading:0,  /* 内部含 h1-h6 的子元素 */
    childrenWithText:0,     /* 内部含 >30 字文本的子元素 */
    childrenWithBtn:0,      /* 内部含 button/a 的子元素 */
    childrenWithInput:0,    /* 内部含 input/textarea/select */
    childrenWithAvatar:0,   /* 内部含圆形头像 */
    childrenWithBigNum:0,   /* 内部含大号数字 */
    childrenWithDetails:0,  /* 内部含 details/summary */
    uniformTag:true,        /* 子元素是否 tag 相同 */
    firstChildTag:n>0?children[0].tagName:''
  };

  children.forEach(function(c){
    totalChildW+=c.offsetWidth;
    var cTag=c.tagName;
    var tn=cTag.toLowerCase();tagCounts[tn]=(tagCounts[tn]||0)+1;
    if(c.offsetWidth>0&&c.offsetHeight>0){
      var aspect=c.offsetWidth/c.offsetHeight;
      childAspects.push(aspect);
      if(aspect>=0.7&&aspect<=1.3) struct.squareChildren++;
    }

    if(cTag!==struct.firstChildTag) struct.uniformTag=false;

    var hasImgInside=!!c.querySelector('img,svg,video,canvas')||cTag==='IMG';
    if(hasImgInside){hasImg=true;struct.childrenWithImg++;}
    if(c.textContent&&c.textContent.trim().length>20) hasText=true;
    if(c.textContent&&c.textContent.trim().length>30) struct.childrenWithText++;
    if(/^H[1-6]$/.test(cTag)){hasHeading=true;struct.childrenWithHeading++;}

    var hasH=!!c.querySelector('h1,h2,h3,h4,h5,h6');
    if(hasH) struct.childrenWithHeading++;

    var isCTA=cTag==='BUTTON'||(cTag==='A'&&!!c.querySelector('button'))||!!c.querySelector('button,a[href]');
    if(isCTA){hasCTA=true;struct.childrenWithBtn++;}

    var hasInputInside=!!c.querySelector('input,textarea,select')||cTag==='INPUT'||cTag==='TEXTAREA';
    if(hasInputInside){hasInput=true;struct.childrenWithInput++;}
    if(c.querySelector('table')||cTag==='TABLE') hasTable=true;
    if(cTag==='UL'||cTag==='OL') hasList=true;

    if(c.querySelector('.rounded-full,[class*="avatar"]')||/rounded-full/.test(c.className||'')) struct.childrenWithAvatar++;
    if(c.querySelector('details,summary')) struct.childrenWithDetails++;

    /* 大号数字检测：子元素内有 fontSize>=24 的短文本节点 */
    Array.from(c.querySelectorAll('*')).some(function(d){
      if(d.children.length===0&&d.textContent.trim().length<8){
        var fs=parseFloat(getComputedStyle(d).fontSize)||16;
        if(fs>=24){struct.childrenWithBigNum++;return true;}
      }
      return false;
    });
  });

  var isOverflow=totalChildW>cW*1.05;
  var isHomogeneous=Object.keys(tagCounts).length<=2&&n>=2;
  var similarSized=childAspects.length>=3&&childAspects.every(function(a){return Math.abs(a-childAspects[0])<0.5;});

  /* ── 2. P0: 结构特征模式识别（优先结构，class 名兜底） ── */
  var pattern='generic';
  var cls=el.className||'';var id=el.id||'';var fullCtx=cls+' '+id;
  var confidence=0; /* 0=猜测 1=class匹配 2=结构确认 */

  /* 九宫格：>=9 个近正方形子元素 */
  if(n>=9&&struct.squareChildren>=Math.floor(n*0.7)){
    pattern='prize-grid';confidence=2;
  }
  /* 表单：>50% 子元素含 input */
  else if(n>=2&&struct.childrenWithInput>=Math.ceil(n*0.5)){
    pattern='form-section';confidence=2;
  }
  /* FAQ：>50% 子元素含 details/summary */
  else if(n>=2&&struct.childrenWithDetails>=Math.ceil(n*0.5)){
    pattern='faq';confidence=2;
  }
  /* 数据指标：>=3 子元素且 >60% 含大号数字 */
  else if(n>=3&&struct.childrenWithBigNum>=Math.ceil(n*0.6)){
    pattern='stat-counter';confidence=2;
  }
  /* 留言/评价：>=3 子元素，>50% 含头像 */
  else if(n>=3&&struct.childrenWithAvatar>=Math.ceil(n*0.5)){
    pattern='testimonial';confidence=2;
  }
  /* 特性列表：>=3 同构子元素，每个都有 img+text */
  else if(n>=3&&struct.childrenWithImg>=Math.ceil(n*0.7)&&struct.childrenWithText>=Math.ceil(n*0.7)){
    pattern='feature-list';confidence=2;
  }
  /* Hero：1-5 子元素，有标题+图+CTA */
  else if(n<=5&&hasHeading&&hasImg&&hasCTA){
    pattern='hero';confidence=2;
  }
  /* 卡片网格：>=3 同构、同尺寸子元素 */
  else if(n>=3&&(struct.uniformTag||similarSized)&&struct.childrenWithText>=Math.ceil(n*0.5)){
    pattern='card-grid';confidence=2;
  }
  /* 导航栏：NAV 标签或 role=navigation */
  else if(el.tagName==='NAV'||el.getAttribute('role')==='navigation'){
    pattern='nav-bar';confidence=2;
  }
  /* 页脚：FOOTER 标签 */
  else if(el.tagName==='FOOTER'||el.closest('footer')){
    pattern='footer';confidence=2;
  }

  /* class 名兜底（confidence=1） */
  if(confidence===0){
    if(/prize|lottery|grid-cell|bingo|九宫/i.test(fullCtx)) {pattern='prize-grid';confidence=1;}
    else if(/timeline|step|progress|phase/i.test(fullCtx)) {pattern='timeline';confidence=1;}
    else if(/faq|accordion|collapse|qa|question/i.test(fullCtx)) {pattern='faq';confidence=1;}
    else if(/tab|segment|switcher/i.test(fullCtx)) {pattern='tab-content';confidence=1;}
    else if(/stat|counter|metric|achievement/i.test(fullCtx)) {pattern='stat-counter';confidence=1;}
    else if(/testimonial|review|quote|comment|留言|msg/i.test(fullCtx)) {pattern='testimonial';confidence=1;}
    else if(/feature|benefit|advantage|highlight/i.test(fullCtx)) {pattern='feature-list';confidence=1;}
    else if(/form|login|register|subscribe/i.test(fullCtx)) {pattern='form-section';confidence=1;}
    else if(/cta|action|subscribe/i.test(fullCtx)&&hasCTA&&n<=3) {pattern='cta-section';confidence=1;}
    else if(hasList&&n<=4) {pattern='list-section';confidence=1;}
    else if((isHomogeneous||similarSized)&&n>=3) {pattern='card-grid';confidence=1;}
    else if(hasCTA&&!hasImg&&n<=3) {pattern='cta-section';confidence=1;}
  }

  /* ── 3. P3: 布局诊断 ── */
  var diagnostics=[];

  if(isOverflow) diagnostics.push({type:'overflow',desc:'子元素总宽超容器 '+Math.round((totalChildW/cW-1)*100)+'%',severity:'high'});

  /* 子元素重叠检测 */
  if(n>=2){
    var rects=children.map(function(c){return c.getBoundingClientRect();});
    var overlapCount=0;
    for(var i=0;i<rects.length;i++){
      for(var j=i+1;j<rects.length;j++){
        var a=rects[i],b=rects[j];
        if(a.right>b.left&&b.right>a.left&&a.bottom>b.top&&b.bottom>a.top){
          var overlapArea=(Math.min(a.right,b.right)-Math.max(a.left,b.left))*(Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
          var smallerArea=Math.min(a.width*a.height,b.width*b.height);
          if(smallerArea>0&&overlapArea/smallerArea>0.1) overlapCount++;
        }
      }
    }
    if(overlapCount>0) diagnostics.push({type:'overlap',desc:overlapCount+'对子元素重叠',severity:'high'});
  }

  /* 内容截断检测 */
  children.forEach(function(c,idx){
    if(c.scrollHeight>c.clientHeight+4){
      var ov=getComputedStyle(c).overflow;
      if(ov==='visible'||ov==='') diagnostics.push({type:'truncation',desc:'第'+(idx+1)+'个子元素内容被截断',severity:'medium'});
    }
  });

  /* 空白浪费检测 */
  if(n>=2){
    var containerArea=el.clientWidth*el.clientHeight;
    var childArea=0;
    children.forEach(function(c){childArea+=c.offsetWidth*c.offsetHeight;});
    if(containerArea>0){
      var utilization=childArea/containerArea;
      if(utilization<0.25&&el.clientHeight>200) diagnostics.push({type:'space-waste',desc:'空间利用率仅 '+Math.round(utilization*100)+'%',severity:'low'});
    }
  }

  /* frontend-animation-patterns.mdc: CSS 宽度链断裂检测 */
  if(cs.flexDirection==='column'&&(cs.alignItems==='center'||cs.alignItems==='flex-end')){
    children.forEach(function(c,idx){
      var ccs=getComputedStyle(c);
      if(c.scrollWidth>c.clientWidth+2&&ccs.overflowX!=='auto'&&ccs.overflowX!=='scroll'){
        diagnostics.push({type:'width-chain',desc:'第'+(idx+1)+'个子元素宽度收缩(flex-column+align-center)',severity:'high'});
      }
    });
  }

  /* ui-design-patterns.mdc: 左右布局失衡检测 */
  if(n===2&&(cs.display==='flex'||cs.display==='-webkit-flex')&&cs.flexDirection==='row'){
    var c0w=children[0].offsetWidth,c1w=children[1].offsetWidth;
    var c0h=children[0].scrollHeight,c1h=children[1].scrollHeight;
    if(c0w>0&&c1w>0){
      var widthRatio=Math.min(c0w,c1w)/Math.max(c0w,c1w);
      var heightDiff=Math.abs(c0h-c1h);
      if(widthRatio<0.35&&heightDiff>100){
        diagnostics.push({type:'layout-imbalance',desc:'左右布局失衡(窄侧'+ Math.round(widthRatio*100)+'%宽)',severity:'medium'});
      }
    }
  }

  /* rules.md R15: 触摸目标 <44px 检测 */
  children.forEach(function(c,idx){
    var tag=c.tagName;
    if(tag==='BUTTON'||tag==='A'||(tag==='INPUT'&&c.type!=='hidden')){
      var h=c.offsetHeight,w2=c.offsetWidth;
      if((h>0&&h<44)||(w2>0&&w2<44)){
        diagnostics.push({type:'touch-target',desc:'第'+(idx+1)+'个交互元素('+tag+')尺寸'+Math.round(w2)+'×'+Math.round(h)+'px<44px',severity:'high'});
      }
    }
    c.querySelectorAll('button,a,[role="button"],input:not([type="hidden"])').forEach(function(btn){
      var bh=btn.offsetHeight,bw=btn.offsetWidth;
      if(bh>0&&bh<44&&bw>0&&bw<44){
        diagnostics.push({type:'touch-target',desc:'子容器#'+(idx+1)+'内按钮尺寸'+Math.round(bw)+'×'+Math.round(bh)+'px<44px',severity:'medium'});
      }
    });
  });

  /* rules.md R10: 标题层级跳级检测 */
  var headingLevels=[];
  children.forEach(function(c){
    var hTag=c.tagName;
    if(/^H[1-6]$/.test(hTag)) headingLevels.push(parseInt(hTag[1]));
    c.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function(h){headingLevels.push(parseInt(h.tagName[1]));});
  });
  if(headingLevels.length>=2){
    headingLevels.sort(function(a,b){return a-b;});
    for(var hi=1;hi<headingLevels.length;hi++){
      if(headingLevels[hi]-headingLevels[hi-1]>1){
        diagnostics.push({type:'heading-skip',desc:'标题跳级 H'+headingLevels[hi-1]+'→H'+headingLevels[hi],severity:'medium'});
      }
    }
  }

  /* DT-layout: Grid vs Flex 误用检测 — 等分网格用了 flex 而非 grid */
  if(n>=3&&struct.uniformTag&&similarSized&&(cs.display==='flex'||cs.display==='-webkit-flex')&&cs.flexDirection==='row'){
    diagnostics.push({type:'flex-should-grid',desc:n+'个同构等宽子元素用了 flex，建议 grid',severity:'low'});
  }

  /* ui-design-patterns.mdc: 空间浪费时应放大核心元素而非加间距 */
  if(n>=1){
    var containerArea2=el.clientWidth*el.clientHeight;
    var childArea2=0;
    children.forEach(function(c){childArea2+=c.offsetWidth*c.offsetHeight;});
    if(containerArea2>0){
      var util2=childArea2/containerArea2;
      var hasTextContent=struct.childrenWithText>=1||struct.childrenWithHeading>=1||struct.childrenWithBigNum>=1;
      if(util2<0.4&&util2>0.1&&hasTextContent&&el.clientHeight>150){
        diagnostics.push({type:'space-enlarge',desc:'空间利用率'+Math.round(util2*100)+'%，有文本内容建议放大核心元素',severity:'low'});
      }
    }
  }

  return {
    childCount:n,children:children,hasImg:hasImg,hasText:hasText,hasHeading:hasHeading,hasCTA:hasCTA,
    hasInput:hasInput,hasTable:hasTable,hasAvatar:struct.childrenWithAvatar>0,
    isOverflow:isOverflow,isHomogeneous:isHomogeneous,similarSized:similarSized,
    pattern:pattern,confidence:confidence,struct:struct,diagnostics:diagnostics,
    currentDisplay:cs.display,containerW:cW,tagCounts:tagCounts,childAspects:childAspects
  };
}

/* ═══ SMART LAYOUT RECOMMENDATION ENGINE v3 ═══ */
function _getSmartLayoutRec(info,bp){
  var recs=[];
  var n=info.childCount;var w=bp.width;var sp=bp.space;var gapPx=sp.gap+'px';
  var bpKey=bp.bpKey;
  if(n===0) return [{name:'空容器 — 居中',icon:'◎',reason:'无子元素',css:{display:'flex',alignItems:'center',justifyContent:'center'}}];

  var P=_UC.patterns;

  switch(info.pattern){
    case 'hero':
      if(w>=768) recs.push({name:'Hero 双栏 (6:4)',icon:'◧',reason:'ui-craft Hero 规范',
        css:{display:'flex',flexDirection:'row',alignItems:'center',gap:P.hero.columnGap+'px',padding:P.hero.verticalPad+'px '+sp.sectionPad+'px'}});
      recs.push({name:'Hero 居中堆叠',icon:'↓',reason:w<768?'移动端 Hero':'备选',
        css:{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:sp.gap+'px',padding:(w<=375?40:P.hero.verticalPad)+'px '+sp.sectionPad+'px'}});
      break;

    case 'prize-grid':
      var pgCell=P.prizeGrid.cellSize[bpKey]||130;var pgGap=P.prizeGrid.gap[bpKey]||8;
      recs.push({name:'九宫格 3×3',icon:'▦',reason:'R14 九宫格规范',
        css:{display:'grid',gridTemplateColumns:'repeat(3,'+pgCell+'px)',gap:pgGap+'px',justifyContent:'center'}});
      recs.push({name:'自适应网格',icon:'▤',reason:'弹性宽度',
        css:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:pgGap+'px'}});
      break;

    case 'timeline':
      recs.push({name:'时间线纵向',icon:'│',reason:'R14 时间线',
        css:{display:'flex',flexDirection:'column',gap:P.timeline.gap+'px',paddingLeft:sp.sectionPad+'px',paddingRight:sp.sectionPad+'px'}});
      if(w>=768) recs.push({name:'时间线交替',icon:'⇆',reason:'桌面端左右交替',
        css:{display:'flex',flexDirection:'column',gap:P.timeline.gap+'px',alignItems:'center'}});
      break;

    case 'faq':
      recs.push({name:'FAQ 列表',icon:'≡',reason:'折叠面板垂直排列',
        css:{display:'flex',flexDirection:'column',gap:P.faq.gap+'px'}});
      break;

    case 'tab-content':
      recs.push({name:'Tab 全宽堆叠',icon:'▭',reason:'内容区撑满',
        css:{display:'flex',flexDirection:'column',gap:sp.gap+'px',width:'100%'}});
      break;

    case 'stat-counter':
      var statCols=w<=375?2:Math.min(n,4);
      recs.push({name:'数据指标 '+statCols+'列',icon:'#',reason:'R14 指标区',
        css:{display:'grid',gridTemplateColumns:'repeat('+statCols+',1fr)',gap:P.statCounter.gap+'px',textAlign:'center'}});
      recs.push({name:'指标横排',icon:'→',reason:'紧凑排列',
        css:{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start',flexWrap:'wrap',gap:sp.gap+'px'}});
      break;

    case 'testimonial':
      var tesCols=w<=375?1:w<=768?2:Math.min(n,3);
      recs.push({name:'留言瀑布流 '+tesCols+'栏',icon:'▤',reason:'R14 留言板',
        css:{display:'grid',gridTemplateColumns:'repeat('+tesCols+',1fr)',gap:P.testimonial.gap+'px'}});
      if(n>4) recs.push({name:'留言列表',icon:'↓',reason:'纵向滚动',
        css:{display:'flex',flexDirection:'column',gap:P.testimonial.gap+'px',maxHeight:'400px',overflowY:'auto'}});
      break;

    case 'feature-list':
      var fCols=w<=375?1:w<=768?2:Math.min(n,3);
      recs.push({name:'特性网格 '+fCols+'栏',icon:'▤',reason:'图文并茂',
        css:{display:'grid',gridTemplateColumns:'repeat('+fCols+',1fr)',gap:P.featureList.gap+'px'}});
      break;

    case 'form-section':
      recs.push({name:'表单居中',icon:'◎',reason:'R14 表单区',
        css:{display:'flex',flexDirection:'column',alignItems:'center',gap:P.formSection.gap+'px',maxWidth:P.formSection.maxWidth+'px',marginLeft:'auto',marginRight:'auto'}});
      break;

    case 'card-grid':
      var cols=Math.min(n,bp.maxCols);
      recs.push({name:'卡片网格 '+cols+'栏',icon:'▤',reason:'R14 断点适配 '+n+'项',
        css:{display:'grid',gridTemplateColumns:'repeat('+cols+',1fr)',gap:P.cardGrid.colGap+'px'}});
      if(cols>1) recs.push({name:'卡片列表',icon:'↓',reason:'安全回退',
        css:{display:'flex',flexDirection:'column',gap:P.cardGrid.rowGap+'px'}});
      break;

    case 'cta-section':
      recs.push({name:'CTA 居中',icon:'◎',reason:'ui-craft CTA区',
        css:{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:P.ctaSection.buttonGap+'px',padding:P.ctaSection.verticalPad+'px '+sp.sectionPad+'px'}});
      break;

    case 'list-section':
      /* ui-design-patterns.mdc: 列表自适应布局 <=4单列/5-10双列/>10双列+分页提示 */
      var LA=_UC.listAdaptive;
      if(n<=LA.singleMax){
        recs.push({name:'列表单列',icon:'≡',reason:n+'项单列最清晰',
          css:{display:'flex',flexDirection:'column',gap:P.listSection.gap+'px'}});
      } else if(n<=LA.doubleMax){
        var listCols=w<=375?1:2;
        recs.push({name:'列表'+listCols+'栏',icon:listCols===1?'≡':'▥',reason:n+'项自适应',
          css:{display:'grid',gridTemplateColumns:listCols===1?'1fr':'1fr 1fr',gap:P.listSection.gap+'px'}});
      } else {
        recs.push({name:'列表双栏',icon:'▥',reason:n+'项(建议分页每页'+LA.pageSize+'条)',
          css:{display:'grid',gridTemplateColumns:w<=375?'1fr':'1fr 1fr',gap:P.listSection.gap+'px'}});
      }
      break;

    case 'nav-bar':
      recs.push({name:'导航横排',icon:'→',reason:'导航栏规范',
        css:{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:sp.gap+'px'}});
      break;

    case 'footer':
      if(w>=768) recs.push({name:'页脚多栏',icon:'▤',reason:'桌面端页脚',
        css:{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:sp.gap+'px',padding:sp.sectionPad+'px'}});
      recs.push({name:'页脚堆叠',icon:'↓',reason:w<768?'移动端页脚':'备选',
        css:{display:'flex',flexDirection:'column',gap:sp.gap+'px',padding:sp.sectionPad+'px'}});
      break;
  }

  /* 通用补充（不足3条时） */
  if(recs.length<3){
    if(w<=375){
      if(!recs.length) recs.push({name:'纵向堆叠',icon:'↓',reason:'R14 移动端首选',css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:gapPx}});
      if(n===2&&recs.length<3) recs.push({name:'横向两列',icon:'→',reason:'2项可并排',css:{display:'flex',flexDirection:'row',alignItems:'center',gap:(sp.gap-4)+'px',flexWrap:'wrap'}});
    } else if(w<=768){
      if(n>=3&&!recs.some(function(r){return /两栏|网格/.test(r.name);})){
        recs.push({name:'等分两栏',icon:'▥',reason:n+'项平板适配',css:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:gapPx}});
      }
      if(recs.length<3) recs.push({name:'纵向堆叠',icon:'↓',reason:'安全回退',css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:gapPx}});
    } else {
      if(n>=4&&!recs.some(function(r){return /栏/.test(r.name);})){
        recs.push({name:'等分'+Math.min(n,4)+'栏',icon:'▤',reason:n+'项均分',css:{display:'grid',gridTemplateColumns:'repeat('+Math.min(n,4)+',1fr)',gap:P.cardGrid.colGap+'px'}});
      }
      if(n===3&&recs.length<3) recs.push({name:'等分三栏',icon:'▤',reason:'3项经典',css:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:P.cardGrid.colGap+'px'}});
      if(n===2&&recs.length<3) recs.push({name:'等分两栏',icon:'▥',reason:'2项均分',css:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:P.cardGrid.colGap+'px'}});
      if(n>=2&&recs.length<3) recs.push({name:'两端对齐',icon:'⟷',reason:'内容分散',css:{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap'}});
    }
  }

  /* P3: 诊断驱动的紧急推荐（置顶） */
  if(info.diagnostics){
    info.diagnostics.forEach(function(d){
      if(d.type==='overflow') recs.unshift({name:'修复溢出',icon:'⚠',reason:d.desc,css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:gapPx,flexWrap:'wrap'}});
      if(d.type==='overlap'&&!recs.some(function(r){return /修复/.test(r.name);})){
        recs.unshift({name:'修复重叠',icon:'⚠',reason:d.desc,css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:gapPx}});
      }
      if(d.type==='width-chain'){
        recs.unshift({name:'修复宽度收缩',icon:'⚠',reason:d.desc,css:{alignItems:'stretch'}});
      }
      if(d.type==='layout-imbalance'){
        recs.unshift({name:'改纵向堆叠',icon:'↓',reason:d.desc,css:{display:'flex',flexDirection:'column',alignItems:'stretch',gap:gapPx}});
      }
      /* DT-layout: flex→grid 推荐 */
      if(d.type==='flex-should-grid'){
        var gc=Math.min(n,bp.maxCols);
        recs.unshift({name:'改用 Grid '+gc+'栏',icon:'▤',reason:d.desc,css:{display:'grid',gridTemplateColumns:'repeat('+gc+',1fr)',gap:P.cardGrid.colGap+'px'}});
      }
    });
  }

  /* ── C: 反馈学习权重调整 ── */
  var feedbackData=_readFeedback();
  if(feedbackData&&recs.length>1){
    var pat=info.pattern;var bk=bp.bpKey;
    recs.forEach(function(r){
      var key=pat+'|'+bk+'|'+r.name;
      var fb=feedbackData[key];
      if(fb){
        r._score=(fb.accept||0)-((fb.revert||0)*2);
      } else {
        r._score=0;
      }
    });
    recs.sort(function(a,b){
      var aFix=a.name.indexOf('修复')===0?1:0;
      var bFix=b.name.indexOf('修复')===0?1:0;
      if(aFix!==bFix) return bFix-aFix;
      return (b._score||0)-(a._score||0);
    });
  }

  return recs.slice(0,3);
}

/* ═══ FEEDBACK LEARNING SYSTEM (方向C) ═══ */
var _FB_KEY='__tk_smart_feedback';
function _readFeedback(){
  try{var raw=W.localStorage.getItem(_FB_KEY);return raw?JSON.parse(raw):{};}catch(e){return {};}
}
function _writeFeedback(pattern,bpKey,recName,accepted){
  var data=_readFeedback();
  var key=pattern+'|'+bpKey+'|'+recName;
  if(!data[key]) data[key]={accept:0,revert:0};
  if(accepted) data[key].accept++;
  else data[key].revert++;
  try{W.localStorage.setItem(_FB_KEY,JSON.stringify(data));}catch(e){}
}

/* ═══ EXPORTS ═══ */
T._UC=_UC;
T._getBPInfo=_getBPInfo;
T._makeRecBtn=_makeRecBtn;
T._makeBPTag=_makeBPTag;
T._analyzeModule=_analyzeModule;
T._getSmartLayoutRec=_getSmartLayoutRec;
T._writeFeedback=_writeFeedback;
T._readFeedback=_readFeedback;

})(window,document);
