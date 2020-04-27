import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CAMPAIGNS,
  CampaignsQueryResult,
  CampaignResult,
  CREATE_CAMPAIGN,
} from "./campaigns-gql";
import { CreateCampaignMenu } from "./create-campaign";
import "./campaigns.scss";
import { CampaignCard } from "./campaign-card";
import { EmptyCampaigns } from "./empty-campaings";

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
  const campaigns = campaignsResult.me.campaigns;

  return (
    <>
      <div className='campaigns-container'>
        {campaigns.length > 0 ? 
          campaigns.map((campaign: CampaignResult) => (
            <CampaignCard campaign={campaign} />
          )) 
        : 
        <EmptyCampaigns/>}
        
      </div>
      <div className='create-campaigns-container'>
        <CreateCampaignMenu mutationFn={createCampaign} />
      </div>
    </>
  );
};
