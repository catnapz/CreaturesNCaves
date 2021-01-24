import React from "react";
import {
  render,
  waitFor,
  getByText,
  cleanup,
} from "@testing-library/react";
import * as ReactRedux from "react-redux";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { configureStore } from '@reduxjs/toolkit';
import { Campaigns } from "./campaigns";
import {
  GET_CAMPAIGNS,
  CampaignsQueryResult
} from "./campaigns-gql";
import * as notifStore from '../../layout/notifications/notification-store.slice';

const store = configureStore({
  reducer: {
    [notifStore.NOTIFICATION_STORE_FEATURE_KEY]: notifStore.notificationStoreReducer,
  },
});

function wrappedRender(componentToRender: JSX.Element, queryMocks: MockedResponse[] = []) {
  return render(
    <ReactRedux.Provider store={store}>
      <MockedProvider mocks={queryMocks} addTypename={false}>
        {componentToRender}
      </MockedProvider>
    </ReactRedux.Provider>
  );
}

jest.mock("./create-campaign", () => ({
  CreateCampaign: "mocked-create-campaign",
}));

describe("Campaigns", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<Campaigns />);
    await waitFor(() =>
      getByText(baseElement as HTMLElement, (content, element) => {
        return element!.tagName.toLowerCase() === "mocked-create-campaign";
      })
    );
  });
});
