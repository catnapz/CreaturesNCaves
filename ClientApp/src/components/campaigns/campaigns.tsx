import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CAMPAIGNS,
  CampaignsQueryResult,
  CampaignResult,
  CREATE_CAMPAIGN,
} from "./campaigns-gql";
import { CreateCampaignMenu } from "./create-campaign-menu";
import "./campaigns.scss";
import { CampaignCard } from "./campaign-card";

export const Campaigns = () => {
  
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_CAMPAIGNS);

  const [
    createCampaign,
    { loading: mutationLoading, error: mutationError, data: mutationData }, // used for toast msgs
  ] = useMutation(CREATE_CAMPAIGN, {
    update(cache, { data: { createCampaign } }) {
      const cachedData: CampaignsQueryResult = cache.readQuery({
        query: GET_CAMPAIGNS,
      }) as CampaignsQueryResult;
      cache.writeQuery({
        query: GET_CAMPAIGNS,
        data: cachedData.me.campaigns.push(createCampaign),
      });
    },
  });

  if (queryLoading) {
    return (
      <>
        <p>Loading...</p>
        <CreateCampaignMenu mutationFn={createCampaign} />
      </>
    );
  }

  if (queryError) {
    return (
      <>
        <p>{JSON.stringify(queryError)}</p>
        <p>Error :( </p>
        <CreateCampaignMenu mutationFn={createCampaign} />
      </>
    );
  }

  const campaignsResult: CampaignsQueryResult = queryData;

  return (
    <>
      {campaignsResult.me.campaigns.map((campaign: CampaignResult) => (
        <CampaignCard campaign={campaign} />
      ))}
      <CreateCampaignMenu mutationFn={createCampaign} />
    </>
  );
};
