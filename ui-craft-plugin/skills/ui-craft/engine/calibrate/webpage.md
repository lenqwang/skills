# 网页 URL 分析指南

通过抓取网页提取设计特征，反哺 Token 体系。

## 分析流程

### 1. 页面抓取

使用工具抓取网页内容：
- HTML 结构
- CSS 样式
- 计算后样式

### 2. 样式提取

从计算样式中提取：
- 颜色值（color, background-color, border-color）
- 间距值（margin, padding, gap）
- 圆角值（border-radius）
- 字体值（font-size, font-weight, line-height）

### 3. 组件识别

识别常见组件：
- 按钮
- 卡片
- 输入框
- 导航
- 列表

### 4. 模式归纳

归纳设计模式：
- 颜色使用规律
- 间距规律
- 排版层次

## 输出格式

同截图分析指南。

## 注意事项

- 动态内容可能影响分析准确性
- 需要登录的页面无法抓取
- CDN 资源可能有跨域限制
