jetProtocol = function( id, contentWrapper )
{
	this.channelID = id;
	
	this.contentWrapper = contentWrapper;

	this.structure = {
		container: null,

		setting: {
			container: null,
			utils:{
				remove: null
			},
			button: null,
			type: null,
			msg: null
		},

		output: {
			container:null,
			label: null,
			textarea: null
		},

		underline: null
	}

	this.initialize();
}


jetProtocol.prototype.initialize = function(){

	this.createElement();

	this.registerEvent();
}

jetProtocol.prototype.createElement = function()
{
	var mainStructure = this.structure;

	mainStructure.container = document.createElement("div");
	mainStructure.container.className = "protocol-container";
	this.contentWrapper.appendChild(mainStructure.container);

		// ------- Start Setting container ------------
		var settingStructure = mainStructure.setting;

		settingStructure.container = document.createElement("div");
		settingStructure.container.className = "settings-box";

		var tableSetting = document.createElement("ul");
		tableSetting.className = "ulWrapper";

			var utilsColumn = document.createElement("li");
			utilsColumn.className = "ch_utils_container firstBox";
			utilsColumn.innerHTML = "-";

			var buttonColumn = document.createElement("li");
			var buttonSetting = document.createElement("input");
			buttonSetting.type = "button";
			buttonSetting.value = "Publish";
			buttonColumn.appendChild(buttonSetting);			

			var typeColumn = document.createElement("li");
			var typeInput = document.createElement("input");
			typeInput.type = "text";
			typeInput.value = "KobraMSTKChart";
			typeColumn.appendChild(typeInput);

			var msgColumn = document.createElement("li");
			var msgTextarea = document.createElement("textarea");
			msgTextarea.innerHTML = JSON.stringify( {"channel":"MSTK1", "params":["hello"]}, null, 4 );
			msgColumn.appendChild(msgTextarea);

			utilsColumn.className = "ch_utils_container firstBox";
			buttonColumn.className = "ch_button_container secondBox";
			typeColumn.className = "ch_type_container thirdBox";
			msgColumn.className = "ch_msg_container forthBox";


		tableSetting.appendChild(utilsColumn);
		tableSetting.appendChild(buttonColumn);
		tableSetting.appendChild(typeColumn);
		tableSetting.appendChild(msgColumn);

		settingStructure.container.appendChild( tableSetting );
		
		settingStructure.button = buttonSetting;
		settingStructure.type = typeInput;
		settingStructure.msg = msgTextarea;

		// ------- End Setting container ------------

		// ------- Start Output container ------------
		var outputContainer = document.createElement("div");
		var outputLabel = document.createElement("span");
		var outputTextarea = document.createElement("textarea");

		outputLabel.innerHTML = "Output: ";

		outputContainer.className = "output-box";
		outputLabel.className = "firstBox";

		outputTextarea.readOnly = true;

		outputContainer.appendChild(outputLabel);
		outputContainer.appendChild(outputTextarea);

		var outputStructure = mainStructure.output;
		outputStructure.container = outputContainer;
		outputStructure.label = outputLabel;
		outputStructure.textarea = outputTextarea;

		// ------- End Output container ------------


		var underLineOBJ = document.createElement("hr");
	
	mainStructure.container.appendChild(settingStructure.container);
	mainStructure.container.appendChild(outputStructure.container);
	mainStructure.container.appendChild(underLineOBJ);

}


jetProtocol.prototype.registerEvent = function(){

}



/*
<div class="content_wrapper">
					
					<div class="protocol-container">
						<div class="settings-box">
							<ul class="ulWrapper">
								
								<li class="ch_utils_container firstBox">
									+ -
								</li>

								<li class="ch_button_container secondBox">
									<input type="button" value="Publish"/>
								</li>
								
								<li class="ch_type_container thirdBox">
									<input type="text" value="KobraMSTKChart" />
								</li>
								
								<li class="ch_msg_container forthBox">
									<textarea>{"channel":"MSTK/1"}</textarea>
								</li>
							</ul>
						</div>

						<div class="output-box">
							<span class="firstBox">
								Output: 
							</span>
							<textarea>

							</textarea>
						</div>
					</div>
					
					<hr>
					

					<hr>

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


				</div>
*/