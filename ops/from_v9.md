# Upgrading from MCSManager 9.x

:::tip
The configurations, file formats, and API usage in MCSManager 10 are slightly different than version 9.x. However, 90% of the API calls can still be used as it.
:::

## Where is my Current Data？

If your version 9.x was installed using the one-click script, on Linux, your data is located in:

- Instance-related data: `/opt/mcsmanager/daemon/data`

- User-related data: `/opt/mcsmanager/web/data`

Similarly, on Windows, the data is in the `daemon` and `web` directories respectively.

## Upgrading Steps

1. Download and extract the latest MCSManager 10.x release package.

2. Shut down all panel services and back up your data.

> Simply copy all the files in `daemon/data` and `web/data` to complete the backup.

3. Enter the `daemon` and `web` directories of the 9.x version.

4. Delete all files in the 9.x files **except for `daemon/data` and `web/data`**, then copy the daemon and web folders from the 10.x version into the corresponding folders. 

5. Start the panel.

:::tip
You must delete the old code and then copy the new code into the folder, rather than overwriting the files. Many users have pointed out that overwriting files often leads to problems due to extra files from the old version.
:::

## Upgrading APIs

If you are using MCSManager 9.x version of Discord bot, QQ bot, SDK, and unofficial tools, you may need to contact the developer for adaptation.

There are several breaking updates in 10.x, including:

**1. Update to User Information API:**

**In 9.x, assigning an instance to a user looked like this:**

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

**Now in 10.x, `serviceUuid` is changed to `daemonId`:**

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

**2. Instance expiry time, creation time, and last start time are upgraded from text format to timestamp format.**

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
**3. Docker field `extraVolumes` of User Information updated to use `|` for separation, not supporting definitions like `:ro`.**

 This is mainly for compatibility with Windows Docker.

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
**4. Change of the daemon ID parameter.**

For example, the API to start an instance:

**9.X**

```http
POST /api/protected_instance/open?remote_uuid={Daemon ID}&uuid={Instance ID}&apikey={Api Key}
```

**10.X**

```http
// remote_uuid --> daemonId
POST /api/protected_instance/open?daemonId={Daemon ID}&uuid={Instance ID}&apikey={Api Key}
```

Note: This change is optional. `10.x` still supports the `remote_uuid` parameter, but it's not recommended as it could be removed anytime in the future without notice.
