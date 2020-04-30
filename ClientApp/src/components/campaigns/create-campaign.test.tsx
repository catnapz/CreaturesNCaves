import React from "react";
import {
  render,
  wait,
  getByText,
  cleanup,
  fireEvent,
  screen,
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
    await wait(() =>
      getByText(baseElement, (content, element) => {
        return (
          element.tagName.toLowerCase() === "button" &&
          element.getAttribute("title") === "Add Campaign"
        );
      })
    );
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

    render(<CreateCampaign {...props} />);

    await wait(() => {
      fireEvent.click(
        screen.getByText((content, element) => {
          return (
            element.tagName.toLowerCase() === "button" &&
            element.getAttribute("title") === "Add Campaign"
          );
        })
      );
    });

    await wait(() => {
      fireEvent.change(
        screen.getByText((content, element) => {
          return element.id === "create-campaign-name";
        }),
        { target: { value: "name" } }
      );
    });

    await wait(() => {
      fireEvent.change(
        screen.getByText((content, element) => {
          return element.id === "create-campaign-description";
        }),
        { target: { value: "description" } }
      );
    });

    await wait(() => {
      fireEvent.click(
        screen.getByText((content, element) => {
          return element.tagName.toLowerCase() === "span" && content === "Add";
        })
      );
    });

    expect(mutationFnMock).toHaveBeenCalledWith(expectedData);
  });

  it("should not call mutation function when no name is specified", async () => {
    mutationFnMock.mockResolvedValue(true);
    const { baseElement } = render(<CreateCampaign {...props} />);
    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return (
            element.tagName.toLowerCase() === "button" &&
            element.getAttribute("title") === "Add Campaign"
          );
        })
      );
    });

    await wait(() => {
      fireEvent.change(
        getByText(baseElement, (content, element) => {
          return element.id === "create-campaign-name";
        }),
        { target: { value: "" } }
      );
    });

    await wait(() => {
      fireEvent.change(
        getByText(baseElement, (content, element) => {
          return element.id === "create-campaign-description";
        }),
        { target: { value: "description" } }
      );
    });

    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return element.tagName.toLowerCase() === "span" && content === "Add";
        })
      );
    });

    expect(mutationFnMock).not.toHaveBeenCalled();
  });

  it("should display an error when no name is specified", async () => {
    mutationFnMock.mockResolvedValue(true);
    const { baseElement } = render(<CreateCampaign {...props} />);
    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return (
            element.tagName.toLowerCase() === "button" &&
            element.getAttribute("title") === "Add Campaign"
          );
        })
      );
    });

    await wait(() => {
      fireEvent.change(
        getByText(baseElement, (content, element) => {
          return element.id === "create-campaign-name";
        }),
        { target: { value: "" } }
      );
    });

    await wait(() => {
      fireEvent.change(
        getByText(baseElement, (content, element) => {
          return element.id === "create-campaign-description";
        }),
        { target: { value: "description" } }
      );
    });

    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return element.tagName.toLowerCase() === "span" && content === "Add";
        })
      );
    });

    await getByText(baseElement, (content, element) => {
      return (
        element.id === "password-field-helper-text" &&
        content === "Please enter name"
      );
    });
  });

  it("should catch mutation error", async () => {
    const mockError = new Error("mock error, ignore me.");
    mutationFnMock.mockImplementation(() => {
      throw mockError;
    });
    const { baseElement } = render(<CreateCampaign {...props} />);
    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return (
            element.tagName.toLowerCase() === "button" &&
            element.getAttribute("title") === "Add Campaign"
          );
        })
      );
    });

    await wait(() => {
      fireEvent.change(
        getByText(baseElement, (content, element) => {
          return element.id === "create-campaign-name";
        }),
        { target: { value: "name" } }
      );
    });

    await wait(() => {
      fireEvent.click(
        getByText(baseElement, (content, element) => {
          return element.tagName.toLowerCase() === "span" && content === "Add";
        })
      );
    });

    await expect(mutationFnMock).toHaveBeenCalled();
  });

  afterAll(() => {
    mutationFnMock.mockRestore();
  });
});
