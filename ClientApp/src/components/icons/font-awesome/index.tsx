// Docs: https://fontawesome.com/how-to-use/on-the-web/using-with/react

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckCircle,
  faEye,
  faExclamationCircle,
  faExclamationTriangle,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { IconName } from "./icon-names";

/**
 * Initializes FontAwesome Library
 * - Call once in App startup
 */
export const initFontAwesome = () => {
  library.add(
    faCheckCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faEye,
    faEyeSlash,
    faGoogle,
    faInfoCircle
  );
};

export interface IFAIconProps extends Omit<FontAwesomeIconProps, "icon"> {
  icon: IconName;
}

/**
 * FontAwesomeIcon
 * - note: defaults to fixedWidth
 * @param props - FontAwesomeIconProps
 */
const FAIcon = (props: IFAIconProps) => {
  const fixedWidth = props.fixedWidth !== false;
  return <FontAwesomeIcon {...props} fixedWidth={fixedWidth} />;
};

export default FAIcon;
