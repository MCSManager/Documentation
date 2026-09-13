# 计划任务 API

本页所有路由均挂载在 `/api/protected_schedule` 前缀下，用于管理远程 daemon 上附着于某实例的计划任务。

:::tip 访问校验
一个 router 级中间件会从 **query string** 中读取 `uuid`（实例 UUID）与 `daemonId`，并校验调用者是否拥有该实例的访问权限。若访问被拒，服务端返回 `403`。因此每次调用都必须带上 `uuid` 与 `daemonId`。
:::

## 获取计划任务列表

列出某实例的计划任务。

```http
GET /api/protected_schedule
```

:::tip 权限
用户（`1`）或以上。
:::

#### Query 参数

```js
{
  daemonId: string,   // 远程 daemon ID
  uuid: string         // 实例 UUID
}
```

#### 返回示例

响应由远程 daemon 的 `schedule/list` 通道透传，具体结构取决于 daemon 版本，通常为任务描述数组。

```json
{
  "status": 200,
  "data": [
    {
      "name": "auto-restart",
      "count": -1,
      "time": "0 0 * * *",
      "actions": ["restart"],
      "type": 1
    }
  ],
  "time": 1718594177859
}
```

## 创建计划任务

为某实例创建一个新计划任务。

```http
POST /api/protected_schedule
```

:::tip 权限
用户（`1`）或以上。
:::

#### Query 参数

```js
{
  daemonId: string,   // 远程 daemon ID
  uuid: string         // 实例 UUID
}
```

#### 请求正文

```json
{
  "name": "auto-restart",   // 任务名。不得包含文件名黑名单字符。
  "count": -1,              // 执行次数。-1 = 永久重复, 0 = 禁用, N>0 = 执行 N 次
  "time": "0 0 * * *",      // 计划表达式 / 时间字符串（具体含义取决于任务类型）
  "actions": ["restart"],   // 任务触发时要执行的动作列表
  "type": 1                 // 任务类型（如 1=类 cron, 2=间隔 等，由 daemon 定义）
}
```

:::warning
任务 `name` 会经 `FILENAME_BLACKLIST` 校验——名称中包含禁止字符（如 `/`、`\`、`:`、`*`、`?`、`"`、`<`、`>`、`|`）会导致请求报错。
:::

#### 返回示例

响应由远程 daemon 的 `schedule/register` 通道透传。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 删除计划任务

按任务名删除一个计划任务。

```http
DELETE /api/protected_schedule
```

:::tip 权限
用户（`1`）或以上。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  uuid: string,         // 实例 UUID
  task_name: string     // 要删除的计划任务名
}
```

#### 返回示例

响应由远程 daemon 的 `schedule/delete` 通道透传。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```
