import React, {ReactElement, useState} from 'react';
import AppNavBar from "./AppNavBar/AppNavBar";
import AppDesktop from "./AppDesktop/AppDesktop";
import AppWindow from "./AppWindow/AppWindow";
import AppStatusBar from "./AppWindow/AppStatusBar";

function App(): ReactElement {
	return (
		<div className="flex flex-col h-full">
			<AppNavBar></AppNavBar>
			<AppDesktop>
				<AppWindow
					titleBarText="drag window title bar"
					statusBarElement={
						<AppStatusBar>
							<p className="status-bar-field">Hello</p>
						</AppStatusBar>
					}
				>
					<div className="flex justify-between">
						<button>Yes</button>
						<button>No</button>
					</div>
				</AppWindow>
				<AppWindow>
					<div className="sunken-panel p-1">
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took
							a galley of type and scrambled it to make a type specimen book. It has survived not only
							five centuries, but also the leap into electronic typesetting, remaining essentially
							unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
							Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
							PageMaker including versions of Lorem Ipsum.
						</p>
					</div>
				</AppWindow>
			</AppDesktop>
		</div>
	);
}

export default App;
