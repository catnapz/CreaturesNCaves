import React from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CAMPAIGNS,
  CampaignsQueryResult,
  CampaignResult,
  CREATE_CAMPAIGN,
  MutationResult,
} from "./campaigns-gql";
import { CreateCampaign } from "./create-campaign";
import { CampaignCard } from "./campaign-card";
import { EmptyCampaigns } from "./empty-campaings";
import "./campaigns.scss";
import { createNotification } from "../../layout/notifications/notifications";
import { AuthService } from "../../../auth/auth-service";

const apolloClient = new AuthService().authenticateApolloClient();

export const Campaigns = () => {
  const dispatch = useDispatch();

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_CAMPAIGNS, {client: apolloClient});

  const [createCampaign, { loading: mutationLoading }] = useMutation(
    CREATE_CAMPAIGN,
    {
      client: apolloClient,
      update(cache, { data: { createCampaign } }) {
        const cachedData: CampaignsQueryResult = cache.readQuery({
          query: GET_CAMPAIGNS,
        }) as CampaignsQueryResult;
        cache.writeQuery({
          query: GET_CAMPAIGNS,
          data: cachedData.me.campaigns.push(createCampaign),
        });
      },

      onCompleted: (data) => {
        let createdCampaign = (data as MutationResult)?.createCampaign?.name;
        createNotification(dispatch, 'Campaign "' + createdCampaign + '" created', "success");
      },

      onError: (error) => {
        createNotification(dispatch, error.message || "ERROR!", "warning");
      },
    }
  );

  if (queryLoading || mutationLoading) {
    return (
      <>
        <p>Loading...</p>
        <CreateCampaign mutationFn={createCampaign} />
      </>
    );
  }

  if (queryError) {
    return (
      <>
        <p>{JSON.stringify(queryError)}</p>
        <p>Error :( </p>
        <CreateCampaign mutationFn={createCampaign} />
      </>
    );
  }

  const campaignsResult: CampaignsQueryResult = queryData;
  const campaigns = campaignsResult.me.campaigns;

  return (
    <>
      <div className="campaigns-container">
        {campaigns.length > 0 ? (
          campaigns.map((campaign: CampaignResult) => (
            <CampaignCard campaign={campaign} />
          ))
        ) : (
          <EmptyCampaigns />
        )}
      </div>

      <div className="create-campaigns-container">
        <CreateCampaign mutationFn={createCampaign} />
      </div>
    </>
  );
};
