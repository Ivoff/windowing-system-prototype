import {Dispatch, ReactElement, ReactNode, SetStateAction, useEffect} from "react";

type AppDesktopProps = {
	children?: ReactNode
}

function AppDesktop({ children }: AppDesktopProps): ReactElement {
	return (
		<div id="desktop" className="bg-teal-700 grow overflow-y-hidden overflow-x-hidden">
			{children}
		</div>
	);
}

export default AppDesktop;