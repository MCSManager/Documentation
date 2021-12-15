# 压缩/解压文件

地址
```
/api/files/compress
```

请求方式
```
POST
Content-Type: application/json; charset=utf-8
```

查询参数
```js
uuid: String        // 实例的 UUID
remote_uuid: String // 远程服务 UUID
apikey: String      // API 密钥
```

请求参数（Query）
```json
{
    "type":1,                   // 1为压缩，2为解压 
    "source":"testzip.zip",     // 压缩包名称
    "targets":[
        "eula.txt",             // 要压缩的东西
        "spigot.yml",
        "world"
    ] 
}
// 如果是解压，targets只需填解压的文件夹名称即可
// 例如"targets":"testDir" 就是把压缩包解压到testDir文件夹
```

响应
```json
{
    "status": 200,
    "data": true,
    "time": 1633180183159
}
```
