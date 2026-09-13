# Java 管理器 API

本页所有路由均挂载在 `/api/java_manager` 前缀下，用于管理远程 daemon 上安装的 Java 运行环境，以及将运行环境绑定到指定实例。

:::tip 访问校验
该前缀下的所有路由都会经过一个 router 级中间件，从 **query string** 中读取 `daemonId` 与
`instanceId`，并校验调用者是否拥有该实例的访问权限。因此，即便 `add` / `delete` 路由的 body
validator 未列出 `instanceId`，每次调用都必须在 query 中带上 `daemonId` 与 `instanceId`。
:::

## 获取 Java 运行环境列表

列出远程 daemon 上可用的 Java 运行环境。

```http
GET /api/java_manager/list
```

:::tip 权限
用户（`1`）或以上。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  instanceId: string   // 实例 UUID（被访问中间件使用）
}
```

#### 返回示例

返回 `IJavaRuntime` 数组（见[类型](#类型)）。响应由远程 daemon 的 `java_manager/list` 通道透传。

```json
{
  "status": 200,
  "data": [
    {
      "info": {
        "fullname": "Java 17.0.10",
        "path": "/opt/java/jdk-17/bin/java",
        "installTime": 1718594177859,
        "downloading": false
      },
      "path": "/opt/java/jdk-17/bin/java",
      "usingInstances": ["50c73059001b436fa85c0d8221c157cf"]
    }
  ],
  "time": 1718594177859
}
```

## 添加 Java 运行环境

在远程 daemon 上注册一个位于自定义路径的已有 Java 运行环境。

```http
POST /api/java_manager/add
```

:::tip 权限
仅管理员（`10`）。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  instanceId: string   // 实例 UUID（被访问中间件使用）
}
```

#### 请求正文

```json
{
  "name": "Java 17",          // 运行环境显示名
  "path": "/opt/java/jdk-17/bin/java"  // java 可执行文件的绝对路径
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 下载 Java 运行环境

下载并安装指定版本的 Java 运行环境到远程 daemon。

```http
POST /api/java_manager/download
```

:::tip 权限
仅管理员（`10`）。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  instanceId: string   // 实例 UUID（被访问中间件使用）
}
```

#### 请求正文

```json
{
  "name": "Java 17",     // 运行环境显示名
  "version": "17"        // 要下载的 Java 大版本号
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 设置实例 Java 运行环境

按运行环境 `id` 将某个 Java 运行环境绑定到指定实例。

```http
POST /api/java_manager/using
```

:::tip 权限
用户（`1`）或以上。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  instanceId: string   // 要绑定运行环境的实例 UUID
}
```

#### 请求正文

```json
{
  "id": "string"   // daemon 上 Java 运行环境的 ID
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 删除 Java 运行环境

从远程 daemon 删除某个 Java 运行环境。

```http
DELETE /api/java_manager/delete
```

:::tip 权限
仅管理员（`10`）。
:::

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  instanceId: string   // 实例 UUID（被访问中间件使用）
}
```

#### 请求正文

```json
{
  "id": "string"   // 要删除的 Java 运行环境 ID
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 类型

### `IJavaInfo`

描述单个已安装的 Java 运行环境。

```json
{
  "fullname": "string",     // 完整版本字符串，如 "Java 17.0.10"
  "path": "string",          // 可选。java 可执行文件的绝对路径
  "installTime": 1718594177859, // 安装时间，Unix 时间戳（毫秒）
  "downloading": false       // 是否正在下载中
}
```

### `IJavaRuntime`

将 `IJavaInfo` 与其使用的路径以及当前绑定该运行环境的实例列表封装在一起。

```json
{
  "info": "IJavaInfo",        // 运行环境描述（见上）
  "path": "string",          // 实际用于启动 Java 的可执行文件路径
  "usingInstances": ["string"] // 当前使用该运行环境的实例 UUID 列表
}
```

### `IInstanceJavaConfig`

嵌入在实例配置中的 Java 配置，通过 id 引用一个运行环境。

```json
{
  "id": "string"   // 绑定到实例的 Java 运行环境 ID
}
```
