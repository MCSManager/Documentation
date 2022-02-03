# 获取指定实例配置文件内容

地址

```
/api/protected_instance/process_config/file
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数

```js
uuid: String; // 实例的 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
fileName: String; // 文件名称
```

响应 （这里为上面*查询参数*里的`spigot.yml`）

```json
{
  "status": 200,
  "data": {
    "config-version": 12,
    "settings": {
      "debug": false,
      "save-user-cache-on-stop-only": false,
      "sample-count": 12,
      "player-shuffle": 0,
      "user-cache-size": 1000,
      "bungeecord": false,
      "netty-threads": 4,
      "timeout-time": 60,
      "restart-on-crash": true,
      "restart-script": "./start.sh",
      "moved-too-quickly-multiplier": 10,
      "moved-wrongly-threshold": 0.0625,
      "log-villager-deaths": true,
      "attribute": {
        "maxHealth": {
          "max": 2048
        },
        "movementSpeed": {
          "max": 2048
        },
        "attackDamage": {
          "max": 2048
        }
      }
    },
    "messages": {
      "whitelist": "You are not whitelisted on this server!",
      "unknown-command": "Unknown command. Type \"/help\" for help.",
      "server-full": "The server is full!",
      "outdated-client": "Outdated client! Please use {0}",
      "outdated-server": "Outdated server! I'm still on {0}",
      "restart": "Server is restarting"
    },
    "commands": {
      "replace-commands": ["setblock", "summon", "testforblock", "tellraw"],
      "spam-exclusions": ["/skill"],
      "tab-complete": 0,
      "send-namespaced": true,
      "log": true,
      "silent-commandblock-console": false
    },
    "players": {
      "disable-saving": false
    },
    "advancements": {
      "disable-saving": false,
      "disabled": ["minecraft:story/disabled"]
    },
    "stats": {
      "disable-saving": false,
      "forced-stats": {}
    },
    "world-settings": {
      "default": {
        "verbose": false,
        "wither-spawn-sound-radius": 0,
        "seed-village": 10387312,
        "seed-desert": 14357617,
        "seed-igloo": 14357618,
        "seed-jungle": 14357619,
        "seed-swamp": 14357620,
        "seed-monument": 10387313,
        "seed-shipwreck": 165745295,
        "seed-ocean": 14357621,
        "seed-outpost": 165745296,
        "seed-endcity": 10387313,
        "seed-slime": 987234911,
        "seed-bastion": 30084232,
        "seed-fortress": 30084232,
        "seed-mansion": 10387319,
        "seed-fossil": 14357921,
        "seed-portal": 34222645,
        "dragon-death-sound-radius": 0,
        "nerf-spawner-mobs": false,
        "hanging-tick-frequency": 100,
        "zombie-aggressive-towards-villager": true,
        "item-despawn-rate": 6000,
        "view-distance": "default",
        "enable-zombie-pigmen-portal-spawns": true,
        "mob-spawn-range": 6,
        "max-tnt-per-tick": 100,
        "hopper-amount": 1,
        "arrow-despawn-rate": 1200,
        "trident-despawn-rate": 1200,
        "end-portal-sound-radius": 0,
        "merge-radius": {
          "exp": 3,
          "item": 2.5
        },
        "growth": {
          "cactus-modifier": 100,
          "cane-modifier": 100,
          "melon-modifier": 100,
          "mushroom-modifier": 100,
          "pumpkin-modifier": 100,
          "sapling-modifier": 100,
          "beetroot-modifier": 100,
          "carrot-modifier": 100,
          "potato-modifier": 100,
          "wheat-modifier": 100,
          "netherwart-modifier": 100,
          "vine-modifier": 100,
          "cocoa-modifier": 100,
          "bamboo-modifier": 100,
          "sweetberry-modifier": 100,
          "kelp-modifier": 100
        },
        "max-tick-time": {
          "tile": 50,
          "entity": 50
        },
        "entity-tracking-range": {
          "players": 48,
          "animals": 48,
          "monsters": 48,
          "misc": 32,
          "other": 64
        },
        "entity-activation-range": {
          "animals": 32,
          "monsters": 32,
          "raiders": 48,
          "misc": 16,
          "tick-inactive-villagers": true
        },
        "squid-spawn-range": {
          "min": 45
        },
        "ticks-per": {
          "hopper-transfer": 8,
          "hopper-check": 1
        },
        "hunger": {
          "jump-walk-exhaustion": 0.05,
          "jump-sprint-exhaustion": 0.2,
          "combat-exhaustion": 0.1,
          "regen-exhaustion": 6,
          "swim-multiplier": 0.01,
          "sprint-multiplier": 0.1,
          "other-multiplier": 0
        }
      },
      "worldeditregentempworld": {
        "verbose": false
      }
    }
  },
  "time": 1633155167971
}
```
