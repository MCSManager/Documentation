# API 使用方式


## 获取 API KEY

从这里可以获取 `API KEY`，这是调用 `API` 接口必须的密钥，每个用户的 `API KEY` 不一致，代表的权限也不一致。

比如管理员权限的 API KEY 可以控制所有 `应用实例`，而普通用户则只能控制它自己的拥有的 `应用实例`。

<img src="zh-cn/apis/imgs/get_apikey.png" height="400px"/>

<br />

## 获取 remote_uuid 和 uuid

比如 [向实例发送命令](/zh-cn/apis/instance/command_instance) 这个接口，需要提供 `uuid` 和 `remote_uuid` 两个参数。

`uuid` 指应用实例的 ID。

`remote_uuid` 指远程节点 ID。

获取方式如下：

<img src="zh-cn/apis/imgs/get_remote_uuid.png" height="400px"/>

## 注意事项

MCSManager 的 API 不仅仅只是用于第三方程序调用，包括自身的网页前端也是使用这些 API，所以如果面板包含这样的功能，那么就一定存在这样的 API 接口，只要某个接口附带了 `apikey` 这个参数，就会自动切换为 API 调用模式。

随着接口的不断更新和迭代，可能会有细微上的差别，但没有同步到文档中。

## 开始使用吧

建议从 [向实例发送命令](/zh-cn/apis/instance/command_instance) 这个接口开始学习。

MCSManager 面板的 API 接口十分简单和丰富，祝你好运。