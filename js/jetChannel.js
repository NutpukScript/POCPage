jetChannel = function( number, mainContainer )
{
	this.number = number;
	this.id = Math.floor((Math.random() * 100) + 1); 
	this.channelName = "MSTK/Channel"+this.id;
	this.mainContainer = mainContainer;
	this.currentType = null;

	this.typeDefine = ["Publish", "Subscribe"]
	this.channelWrapper = {
		tab :null,
		content: null,
		newChannel:{
			container: null,
			button : null,
			type : null
		}
	}

	this.listProtocol = [];

	this.initialize();
}

jetChannel.prototype.initialize =function()
{	

	this.currentType = this.typeDefine[0];
	this.createElementNewChannel();
	this.createElementMain();
	this.newProtocol();
}

jetChannel.prototype.newProtocol = function()
{
	var protocol = new jetProtocol( this.id, this.channelWrapper.content );
	this.listProtocol.push( protocol );
}

jetChannel.prototype.deleteProtocol = function()
{
	
}

jetChannel.prototype.createElementMain = function()
{
	var fn_createTab = function()
	{
		var wrapper = document.createElement("div");
		var spanTitle = document.createElement("span");
		spanTitle.innerHTML = this.channelName;

		wrapper.className = "tab_wrapper "+this.channelName;
		wrapper.appendChild(spanTitle);

		return wrapper;
	}.bind(this);

	var tabWrapper = fn_createTab();
	var contentWrapper = document.createElement("div");
	contentWrapper.className = "content_wrapper "+this.channelName;

	this.mainContainer.tab.appendChild(  tabWrapper  );
	this.mainContainer.content.appendChild( contentWrapper );

	this.channelWrapper.tab = tabWrapper;
	this.channelWrapper.content =contentWrapper;
}


jetChannel.prototype.createElementNewChannel = function()
{
	var container = document.createElement("div");
	container.className = "create_protocol-container";

	var ulWrapper = document.createElement("ul");
	ulWrapper.className = "ulWrapper";

	var buttonWrapper = document.createElement("li")
	var buttonAddChannel = document.createElement("input");

	buttonWrapper.className = "firstBox";
	buttonAddChannel.value = "Add Protocol";
	buttonAddChannel.type = "button";

	buttonWrapper.appendChild(buttonAddChannel);

	var typeWrapper = document.createElement("li");
	var typeSelector = document.createElement("select");
	
	for( var count = 0; count < this.typeDefine.length ; count++ ) 
	{
		var eachValue = this.typeDefine[count];
	   var opt = document.createElement("option");
	   opt.value= eachValue;
	   opt.innerHTML = eachValue;
	   typeSelector.appendChild(opt);
	}

	typeWrapper.appendChild(typeSelector);
	typeWrapper.className = "secondBox";

	ulWrapper.appendChild(buttonWrapper);
	ulWrapper.appendChild(typeWrapper);
	container.appendChild(ulWrapper);

	this.mainContainer.content.appendChild( container );


	var newChannelWrapper = this.channelWrapper.newChannel;
	newChannelWrapper.container = container;
	newChannelWrapper.button = buttonAddChannel;
	newChannelWrapper.type = typeWrapper;

	//Event
	buttonAddChannel.onclick = this.newProtocol.bind(this);
}

/*
<div class="create_protocol-container">
						
						<ul class="ulWrapper">
									
							<li class="firstBox">
								<input type="button" value="Add New Protocol">
							</li>

							<li class="secondBox">
								<select>
									<option value="publish" >Publish </option>
									<option value="subscribe" >Subscribe</option>
								</select>
							</li>

						</ul>

					</div>

*/