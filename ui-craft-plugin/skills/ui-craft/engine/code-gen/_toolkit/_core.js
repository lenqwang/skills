/**
 * UI Craft Design Toolkit — _core.js
 * 共享配置、CSS变量探测、工具函数
 */
;(function(W,D){'use strict';

var T = W.__TK = W.__TK || {};
T.W = W; T.D = D;

/* ═══ CONFIG ═══ */
var CFG = W.__TOOLKIT__ || {};
T.CFG = CFG;
var _presets = {};
if(CFG.presets) Object.keys(CFG.presets).forEach(function(k){ _presets[k]=CFG.presets[k]; });
T._presets = _presets;

var LABELS = {
  '--c-txt':'主文字','--c-txt-s':'次级文字','--c-txt-m':'辅助文字',
  '--c-gold':'金色','--c-gold-20':'金色 20%',
  '--c-surface':'表面色','--c-surface-d':'深表面色','--c-surface-dd':'最深表面色',
  '--c-border':'边框色','--c-divider':'分隔线',
  '--c-table-border':'表格主边框','--c-table-border-s':'表格次边框',
  '--f-h1':'H1 标题','--f-h2':'H2 标题','--f-h3':'H3 标题','--f-h4':'H4 标题','--f-body':'正文','--f-sm':'小字','--f-xs':'注释',
  '--r-card':'卡片','--r-inner':'内层圆角','--r-sm':'小圆角','--r-pill':'药丸圆角','--r-countdown':'倒计时',
  '--s-section':'模块间距','--s-block':'区块间距','--s-element':'元素间距','--s-inline':'行内间距','--s-tight':'紧凑间距',
  '--w-content':'内容最大宽度'
};
T.LABELS = LABELS;

var COMP_LABELS = {
  'layout':'页面布局','banner':'Banner 横幅','activitySummary':'活动摘要',
  'activityCard':'活动卡片','taskCard':'任务卡片','activityRule':'活动规则'
};
var COMP_FIELD_LABELS = {
  'bg':'背景','titleColor':'标题色','subtitleColor':'副标题色',
  'containerBg':'容器背景','buttonBg':'按钮背景','buttonText':'按钮文字',
  'buttonDisabledText':'按钮禁用文字','buttonDisabledBg':'按钮禁用背景',
  'iconButtonBg':'图标按钮底色','iconButtonColor':'图标按钮色','iconButtonBorder':'图标按钮边框',
  'countdownTitleColor':'倒计时标题色','countdownTimeBg':'倒计时背景',
  'countdownTimeColor':'倒计时文字色','countdownDelimiterColor':'倒计时分隔符',
  'activityTimeColor':'活动时间色',
  'marqueeBg':'跑马灯背景','marqueeNameColor':'跑马灯姓名色','marqueeTextColor':'跑马灯文字色',
  'tableTextColor':'表格文字色','tableBorderColor':'表格边框色','collapseColor':'折叠文字色',
  'sectionTitleColor':'大标题色','descColor':'描述色',
  'tagColor':'标签色','tagBorderColor':'标签边框色',
  'progressColor':'进度条','progressTrackColor':'进度条轨道',
  'infoIconColor':'信息图标色',
  'dailyTodayBg':'签到当天底色','dailyTodayColor':'签到当天文字',
  'dailyPastColor':'签到已过色','dailyPastBg':'签到已过底色','dailyFutureColor':'签到未来色',
  'progressStepHighlightColor':'进度高亮','progressStepActiveColor':'进度激活','progressStepDisabledColor':'进度未激活',
  'contentColor':'内容色'
};
T.COMP_LABELS = COMP_LABELS;
T.COMP_FIELD_LABELS = COMP_FIELD_LABELS;

var _EXTRA_LABELS = {
  'lot':{
    '--c-lot-gold':'抽奖装饰金','--c-lot-btn':'抽奖按钮','--c-lot-btn-bd':'抽奖按钮边框','--c-lot-txt':'抽奖文字','--c-lot-prize':'奖品区背景','--c-lot-arrow':'箭头色'
  },
  'mac':{
    '--c-mac-frame':'机器外框','--c-mac-frame-dk':'外框暗部','--c-mac-inner':'机器内壁','--c-mac-inner-dk':'内壁暗部','--c-mac-top':'顶部栏','--c-mac-claw':'爪子','--c-mac-box':'盒子正面','--c-mac-box-dk':'盒子暗边','--c-mac-box-side':'盒子侧面','--c-mac-mark':'问号/标记','--c-mac-belt':'传送带','--c-mac-belt-dk':'传送带暗部','--c-mac-roller':'滚轮','--c-mac-roller-dk':'滚轮暗部','--c-mac-floor':'地板','--c-mac-sparkle':'闪光粒子'
  }
};
T._EXTRA_LABELS = _EXTRA_LABELS;
if(CFG.extraLabels) Object.keys(CFG.extraLabels).forEach(function(k){ if(!LABELS[k]) LABELS[k]=CFG.extraLabels[k]; });

var _EXTRA_CMAP = {
  'banner':{
    '--layout-bg':'layout.bg',
    '--banner-titleColor':'banner.titleColor','--banner-subtitleColor':'banner.subtitleColor',
    '--banner-buttonBg':'banner.buttonBg','--banner-buttonText':'banner.buttonText','--banner-buttonDisabledText':'banner.buttonDisabledText',
    '--banner-iconButtonBg':'banner.iconButtonBg','--banner-iconButtonColor':'banner.iconButtonColor','--banner-iconButtonBorder':'banner.iconButtonBorder',
    '--banner-countdownTitleColor':'banner.countdownTitleColor','--banner-countdownTimeBg':'banner.countdownTimeBg',
    '--banner-countdownTimeColor':'banner.countdownTimeColor','--banner-countdownDelimiterColor':'banner.countdownDelimiterColor',
    '--banner-activityTimeColor':'banner.activityTimeColor',
    '--banner-marqueeBg':'banner.marqueeBg','--banner-marqueeNameColor':'banner.marqueeNameColor','--banner-marqueeTextColor':'banner.marqueeTextColor'
  },
  'summary':{
    '--activitySummary-containerBg':'activitySummary.containerBg','--activitySummary-titleColor':'activitySummary.titleColor','--activitySummary-subtitleColor':'activitySummary.subtitleColor'
  },
  'acard':{
    '--activityCard-containerBg':'activityCard.containerBg','--activityCard-titleColor':'activityCard.titleColor','--activityCard-subtitleColor':'activityCard.subtitleColor',
    '--activityCard-tableTextColor':'activityCard.tableTextColor','--activityCard-tableBorderColor':'activityCard.tableBorderColor',
    '--activityCard-buttonBg':'activityCard.buttonBg','--activityCard-buttonText':'activityCard.buttonText','--activityCard-collapseColor':'activityCard.collapseColor'
  },
  'task':{
    '--taskCard-sectionTitleColor':'taskCard.sectionTitleColor','--taskCard-titleColor':'taskCard.titleColor','--taskCard-descColor':'taskCard.descColor',
    '--taskCard-containerBg':'taskCard.containerBg','--taskCard-tagColor':'taskCard.tagColor','--taskCard-tagBorderColor':'taskCard.tagBorderColor',
    '--taskCard-buttonBg':'taskCard.buttonBg','--taskCard-buttonDisabledBg':'taskCard.buttonDisabledBg','--taskCard-buttonText':'taskCard.buttonText',
    '--taskCard-buttonDisabledText':'taskCard.buttonDisabledText',
    '--taskCard-progressColor':'taskCard.progressColor','--taskCard-progressTrackColor':'taskCard.progressTrackColor',
    '--taskCard-infoIconColor':'taskCard.infoIconColor',
    '--taskCard-dailyTodayBg':'taskCard.dailyTodayBg','--taskCard-dailyTodayColor':'taskCard.dailyTodayColor',
    '--taskCard-dailyPastColor':'taskCard.dailyPastColor','--taskCard-dailyPastBg':'taskCard.dailyPastBg','--taskCard-dailyFutureColor':'taskCard.dailyFutureColor',
    '--taskCard-progressStepHighlightColor':'taskCard.progressStepHighlightColor',
    '--taskCard-progressStepActiveColor':'taskCard.progressStepActiveColor',
    '--taskCard-progressStepDisabledColor':'taskCard.progressStepDisabledColor'
  },
  'rule':{
    '--activityRule-titleColor':'activityRule.titleColor','--activityRule-contentColor':'activityRule.contentColor'
  }
};
T._EXTRA_CMAP = _EXTRA_CMAP;

var COMPONENT_MAP = {};
var COMPONENT_MAP_REV = {};
T.COMPONENT_MAP = COMPONENT_MAP;
T.COMPONENT_MAP_REV = COMPONENT_MAP_REV;

var SUFFIXES = {r:'px',s:'px',b:'%',f:'px',w:'px'};
var SEC_LABELS = {c:'颜色 Color',g:'渐变 Gradient',f:'字号 Font',r:'圆角 Radius',s:'间距 Spacing',b:'边框 Border',w:'宽度 Width'};
T.SUFFIXES = SUFFIXES;
T.SEC_LABELS = SEC_LABELS;

/* ═══ CSS VARIABLE HELPERS ═══ */
function getVar(v){return getComputedStyle(D.documentElement).getPropertyValue(v).trim();}
function setVar(v,val){D.documentElement.style.setProperty(v,val);}
W.getVar=getVar; W.setVar=setVar;
T.getVar = getVar; T.setVar = setVar;

/* ═══ AUTO-DETECT :root VARIABLES ═══ */
var _vars={}, _defaultSnap={};
T._vars = _vars;
T._defaultSnap = _defaultSnap;

function detectRootVars(){
  Object.keys(_vars).forEach(function(k){delete _vars[k];});
  D.querySelectorAll('style').forEach(function(s){
    var re=/:root\s*\{([^}]+)\}/g, m;
    while((m=re.exec(s.textContent))!==null){
      var re2=/(--[\w-]+)\s*:\s*([^;]+)/g, r;
      while((r=re2.exec(m[1]))!==null) _vars[r[1]]=r[2].trim();
    }
  });
  Object.keys(_EXTRA_LABELS).forEach(function(grp){
    var map=_EXTRA_LABELS[grp], hit=false;
    Object.keys(map).forEach(function(k){ if(_vars[k]) hit=true; });
    if(hit){ Object.keys(map).forEach(function(k){ if(!LABELS[k]) LABELS[k]=map[k]; }); }
  });
  Object.keys(_EXTRA_CMAP).forEach(function(grp){
    var map=_EXTRA_CMAP[grp], hit=false;
    Object.keys(map).forEach(function(k){ if(_vars[k]) hit=true; });
    if(hit){ Object.keys(map).forEach(function(k){ COMPONENT_MAP[k]=map[k]; }); }
  });
  COMPONENT_MAP_REV={};
  Object.keys(COMPONENT_MAP).forEach(function(k){ COMPONENT_MAP_REV[COMPONENT_MAP[k]]=k; });
  T.COMPONENT_MAP_REV = COMPONENT_MAP_REV;
  Object.keys(_defaultSnap).forEach(function(k){delete _defaultSnap[k];});
  _defaultSnap.name='Default';
  Object.keys(_vars).forEach(function(k){_defaultSnap[k]=_vars[k];});
  if(Object.keys(_presets).length===0) _presets['default']=_defaultSnap;
  T._vars = _vars;
  T._defaultSnap = _defaultSnap;
}
T.detectRootVars = detectRootVars;

function categorizeVars(){
  var secs={}, order=[];
  var stdPrefixes={c:1,g:1,f:1,r:1,s:1,b:1,w:1};
  Object.keys(_vars).forEach(function(k){
    var val=_vars[k];
    if(!val||val==='') return;
    var m=k.match(/^--([\w]+?)-/);
    var prefix=m?m[1]:'';
    var isSingleCharStd=(prefix.length===1&&stdPrefixes[prefix]);
    var grpKey, grpLabel;
    if(isSingleCharStd){
      grpKey=prefix; grpLabel=SEC_LABELS[prefix]||prefix.toUpperCase();
    } else {
      grpKey=prefix||'other';
      grpLabel=COMP_LABELS[prefix]||prefix;
    }
    if(!secs[grpKey]){secs[grpKey]={section:grpLabel,fields:[],isComponent:!isSingleCharStd};order.push(grpKey);}
    var isHex=/^#[0-9a-fA-F]{3,8}$/.test(val);
    var isColor=isHex||/^rgba?\(/.test(val);
    var isGradient=/^linear-gradient|^radial-gradient/.test(val);
    var isNum=/^\d/.test(val)&&/px|em|rem|%$/.test(val);
    var type='text';
    if(isSingleCharStd){
      if(prefix==='c'||(prefix==='g'&&isHex))type='color';
      else if('rsbfw'.indexOf(prefix)>=0)type='num';
    } else {
      if(isColor)type='color';
      else if(isGradient)type='text';
      else if(isNum)type='num';
    }
    var fieldName=k.replace(/^--[\w]+-/,'');
    var label=LABELS[k]||COMP_FIELD_LABELS[fieldName]||fieldName;
    secs[grpKey].fields.push({v:k, label:label, type:type, suffix:isSingleCharStd?(SUFFIXES[prefix]||''):''});
  });
  var compOrder=[], stdOrder=[];
  order.forEach(function(k){
    if(secs[k].isComponent) compOrder.push(k);
    else stdOrder.push(k);
  });
  return{secs:secs,order:compOrder.concat(stdOrder)};
}
T.categorizeVars = categorizeVars;

/* ═══ THEME COLOR CACHE ═══ */
var C={};
function refreshC(){
  var s=getComputedStyle(D.documentElement);
  Object.keys(_vars).forEach(function(k){
    if(k.indexOf('--c-')!==0)return;
    var n=k.replace(/^--c-/,'').replace(/-([a-z])/g,function(_,c){return c.toUpperCase();});
    C[n]=s.getPropertyValue(k).trim();
  });
}
W.C=C; W.refreshC=refreshC;
T.C = C; T.refreshC = refreshC;

/* ═══ UTILITY FUNCTIONS ═══ */
function tkEscHtml(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
T.tkEscHtml = tkEscHtml;

function tkCopy(text,msg){
  function fallback(){
    var ta=D.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;left:-9999px;top:-9999px';
    D.body.appendChild(ta);ta.select();
    try{D.execCommand('copy');alert(msg);}catch(e){prompt('复制失败，请手动复制：',text);}
    D.body.removeChild(ta);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){alert(msg);},fallback);
  }else{fallback();}
}
T.tkCopy = tkCopy;

function insRgbToHex(rgb){
  if(!rgb||rgb==='transparent'||rgb.indexOf('rgb')<0) return rgb;
  var m=rgb.match(/\d+/g);
  if(!m||m.length<3) return rgb;
  return '#'+m.slice(0,3).map(function(n){return ('0'+parseInt(n).toString(16)).slice(-2);}).join('').toUpperCase();
}
T.insRgbToHex = insRgbToHex;

function insHexLum(hex){
  if(!hex||hex.length<7) return 0;
  var r=parseInt(hex.substr(1,2),16)/255,g=parseInt(hex.substr(3,2),16)/255,b=parseInt(hex.substr(5,2),16)/255;
  return 0.299*r+0.587*g+0.114*b;
}
T.insHexLum = insHexLum;

function getSelector(el){
  if(el.id && el.id.indexOf('tk-')!==0) return '#'+el.id;
  var parts=[];
  while(el && el!==D.body && el!==D.documentElement){
    if(el.id && el.id.indexOf('tk-')!==0){parts.unshift('#'+el.id);break;}
    var tag=el.tagName.toLowerCase();
    var cls=Array.from(el.classList).filter(function(c){return c.indexOf('tk-')!==0 && c.indexOf('ins-')!==0;}).slice(0,2).join('.');
    var seg=cls?tag+'.'+cls:tag;
    var sib=el.parentElement?Array.from(el.parentElement.children).filter(function(c){return c.tagName===el.tagName;}):[];
    if(sib.length>1) seg+=':nth-child('+(Array.from(el.parentElement.children).indexOf(el)+1)+')';
    parts.unshift(seg);
    el=el.parentElement;
  }
  return parts.join(' > ');
}
T.getSelector = getSelector;

function isToolkitEl(el){
  while(el){
    if(el.id && (el.id.indexOf('tk-')===0 || el.id.indexOf('ins-')===0)) return true;
    if(el.className && typeof el.className==='string'){
      var cls=el.className.split(/\s+/);
      for(var i=0;i<cls.length;i++){
        if(cls[i].indexOf('tk-')===0 || cls[i].indexOf('ins-')===0) return true;
      }
    }
    el=el.parentElement;
  }
  return false;
}
T.isToolkitEl = isToolkitEl;

function getElRect(el){
  var r=el.getBoundingClientRect();
  return {top:r.top+W.scrollY,left:r.left+W.scrollX,width:r.width,height:r.height};
}
T.getElRect = getElRect;

/* ═══ SHOWCASE REGISTER (must exist early) ═══ */
var SC=[];
T.SC = SC;
W.scRegister=function(t,items,opts){
  SC.push({title:t,id:(opts&&opts.id)||t,items:items,cols:(opts&&opts.cols)||1});
};
if(W._scQueue){W._scQueue.forEach(function(a){W.scRegister(a[0],a[1],a[2]);});delete W._scQueue;}

/* ═══ INSPECTOR SHARED STATE ═══ */
T.INS = {
  on: false, hoverEl: null, selections: [], annotations: [], annId: 0,
  hlBox: null, popEl: null, panelOpen: false, infoEl: null, infoRAF: 0, navEl: null,
  typeBadge: null, layerPicker: null, ctxBar: null, inlineEditing: false,
  colorPicker: null, action: 'modify', attachedImage: null,
  pinnedBoxes: [], badges: [],
  ssActive: false, ssOverlay: null
};

/* ═══ DRAG SHARED STATE ═══ */
T.DRAG = {
  undo: [], hintEl: null
};

/* ═══ SNAP SHARED STATE ═══ */
T.SNAP = {
  guides: [], distEls: [], container: null, THRESHOLD: 6
};

})(window,document);
