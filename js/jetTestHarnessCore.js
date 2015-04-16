jetTestHarnessCore = function(){

	this.channelNumber = 0;
	this.onFocusChannel = this.channelNumber;
	this.listChannel = [];

	this.mainContainer = 
	{
		tab: null,
		content: null
	};

	this.initialize();	

}

jetTestHarnessCore.prototype.initialize = function()
{
	this.mainContainer = {
		tab: document.getElementById("tab_container"),
		content: document.getElementById("content_container")
	};

	this.createNewChannel();
}

jetTestHarnessCore.prototype.createNewChannel = function()
{
	this.channelNumber++;
	var channelOBJ = new jetChannel( this.channelNumber, this.mainContainer );

	this.listChannel.push(channelOBJ);
}

jetTestHarnessCore.prototype.createNewRequest = function()
{

}

