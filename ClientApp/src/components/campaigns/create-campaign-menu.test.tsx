import React from "react";
import {
  render,
  wait,
  getByText,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { CreateCampaignMenu } from "./create-campaign-menu";

const mutationFnMock = jest.fn();

describe("CreateCampaignMenu", () => {
  const props = {
    mutationFn: mutationFnMock,
  };

  afterEach(() => {
    cleanup();
    mutationFnMock.mockClear();
  });

  it("should render successfully", async () => {
    const { baseElement } = render(<CreateCampaignMenu {...props} />);
    await wait(() => getByText(baseElement, "Add Campaign", { exact: false }));
  });

  it("should call mutation function on add campaign button click", async () => {
    const expectedData = {
      variables: {
        campaignInput: {
          description: "description",
          name: "name",
        },
      },
    };
    mutationFnMock.mockResolvedValue(true);
    const { baseElement } = render(<CreateCampaignMenu {...props} />);
    fireEvent.change(
      getByText(baseElement, (content, element) => {
        return element.id === "create-campaign-name-input";
      }),
      { target: { value: "name" } }
    );

    fireEvent.change(
      getByText(baseElement, (content, element) => {
        return element.id === "create-campaign-description-input";
      }),
      { target: { value: "description" } }
    );

    fireEvent.click(getByText(baseElement, "Add Campaign", { exact: false }));

    expect(mutationFnMock).toHaveBeenCalledWith(expectedData);
  });

  afterAll(() => {
    mutationFnMock.mockRestore();
  });
});
