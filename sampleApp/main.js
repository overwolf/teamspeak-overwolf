
var plugin = null;
var teamspeckPlugin = null
var activeServerID = null;
var activeCannelID = null;
var microphone = false;
var speakers = false;
var isAway = false;

 function addMessage(message) {
    var obj = document.createElement("div");
    obj.innerText = message;
	var msgDiv = document.querySelector('#messages');
	while (msgDiv.hasChildNodes()) {
		msgDiv.removeChild(msgDiv.lastChild);
	}
	
	msgDiv.appendChild(obj);
  }
  
function loadPlugin() {
if (plugin != null)
	return;
plugin = new OverwolfPlugin("teamspeak-plugin", true);

plugin.initialize(function(status) {
	plugin.get().isRunning(function(e) {console.log("IS running", e)
	plugin.get().init("test", function(res,data) {
	  console.log("TS Init: ",res, data);
	 
	
	if (data != null && data.activeServerId) {
		activeServerID = data.activeServerId;
	}

	 teamspeckPlugin = plugin.get();
	  
	  teamspeckPlugin.onActiveServerChanged.addListener(function(e) {
		  console.log("onActiveServerChanged:", e);
		  activeServerID  =e;
	  });
	  
	  teamspeckPlugin.onServerStatusChanged.addListener(function(e) {
		  console.log("onServerStatusChanged:", e);
		  if (e.status == "CONNECTION_ESTABLISHED") {
			GetChannels(e.serverId);
			activeServerID = e.serverId;
		  } else if (e.status == "DISCONNECTED") {
			  var channelsTable = document.getElementById("channels");
		   activeServerID = null;
		  for(var i = channelsTable.options.length - 1 ; i >= 0 ; i--) {
			  channelsTable.remove(i); 
	      }
		  }
	  });
	  
	  teamspeckPlugin.onDisconnectedFromClient.addListener(function() {
		  console.log("onDisconnectedFromClient");
	  });
	  
	  teamspeckPlugin.onClientEvent.addListener(function(e) {
		  console.log("onClientEvent:", e);
	  });
	  
	  teamspeckPlugin.onClientUpdated.addListener(function(e) {
		  console.log("onClientUpdated:", e);
	  });
	  
	  teamspeckPlugin.onTalkStatusChanged.addListener(function(e) {
		  console.log("onTalkStatusChanged:", e);
	  });
	  	  
	  teamspeckPlugin.onTextMessageReceived.addListener(function(e) {
		  console.log("onTextMessageReceived:", e);
	  });

	  teamspeckPlugin.onChannelUpdated.addListener(function(e) {
		  console.log("onChannelUpdated:", e);
	  })
	  
	  teamspeckPlugin.onChannelCreated.addListener(function(e) {
		  console.log("onChannelCreated:", e);
	  });
	  
	   teamspeckPlugin.onChannelDeleted.addListener(function(e) {
		  console.log("onChannelDeleted:", e);
	  });
	  
	   teamspeckPlugin.onClientPoked.addListener(function(e) {
		  console.log("onClientPoked:", e);
	  });
	  
	  var statusLable = document.getElementById('status');
	  if (res.success) {
		
		statusLable.innerHTML = "plugin loaded";
		console.log("Connect to TeamSpeak");
		GetBookmarks();
		if ( activeServerID) {
			console.log("TeamSpeak active server :",activeServerID);
			logActiveServerInfo(activeServerID)
		}
		
		
		
	  } else {
		 statusLable.innerHTML = "plugin error:" +res.error ;
		console.error("Unable connect to TeamSpeak: ", res.error);
	  }
  });
  });
});	
}


//
//teamspeckPlugin.getAllServersInfo(function(result,data) {});


function setAway(){
	if (teamspeckPlugin == null)
	return;

 if (activeServerID == null)
	 return;
 
teamspeckPlugin.setAwayStatus( {serverId:activeServerID, isAway: !isAway, awayMessage:"I'm Away" },
 function(res) {
	 console.log("setAway" ,res);
	 addMessage("setAway [" + isAway +"]:" + JSON.stringify(res));
	 isAway = !isAway ? true :false;
 
	 
 });	
}
function muteMic() {
if (teamspeckPlugin == null)
	return;

 if (activeServerID == null)
	 return;


 teamspeckPlugin.updateClientDeviceState( {serverId:activeServerID, muteMicrophone: microphone},
 function(res) {
	 console.log("updateClientDeviceState" ,res);
	 addMessage("muteMic [" + microphone +"]:" + JSON.stringify(res));
	 microphone = !microphone ? true :false;
 
	 
 });	
}

function sendTextMessageToChannel() {
if (teamspeckPlugin == null)
	return;

 if (activeServerID == null)
	 return;


  if (activeCannelID == null)
	 return;
 
 teamspeckPlugin.sendTextMessage( {serverId:activeServerID, message: "Test Message", type:"Channel",targetId: activeCannelID},
 function(res) {
	 console.log("sendTextMessage: " ,res)
	 addMessage("sendTextMessage" + JSON.stringify(res));
 
	 
 });	
	
}

function muteSpeak() {
if (teamspeckPlugin == null)
	return;

 if (activeServerID == null)
	 return;


 teamspeckPlugin.updateClientDeviceState( {serverId:activeServerID, muteSpeakers: speakers},
 function(res) {
	 console.log("muteSpeak" ,res);
	   addMessage("muteSpeak [" + speakers +"]:" + JSON.stringify(res));
	   speakers = !speakers ? true :false;
	 });	
	
}


 function logActiveServerInfo(serverId) {
	  plugin.get().getServerInfo(serverId,function( res, serverInfo) {
		  console.log("getServerInfo res", res, serverInfo);
		  if (res.success)
			activeCannelID = serverInfo.channelId;
	  });
 }
 
  function GetBookmarks() {
	  plugin.get().getBookmarkList(function( res, bookmarks) {
		  if (res.success == false) {
			console.error("Unable getBookmarkList ", res.error);
			  return;
		  }
		  console.log("getBookmarkList result: " , res, bookmarks);
		  var bookmarksTable = document.getElementById("bookmarks");
		  bookmarksTable.children = [];
		  
		 if (bookmarks) {
			for (var i=0 ;i< bookmarks.length; i++) {
			var newOption = document.createElement("option");
			newOption.text = bookmarks[i].name;
			newOption.value = bookmarks[i].uuid;
			bookmarksTable.appendChild(newOption);
			}
		 }
		 
		bookmarksTable.ondblclick = function(){
			var uid = this.options[this.selectedIndex].value;
		
			teamspeckPlugin.connectToServerByBookmark({uuid: uid},function(res,data) {
					console.log("connectToServerByBookmark: ",res ,data)})
			};

	  });
 }
 
  function GetChannels(serverID) {
	teamspeckPlugin.getChannelList(serverID ,function(result, data) {
			console.log("getChannelList result: " , result, data);
		  
			  
		    var channelsTable = document.getElementById("channels");
		 if (data) {
			for (var i=0 ;i< data.length; i++) {
			var newOption = document.createElement("option");
			newOption.text = data[i].channelName;
			newOption.value = data[i].channelId;
			channelsTable.appendChild(newOption);
		}
		 }	  
  });
  }
  
  
  ///teamspeckPlugin.pokeClient(1,49,"Zlatan",function(res){console.log("Poke result:",res)})
  
  // true = from channel,
  // false = from server
  ///teamspeckPlugin.kickClient(1,49,"test kick",true, function(res){console.log("Poke result:",res)})
  

