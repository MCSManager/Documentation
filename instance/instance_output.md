# 获取日志输出

其作用可以帮助获取命令执行后的部分返回内容，也可以用于最近情况分析。

此 API 的工作原理是记录最后 256KB 大小的输出内容，超出部分将删除。  

地址

```
/api/protected_instance/outputlog
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 守护进程下的实例 UUID
remote_uuid: String; // 守护进程 UUID
apikey: String; // API 密钥
```

响应

```json
// 暂不支持命令结果的返回
{"status":200,"data":"Microsoft Windows [版本 10.0.22000.652]\r\n(c) Microsoft Corporation。保留所有权利。\r\n\r\nD:\\Workspace\\MCSM\\MCSManager 9.4.4_win64_x86\\daemon\\data\\InstanceData\\2a74a638a47f480b889659dde852c9d7>ping www.baidu.com\n\r\n正在 Ping www.baidu.com [183.232.231.174] 具有 32 字节的数据:\r\n来自 183.232.231.174 的回复: 字节=32 时间=25ms TTL=54\r\n来自 183.232.231.174 的回复: 字节=32 时间=24ms TTL=54\r\n来自 183.232.231.174 的回复: 字节=32 时间=24ms TTL=54\r\n来自 183.232.231.174 的回复: 字节=32 时间=30ms TTL=54\r\n\r\n183.232.231.174 的 Ping 统计信息:\r\n    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，\r\n往返行程的估计时间(以毫秒为单位):\r\n    最短 = 24ms，最长 = 30ms，平均 = 25ms\r\n\r\nD:\\Workspace\\MCSM\\MCSManager 9.4.4_win64_x86\\daemon\\data\\InstanceData\\2a74a638a47f480b889659dde852c9d7>","time":1651731475898}
```
