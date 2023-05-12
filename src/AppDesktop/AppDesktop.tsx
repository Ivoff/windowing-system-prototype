import {ReactElement, ReactNode} from "react";
import AppWindow from "./AppWindow/AppWindow";

type AppDesktopProps = {
	children?: ReactNode
}

function AppDesktop({ children }: AppDesktopProps): ReactElement {
	return (
		<div className="bg-teal-700 grow overflow-y-hidden overflow-x-hidden">
			{children}
		</div>
	);
}

export default AppDesktop;