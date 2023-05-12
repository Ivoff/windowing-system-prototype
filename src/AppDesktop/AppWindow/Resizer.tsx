import {ReactElement, useEffect, useState} from "react";

export const Direction = {
	TopLeft: 'topLeft',
	Top: 'top',
	TopRight: 'topRight',
	Left: 'left',
	Right: 'right',
	BottomLeft: 'bottomLeft',
	Bottom: 'bottom',
	BottomRight: 'bottomRight'
}

type ResizerProps = {
	onResize(direction: string, movementX: number, movementY: number): void
}

const Resizer = ({ onResize }: ResizerProps): ReactElement => {
	const [direction, setDirection] = useState("");
	const [mouseDown, setMouseDown] = useState(false);

	useEffect(() => {
		if (mouseDown)
			window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		}
	}, [mouseDown, direction, onResize]);

	useEffect(() => {
		window.addEventListener('mouseup', handleMouseUp);
		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		}
	}, []);

	const handleMouseDown = (direction: string) => {
		setDirection(direction);
		setMouseDown(true);
	}

	const handleMouseUp = () => {
		setMouseDown(false);
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (direction !== "")
			onResize(direction, event.movementX, event.movementY);
	}

	return (
		<div>
			<div className="top-left" onMouseDown={() => handleMouseDown(Direction.TopLeft)}></div>
			<div className="top" onMouseDown={() => handleMouseDown(Direction.Top)}></div>
			<div className="top-right" onMouseDown={() => handleMouseDown(Direction.TopRight)}></div>
			<div className="right" onMouseDown={() => handleMouseDown(Direction.Right)}></div>
			<div className="left" onMouseDown={() => handleMouseDown(Direction.Left)}></div>
			<div className="bottom-left" onMouseDown={() => handleMouseDown(Direction.BottomLeft)}></div>
			<div className="bottom" onMouseDown={() => handleMouseDown(Direction.Bottom)}></div>
			<div className="bottom-right" onMouseDown={() => handleMouseDown(Direction.BottomRight)}></div>
		</div>
	);
}

export default Resizer;