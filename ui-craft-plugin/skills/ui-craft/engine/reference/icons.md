# 常用图标速查表

> 图标来源: `@gate/iconfont`
> 命名规则: `GateUIIcon` + 尺寸(`A16Px`) + 拼音名
> 标准尺寸: 12 / 14 / 16 / 20 / 24 / 32 px

## 导入方式

```tsx
// 推荐按组导入（减少 dev 模式 module 数量）
import {
  GateUIIconA16PxGuanbi,
  GateUIIconA16PxSousuo
} from '@gate/iconfont/GateUI'

// 或全量导入
import { GateUIIconA16PxGuanbi } from '@gate/iconfont'
```

## 基础用法

```tsx
<GateUIIconA16PxGuanbi size={16} color="currentColor" className="text-text-secondary" />
```

---

## 导航箭头类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 右箭头 | `GateUIIconA16PxYoujiantou` | 16 |
| 左箭头 | `GateUIIconA16PxZuojiantou` | 16 |
| 上箭头 | `GateUIIconA16PxShangjiantou` | 16 |
| 下箭头 | `GateUIIconA16PxXiajiantou` | 16 |
| 长箭头上 | `GateUIIconA16PxLineChangjiantouShang` | 16 |
| 长箭头下 | `GateUIIconA16PxLineChangjiantouXia` | 16 |
| 返回 | `GateUIIconA16PxFanhui` | 16 |

```tsx
// 箭头示例
<button className="flex items-center gap-2">
  <GateUIIconA16PxZuojiantou size={16} />
  返回
</button>
```

---

## 操作类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 关闭 | `GateUIIconA16PxGuanbi` | 16 |
| 搜索 | `GateUIIconA16PxSousuo` / `GateUIIconA16PxLineSousuo` | 16 |
| 添加/加号 | `GateUIIconA16PxJiahao` / `GateUIIconA16PxLineTianjia` | 16 |
| 删除 | `GateUIIconA16PxShanchu` | 16 |
| 编辑 | `GateUIIconA16PxLineBianji` | 16 |
| 刷新 | `GateUIIconA16PxShuaxin` | 16 |
| 复制 | `GateUIIconA16PxFuzhi` / `GateUIIconA16PxLineFuzhi` | 16 |
| 分享 | `GateUIIconA16PxFenxiang` / `GateUIIconAV3116PxFillFenxiang` | 16 |
| 下载 | `GateUIIconA16PxXiazai` / `GateUIIconA12PxXiazai` | 16 |
| 设置 | `GateUIIconA16PxShezhi` / `GateUIIconA12PxShezhi` | 16 |
| 切换 | `GateUIIconA16PxQiehuan` | 16 |
| 更多 | `GateUIIconA16PxLineGengduo` | 16 |
| 展开 | `GateUIIconA16PxZhankai` | 16 |
| 收起 | `GateUIIconA16PxShouqi` | 16 |
| 链接 | `GateUIIconA16PxLink` / `GateUIIconAV3124PxLineLianjie` | 16 |

```tsx
// 搜索框示例
<div className="flex items-center gap-2">
  <GateUIIconA16PxLineSousuo size={16} className="text-text-tertiary" />
  <input placeholder="搜索..." />
  <GateUIIconA16PxGuanbi size={14} className="cursor-pointer" />
</div>
```

---

## 状态提示类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 正确/成功 | `GateUIIconA16PxZhengque` / `GateUIIconA16PxLineZhengque` | 16 |
| 警告 | `GateUIIconA16PxJinggao` / `GateUIIconAV3116PxFillJinggao` | 16 |
| 错误 | `GateUIIconA16PxFillTipsError` / `GateUIIconA24PxErrorFill` | 16 |
| 说明/问号 | `GateUIIconA16PxShuoming` / `GateUIIconA16PxLineShuoming` | 16 |
| Toast正确 | `GateUIIconAV3116PxLineToastzhengque` | 16 |
| Toast警告 | `GateUIIconAV3116PxLineToastjinggao` | 16 |
| Toast错误 | `GateUIIconAV3116PxLineToastcuowu` | 16 |
| Toast说明 | `GateUIIconAV3116PxLineToastshuoming` | 16 |

```tsx
// 状态提示示例
<div className="flex items-center gap-2 text-green-500">
  <GateUIIconA16PxZhengque size={16} />
  操作成功
</div>
```

---

## 交互反馈类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 点赞 | `GateUIIconA32PxDianzan` / `GateUIIconA32PxDianzanFill` | 20 |
| 喜欢/收藏 | `GateUIIconA16PxStar` / `GateUIIconA16PxStarFill` | 16 |
| 评论 | `GateUIIconA20PxPinglun` | 20 |
| 通知 | `GateUIIconA16PxXiaoxi` / `GateUIIconA16PxTixingFill` | 16 |
| 日历 | `GateUIIconA16PxRili` | 16 |
| 时间 | `GateUIIconA16PxShijian` | 16 |
| 用户/个人 | `GateUIIconA20PxGeren` | 20 |
| 默认头像 | `GateUIIconAV31Morentouxiang` | 32 |

```tsx
// 交互按钮示例
<button className="flex items-center gap-1">
  <GateUIIconA16PxStar size={16} />
  收藏
</button>
```

---

## 交易相关类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 买 | `GateUIIconFuturesFillBuy` | 20 |
| 卖 | `GateUIIconFuturesFillSell` | 20 |
| 涨/绿 | `GateUIIconA20PxLvzhanghongdie` | 20 |
| 跌/红 | `GateUIIconA20PxHongzhanglvdie` | 20 |
| 钱包 | `GateUIIconA20PxQianbao` | 20 |
| 订单 | `GateUIIconA16PxLineDingdan` | 16 |
| 充值 | `GateUIIconA32PxChongzhi` / `GateUIIconAV3124PxLineChongzhi` | 24 |
| 划转 | `GateUIIconA16PxHuazhuan` | 16 |
| 风险 | `GateUIIconA16PxLineFengxian` | 16 |

```tsx
// 交易按钮示例
<button className="flex items-center gap-2 bg-green-500">
  <GateUIIconFuturesFillBuy size={16} />
  买入
</button>
```

---

## 社交媒体类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| Telegram | `GateUIIconA20PxFillTelegram` / `GateUIIconAV3112PxFillTelegram` | 20 |
| Twitter/X | `GateUIIconA20PxFillTwitter1` / `GateUIIconAV3112PxFillTwitter` | 20 |
| Facebook | `GateUIIconA20PxFillFacebook` | 20 |
| Discord | `GateUIIconA24PxFillDiscord` / `GateUIIconAV3120PxFillDiscord` | 24 |
| LinkedIn | `GateUIIconA20PxFillLinkedin` | 20 |
| 邮箱 | `GateUIIconA20PxFillYouxiang` | 20 |
| WhatsApp | `GateUIIconA20PxFillWhatsapp` | 20 |

```tsx
// 社交链接示例
<div className="flex gap-4">
  <a href="#"><GateUIIconA20PxFillTelegram size={20} /></a>
  <a href="#"><GateUIIconA20PxFillTwitter1 size={20} /></a>
  <a href="#"><GateUIIconA20PxFillDiscord size={20} /></a>
</div>
```

---

## 媒体类

| 中文 | 组件名 | 常用尺寸 |
|------|--------|----------|
| 图片 | `GateUIIconA12PxTupian` / `GateUIIconA20PxLineTupian` | 16 |
| 视频 | `GateUIIconA20PxShipin` / `GateUIIconA24PxVideo` | 20 |
| 播放 | `GateUIIconA24PxBofang` | 24 |
| 直播 | `GateUIIconA20PxLive` | 20 |
| 相机 | `GateUIIconA32PxXiangji` | 32 |
| 相册 | `GateUIIconA32PxXiangce` | 32 |

---

## 活动页面常用组合

### 排行榜样式

```tsx
// 排名图标
const rankIcons = {
  1: <GateUIIconAV3124PxFillA size={24} className="text-yellow-500" />, // 金牌
  // 2、3 可用颜色区分
};
```

### 奖励/礼物

```tsx
// 奖励相关
<GateUIIconA20PxHongbao size={20} />           // 红包
<GateUIIconA32PxEwaijiangli size={32} />       // 额外奖励
<GateUIIconAV3116PxLineHongbao size={16} />    // 小红包
```

### 规则/说明

```tsx
// 规则说明
<div className="flex items-center gap-2">
  <GateUIIconA16PxLineJiaocheng size={16} />
  <span>活动规则</span>
</div>
```

---

## 使用原则

1. **尺寸选择**: 优先使用 16px，次要信息用 12px，强调用 20/24px
2. **颜色控制**: 使用 `color="currentColor"` 配合 Tailwind 文字颜色类
3. **Line vs Fill**: Line 用于默认状态，Fill 用于激活/选中状态
4. **一致性**: 同一页面同类图标尺寸保持一致

```tsx
// ✅ 正确用法
<GateUIIconA16PxSousuo size={16} className="text-text-secondary" />

// ❌ 错误用法
<GateUIIconA16PxSousuo color="#999" />  // 禁止硬编码颜色
```
