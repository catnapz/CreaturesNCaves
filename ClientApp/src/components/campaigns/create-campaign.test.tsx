import React from "react";
import {
  render,
  wait,
  getByText,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { CreateCampaign } from "./create-campaign";

const mutationFnMock = jest.fn();

describe("CreateCampaign", () => {
  const props = {
    mutationFn: mutationFnMock,
  };

  afterEach(() => {
    cleanup();
    mutationFnMock.mockClear();
  });

  it("should render successfully", async () => {
    const { baseElement } = render(<CreateCampaign {...props} />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && element.getAttribute('title') === 'Add Campaign';
    }));
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
    const { baseElement } = render(<CreateCampaign {...props} />);
    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && element.getAttribute('title') === 'Add Campaign';
    }));

    fireEvent.change(
      getByText(baseElement, (content, element) => {
        return element.id === "create-campaign-name";
      }),
      { target: { value: "name" } }
    );

    fireEvent.change(
      getByText(baseElement, (content, element) => {
        return element.id === "create-campaign-description";
      }),
      { target: { value: "description" } }
    );

    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'span' && content === 'Add';
    }));


    expect(mutationFnMock).toHaveBeenCalledWith(expectedData);
  });

  afterAll(() => {
    mutationFnMock.mockRestore();
  });
});
