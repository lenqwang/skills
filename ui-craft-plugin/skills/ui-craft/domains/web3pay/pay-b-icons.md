---
scope: [web3pay]
layer: L2
context: pay-b
---

# Pay-B 图标系统

> 来源: Figma Pay-B端-商家后台 + V5.1 组件库
> 版本: v1.4.0

---

## 图标规范

### 图标尺寸

| 尺寸 | 画布 | Padding | 内容区 | 用途 |
|------|------|---------|--------|------|
| 32px | 32×32 | 2.67px | ~26.67px | 大图标 |
| 24px | 24×24 | 2px | 20px | 标准图标 |
| 20px | 20×20 | 1.67px | ~16.67px | 中图标 |
| 16px | 16×16 | 1.33px | ~13.33px | 小图标 |
| 12px | 12×12 | 1px | 10px | 极小图标 |

### 图标颜色

| 层级 | 色值 | 用途 |
|------|------|------|
| Primary | `#303236` | 主要操作图标 |
| Secondary | `#5A5E66` | 次要图标 |
| Tertiary | `#84888C` | 辅助图标 |
| Quaternary | `#A0A3A7` | 最弱图标/Placeholder |
| Brand | `#68AD00` | 品牌强调色图标 |
| Disable | `#C4C7CA` | 禁用图标 |
| Inverse | `#FFFFFF` | 深色/绿色背景上的图标 |

### 图标使用规范

- 统一使用 **填充（Filled）** 图标，不使用线性图标
- 侧边栏菜单图标：18px
- 设置中心卡片图标：48×48 容器 + 28×28 图标，居中对齐
- 与文字间距：8px
- 在按钮中：左右各 4-8px

### 图标库优先级

| 来源 | 优先级 | 说明 |
|------|--------|------|
| Figma MCP SVG 路径 | 最高 | 从设计稿直接提取 |
| 本地 SVG 文件 | 次高 | `SVG/` 目录下的图标 |
| CEX 图标库 | 标准 | Gate 标准图标集（24px） |
| Phosphor 填充图标 | 兜底 | `iconFontFamily: "phosphor"` |

---

## CEX 图标库概览

> 所有图标均为 **24 × 24px**，Token 前缀为 `CEX_`

### 图标分类

| 分类 | 说明 | 图标尺寸 |
|------|------|---------|
| 基础产品图标 | 通用功能图标（操作、状态、交易等） | 24px |
| Component（基础组件图标） | 导航、状态反馈、方向等核心图标 | 24px |
| 常见币种图标 | 加密货币 Logo（BTC/ETH/USDT 等） | 28px |
| 常见法币图标 | 法定货币 Logo（USD/CNY/EUR 等） | 40px |
| 常见国旗图标 | 国家旗帜 | 40px |
| 社交媒体图标 | 第三方平台图标 | 24px |
| Header 导航图标 | TwoColor 双色图标，用于顶部导航菜单 | 24px |
| 常见币种链图标 | 区块链网络图标（Chain_*） | 20px |

### 基础产品图标（共约 200+）

**行一（通用操作）：**
`Settings` `Scan` `Copy` `Paste` `Show` `Hide` `Profile` `Delete` `Download` `Edit` `Pin` `Unpin` `Filter` `Filtered` `Notification` `NotificationDisabled` `Reminded` `Subscribed` `Language` `Darkmode` `Lightmode` `OrderHistory` `Deposit` `Withdraw` `BankCard`

**行二（产品功能）：**
`GateCard` `Bot` `Lianghuagendan` `Earn` `Gift` `Borrow` `Lending` `RedPacket` `Chat` `QuickMSG` `Fee` `Qianbao&yue` `SecuritySettings` `ReplenishCollateral` `Verified` `UserSecurity` `UmbrellaProtection` `Transfer_Horizontal` `Transfer_Vertical` `Spot` `ReserveProof` `Personal` `Streamer` `AccountSwitch` `GateAccount`

**行三（交互/图表）：**
`More_Horizontal` `More_Vertical` `Biaoqing` `Convert` `FaceRecognition` `Fingerprint` `Gesture` `Gatecode` `Keyboard` `SpotGrid` `LeverageTrading` `Future` `Menu` `EditGroup` `MoveUpDown` `Password` `Unlock` `Zhanghuxinxi` `Jiazhao` `Huzhao` `Tutorial` `Share` `Like` `Dislike`

**行四（行情/市场）：**
`Service` `Grid` `P2P` `Loop` `Ascendingsort` `Descendingsort` `Calendar` `Gif` `DataCenter` `Sound` `Mute` `AutoEarn` `AutoInvest` `Collateral` `DualInvestment` `KYCCertification` `Translate` `Zuixiaohua` `Maximize` `Layout1` `Layout2` `Kline` `OrderView_1` `OrderView_2` `OrderView_3`

**行五（排行/颜色）：**
`Redup` `Greendown` `Colorpreferences` `ChartView` `LiveNow` `FearinDex` `Trend` `Helcenter` `Refresh` `Note` `ChartInterval` `RotateScreen` `KeyboardDelete` `Space` `EmojiFavorites` `HardwareWallet` `Bluetooth` `Host` `Top` `UnTop` `SimilarKLine` `ApplyLive` `Image` `ImageLoadFailed` `Quote`

**行六（工具/更多）：**
`Analysis` `AccountUpgrade` `Video` `StepbyStep` `Borrowing` `SpotRecharge` `Points` `A_Z_sort` `Returetotrade` `ChartDisplay` `Return` `Goldendog` `FrontRunning` `FutureGrid` `TradeRanking` `SurgeRanking` `Coin` `GainersRanking` `LosersRanking` `ParameterSettings` `Home` `SubAccounts` `Api` `Vouchers` `Tickets`

**行七（新增）：**
`Camera` `Mobile` `PeopleCount` `Attachment` `LoanDetails` `Fullscreen` `Danmaku` `CloseDanmaku` `SubAccounts` `LogOut` `PointCard` `QRcode` `Passkey` `DiagonalArrow` `Link` `Alpha` `OnchainDeposit` `OnchainWithdraw` `BusinessIncome` `Merchant` `FiatDeposit` `QuickBuy` `Location` `Puzzle` `AddressBook`

**行八（最新）：**
`CheckerFlag` `OrderDetails` `GTHolding` `TransactionHistory` `OptionsAccount` `BTCFuture` `DeliveryFuture` `BulkTransfer` `Innovation` `Coupon` `Vip` `GateSimpleEarn`

### Component（基础通用图标）

**导航方向：** `Favorite` `chevron_left` `chevron_right` `left_aligned_arrow` `right_aligned_arrow` `DoubleArrow_left` `DoubleArrow_right` `DoubleArrow_up` `DoubleArrow_down` `chevron_up` `chevron_down` `back_arrow` `ForwardArrow`

**操作：** `Search` `close&error` `add` `subtract` `success` `GTE` `LTE`

**状态图标（Filled）：** `circlefilled_add` `circlefilled_subtract` `circlefilled_error` `circlefilled_info` `circlefilled_warning` `circlefilled_success` `circlefilled_progress`

**行情方向：** `hot_fill` `rise_fill` `fall_fill` `down_fill` `up_fill`

**媒体：** `pause` `play` `kuaijin` `Text-fill` `mp3-fill` `mp4-fill` `pdf-fill`

**头像：** `DefaultAvatar` `AvatarNoPadding` `CorporateAvatar` `Clover`

**其他：** `sort` `btn_loading` `btn_loading2` `radio_inactive` `GTE_input` `LTE_input`

### 常见币种图标（28px）

`BTC` `ETH` `USDT` `GT` `LTC` `XRP` `BNB` `SHIB` `DOGE` `SOL` `AVAX` `TRX` `DOT` `PIGCOIN` `MEW` `RADAR` `ENA` `Base` 及占位图标

### 常见法币图标（40px）

`CNY` `VND` `USD` `INR` `TRY` `NGN` `PKR` `BDT` `PHP` `GBP` `IDR` `ZAR` `EGP` `UZS` `TWD` `HKD` `GHS` `VES` `UAH` `RUB` `EUR` `BRL` `JPY` `MYR` `PLN` `SAR` `ARS` `AED` `KZT` `THB` `XAF` `XOF` `PGK` `KES` `MAD` `BYN` `AUD` `TZS` `SEK` `AZN` `COP` `HUF` `MXN` `RON` `AMD` `DZD` `NPR` `JOD` `CLP` `IQD` `MRU` 及占位图标

### 社交媒体图标（24px）

`Telegram` `Twitter` `Facebook` `Youtube` `Instagram` `Github` `Medium` `Linkedin` `Reddit` `VK` `Whatsapp` `Discord` `Wechat` `Line` `Zalo` `Google` `Microsoft` `Baipishu` `Metamask` `Email` `TikTok` `Apple` `Linux` `Windows` `Macos` `DownloadApi`

### Web3 图标库（CEX 扩展）

> 所有图标均为 **24 × 24px**，分为 Line（线框）和 Fill（填充）两种风格

#### 命名规则

| 前缀 | 风格 | 示例 |
|------|------|------|
| `Web3_line_` | 线框风格 | `Web3_line_deposit` |
| `Web3_fill_` | 填充风格 | `Web3_fill_Star` |

#### Web3 Line 图标（线框风格）

**资产操作：** `deposit` `withdraw` `yinhangka` `Send` `Receive` `Buy` `Sell` `Swap` `Exchange` `UTXO`

**工具/设置：** `Bot` `Settings` `help` `coin` `dingdan` `Filter` `Refresh` `Notification` `calendar` `language` `Clear`

**钱包/安全：** `QR_code` `Show` `Hide` `Profile` `Delete` `link` `Disconnect` `download` `image` `camera` `Edit`

**DeFi/Web3 专属：** `Pixiu` `Blacklist` `MintBurn` `Stack` `pump` `FrontRunning` `Lock` `LiquidityContract`

#### Web3 Fill 图标（填充风格）

**交易/DeFi：** `bimai` `send` `Gas` `Borrow` `MemeTrading` `Swap` `SwitchHorizontal` `SwitchVertical`

**DeFi 专属：** `HodlEarn` `Whale` `Juji` `Incubation` `LiquidityWarning` `PoolComparison` `RugPull` `Lock` `Bots` `DisableBots` `FrontRunning`

#### Web3 社交媒体图标（24px，前缀 `Web3_`）

`telegram` `twitter` `facebook` `youtube` `Instagram` `github` `medium` `linkedin` `reddit` `vk` `whatsapp` `discord` `google` `microsoft` `metamask` `email` `tiktok` `Gate` `icloud` `GoogleAuthenticator`

---

## Web3 ICON 规范

> **Figma 数据源**：[Web3 — Pay 变量 图标](https://www.figma.com/design/EucunJoJV6WaxacCEGN8ux/Web3---Pay-%E5%8F%98%E9%87%8F-%E5%9B%BE%E6%A0%87?node-id=20-21)
> **节点 ID**：`20:21`（Section: Web3 基础产品图标）
> **统一尺寸**：24 × 24px
> **命名规范**：`X1_[style]_[Name]`

### 命名体系

| 前缀 | 风格 | 说明 |
|------|------|------|
| `X1_fill_` | Filled 填充 | 默认风格，实心图标 |
| `X1_line_` | Line 线框 | 描边风格，空心图标 |
| `X1_color_` | Color 多色 | 品牌多色图标（Logo 等） |

### 图标分类总览

| 分类 | Figma Frame | 图标数量 | 说明 |
|------|------------|---------|------|
| **Component 基础组件** | `20:34` | 38 | 导航方向、操作、状态反馈等核心图标 |
| **Web3 Fill 产品功能** | `20:102` | ~195 | 钱包、交易、DeFi、工具等产品功能图标 |
| **TabBar 底部导航** | `20:93` | 4 | App 底部导航栏图标 |
| **Pay 专属** | `20:460` | 1 | Pay 产品专属图标 |
| **TabBar 扩展** | `3149:94` | 2 | Web3/Exchange 切换图标 |
| **Brand 品牌社交** | `20:471` | 33 | 品牌 Logo、社交媒体图标 |
| **Flex 扩展** | `31:38` | 20 | 合约、运营、文档等补充图标 |

---

### 一、Component 基础组件图标（38 个）

> Frame ID: `20:34`

**导航方向：**
`X1_fill_CaretUp` `X1_fill_CaretDown` `X1_fill_CaretLeft` `X1_fill_CaretRight` `X1_fill_CaretLeftAligned` `X1_fill_CaretRightAligned` `X1_fill_ArrowUp` `X1_fill_ArrowDown` `X1_fill_ArrowLeft` `X1_fill_ArrowRight` `X1_fill_TriangleUp` `X1_fill_TriangleDown` `X1_fill_TriangleLeft` `X1_fill_TriangleRight` `X1_fill_Rise` `X1_fill_Fall`

**操作：**
`X1_fill_Search` `X1_fill_Close` `X1_fill_Add` `X1_fill_Subtract` `X1_fill_Check` `X1_line_Jump` `X1_line_Left` `X1_line_Right`

**状态反馈（Line + Fill 双版本）：**
`X1_line_Star` / `X1_fill_Star` · `X1_line_PlusCircle` / `X1_fill_PlusCircle` · `X1_fill_SubtractCircle` · `X1_line_CloseCircle` / `X1_fill_CloseCircle` · `X1_line_InfoCircle` / `X1_fill_InfoCircle` · `X1_line_WarningCirlce` / `X1_fill_WarningCirlce` · `X1_line_CheckCircle` / `X1_fill_CheckCircle` · `X1_fill_Question`

---

### 二、Web3 Fill 产品功能图标（~195 个）

> Frame ID: `20:102`

**通用操作：**
`X1_line_More` / `X1_fill_More` · `X1_fill_Dots9` · `X1_fill_CloseThin` · `X1_fill_External` · `X1_fill_Copy` · `X1_fill_Paste` · `X1_fill_Filter` · `X1_fill_Loading` · `X1_fill_Refresh` · `X1_fill_Delete` · `X1_fill_MoveUpDown` · `X1_fill_Download` · `X1_fill_Menu` · `X1_fill_Expand` · `X1_fill_Collapse` · `X1_fill_FullScreen` · `X1_fill_ZoomIn` · `X1_fill_ZoomOut` · `X1_fill_Attachment` · `X1_fill_Export`

**数据展示/图表：**
`X1_fill_BarChart` · `X1_fill_Records` · `X1_fill_KDown` · `X1_fill_KUp` · `X1_fill_Candlestick` · `X1_fill_Indicators` · `X1_fill_Display` · `X1_fill_Grid` · `X1_fill_List` · `X1_fill_Bubble` · `X1_fill_SortDown` · `X1_fill_SortUp` · `X1_fill_SortByAlpha` · `X1_line_KlineExpand` · `X1_line_KlineCollapse` · `X1_fill_Calculator`

**通知/设置：**
`X1_fill_Bell` · `X1_fill_Setting` · `X1_fill_Language` · `X1_fill_Alarm` · `X1_fill_Message` · `X1_fill_Subscribed` · `X1_fill_AutoSet` · `X1_fill_Preach` · `X1_fill_Chat`

**钱包/账户：**
`X1_fill_AddWallet` · `X1_fill_GateWallet` · `X1_fill_ImportWallet` · `X1_fill_SwitchWallet` · `X1_fill_HardwareWallet` · `X1_fill_EncryptedWallet` · `X1_fill_QuickWallet` · `X1_line_Wallet` · `X1_fill_Show` · `X1_fill_Hide` · `X1_fill_LockAccount` · `X1_fill_GoogleLock` · `X1_fill_Password` · `X1_fill_Unlock` · `X1_fill_Contacts` · `X1_fill_AddressBook` · `X1_fill_Member`

**交易/金融：**
`X1_fill_Spot` · `X1_fill_Swap` · `X1_fill_Send` · `X1_fill_Receive` · `X1_fill_Refund` · `X1_fill_Transfer` · `X1_fill_Transfer2` · `X1_fill_Transfer2Vertical` · `X1_fill_Exchange` · `X1_fill_ExchangeDollar` · `X1_fill_Limit` · `X1_fill_MarketPrice` · `X1_fill_TradeRect` · `X1_fill_Perp` · `X1_fill_TPSL` · `X1_fill_Slippage` · `X1_fill_Conditional` · `X1_fill_AdvancedLimit` · `X1_fill_ScaledOrder` · `X1_fill_TrailingStop` · `X1_fill_ChaseLimit` · `X1_fill_IceBerg` · `X1_fill_Twap` · `X1_fill_LeverageTrading` · `X1_fill_Candle` · `X1_fill_TradeChanged` · `X1_fill_Fee`

**DeFi/Web3 专属：**
`X1_line_RugPull` / `X1_fill_RugPull` · `X1_fill_CustomNetworkFee` · `X1_fill_MintBurn` · `X1_fill_LP` · `X1_fill_Blacklist` · `X1_fill_LiquidityPool` · `X1_fill_LiquidityWarning` · `X1_fill_LowLiquidity` · `X1_fill_Illiquidity` · `X1_fill_РооlComparison` · `X1_fill_Stake` · `X1_fill_Claim` · `X1_fill_Divert` · `X1_fill_Bridge` · `X1_fill_Onchain` · `X1_fill_Dapps` · `X1_fill_Chain` · `X1_fill_Solana` · `X1_fill_Meme` · `X1_fill_PriorityFee` · `X1_line_Gas` / `X1_fill_Gas` · `X1_line_NoMEV` / `X1_fill_NoMEV` · `X1_fill_Bribe` · `X1_fill_DevBlackList` · `X1_fill_Bundle` · `X1_fill_Fishing`

**链上分析/Smart Money：**
`X1_line_Whale` / `X1_fill_Whale` · `X1_fill_SmartMoney` · `X1_line_NewWallets` / `X1_fill_NewWallets` · `X1_line_Snipers` / `X1_fill_Snipers` · `X1_fill_EarlyBuyers` · `X1_fill_Developer` · `X1_fill_KOL` · `X1_line_InsiderWallets` · `X1_fill_Top10holder` · `X1_fill_Top100` · `X1_line_Signal` / `X1_fill_Signal` · `X1_fill_Rank` · `X1_fill_FollowAddress` · `X1_fill_UnfollowAddress`

**媒体/主题：**
`X1_fill_Light` · `X1_fill_System` · `X1_fill_Dark` · `X1_line_Dark` · `X1_fill_Pause` · `X1_fill_Sound` · `X1_fill_Mute` · `X1_fill_Image` · `X1_fill_Translate`

**卡片/支付：**
`X1_fill_Card` · `X1_fill_RechargeCard` · `X1_fill_CardLock` · `X1_fill_GiftCard` · `X1_fill_Code` · `X1_fill_Redeem` · `X1_fill_RedeemAlt` · `X1_fill_Bank` · `X1_fill_Sales`

**备份/安全：**
`X1_fill_Backup` · `X1_fill_GateBackup` · `X1_fill_IcloudyBackup` · `X1_fill_IcloudBackuImport` · `X1_fill_GoogleBackup` · `X1_line_HandwrittenBackup` / `X1_fill_HandwrittenBackup` · `X1_fill_SecuritySet` · `X1_fill_Security` · `X1_line_Alert` / `X1_fill_Alert` · `X1_line_Key` / `X1_fill_Key` · `X1_line_Verified` · `X1_line_SimCheck` / `X1_fill_SimCheck` · `X1_fill_SpendingLimits`

**速度/网络：**
`X1_fill_Lightning` · `X1_fill_FastSpeed` · `X1_fill_SlowSpeed` · `X1_fill_MediumSpeed` · `X1_fill_ExtremeSpeed` · `X1_fill_Average` · `X1_fill_AverageSpeed` · `X1_fill_Flash`

**编辑/工具：**
`X1_line_Edit` / `X1_fill_Edit` · `X1_fill_BatchAdd` / `X1_line_BatchAdd` · `X1_fill_Clear` · `X1_line_Scan` / `X1_fill_Scan` · `X1_fill_QRCode` · `X1_fill_History` · `X1_fill_ClockSquare` · `X1_fill_Calendar` · `X1_fill_Record` · `X1_fill_Details` · `X1_fill_FileUpload` · `X1_fill_Tool` · `X1_fill_Tracker` · `X1_fill_Quill`

**其他产品功能：**
`X1_fill_Diamond` · `X1_fill_Tutorial` · `X1_fill_Share` · `X1_fill_Participants` · `X1_fill_Rewards` · `X1_fill_Clover` · `X1_fill_HighCommunity` · `X1_line_Bot` / `X1_fill_Bot` · `X1_fill_Utxo` · `X1_line_Whitepaper` / `X1_fill_Whitepaper` · `X1_line_GeneralLedger` / `X1_fill_GeneralLedger` · `X1_fill_Website` · `X1_fill_OfficialWebsite` · `X1_fill_FAQ` · `X1_fill_Infofi` · `X1_fill_Fool` · `X1_fill_Discover` · `X1_fill_Freeze` · `X1_fill_Unfreeze` · `X1_fill_Phone` · `X1_fill_Service` · `X1_fill_Manage` · `X1_fill_JumpPage` · `X1_fill_SendMessage` · `X1_fill_ContractInteraction` · `X1_fill_Authorized` · `X1_fill_CancelAuthorization` · `X1_fill_CoinManagement` · `X1_line_Buy` / `X1_fill_Buy` · `X1_fill_Bluetooth` · `X1_fill_Home` · `X1_fill_ProjectStatus` · `X1_fill_ResourceManagement` · `X1_line_MyFavorites` / `X1_fill_MyFavorites` · `X1_fill_DEV` · `X1_fill_Api` · `X1_fill_Increase` · `X1_fill_Decrease` · `X1_fill_GreenUpRedDown` · `X1_fill_RedUPGreenDown` · `X1_fill_Top` · `X1_fill_CancelTop` · `X1_line_Untop` · `X1_fill_Bountydrop` · `X1_fill_Store` · `X1_fill_Disconnect` · `X1_fill_Testnet` · `X1_fill_Ear` · `X1_fill_GrowthTradeKing` · `X1_fill_GrowthLantern` · `X1_fill_CreateLink` · `X1_fill_GateBooster` · `X1_line_Boost` · `X1_fill_Flap` · `X1_fill_Mouse` · `X1_fill_Trophy` · `X1_fill_BNB` · `X1_fill_ETH` · `X1_fill_GT` · `X1_line_Deposit` · `X1_line_Withdraw` · `X1_line_Transfer` · `X1_fill_Display`

---

### 三、TabBar 底部导航图标（4 个）

> Frame ID: `20:93`

| 图标名 | 用途 |
|--------|------|
| `X1_fill_Market` | 行情 Tab |
| `X1_fill_Trade` | 交易 Tab |
| `X1_fill_Gateway` | 网关 Tab |
| `X1_fill_Discovery` | 发现 Tab |

---

### 四、Pay 专属图标（1 个）

> Frame ID: `20:460`

| 图标名 | 用途 |
|--------|------|
| `X1_fill_Pay` | Pay 产品专属图标 |

---

### 五、TabBar 扩展图标（2 个）

> Frame ID: `3149:94`

| 图标名 | 用途 |
|--------|------|
| `X1_fill_TabBarWeb3` | Web3 底部导航 |
| `X1_fill_TabBarExchange` | Exchange 底部导航 |

---

### 六、Brand 品牌社交图标（33 个）

> Frame ID: `20:471`

**品牌 Logo：**
`X1_fill_GateLogo` · `X1_color_GateLogo` · `X1_fill_Apple` · `X1_fill_Google` · `X1_color_Google` · `X1_fill_Android` · `X1_fill_GooglePay` · `X1_color_Metamask` · `X1_color_GoogleAuthenticator` · `X1_color_Microsoft` · `X1_color_GoogleLens`

**社交媒体（实心）：**
`X1_fill_Github` · `X1_fill_Telegram` · `X1_fill_Twitter` · `X1_fill_Facebook` · `X1_fill_Whatsapp` · `X1_fill_Discord` · `X1_fill_Medium` · `X1_fill_YouTube` · `X1_fill_Instagram` · `X1_fill_LinkedIn` · `X1_fill_Vk` · `X1_fill_Whitepaper` · `X1_fill_Tiktok` · `X1_fill_Galaxy`

**社交媒体（圆形）：**
`X1_fill_TwitterCircle` · `X1_fill_TelegramCircle` · `X1_fill_DiscordCircle` · `X1_fill_RedditCircle` · `X1_fill_GithubCircle` · `X1_fill_FacebookCircle`

**数据平台：**
`X1_fill_Coingecko` · `X1_fill_CMC`

---

### 七、Flex 扩展图标（20 个）

> Frame ID: `31:38`

**合约/交易：**
`X1_fill_BtcFuture` · `X1_fill_Future` · `X1_fill_LeverageTrading` · `X1_line_Wallet` · `X1_line_Network` · `X1_line_Grid` · `X1_line_List` · `X1_line_Blacklist`

**运营/增长：**
`X1_fill_Rocket` · `X1_fill_Bind` · `X1_fill_Invitational` · `X1_fill_Affiliate` · `X1_fill_GateBooster`

**文档/设置：**
`X1_fill_SettingGear` · `X1_fill_Learn` · `X1_fill_Blog` · `X1_fill_Wiki` · `X1_fill_Announcement` · `X1_fill_Document` · `X1_fill_ApiAdmin` · `X1_fill_Gitbook` · `X1_fill_ThumbUp`

---

### ICON 使用规范

| 规范项 | 说明 |
|--------|------|
| **统一尺寸** | 24 × 24px（所有分类一致） |
| **默认风格** | 优先使用 `X1_fill_` 填充版本 |
| **线框风格** | 部分图标提供 `X1_line_` 版本，用于未激活/次要态 |
| **多色图标** | `X1_color_` 仅限品牌 Logo，保持原始品牌色 |
| **图标颜色** | 单色图标跟随文字/图标色 Token（参考通用组件色彩系统） |
| **侧栏菜单** | 缩放至 18px 使用 |
| **按钮内图标** | 与文字间距 4px，按钮 ≤32px 用 16px 图标，36-44px 用 20px，≥48px 用 24px |
| **Figma 获取** | 从 Figma MCP 直接导出 SVG，确保路径坐标归零 |
| **本地映射** | 优先读取 `SVG/icon-map.json` 获取已标准化的 SVG path 数据 |

---

## 核心图标 SVG Path 数据（24 个）

> **映射文件**：`SVG/icon-map.json`
> **独立 SVG**：`SVG/icons/X1_fill_XXX.svg`
> **Figma 索引**：`SVG/figma-icon-index.json`

以下为 B 端商户后台高频使用的 24 个核心图标，已从 Figma 导出并标准化。生成页面时直接引用 path 数据即可。

| 图标名 | viewBox | fillRule | 用途 |
|--------|---------|----------|------|
| `X1_fill_Add` | `0 0 18 18` | nonzero | 新增 |
| `X1_fill_Bell` | `0 0 17 19.9` | evenodd | 通知 |
| `X1_fill_CaretDown` | `0 0 15.72 8.76` | nonzero | 下拉箭头 |
| `X1_fill_CaretRight` | `0 0 10.02 18.24` | nonzero | 展开箭头 |
| `X1_fill_Check` | `0 0 20.87 13.49` | nonzero | 勾选 |
| `X1_fill_CheckCircle` | `0 0 20 20` | nonzero | 成功状态 |
| `X1_fill_Close` | `0 0 16.12 16.13` | nonzero | 关闭 |
| `X1_fill_Copy` | `0 0 17.8 17.8` | nonzero | 复制 |
| `X1_fill_Delete` | `0 0 18 17.8` | evenodd | 删除 |
| `X1_fill_Edit` | `0 0 17.79 17.45` | nonzero | 编辑 |
| `X1_fill_External` | `0 0 13.2 13.2` | nonzero | 外链跳转 |
| `X1_fill_Filter` | `0 0 16.01 18.81` | nonzero | 筛选 |
| `X1_fill_History` | `0 0 17.7 19.7` | nonzero | 历史 |
| `X1_fill_Home` | `0 0 17.8 17.9` | nonzero | 首页 |
| `X1_fill_InfoCircle` | `0 0 20 20` | nonzero | 信息提示 |
| `X1_fill_Manage` | `0 0 18.01 18.01` | nonzero | 管理 |
| `X1_fill_Member` | `0 0 16.3 18.4` | nonzero | 成员 |
| `X1_fill_Refresh` | `0 0 20 20` | nonzero | 刷新 |
| `X1_fill_Search` | `0 0 18.64 18.64` | nonzero | 搜索 |
| `X1_fill_Security` | `0 0 16.98 19.21` | nonzero | 安全验证 |
| `X1_fill_Send` | `0 0 20 20` | nonzero | 下发/发送 |
| `X1_fill_Setting` | `0 0 17.39 19.8` | nonzero | 设置 |
| `X1_fill_Transfer` | `0 0 18 18` | nonzero | 转账 |
| `X1_fill_WarningCirlce` | `0 0 20 20` | nonzero | 警告状态 |

**使用方法（HTML）**：

```html
<svg viewBox="0 0 18 18" width="24" height="24" fill="#303236">
  <path d="这里粘贴下方对应图标的 path 数据" />
</svg>
```

**追加新图标**：查看 `SVG/figma-icon-index.json` 获取 Figma Node ID → 调用 Figma MCP `get_design_context` → 下载 SVG 到 `SVG/icons/` → 重新生成 `icon-map.json`。

### SVG Path 数据

**X1_fill_Add** — 新增
```
M9.90039 8.09961H18V9.90039H9.90039V18H8.09961V9.90039H0V8.09961H8.09961V0H9.90039V8.09961Z
```

**X1_fill_Bell** — 通知（evenodd）
```
M11 19.9004H6V18.0996H11V19.9004Z M9.40039 0.000976562V1.66016C12.7857 2.10146 15.4004 4.99543 15.4004 8.50098V15.0996H17V16.9004H0V15.0996H1.59961V8.50098C1.59961 4.99543 4.21431 2.10146 7.59961 1.66016V0L9.40039 0.000976562ZM8.5 3.40137C5.68335 3.40137 3.40039 5.68432 3.40039 8.50098V15.0996H13.5996V8.50098C13.5996 5.68432 11.3167 3.40137 8.5 3.40137Z
```

**X1_fill_CaretDown** — 下拉箭头
```
M0 1.27334L1.27335 0L7.86173 6.58839L14.4501 1.16229e-06L15.7235 1.27335L8.4984 8.4984C8.14693 8.84987 7.57653 8.84987 7.22506 8.4984L0 1.27334Z
```

**X1_fill_CaretRight** — 展开箭头
```
M1.27335 0L9.53674e-07 1.27334L7.84861 9.12195L0 16.9706L1.27334 18.2439L9.75863 9.75863C10.1101 9.40715 10.1101 8.83675 9.75863 8.48528L1.27335 0Z
```

**X1_fill_Check** — 勾选
```
M1.27334 4.31515L8.27881 11.3206L19.5994 0L20.8728 1.27334L8.91548 13.2306C8.56403 13.5821 7.99361 13.5821 7.64214 13.2306L0 5.58849L1.27334 4.31515Z
```

**X1_fill_CheckCircle** — 成功状态
```
M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM8.52051 12.0645L5.22754 8.57129L3.77246 9.94336L7.77246 14.1855C7.9579 14.3822 8.21506 14.496 8.48535 14.5C8.75562 14.504 9.0159 14.3982 9.20703 14.207L16.207 7.20703L14.793 5.79297L8.52051 12.0645Z
```

**X1_fill_Close** — 关闭
```
M8.06445 6.79102L14.8486 0.00683594L16.1221 1.28027L9.33789 8.06445L16.1221 14.8486L14.8486 16.1221L8.06445 9.33789L1.27344 16.1289L0 14.8564L6.79102 8.06445L0 1.27344L1.27344 0L8.06445 6.79102Z
```

**X1_fill_Copy** — 复制
```
M12.9004 4C13.1391 4 13.3683 4.09489 13.5371 4.26367C13.7059 4.43245 13.8008 4.6617 13.8008 4.90039V16.9004C13.8008 17.3974 13.3974 17.8008 12.9004 17.8008H0.900391C0.403334 17.8008 1.82058e-08 17.3974 0 16.9004V4.90039C5.29244e-06 4.40334 0.403338 4 0.900391 4H12.9004ZM1.80078 16H12V5.80078H1.80078V16ZM16.9004 0C17.1391 9.9726e-08 17.3683 0.0948898 17.5371 0.263672C17.7059 0.432454 17.8008 0.661696 17.8008 0.900391V12.9004H16V1.80078H4.90039V0H16.9004Z
```

**X1_fill_Delete** — 删除（evenodd）
```
M9.90039 12.9004H8.09961V6.90039H9.90039V12.9004Z M18 3V4.80078H15.4004V16.9004C15.4004 17.3974 14.9971 17.8008 14.5 17.8008H3.5C3.00294 17.8008 2.59961 17.3974 2.59961 16.9004V4.80078H0V3H18ZM4.40039 16H13.5996V4.80078H4.40039V16Z M13 1.80078H5V0H13V1.80078Z
```

**X1_fill_Edit** — 编辑
```
M11.8428 7.74873C12.2333 8.1393 12.2332 8.77245 11.8427 9.16293L7.06055 13.9442L16.7892 13.9451C17.3414 13.9451 17.7891 14.3928 17.7891 14.9451V16.4451C17.7891 16.9974 17.3413 17.4451 16.789 17.4451L4.9259 17.4442L4.92529 17.4457L4.92469 17.4471H1C0.447715 17.4471 0 16.9994 0 16.4471V12.9346C0 12.6694 0.105357 12.415 0.292893 12.2275L7.60043 4.91993C7.99099 4.52937 8.62421 4.52941 9.01472 4.92001L11.8428 7.74873Z M16.4688 3.12098C16.8593 3.51146 16.8593 4.14454 16.4689 4.53508L14.7891 6.21545C14.3986 6.60605 13.7654 6.60614 13.3748 6.21564L10.5461 3.38762C10.1555 2.99711 10.1555 2.36388 10.5461 1.97332L12.2265 0.292893C12.617 -0.0976309 13.2502 -0.0976312 13.6407 0.292893L16.4688 3.12098Z
```

**X1_fill_External** — 外链跳转
```
M12.3039 0C12.5426 1.05367e-08 12.7718 0.0950014 12.9406 0.263784C13.1094 0.432567 13.2044 0.661762 13.2044 0.900456V9.38574H11.4035V3.07426L1.27334 13.2044L0 11.931L10.1301 1.80091H3.81865V0H12.3039Z
```

**X1_fill_Filter** — 筛选
```
M1.80078 3.55762L7.12988 8.44336V16.2891L8.88379 15.084V8.44336L9.1748 8.17578L14.2129 3.55762V1.80078H1.80078V3.55762ZM16.0137 3.91016C16.0136 4.19036 15.896 4.4581 15.6895 4.64746L10.6836 9.23438V15.5049C10.6836 15.8342 10.5214 16.1425 10.25 16.3291L6.89648 18.6348C6.2331 19.0904 5.33027 18.6154 5.33008 17.8105V9.23438L0.324219 4.64746C0.117684 4.4581 5.14822e-05 4.19036 0 3.91016V1C0.000210793 0.448022 0.448027 0.000210919 1 0H15.0137C15.5656 0.000211262 16.0135 0.448018 16.0137 1V3.91016Z
```

**X1_fill_History** — 历史
```
M12.8672 14.0381H14.8076V15.8389H11.9668C11.4698 15.8389 11.0664 15.4355 11.0664 14.9385V12.0693H12.8672V14.0381Z M12.3008 8.90039C15.2831 8.90039 17.7012 11.3184 17.7012 14.3008C17.7012 17.2831 15.2831 19.7012 12.3008 19.7012C9.31844 19.7012 6.90039 17.2831 6.90039 14.3008C6.90039 11.3184 9.31844 8.90039 12.3008 8.90039ZM12.3008 10.7012C10.3126 10.7012 8.70117 12.3126 8.70117 14.3008C8.70117 16.289 10.3126 17.9004 12.3008 17.9004C14.289 17.9004 15.9004 16.289 15.9004 14.3008C15.9004 12.3126 14.289 10.7012 12.3008 10.7012Z M11.6631 0.00488281C11.864 0.0244031 12.0535 0.110794 12.2002 0.251953L15.5244 3.45312C15.7005 3.62274 15.8007 3.85704 15.8008 4.10156V6.89355H14V4.4834L11.2139 1.80078H1.80078V17H4.91211V18.8008H0.900391C0.403334 18.8008 0 18.3974 0 17.9004V0.900391C0 0.403334 0.403334 0 0.900391 0H11.5762L11.6631 0.00488281Z
```

**X1_fill_Home** — 首页
```
M8.5 0.0936005C8.79363 -0.0522629 9.14857 -0.0274932 9.42188 0.166843L17.4219 5.8563C17.6592 6.02506 17.8007 6.29853 17.8008 6.58969V17.9002H16V7.05356L8.90039 2.00376L1.80078 7.05356V17.9002H0V6.58969C0.000119961 6.29853 0.141624 6.02506 0.378906 5.8563L8.37891 0.166843L8.5 0.0936005ZM11.9004 13.5331V15.3338H5.90039V13.5331H11.9004Z
```

**X1_fill_InfoCircle** — 信息提示
```
M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM8.52051 12.0645L5.22754 8.57129L3.77246 9.94336L7.77246 14.1855C7.9579 14.3822 8.21506 14.496 8.48535 14.5C8.75562 14.504 9.0159 14.3982 9.20703 14.207L16.207 7.20703L14.793 5.79297L8.52051 12.0645Z
```

**X1_fill_Manage** — 管理
```
M17.1123 0C17.6092 0.000140336 18.0127 0.403421 18.0127 0.900391V17.1123C18.0126 17.6092 17.6092 18.0126 17.1123 18.0127H0.900391C0.403421 18.0127 0.000140917 17.6092 0 17.1123V0.900391C0 0.403334 0.403334 0 0.900391 0H17.1123ZM9.90625 16.2129H16.2129V1.80078H9.90625V16.2129ZM1.80078 16.2129H8.10645V9.98145H1.80078V16.2129ZM1.80078 8.18164H8.10645V1.80078H1.80078V8.18164Z
```

**X1_fill_Member** — 成员
```
M11.4004 9.59961C14.1065 9.59961 16.3008 11.7938 16.3008 14.5V17.5C16.3006 17.9969 15.8973 18.4004 15.4004 18.4004H0.900391C0.403472 18.4004 0.000222797 17.9969 0 17.5V14.5C0 11.7938 2.1942 9.59961 4.90039 9.59961H11.4004ZM4.90039 11.4004C3.18831 11.4004 1.80078 12.7879 1.80078 14.5V16.5996H14.5V14.5C14.5 12.788 13.1125 11.4004 11.4004 11.4004H4.90039Z M8.15039 0C10.4424 8.05261e-08 12.3008 1.85841 12.3008 4.15039C12.3008 6.44237 10.4424 8.30078 8.15039 8.30078C5.85841 8.30078 4.00001 6.44237 4 4.15039C4 1.85841 5.85841 0 8.15039 0ZM8.15039 1.80078C6.85252 1.80078 5.80078 2.85252 5.80078 4.15039C5.80079 5.44825 6.85253 6.5 8.15039 6.5C9.44825 6.5 10.5 5.44825 10.5 4.15039C10.5 2.85252 9.44826 1.80078 8.15039 1.80078Z
```

**X1_fill_Refresh** — 刷新
```
M20 10C20 15.5228 15.5227 19.9999 10 20C6.66688 19.9999 3.71673 18.368 1.90039 15.8633V17.5H0.0996094V13.1182C0.0996094 12.6211 0.502972 12.2178 1 12.2178H5.07324V14.0176H2.85156C4.25846 16.5152 6.93273 18.2001 10 18.2002C14.5286 18.2001 18.2002 14.5287 18.2002 10H20Z M10 0C13.3322 0.000119482 16.2835 1.63053 18.0996 4.13379V2.5H19.9004V6.88184C19.9004 7.37887 19.497 7.78219 19 7.78223H14.9268V5.98242H17.1504C17.0841 5.86474 17.0152 5.74877 16.9434 5.63477C15.4902 3.32911 12.9228 1.80091 10 1.80078C5.47159 1.80101 1.80099 5.47159 1.80078 10H0C0.0002113 4.47747 4.47748 0.00023088 10 0Z
```

**X1_fill_Search** — 搜索
```
M8 0C12.4183 0 16 3.58172 16 8C16 9.88461 15.3462 11.6153 14.2559 12.9824L18.6367 17.3633L17.3633 18.6367L12.9824 14.2559C11.6153 15.3462 9.88461 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.7998C4.57583 1.7998 1.7998 4.57583 1.7998 8C1.7998 11.4242 4.57583 14.2002 8 14.2002C11.4242 14.2002 14.2002 11.4242 14.2002 8C14.2002 4.57583 11.4242 1.7998 8 1.7998Z
```

**X1_fill_Security** — 安全验证
```
M16.3035 2.61871C16.7078 2.75719 16.9795 3.13736 16.9795 3.56477V8.76135C16.9795 11.1954 16.1789 13.4093 14.5781 15.403C13.026 17.3362 11.0708 18.5957 8.712 19.1812C8.56638 19.2174 8.41408 19.2174 8.26846 19.1812C5.90945 18.5958 3.95355 17.3363 2.40137 15.403C0.800633 13.4093 9.4097e-06 11.1954 0 8.76135V3.5648C0 3.13737 0.271665 2.7572 0.676046 2.61873L8.16626 0.0539273C8.37626 -0.0179797 8.60421 -0.0179756 8.8142 0.0539387L16.3035 2.61871ZM7.96935 9.82427C7.85552 9.93807 7.67218 9.94177 7.55386 9.83265L5.7127 8.13464C5.59091 8.02232 5.40113 8.02999 5.2888 8.15177L4.00036 9.54856C3.88799 9.67038 3.89569 9.86024 4.01756 9.97256L7.62513 13.2976C7.74346 13.4067 7.92678 13.4029 8.04058 13.2891L13.5808 7.74887C13.698 7.63172 13.698 7.44177 13.5808 7.32461L12.2375 5.98127C12.1204 5.86412 11.9304 5.86411 11.8133 5.98125L7.96935 9.82427Z
```

**X1_fill_Send** — 下发/发送
```
M20 10L10 20L0 10L10 0L20 10ZM4.5 9.15723L6.62109 11.2783L8.5 9.39941V15.1572H11.5V9.08594L13.6924 11.2783L15.8135 9.15723L10.1572 3.5L4.5 9.15723Z
```

**X1_fill_Setting** — 设置
```
M8.35156 0.0676777C8.60741 -0.0376024 8.90008 -0.0200718 9.14355 0.120412L16.9375 4.6204C17.2159 4.78119 17.3877 5.0782 17.3877 5.3997V14.3987C17.3877 14.7202 17.2159 15.0172 16.9375 15.178L9.14355 19.678C8.86518 19.8386 8.52252 19.8386 8.24414 19.678L0.450195 15.178C0.171802 15.0172 1.76454e-05 14.7202 0 14.3987V5.3997C0 5.07818 0.171757 4.78118 0.450195 4.6204L8.24414 0.120412L8.35156 0.0676777ZM1.7998 5.91825V13.8792L8.69336 17.8596L15.5879 13.8792V5.91825L8.69336 1.93779L1.7998 5.91825ZM8.69336 6.49833C10.571 6.49833 12.0936 8.02109 12.0938 9.89871C12.0938 11.7765 10.5711 13.2991 8.69336 13.2991C6.81559 13.2991 5.29297 11.7765 5.29297 9.89871C5.29314 8.02109 6.8157 6.49833 8.69336 6.49833ZM8.69336 8.29911C7.80981 8.29911 7.09392 9.01521 7.09375 9.89871C7.09375 10.7824 7.8097 11.4983 8.69336 11.4983C9.57701 11.4983 10.293 10.7824 10.293 9.89871C10.2928 9.01521 9.57691 8.29911 8.69336 8.29911Z
```

**X1_fill_Transfer** — 转账
```
M17.7092 3.42961C18.0997 3.82014 18.0997 4.4533 17.7092 4.84383L14.2796 8.27344L13.0071 7L14.97 5.03711L3.90039 5.03711C2.7408 5.03724 1.80093 5.9771 1.80078 7.13672V8.13965H0L0.000976562 7.13575C0.00151031 4.98233 1.74694 3.23646 3.90039 3.23633L14.97 3.23633L13.0071 1.27344L14.2796 0L17.7092 3.42961Z M0.294725 14.5738C-0.0957989 14.1833 -0.0957989 13.5501 0.294725 13.1596L3.72434 9.73L4.9968 11.0034L3.03391 12.9663L14.1035 12.9663C15.2631 12.9662 16.203 12.0263 16.2031 10.8667V9.86379H18.0039L18.0029 10.8677C18.0024 13.0211 16.257 14.767 14.1035 14.7671L3.03391 14.7671L4.9968 16.73L3.72434 18.0034L0.294725 14.5738Z
```

**X1_fill_WarningCirlce** — 警告状态
```
M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.5 10.5V4.5H11.5V10.5H8.5ZM8.5 15.5V12.5H11.5V15.5H8.5Z
```
