teamspeak-plugin
================


Events:
==========
```
plugin.get().onServerStatusChanged.addListener(function(e) {})
plugin.get().onActiveServerChanged.addListener(function(e) {})
plugin.get().onDisconnectedFromClient.addListener(function(e) {})
plugin.get().onClientEvent.addListener(function(e) {})
plugin.get().onClientUpdated.addListener(function(e) {})
plugin.get().onTalkStatusChanged.addListener(function(e) {})
plugin.get().onTextMessageReceived.addListener(function(e) {})
plugin.get().onChannelUpdated.addListener(function(e) {})
plugin.get().onChannelCreated.addListener(function(e) {})
plugin.get().onChannelDeleted.addListener(function(e) {})
plugin.get().onClientPoked.addListener(function(e) {})
```

Functions:
==========
```
plugin.get().init(string appName, function(result, data){..})

result {
  success :bool,
  errorCode :int,
  error: string
}

data {
  activeServerId: int
}
NOTE: |data| object can ben null
```
```
plugin.get().isRunning(function(obj){...})

obj {
  isRunning: bool,
  success : bool,
  error : string
}
```
```
plugin.get().connectToServer(param, function(result, data){ ... })
param {
    address: string, 
    label  : string, 
    nickName: string,
    password[optional] : string
    tab[optional] : string  [newtab| newifcurrentconnectedtab | currentTab [default]]
};
```
```
plugin.get().connectToServerByBookmark(param, function(result, data){ ... })
param {
    uuid: string, 
    tab[optional] : string  [newtab| newifcurrentconnectedtab | currentTab [default]]
};
```
```
plugin.get().disconnectFromServer(param, function(result, data){ ... })
param {
    serverId: int, 
    quiteMessage[optional] : string
};
```
```
plugin.get().getServerInfo(int serveId, function(result, data){ ... })
```
```
plugin.get().getAllServersInfo(function(result, data){ ... })
```
```
plugin.get().getBookmarkList(function(result, data){ ... })
```
```
plugin.get().getChannelList(int serveId, function(result, data){ ... })
```
```
plugin.get().getChannelInfo(param, function(result, data){ ... })
param {
    serverId: int, 
    channelId  : int
};
```
```
plugin.get().getChannelClientList(param, function(result, data){ ... })
param {
    serverId: int, 
    channelId  : int
};
```
```
plugin.get().getClientInfo(param, function(result, data){ ... })
param {
    serverId: int, 
    clientId[optional]: int
};
```
```
plugin.get().switchChannel(param, function(result, data){ ... })
param {
 serverId: int, 
 channelId: int,
 clientId: int,
 password[optional]: string
};
 ```
``` 
plugin.get().createChannel(param, function(result, data){ ... })
param {
 serverId: int, 
 name: string,
 topic[optional]: string,
 parentId[optional] :int
};
 ```
```
plugin.get().sendTextMessage(param, function(result){ ... })
param {
serverId: int, 
type :string,  // ["Server" | "Channel" | "Client"]
targetId: int, // [optional only if type is "Server"]

};
 ```
``` 
plugin.get().muteClient(param, function(result, data){ ... })
param {
  serverId: int, 
  mute : bool,
  clientID: int
};
 ```
``` 
plugin.get().updateClientDeviceState(param, function(result, data){ ... })
param {
 serverId: int, 
 muteMicrophone : bool,  // At Least one attribute must be set |muteMicrophone| |muteSpeakers|
 muteSpeakers: bool
};
 ```
``` 
plugin.get().setAwayStatus(param, function(result, data){ ... })
param {
  serverId: int, 
  isAway : bool,  
  awayMessage [optional] : string 
};
 ```
 ```
 plugin.get().pokeClient(int server_id, uint client_id, string message ,function(result){ ... })
 ```
 ```
 plugin.get().kickClient(int server_id, uint client_id, string message, bool kickfromChannel, function(result){ ... })
 ```
 ```
 plugin.get().setClientVolume(int server_id, uint client_id, double volume, function(result){ ... })
 ```