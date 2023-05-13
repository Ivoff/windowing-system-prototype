import React, {ChangeEvent, ReactElement} from "react";

function AppNavBar(): ReactElement {
	const handleOnChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		for (let i = 0; i < document.styleSheets.length; i += 1) {
			var currentStyleSheet = document.styleSheets[i];
			var currentElement = currentStyleSheet.ownerNode as Element

			if (currentElement.id) {
				currentStyleSheet.disabled = currentElement.id !== event.target.value;
			}
		}
	}

	return (
		<div className="window">
			<div className="window-body">
				<div className="status-bar">
					<div className="status-bar-field">
						<div className="title-bar">
							<p className="title-bar-text text-xl">
								Application's Name
							</p>
						</div>
					</div>
				</div>
				<fieldset className="flex justify-between">
					<div>
						<button>Hot</button>
						<button>New</button>
						<button>Top</button>
					</div>
					<div>
						<select name="" id="" onChange={handleOnChangeSelect} defaultValue={"98_css"}>
							<option value="98_css">Windows 98</option>
							<option value="xp_css">Windows XP</option>
							<option value="7_css">Windows 7</option>
						</select>
					</div>
				</fieldset>
			</div>
		</div>
	)
}

export default AppNavBar;