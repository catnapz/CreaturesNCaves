import { FunctionComponent, SVGProps } from "react";
import { ReactComponent as PlaceHolderIcon } from "./placeholder.svg";
import { ReactComponent as ArrowIcon } from "./arrow.svg";

export type Icon = FunctionComponent<SVGProps<SVGSVGElement>>;

export { ArrowIcon, PlaceHolderIcon };
