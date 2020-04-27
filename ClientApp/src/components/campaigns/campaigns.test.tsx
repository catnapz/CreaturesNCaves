import React from "react";
import { render, wait, getByText, cleanup, fireEvent, act } from "@testing-library/react";
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { Campaigns } from "./campaigns";
import { GET_CAMPAIGNS, CampaignsQueryResult, CampaignMutationInput } from "./campaigns-gql";

function wrappedRender(componentToRender: JSX.Element, queryMocks: MockedResponse[] = []) {
  return render(
    <MockedProvider mocks={queryMocks} addTypename={false}>
      {componentToRender}
    </MockedProvider>
  )
}

jest.mock('./create-campaign', () => ({
  CreateCampaign: 'mocked-create-campaign'
}));

describe("CreateCampaignMenu", () => {

  afterEach(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<Campaigns />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'mocked-create-campaign';
    }));
  });

  it("should display data successful query", async () => {

    const queryResult: CampaignsQueryResult = {
      me: {
        campaigns: [{
          campaignId: "0",
          description: "test-description",
          name: "test-name",
        }]
      }
    };

    const mock: MockedResponse[] = [{
      request: {
        query: GET_CAMPAIGNS,
      },
      result: { data: queryResult, }
    }];


    const { baseElement } = wrappedRender(<Campaigns />, mock);

    await wait(() => getByText(baseElement, (content, element) => {
      return element.classList.contains("campaigns-card-name-text") && content === "test-name";
    }));
  });

  it("should display error message on unsuccessful query", async () => {

    const mock: MockedResponse[] = [{
      request: {
        query: GET_CAMPAIGNS,
      },
      error: new Error("Mock Error. Ignore Me!")
    }];


    const { baseElement } = wrappedRender(<Campaigns />, mock);

    await wait(() => getByText(baseElement, "Error :("));
  });
});
