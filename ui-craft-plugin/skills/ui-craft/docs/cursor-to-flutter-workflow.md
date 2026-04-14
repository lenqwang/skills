# Cursor to Flutter 工作流指南

> 从自然语言描述到可运行 Flutter 页面的完整链路

## 一、核心理念

```
设计规范（Token）是平台无关的 → 渲染层按目标平台输出

同一套设计意图：
  → HTML SKILL  → .html 文件（浏览器直接看）
  → Flutter SKILL → .dart 文件（flutter run 看）
```

**不需要 Figma，不需要设计稿。** 只要给出主题色 + 页面需求，Cursor 读取 SKILL 即可直出 Flutter 代码。

---

## 二、前置环境

### 2.1 本地依赖

| 工具 | 版本要求 | 安装方式 |
|------|---------|---------|
| Flutter SDK | ≥ 3.19 | `brew install flutter` 或 [官方文档](https://docs.flutter.dev/get-started/install) |
| Dart SDK | 随 Flutter 自带 | — |
| Xcode（iOS） | ≥ 15 | App Store |
| Android Studio（Android） | ≥ 2024.1 | [官方下载](https://developer.android.com/studio) |
| VS Code / Cursor | 最新版 | 已有 |

验证环境：

```bash
flutter doctor
```

全部绿勾即可。如果只做 Demo 演示，只装 Flutter SDK + 一个平台模拟器就够了。

### 2.2 项目骨架

```bash
flutter create --org com.example --project-name app_demo app_demo
cd app_demo
flutter pub add google_fonts   # 自定义字体
flutter pub add go_router      # 路由管理（可选）
```

生成的项目结构：

```
app_demo/
  lib/
    main.dart                  # 入口
    theme/
      tokens.dart              # 设计 Token 抽象定义
      light_theme.dart         # 亮色主题
      dark_theme.dart          # 暗色主题（可选）
    pages/                     # 页面文件
    widgets/                   # 可复用组件
  pubspec.yaml
```

---

## 三、Token 体系 — 从 CSS 变量到 Dart

### 3.1 映射规则

设计 Token 在 HTML 和 Flutter 中的等价表达：

| 概念 | HTML (CSS) | Flutter (Dart) |
|------|-----------|---------------|
| 颜色变量 | `--c-accent: #B00025;` | `static const accent = Color(0xFFB00025);` |
| 字号 | `--f-body: 16;` | `static const fBody = 16.0;` |
| 圆角 | `--r-card: 32;` | `static const rCard = 32.0;` |
| 间距 | `--s-block: 48;` | `static const sBlock = 48.0;` |
| 渐变 | `--g-hero-from/to` | `LinearGradient(colors: [heroFrom, heroTo])` |
| 透明度派生 | `color-mix(in srgb, var(--c-accent) 20%, transparent)` | `accent.withOpacity(0.2)` |
| 换主题 | 改 `:root` 变量值 | 切换 `AppTokens` 实例 |

### 3.2 Token 抽象类

```dart
// lib/theme/tokens.dart

import 'package:flutter/material.dart';

abstract class AppTokens {
  // ── 背景 ──
  Color get bg;
  Color get bgDk;
  Color get header;

  // ── 卡片 ──
  Color get card;
  Color get cardS;
  Color get cardInner;

  // ── 文字 ──
  Color get txt;
  Color get txtInv;
  Color get txtS;

  // ── 强调 ──
  Color get accent;
  Color get accentDk;

  // ── 功能色 ──
  Color get ok;
  Color get info;
  Color get muted;

  // ── 边框/分隔 ──
  Color get border;
  Color get divider;

  // ── 渐变 ──
  LinearGradient get gHero;
  LinearGradient get gCta;

  // ── 字号 ──
  double get fT1 => 60;
  double get fH2 => 28;
  double get fH3 => 24;
  double get fH4 => 20;
  double get fBody => 16;
  double get fSm => 14;
  double get fXs => 12;

  // ── 圆角 ──
  double get rCard => 32;
  double get rInner => 16;
  double get rBtn => 9999;

  // ── 间距 ──
  double get sSection => 80;
  double get sBlock => 48;
  double get sElement => 32;
  double get sCardPad => 32;
  double get sInnerPad => 24;
  double get sInline => 16;
  double get sTight => 8;

  // ── 内容宽度 ──
  double get wContent => 1200;

  // 派生方法
  Color accentAlpha(double opacity) => accent.withOpacity(opacity);
  Color txtAlpha(double opacity) => txt.withOpacity(opacity);

  // 转换为 Flutter ThemeData
  ThemeData toThemeData() {
    return ThemeData(
      scaffoldBackgroundColor: bg,
      colorScheme: ColorScheme(
        brightness: Brightness.light,
        primary: accent,
        onPrimary: txtInv,
        secondary: accentDk,
        onSecondary: txtInv,
        surface: card,
        onSurface: txt,
        error: const Color(0xFFE53935),
        onError: txtInv,
      ),
      cardTheme: CardTheme(
        color: card,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(rCard),
        ),
        elevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: accent,
          foregroundColor: txtInv,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(rBtn),
          ),
          padding: EdgeInsets.symmetric(
            horizontal: sElement,
            vertical: sInline,
          ),
        ),
      ),
      dividerTheme: DividerThemeData(color: divider, thickness: 1),
      appBarTheme: AppBarTheme(
        backgroundColor: header,
        foregroundColor: txtInv,
        elevation: 0,
      ),
    );
  }
}
```

### 3.3 具体主题实现示例

```dart
// lib/theme/light_theme.dart

class LightTokens extends AppTokens {
  // ── 背景 ──
  @override Color get bg => const Color(0xFFF5F5F5);
  @override Color get bgDk => const Color(0xFFE0E0E0);
  @override Color get header => const Color(0xFF0B0C0D);

  // ── 卡片 ──
  @override Color get card => const Color(0xFFFFFFFF);
  @override Color get cardS => const Color(0xFFF8F9FA);
  @override Color get cardInner => const Color(0xFFF0F1F3);

  // ── 文字 ──
  @override Color get txt => const Color(0xFF1A1A1A);
  @override Color get txtInv => const Color(0xFFFFFFFF);
  @override Color get txtS => const Color(0xFF8B8B8B);

  // ── 强调 ──
  @override Color get accent => const Color(0xFF1A73E8);
  @override Color get accentDk => const Color(0xFF1557B0);

  // ── 功能色 ──
  @override Color get ok => const Color(0xFF17E5A1);
  @override Color get info => const Color(0xFF2354E6);
  @override Color get muted => const Color(0xFFC4C7CA);

  // ── 边框/分隔 ──
  @override Color get border => const Color(0xFFE0E0E0);
  @override Color get divider => const Color(0xFFEEEEEE);

  // ── 渐变 ──
  @override LinearGradient get gHero => const LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF1A73E8), Color(0xFF6AB7FF)],
  );

  @override LinearGradient get gCta => const LinearGradient(
    colors: [Color(0xFF1A73E8), Color(0xFF4FC3F7)],
  );
}
```

### 3.4 换主题 — 一键切换

```dart
// lib/main.dart

import 'package:flutter/material.dart';
import 'theme/tokens.dart';
import 'theme/light_theme.dart';

// 全局 Token 实例，换主题改这一行
final AppTokens tokens = LightTokens();

void main() {
  runApp(
    MaterialApp(
      theme: tokens.toThemeData(),
      home: const MyApp(),
    ),
  );
}
```

换主题只需要：
1. 新建一个 `XxxTokens extends AppTokens`，填入新色值
2. `main.dart` 里把 `LightTokens()` 换成 `XxxTokens()`
3. 热重载，完事

---

## 四、页面类型库

### 4.1 常见 APP 页面类型

| 页面类型 | Widget 骨架 | 典型场景 |
|---------|-----------|---------|
| 列表页 | `Scaffold` → `CustomScrollView` → `SliverList` | 商品列表、消息列表、搜索结果 |
| 详情页 | `Scaffold` → `CustomScrollView` → `SliverAppBar` + `SliverToBoxAdapter` | 商品详情、文章详情、用户资料 |
| 表单页 | `Scaffold` → `Form` → `ListView` → `TextFormField` × N | 注册、编辑资料、下单 |
| Dashboard | `Scaffold` → `GridView` / `Wrap` → `StatCard` × N | 数据概览、管理后台 |
| Tab 页 | `DefaultTabController` → `TabBarView` → 子页面 | 首页、分类、我的 |
| 空状态 | `Center` → `Column`(icon + text + button) | 无数据、网络错误 |
| 设置页 | `ListView` → `ListTile` / `SwitchListTile` × N | 设置、偏好 |

### 4.2 骨架映射

每种页面类型都有固定的 Widget 树结构。以**列表页**为例：

```dart
Scaffold(
  appBar: AppBar(title: Text('标题')),
  body: CustomScrollView(
    slivers: [
      // 顶部 Banner / 筛选栏（可选）
      SliverToBoxAdapter(child: HeaderBanner()),
      // 列表
      SliverPadding(
        padding: EdgeInsets.all(tokens.sInline),
        sliver: SliverList.separated(
          itemCount: items.length,
          separatorBuilder: (_, __) => SizedBox(height: tokens.sTight),
          itemBuilder: (context, index) => ItemCard(item: items[index]),
        ),
      ),
    ],
  ),
)
```

---

## 五、生成流程

### 5.1 标准流程

```
 输入                           Cursor 处理                        输出
┌──────────────┐    ┌──────────────────────────────┐    ┌──────────────┐
│ 自然语言描述   │ →  │ 1. 解析页面类型               │ →  │ .dart 文件    │
│ + 主题色(可选) │    │ 2. 读取 Token 体系            │    │ 放入 lib/     │
│              │    │ 3. 匹配页面骨架               │    │ flutter run  │
│              │    │ 4. 生成 Widget + 假数据        │    │ 即可预览      │
└──────────────┘    └──────────────────────────────┘    └──────────────┘
```

### 5.2 Prompt 示例

#### 示例 1：简单页面

```
帮我生成一个电商商品列表页，主色 #1A73E8，卡片带商品图 + 标题 + 价格 + 购买按钮
```

Cursor 输出：
- `lib/theme/shop_tokens.dart` — 主题色值
- `lib/pages/product_list_page.dart` — 列表页
- `lib/widgets/product_card.dart` — 商品卡片组件

#### 示例 2：多页面

```
帮我生成一个新闻 APP：
- 首页：Tab 切换（推荐/科技/财经）+ 新闻卡片列表
- 详情页：顶部大图 + 标题 + 正文 + 评论区
- 个人中心：头像 + 收藏/历史/设置入口
主色 #E53935，暗色主题
```

Cursor 输出：
- `lib/theme/news_tokens.dart`
- `lib/pages/home_page.dart`
- `lib/pages/article_detail_page.dart`
- `lib/pages/profile_page.dart`
- `lib/widgets/news_card.dart`
- `lib/widgets/comment_item.dart`
- `lib/main.dart`（含路由配置）

#### 示例 3：带 Figma 的混合流程

```
这是 Figma 链接：https://figma.com/xxx
帮我用 Flutter 还原这个页面
```

Cursor 处理：
1. 调 Figma MCP 提取设计数据
2. 色值自动归入 Token 体系
3. 输出 `.dart` 文件

### 5.3 给 Cursor 的指令格式

为了获得最佳输出，建议包含以下信息：

```
页面类型：[列表页 / 详情页 / 表单页 / Dashboard / Tab 页 / 设置页]
主色：#XXXXXX
强调色：#XXXXXX（可选，不给则自动派生）
风格：[亮色 / 暗色 / 跟随系统]
内容模块：
  - 模块1：描述
  - 模块2：描述
  - ...
数据：假数据 / 接 API（提供接口文档）
```

---

## 六、交付层级

| 层级 | 内容 | 适用场景 | 耗时 |
|------|------|---------|------|
| L1 — UI Demo | 静态页面 + 假数据 + 页面跳转 | 给老板/客户演示效果 | 分钟级 |
| L2 — 可交互原型 | L1 + 表单验证 + 本地状态 + 动画 | 用户测试、设计评审 | 小时级 |
| L3 — 生产代码 | L2 + API 对接 + 错误处理 + 持久化 | 开发团队接手继续开发 | 需要补充业务信息 |

### 各层级需要你补充的信息

**L1（零额外信息）：**
- 只需要描述页面长什么样 + 主题色

**L2（少量信息）：**
- 交互逻辑（点击某个按钮跳去哪、表单校验规则）
- 动画偏好（是否要入场动画、转场效果）

**L3（需要业务信息）：**
- API 接口文档（URL、请求/响应格式）
- 鉴权方案（Token 怎么存、刷新逻辑）
- 第三方 SDK（推送、支付、统计）
- 上架配置（Bundle ID、签名证书）

---

## 七、与 HTML 工作流的对比

| 维度 | HTML 活动页 | Flutter APP 页面 |
|------|-----------|-----------------|
| 输出文件 | `.html` | `.dart` |
| 预览方式 | 浏览器直接打开 | `flutter run` |
| 热更新 | 刷新浏览器 | Flutter Hot Reload（< 1s） |
| Token 载体 | CSS `:root` 变量 | Dart 抽象类 |
| 换主题 | 改 CSS 变量值 | 换 `AppTokens` 实例 |
| 组件体系 | HTML + CSS class | Flutter Widget |
| 透明度派生 | `color-mix()` | `.withOpacity()` |
| 设计面板 | `_toolkit.js` | Flutter DevTools |
| 适用场景 | Web 活动页、营销页 | APP 产品页、原生应用 |
| 交付物 | 独立 HTML 文件 | Flutter 工程目录 |

---

## 八、最佳实践

### 8.1 文件组织

```
lib/
  main.dart                    # 入口 + 路由
  theme/
    tokens.dart                # Token 抽象定义（不改）
    light_theme.dart           # 亮色主题值
    dark_theme.dart            # 暗色主题值
    [custom]_theme.dart        # 自定义主题值
  pages/
    [page_name]_page.dart      # 一个页面一个文件
  widgets/
    [widget_name].dart         # 可复用组件
  models/
    [model_name].dart          # 数据模型（L2+）
  services/
    api_service.dart           # API 对接（L3）
```

### 8.2 命名规范

| 类型 | 命名 | 示例 |
|------|------|------|
| 页面文件 | `snake_case_page.dart` | `product_list_page.dart` |
| 页面类 | `PascalCasePage` | `ProductListPage` |
| 组件文件 | `snake_case.dart` | `product_card.dart` |
| 组件类 | `PascalCase` | `ProductCard` |
| Token 文件 | `xxx_theme.dart` | `shop_theme.dart` |
| Token 类 | `XxxTokens` | `ShopTokens` |

### 8.3 WCAG 对比度

和 HTML 规范一致，新主题必须验证：

| 前景 | 背景 | 最低对比度 |
|------|------|-----------|
| `accent` | `card` | 4.5:1 |
| `txtInv` | `accent` | 4.5:1 |
| `txt` | `card` | 4.5:1 |
| `txtInv` | `header` | 4.5:1 |

---

## 九、Quick Start

最快上手路径：

```bash
# 1. 创建项目
flutter create app_demo && cd app_demo

# 2. 打开 Cursor
cursor .

# 3. 对 Cursor 说
"帮我生成一个电商首页，底部 Tab 导航（首页/分类/购物车/我的），
 首页顶部搜索栏 + Banner 轮播 + 商品瀑布流，
 主色 #FF6B00，暗色背景 #1A1A2E"

# 4. 预览
flutter run
```

从描述到看到页面，整个过程 < 5 分钟。
