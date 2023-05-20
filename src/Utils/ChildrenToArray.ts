import {Children, ReactNode} from "react";

export default function ChildrenToArray(children: ReactNode) {
	return Children.toArray(children);
}