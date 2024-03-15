# 从 9.x 版本升级

:::tip
MCSManager 10.x 版本的配置文件，数据文件格式 和 API 相比 9.x 版本都有些许差异，但是 90% 的 API 依然可以正常使用。
:::

## 我的数据储存在哪里？

如果你已经安装 9.x 版本并且使用的是一键安装脚本，在 Linux 下，你的数据在：

- 实例相关的数据：`/opt/mcsmanager/daemon/data`

- 用户相关的数据：`/opt/mcsmanager/web/data`

Windows 下同理，分别在 `daemon` 和 `web` 两个文件夹中。

## 步骤

1. 下载最新的 MCSManager 10.x 发行版包，并解压它。

2. 备份你的 9.x 数据（可选），并关闭面板。

> 只需复制 daemon/data，web/data 这两个目录中的所有文件即可完成备份。

3. 分别进入 9.x 版本的 `daemon` 和 `web` 两个文件夹。

4. 删除 9.x 文件中**除了 daemon/data，web/data 之外**的所有文件，然后将 10.x 版本的里面的 daemon 和 web 文件夹分别复制到对应的文件夹中，这样就可以确保数据不会损坏的情况下，升级到 10.x 版本。

5. 启动面板

:::tip
你必须删除旧代码再复制新代码到文件夹中，而不是直接覆盖文件，有很多用户指出直接采用覆盖文件的做法有很大概率会出现问题，这是因为覆盖文件之后的旧版本残留文件依然在影响着新版本。
:::

## API 升级

如果你正在使用 MCSManager 9.x 版本的 Discord 机器人，QQ 机器人，SDK，和非官方开发的工具，可能会需要联系作者进行适配。

10.x 有一部分的破坏性更新，分别如下：

**1. 对应更新用户信息的 API，给用户分配实例时，原本的数据格式是这样：**

**9.x**

```js
{
    "userName": "lmh",
    // more...
    "instances": [
        {
        "instanceUuid": "bc3cd400b8f54be2b14078c7dd4d1820",
        "serviceUuid": "af7acf6cb7414d13916b9a9bd39a2b60"
        }
    ],
}
```

现在需要这样，我们将 `serviceUuid` 改成了 `daemonId`:

**10.x**

```js
{
    "userName": "lmh",
    // more...
    "instances": [
        {
            "instanceUuid": "d0999ed2c57348868f56d11d2edf8806",
            "daemonId": "2068878ada35464c940bf84750b20333"
        },
    ],
}
```

**2. 实例到期时间，创建时间，最后启动时间从原本的文本形式升级到时间戳格式。**

**9.x**

```js
{
    "nickname": "Test Instance",
    "startCommand": "java -Xmx4G -jar server.jar -nogui",
    "stopCommand": "stop",
    // ... more
    "createDatetime": "10/14/2023",
    "lastDatetime": "12/24/2023 16:28",
    "endTime": "2/12/2025, 5:45:44 PM",
}
```

**10.x**

```js
{
    "nickname": "Test Instance",
    "startCommand": "java -Xmx4G -jar server.jar -nogui",
    "stopCommand": "stop",
    // ... more
    "createDatetime": 1709631756708,
    "lastDatetime": 1710330661317,
    "endTime": 0,
}
```

**3. 用户信息 Docker 字段中的 `extraVolumes` 升级使用 `|` 进行分割，不支持 `:ro` 等定义。**

这种更改主要是为了兼容 Windows Docker。

**10.x**

```js
// more...
"docker": {
    "containerName": "",
    // more...
    "extraVolumes": [
        "myhost/a/b/|container/work"
    ],
}
```

**4. API 守护进程 ID 参数更改**

这里以开启实例的 API 举例：

**9.X**

```http
POST /api/protected_instance/open?remote_uuid={Daemon ID}&uuid={Instance ID}&apikey={Api Key}
```

**10.X**

```http
// remote_uuid --> daemonId
POST /api/protected_instance/open?daemonId={Daemon ID}&uuid={Instance ID}&apikey={Api Key}
```

注意：此更改是可选的，`10.x` 依然兼容 `remote_uuid` 参数，但不推荐。
