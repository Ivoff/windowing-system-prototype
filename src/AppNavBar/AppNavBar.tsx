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
				<div className="flex">
					<div className="status-bar-field grow-0 title-bar flex flex-col justify-center px-2 basis-60">
						<p className="text-lg title-bar-text">
							Application's name
						</p>
					</div>
					<fieldset className="flex grow justify-between">
						<div className="flex basis-2/4">
							<button>Hot</button>
							<button>New</button>
							<button>Top</button>
							<div className="basis-1/6 flex flex-row-reverse">
								<button>Create Window</button>
							</div>
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
		</div>
	)
}

export default AppNavBar;