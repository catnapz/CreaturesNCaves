import React from "react";
import { toast } from "react-toastify";

import { FAIcon, Icon, PlaceHolderIcon } from "../../components";
import "./toasts.scss";

interface IToastMessageProps {
  icon: React.ReactElement<typeof FAIcon | Icon>;
  msg: string;
}

const ToastMessage = (props: IToastMessageProps) => (
  <>
    <div className="cnc-toast--icon-container">{props.icon}</div>
    {props.msg}
  </>
);

/**
 * Generate toasts
 */
const notify = {
  /**
   * Creates a success toast notification
   * @param {string} msg - the message to display in the toast
   * @return {string | number} - The toast id
   */
  success: (msg: string): string | number =>
    toast.success(
      <ToastMessage
        icon={<FAIcon className="cnc-toast--icon" icon={"check-circle"} />}
        msg={msg}
      />
    ),

  /**
   * Createsn a error toast notification
   * @param {string} msg - the message to display in the toast
   * @return {string | number} - The toast id
   */
  error: (msg: string): string | number =>
    toast.error(
      <ToastMessage
        icon={<PlaceHolderIcon className="cnc-toast--icon" />}
        msg={msg}
      />
    ),

  /**
   * Creates an info toast notification
   * @param {string} msg - the message to display in the toast
   * @return {string | number} - The toast id
   */
  info: (msg: string): string | number =>
    toast.info(
      <ToastMessage
        icon={<PlaceHolderIcon className="cnc-toast--icon" />}
        msg={msg}
      />
    ),

  /**
   * Creates an warn toast notification
   * @param {string} msg - the message to display in the toast
   * @return {string | number} - The toast id
   */
  warn: (msg: string): string | number =>
    toast.warn(
      <ToastMessage
        icon={<PlaceHolderIcon className="cnc-toast--icon" />}
        msg={msg}
      />
    ),
};

export default notify;
