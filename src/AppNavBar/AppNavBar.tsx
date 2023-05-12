import React, {ReactElement} from "react";

function AppNavBar(): ReactElement {
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
				<fieldset>
					<button>Hot</button>
					<button>New</button>
					<button>Top</button>
				</fieldset>
			</div>
		</div>
	)
}

export default AppNavBar;