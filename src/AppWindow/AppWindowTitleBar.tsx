import {ReactElement, ReactNode, useEffect, useState} from "react";

type AppWindowTitleBarProps = {
	onDrag?(x: number, y: number): void,
	children?: ReactNode
}

function AppWindowTitleBar({ onDrag, children }: AppWindowTitleBarProps): ReactElement {
	const [mouseDown, setMouseDown] = useState(false);

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp);
		// return () => {
		// 	window.addEventListener('mouseup', handleMouseUp);
		// }
	}, [])

	useEffect(() => {
		if (mouseDown)
			window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		}
	}, [mouseDown, onDrag])

	const handleMouseUp = () => {
		setMouseDown(false);
	}

	const handleMouseDown = () => {
		setMouseDown(true);
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (onDrag) {
			window.getSelection()?.empty();
			onDrag(event.movementX, event.movementY);
		}
	}

	return (
		<div className="title-bar" onMouseDown={() => handleMouseDown()}>
			<div className="title-bar-text">
				{children}
			</div>
			<div className="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
	)
}

export default AppWindowTitleBar;