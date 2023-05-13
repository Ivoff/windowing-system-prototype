import React, {ReactElement, ReactNode} from "react";

type AppStatusBarProps = {
	children: ReactNode
}

export default function AppStatusBar({children}: AppStatusBarProps): ReactElement {
	return (
		<div className="status-bar box-border">
			{children}
		</div>
	)
}