# API 使用教程

## API Key

:::tip
如果你是管理员账号，那么你的 APIKEY 将同时拥有管理员权限，请<b>不要</b>泄漏你的 APIKEY。

如果您需要制作外接程序，请牢记将API写入后端进行隐藏！
:::

如图所示

<img src="../../images/zh_cn/to_user_info.png" style="width:300px" />

生成并复制此 API 密钥，它将具有与您当前帐户相同的权限。

<img src="../../images/zh_cn/getkey.png" style="width:400px" />

## 示例用法

假设您是一名管理员，并且希望使用 API 来“获取远程节点列表”。您需要使用任何编程语言或 HTTP 工具来发送以下请求：

```bash
GET http://demo.com/api/service/remote_services_system?apikey=<你的 Api Key>
Content-Type: application/json; charset=utf-8
X-Requested-With: XMLHttpRequest

注意：URL后面一定要加入 apikey 参数，否则权限不足
```

:::warning
如果没有另行指定，**这些 HTTP 请求头是必需的**。

- X-Requested-With: XMLHttpRequest
- Content-Type: application/json; charset=utf-8

:::

您将获得所有节点的所有数据：

```json
{
  // 状态参数
  // 200：正常，返回相应内容
  // 400：请求参数不正确
  // 403：权限不足
  // 500：程序错误
  "status": 200,
  // 响应节点列表
  "data": [
    {
      "version": "3.9.0",
      "process": {
        "cpu": 5625000 //CPU 使用
        "memory": 132437320, // 内存使用
        "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon" //守护进程 目录
      },
      "instance": {
        "running": 1, // 运行的实例
        "total": 6 // 总共实例
      },
      "system": {
        "type": "Windows_NT", //系统类型
        "hostname": "MyComputer", //系统名称 
        "platform": "win32", //系统平台
        "release": "11.0.22000", //版本
        "uptime": 410445, //在线时长
        "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon", //守护进程 目录
        "loadavg": [0, 0, 0], //负载
        "freemem": 5700775936, //剩余内存
        "cpuUsage": 0.0490009222256379, //CPU使用
        "memUsage": 0.6651475749266619, //内存使用
        "totalmem": 17024741376, //总内存
        "processCpu": 0,
        "processMem": 0
      }
    }
  ],
  // 请求完成处理的时间可用于测量延迟。
  "time": 1643879914006
}
```
