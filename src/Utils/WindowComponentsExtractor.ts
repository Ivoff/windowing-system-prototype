import {ReactNode} from "react";
import ChildrenToArray from "./ChildrenToArray";

export type WindowComponents = {
	titleBarElement: ReactNode,
	windowContentElement: ReactNode,
	statusBarElement: ReactNode
};
export default function WindowLayout(children: ReactNode): WindowComponents {
	let titleBarElement: ReactNode = "";
	let windowContentElement: ReactNode = "";
	let statusBarElement: ReactNode = "";

	if (ChildrenToArray(children).length == 1) {
		windowContentElement = children;
	}
	else if (ChildrenToArray(children).length == 2) {
		titleBarElement = ChildrenToArray(children)[0];
		windowContentElement = ChildrenToArray(children)[1];
	}
	else if (ChildrenToArray(children).length == 3) {
		titleBarElement = ChildrenToArray(children)[0];
		windowContentElement = ChildrenToArray(children)[1];
		statusBarElement = ChildrenToArray(children)[2];
	}

	return {titleBarElement, windowContentElement, statusBarElement} as WindowComponents;
}