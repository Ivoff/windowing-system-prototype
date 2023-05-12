import React, {ReactElement} from 'react';
import AppNavBar from "./AppNavBar/AppNavBar";
import AppDesktop from "./AppDesktop/AppDesktop";
import AppWindow from "./AppDesktop/AppWindow/AppWindow";

function App(): ReactElement {
	return (
		<div className="flex flex-col h-full">
			<AppNavBar></AppNavBar>
			<AppDesktop>
				<AppWindow
					titleBarText="drag window title bar"
					statusBarElement={(
						<div className="status-bar box-border">
							<p className="status-bar-field">Hello</p>
						</div>
					)}
				>
					<div className="flex justify-between">
						<button>Yes</button>
						<button>No</button>
					</div>
				</AppWindow>
				<AppWindow>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				</AppWindow>
			</AppDesktop>
		</div>
	);
}

export default App;
