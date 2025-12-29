# PB 荣誉墙

跑团个人最佳成绩（Personal Best）展示应用，适合嵌入 Notion 使用。

## 技术栈

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- papaparse（CSV 解析）
- lucide-react（图标）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 数据源配置

### 方式 1：本地 CSV 文件（默认）

将 CSV 文件放在 `public/mock-data.csv`，格式如下：

```csv
Name,Event,Time,Date,Note
张伟,5km,00:19:30,2024-05-20,奥林匹克公园晨跑
```

### 方式 2：Google Sheets 实时数据

1. **准备 Google Sheets**
   - 创建公开的 Google Sheets 表格
   - 列名必须与 CSV 格式一致：`Name`, `Event`, `Time`, `Date`, `Note`
   - 将表格设置为"任何人可查看"

2. **获取表格 ID**
   - 从表格 URL 中提取 ID：`https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

3. **修改配置文件**

   编辑 [src/config/dataSource.ts](src/config/dataSource.ts)：

   ```typescript
   export const DATA_SOURCE_CONFIG = {
     USE_GOOGLE_SHEETS: true,  // 改为 true 启用 Google Sheets
     SPREADSHEET_ID: '你的表格ID',
     SHEET_NAME: 'Sheet1',      // 工作表名称
     CSV_FILE_PATH: './mock-data.csv',
   };
   ```

4. **重启开发服务器**

   ```bash
   npm run dev
   ```

### 数据自动同步

启用 Google Sheets 后，应用会：
- 实时从 Google Sheets 获取数据（通过 opensheet.elk.sh 服务）
- 每次刷新页面自动同步最新数据
- 无需手动导出 CSV 文件

## 数据格式说明

### 字段说明

| 字段 | 必填 | 格式 | 说明 |
|:---|:---:|:---|:---|
| **Name** | ✅ | 文本 | 成员姓名 |
| **Event** | ✅ | 枚举 | 项目类型（见下表）|
| **Time** | ✅ | HH:MM:SS | 成绩时间 |
| **Date** | ✅ | YYYY-MM-DD | 创造日期 |
| **Note** | ❌ | 文本 | 备注（如赛事名称）|

### Event 支持的项目类型

| 输入值 | 识别为 | 显示 |
|:---|:---|:---|
| `1km`, `1k` | 1km | 1KM |
| `3km`, `3k` | 3km | 3KM |
| `5km`, `5k` | 5km | 5KM |
| `10km`, `10k` | 10km | 10KM |
| `Half`, `HalfMarathon`, `半程`, `半马` | 半马 | 半马 |
| `Full`, `Marathon`, `全程`, `全马` | 全马 | 全马 |

### 时间格式支持

- `MM:SS` - 如 `19:30`（19分30秒）
- `HH:MM:SS` - 如 `01:32:00`（1小时32分）

## 功能特性

✅ 自动聚合同一成员的多条记录
✅ 按项目显示最佳成绩
✅ 响应式网格布局（手机/平板/桌面）
✅ 实时搜索功能
✅ 加载状态与空状态处理
✅ 彩色项目徽章
✅ 显示赛事备注
✅ **Google Sheets 实时数据同步**
✅ **智能首字母头像**（中文/英文）

## 项目结构

```
src/
├── components/
│   ├── HonorWall/      # 核心业务组件
│   ├── Layout/         # 布局组件
│   └── ui/             # 基础 UI 组件
├── config/             # 配置文件
│   └── dataSource.ts   # 数据源配置
├── hooks/              # 自定义 Hook
├── lib/                # 工具函数
├── types/              # TypeScript 类型定义
└── App.tsx
```

## 常见问题

### Q: 如何切换回 CSV 文件？

编辑 `src/config/dataSource.ts`，将 `USE_GOOGLE_SHEETS` 改为 `false`。

### Q: Google Sheets 数据不更新？

1. 确认表格已设置为公开
2. 检查表格 ID 是否正确
3. 清空浏览器缓存后重试

### Q: 支持哪些浏览器？

Chrome/Edge/Safari/Firefox 最新版本。
