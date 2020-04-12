import React from "react";
import { render, wait, getByText, cleanup, fireEvent, act } from "@testing-library/react";
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { CreateCampaignMenu } from "./create-campaign-menu";
import { CREATE_CAMPAIGN, CampaignMutationInput, CampaignsQueryResult } from "./campaigns-gql";

function wrappedRender(componentToRender: JSX.Element, queryMocks: MockedResponse[] = []) {
  return render(
    <MockedProvider mocks={queryMocks}>
      {componentToRender}
    </MockedProvider>
  )
}

describe("CreateCampaignMenu", () => {

  afterAll(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<CreateCampaignMenu />);
    await wait(() => getByText(baseElement, "Add Campaign", { exact: false }));
  });

  it("should display success message on successful mutation", async () => {
    const mutationInput: CampaignMutationInput = {
      name: "test campaign mutation",
      description: "test campaign mutation description"
    }

    const mutationResult: CampaignsQueryResult = {
      me: {
        campaigns: [{
          campaignId: 0,
          description: mutationInput.description ?? "",
          name: mutationInput.name
        }]
      }
    };

    const mock: MockedResponse[] = [{
      request: {
        query: CREATE_CAMPAIGN,
        variables: { campaignInput: mutationInput },
      },
      result: { data: mutationResult }
    }];


    const { baseElement } = wrappedRender(<CreateCampaignMenu />, mock);
    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-name-input'
    }), { target: { value: mutationInput.name } });

    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-description-input'
    }), { target: { value: mutationInput.description } });

    fireEvent.click(getByText(baseElement, "Add Campaign", { exact: false }));

    await wait(() => getByText(baseElement, "Created!", { exact: false }));

  });

  it("should display error message on unsuccessful mutation", async () => {
    const mutationInput: CampaignMutationInput = {
      name: "test campaign mutation",
      description: "test campaign mutation description"
    }

    const mock: MockedResponse[] = [{
      request: {
        query: CREATE_CAMPAIGN,
        variables: { campaignInput: mutationInput },
      },
      error: new Error("Mock Error! Ignore Me.")
    }];


    const { baseElement } = wrappedRender(<CreateCampaignMenu />, mock);
    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-name-input'
    }), { target: { value: mutationInput.name } });

    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-description-input'
    }), { target: { value: mutationInput.description } });


    fireEvent.click(getByText(baseElement, "Add Campaign", { exact: false }));

    await wait(() => getByText(baseElement, "Error!", { exact: false }));

  });

  it("should display loading message while loading", async () => {
    const mutationInput: CampaignMutationInput = {
      name: "test campaign mutation",
      description: "test campaign mutation description"
    }

    const mutationResult: CampaignsQueryResult = {
      me: {
        campaigns: [{
          campaignId: 0,
          description: mutationInput.description ?? "",
          name: mutationInput.name
        }]
      }
    };

    const mock: MockedResponse[] = [{
      request: {
        query: CREATE_CAMPAIGN,
        variables: { campaignInput: mutationInput },
      },
      result: { data: mutationResult }
    }];


    const { baseElement } = wrappedRender(<CreateCampaignMenu />, mock);
    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-name-input'
    }), { target: { value: mutationInput.name } });

    fireEvent.change(getByText(baseElement, (content, element) => {
      return element.id === 'create-campaign-description-input'
    }), { target: { value: mutationInput.description } });

    act(() => {
      fireEvent.click(getByText(baseElement, "Add Campaign", { exact: false }));
    }
    );

    getByText(baseElement, "Loading...", { exact: false });

  });
});
