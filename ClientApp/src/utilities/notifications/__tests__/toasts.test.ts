import { ReactElement } from "react";
import { toast } from "react-toastify";
import notify from "../toasts";

const infoToastSpy = jest.spyOn(toast, "info");
const successToastSpy = jest.spyOn(toast, "success");
const errorToastSpy = jest.spyOn(toast, "error");
const warnToastSpy = jest.spyOn(toast, "warn");

describe("Toasts", () => {
  [
    {
      name: "success",
      fn: notify.success,
      spy: successToastSpy,
    },
    {
      name: "error",
      fn: notify.error,
      spy: errorToastSpy,
    },
    {
      name: "warn",
      fn: notify.warn,
      spy: warnToastSpy,
    },
    {
      name: "info",
      fn: notify.info,
      spy: infoToastSpy,
    },
  ].forEach((testCase) => {
    it(`should create message element for ${testCase.name} toasts `, async () => {
      const expectedMsg = "test";
      testCase.fn(expectedMsg);
      const toastMessage = testCase.spy.mock.calls[0][0] as ReactElement;
      expect(toastMessage.props.msg).toBe(expectedMsg);
    });
  });
});
