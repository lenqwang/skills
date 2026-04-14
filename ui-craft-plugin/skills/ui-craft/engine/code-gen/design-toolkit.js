/**
 * UI Craft Design Toolkit — 模块化入口
 * 任意 HTML 页面引入此脚本即可获得：设计面板 / 组件总览 / 主题导入导出
 * 用法：<script src="design-toolkit.js"></script>
 *
 * 可选 window.__TOOLKIT__.autoOverlaySelectors / autoHiddenSelectors（字符串数组）
 * 覆盖组件总览里「自动发现」的 querySelector 列表；元素可加 data-tk-skip-discover="1" 排除。
 */
;(function(W,D){
  var base = (D.currentScript ? D.currentScript.src : '').replace(/[^\/]*$/, '') + '_toolkit/';
  var modules = [
    '_core',
    '_showcase',
    '_design-panel',
    '_dom',
    '_smart-layout',
    '_inspector',
    '_drag',
    '_persistence',
    '_screenshot',
    '_snap',
    '_misc'
  ];
  var _tkVer = 2;
  modules.forEach(function(m){
    var s = D.createElement('script');
    s.src = base + m + '.js?v=' + _tkVer;
    s.async = false;
  D.head.appendChild(s);
  });
})(window,document);
