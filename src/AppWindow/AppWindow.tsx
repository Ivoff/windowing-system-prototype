import React, {ReactElement, ReactNode, useEffect, useRef} from "react";
import AppWindowTitleBar from "./AppWindowTitleBar";
import Resizer from "./Resizer";
import {Direction} from "./Resizer";

type AppWindowProps = {
	titleBarText?: string,
	statusBarElement?: ReactNode,
	defaultWidth?: number,
	defaultHeight?: number,
	minWidth?: number,
	minHeight?: number,
	maxWidth?: number,
	maxHeight?: number,
	children?: ReactNode
}

type DesktopBounds = {
	x: number,
	y: number,
	width: number,
	height: number
}

function AppWindow(
	{
		titleBarText,
		statusBarElement,
		defaultHeight = undefined,
		defaultWidth = undefined,
		minHeight = 200,
		minWidth = 200,
		children
	}: AppWindowProps
): ReactElement {
	const thisRef = useRef<HTMLDivElement>(null);
	const windowBodyRef = useRef<HTMLDivElement>(null);
	const statusBarRef = useRef<HTMLDivElement>(null);
	let desktopBounds: DesktopBounds;

	useEffect(() => {
		desktopBounds = document.getElementById("desktop")?.getBoundingClientRect() as DOMRect;
		checkInitialHeight();
		updateWindowBodyHeight();
	}, [])

	const handleDrag = (movementX: number, movementY: number) => {
		if (!thisRef.current)
			return;

		const {x, y} = thisRef.current.getBoundingClientRect();
		thisRef.current.style.left = x + movementX + "px";
		thisRef.current.style.top = y + movementY + "px";
	}

	const handleResize = (direction: string, movementX: number, movementY: number) => {
		const appWindow = thisRef.current;
		if (!appWindow)
			return;

		const {x, y, width, height} = thisRef.current.getBoundingClientRect();

		const resizeTop = () => {
			let newHeight = (height - movementY);
			let newTop = y + movementY;
			if (newHeight < minHeight || !isInsideDesktopBounds({y: newTop}))
				return;

			appWindow.style.height = newHeight + "px";
			appWindow.style.top = y + movementY + "px";
		}

		const resizeRight = () => {
			let newWidth = width + movementX;
			if (newWidth < minWidth || !isInsideDesktopBounds({width: newWidth}))
				return;

			appWindow.style.width = newWidth + "px";
		}

		const resizeLeft = () => {
			let newWidth = width - movementX;
			let newLeft = x + movementX;
			if (newWidth < minWidth || !isInsideDesktopBounds({x: newLeft}))
				return;

			appWindow.style.width = newWidth + "px";
			appWindow.style.left = newLeft + "px";
		}

		const resizeBottom = () => {
			let newHeight = height + movementY;
			if (newHeight < minHeight || !isInsideDesktopBounds({height: newHeight}))
				return;

			appWindow.style.height = newHeight + "px";
		}

		switch (direction) {
			case Direction.TopLeft:
				resizeTop();
				resizeLeft();
				break;

			case Direction.Top:
				resizeTop();
				break;

			case Direction.TopRight:
				resizeTop();
				resizeRight();
				break;

			case Direction.Left:
				resizeLeft();
				break;

			case Direction.Right:
				resizeRight();
				break;

			case Direction.BottomLeft:
				resizeBottom();
				resizeLeft();
				break;

			case Direction.Bottom:
				resizeBottom();
				break;

			case Direction.BottomRight:
				resizeBottom();
				resizeRight();
				break;
		}

		updateWindowBodyHeight();
	}

	const updateWindowBodyHeight = () => {
		if (!thisRef.current || !windowBodyRef.current)
			return;

		const getMarginPaddingBorderVertical = (value: string): number => {
			const parts = value.split(" ");
			if (parts.length >= 3) {
				if (parts[0] !== parts[2]) {
					console.warn(`margin | padding | border: ${value}, vertical values not the same`);
					return 0;
				}

				console.log(parts[0])
				return (parseInt(parts[0].replace("px", "")));
			} else if (parts.length === 1)
				return parseInt(parts[0].replace("px", ""));
			else {
				console.warn("margin | padding | border with incorrect number of parts");
				return 0;
			}
		}

		const windowRef: HTMLDivElement = thisRef.current;
		const windowBody: HTMLDivElement = windowBodyRef.current;
		const statusbar: HTMLDivElement = statusBarRef.current as HTMLDivElement;

		const windowNodes = windowRef.querySelectorAll<HTMLDivElement>("div>div.title-bar");
		if (windowNodes.length <= 0)
			return;
		const titleBar: HTMLDivElement = windowNodes[0];

		const freeSpace = windowRef.getBoundingClientRect().height;
		let spaceTaken: number = 0;

		const windowDivStyles = window.getComputedStyle(windowRef);
		spaceTaken += getMarginPaddingBorderVertical(windowDivStyles.margin) * 2;
		spaceTaken += getMarginPaddingBorderVertical(windowDivStyles.padding) * 2;
		spaceTaken += getMarginPaddingBorderVertical(windowDivStyles.borderWidth) * 2;

		spaceTaken += titleBar.getBoundingClientRect().height;

		const windowBodyDivStyles = window.getComputedStyle(windowBody);
		spaceTaken += getMarginPaddingBorderVertical(windowBodyDivStyles.margin) * 2;
		spaceTaken += getMarginPaddingBorderVertical(windowBodyDivStyles.padding) * 2;
		spaceTaken += getMarginPaddingBorderVertical(windowBodyDivStyles.borderWidth) * 2;

		spaceTaken += statusbar.getBoundingClientRect().height;

		const newHeight = freeSpace - spaceTaken;

		windowBody.style.height = newHeight + "px";
	}

	const checkInitialHeight = (): void => {
		if (!thisRef.current)
			return;

		const checkHeight = thisRef.current.getBoundingClientRect().height < minHeight;
		const checkWidth = thisRef.current.getBoundingClientRect().width < minWidth;

		if (checkHeight || checkWidth) {
			thisRef.current.style.height = minHeight + "px";
			thisRef.current.style.width = minWidth + "px";
		}
	}

	const isInsideDesktopBounds = (
		{
			x = desktopBounds.x,
			y = desktopBounds.y,
			width = desktopBounds.width,
			height = desktopBounds.height
		}
	): boolean => {
		const leftCondition = x >= desktopBounds.x;
		const topCondition = y >= desktopBounds.y;
		const rightCondition = width <= (desktopBounds.width + desktopBounds.x);
		const bottomCondition = height <= desktopBounds.height + desktopBounds.y;

		return topCondition && rightCondition && bottomCondition && leftCondition;
	}

	return (
		<div
			className="window absolute box-border"
			ref={thisRef}
			style={defaultHeight === undefined && defaultWidth === undefined ? {} : {
				width: defaultWidth + "px",
				height: defaultHeight + "px"
			}}
		>
			<div className="resizer-container box-border">
				<Resizer onResize={handleResize}></Resizer>
				<AppWindowTitleBar onDrag={handleDrag}>{titleBarText}</AppWindowTitleBar>
				<div className="window-body overflow-y-auto box-border" ref={windowBodyRef}>
					{children}
				</div>
				<div ref={statusBarRef}>
					{statusBarElement}
				</div>
			</div>
		</div>
	);
}

export default AppWindow;