;(function(W,D){'use strict';
var T=W.__TK;
var isToolkitEl=T.isToolkitEl;

/* ═══ SNAP GUIDES (integrated into annotation drag) ═══ */
function snapGetSiblings(dragEl){
  var parent=dragEl.parentNode;
  if(!parent) return [];
  var rects=[];
  var children=parent.children;
  for(var i=0;i<children.length;i++){
    var sib=children[i];
    if(sib===dragEl||isToolkitEl(sib)) continue;
    var r=sib.getBoundingClientRect();
    if(r.width<4||r.height<4) continue;
    rects.push({el:sib,left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom,cx:r.left+r.width/2,cy:r.top+r.height/2});
  }
  return rects;
}

function snapCalc(dragEl,others){
  var r=dragEl.getBoundingClientRect();
  var dr={left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom,cx:r.left+r.width/2,cy:r.top+r.height/2};
  var dw=dr.width, dh=dr.height;
  var guides=[];
  var dists=[];
  var snapDx=0, snapDy=0;
  var bestDx=T.SNAP.THRESHOLD+1, bestDy=T.SNAP.THRESHOLD+1;

  others.forEach(function(or){
    var xPairs=[
      [dr.left,or.left,0],[dr.right,or.right,dw],
      [dr.left,or.right,0],[dr.right,or.left,dw],
      [dr.cx,or.cx,dw/2]
    ];
    var yPairs=[
      [dr.top,or.top,0],[dr.bottom,or.bottom,dh],
      [dr.top,or.bottom,0],[dr.bottom,or.top,dh],
      [dr.cy,or.cy,dh/2]
    ];
    xPairs.forEach(function(p){
      var diff=Math.abs(p[0]-p[1]);
      if(diff<=T.SNAP.THRESHOLD){
        if(diff<bestDx){bestDx=diff;snapDx=p[1]-p[0];}
        var y1=Math.min(dr.top,or.top),y2=Math.max(dr.bottom,or.bottom);
        guides.push({axis:'x',val:p[1],y1:y1,y2:y2,snap:true});
      }
    });
    yPairs.forEach(function(p){
      var diff=Math.abs(p[0]-p[1]);
      if(diff<=T.SNAP.THRESHOLD){
        if(diff<bestDy){bestDy=diff;snapDy=p[1]-p[0];}
        var x1=Math.min(dr.left,or.left),x2=Math.max(dr.right,or.right);
        guides.push({axis:'y',val:p[1],x1:x1,x2:x2,snap:true});
      }
    });

    var hOv=Math.min(dr.right,or.right)-Math.max(dr.left,or.left);
    var vOv=Math.min(dr.bottom,or.bottom)-Math.max(dr.top,or.top);
    if(hOv>0){
      var mx1=Math.max(dr.left,or.left),mx2=Math.min(dr.right,or.right);
      var gU=dr.top-or.bottom, gD=or.top-dr.bottom;
      if(gU>0) dists.push({dir:'v',val:Math.round(gU),lineX:Math.round((mx1+mx2)/2),y1:or.bottom,y2:dr.top});
      if(gD>0) dists.push({dir:'v',val:Math.round(gD),lineX:Math.round((mx1+mx2)/2),y1:dr.bottom,y2:or.top});
    }
    if(vOv>0){
      var my1=Math.max(dr.top,or.top),my2=Math.min(dr.bottom,or.bottom);
      var gL=dr.left-or.right, gR=or.left-dr.right;
      if(gL>0) dists.push({dir:'h',val:Math.round(gL),lineY:Math.round((my1+my2)/2),x1:or.right,x2:dr.left});
      if(gR>0) dists.push({dir:'h',val:Math.round(gR),lineY:Math.round((my1+my2)/2),x1:dr.right,x2:or.left});
    }
  });

  return {snapDx:bestDx<=T.SNAP.THRESHOLD?snapDx:0, snapDy:bestDy<=T.SNAP.THRESHOLD?snapDy:0, guides:guides, dists:dists};
}

function snapGetContainer(){
  if(!T.SNAP.container||!T.SNAP.container.parentNode){
    T.SNAP.container=D.createElement('div');
    T.SNAP.container.id='tk-snap-guides';
    T.SNAP.container.style.cssText='position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:10290';
    D.body.appendChild(T.SNAP.container);
  }
  return T.SNAP.container;
}

function snapClear(){
  T.SNAP.guides.forEach(function(el){if(el.parentNode)el.parentNode.removeChild(el);});
  T.SNAP.guides=[];
  T.SNAP.distEls.forEach(function(el){if(el.parentNode)el.parentNode.removeChild(el);});
  T.SNAP.distEls=[];
}

function snapMkEl(cls,styles){
  var c=snapGetContainer();
  var el=D.createElement('div');el.className=cls;
  for(var k in styles) el.style[k]=styles[k];
  c.appendChild(el);return el;
}

function snapRender(guides,dists){
  snapClear();
  var seen={};
  guides.forEach(function(g){
    var key=g.axis+'_'+Math.round(g.val);
    if(seen[key]) return;
    seen[key]=true;
    if(g.axis==='x'){
      var el=snapMkEl('tk-guide tk-guide-v snap',{left:g.val+'px',top:g.y1+'px',height:Math.max(1,Math.round(g.y2-g.y1))+'px'});
      T.SNAP.guides.push(el);
    } else {
      var el=snapMkEl('tk-guide tk-guide-h snap',{top:g.val+'px',left:g.x1+'px',width:Math.max(1,Math.round(g.x2-g.x1))+'px'});
      T.SNAP.guides.push(el);
    }
  });
  dists.forEach(function(d){
    var snap=d.snap?true:false;
    var lc='tk-dist-line'+(snap?' snap':'');
    var dc='tk-dist-label'+(snap?' snap':'');
    if(d.dir==='v'){
      var t=Math.min(d.y1,d.y2), h=Math.abs(d.y2-d.y1);
      T.SNAP.distEls.push(snapMkEl(lc+' tk-dist-line-v',{left:d.lineX+'px',top:t+'px',height:Math.max(1,h)+'px'}));
      var label=snapMkEl(dc,{left:(d.lineX+8)+'px',top:Math.round(t+h/2-10)+'px'});
      label.textContent=d.val+'px';
      T.SNAP.distEls.push(label);
    } else {
      var l=Math.min(d.x1,d.x2), w=Math.abs(d.x2-d.x1);
      T.SNAP.distEls.push(snapMkEl(lc+' tk-dist-line-h',{top:d.lineY+'px',left:l+'px',width:Math.max(1,w)+'px'}));
      var label=snapMkEl(dc,{left:Math.round(l+w/2-16)+'px',top:(d.lineY-18)+'px'});
      label.textContent=d.val+'px';
      T.SNAP.distEls.push(label);
    }
  });
}



T.snapGetSiblings=snapGetSiblings; T.snapCalc=snapCalc;
T.snapClear=snapClear; T.snapRender=snapRender;
T.snapGetContainer=snapGetContainer;

})(window,document);
