import React, { useState } from "react";
import clsx from 'clsx';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CAMPAIGNS,
  CampaignsQueryResult,
  CampaignResult,
  CREATE_CAMPAIGN,
  MutationResult,
} from "./campaigns-gql";
import Snackbar from "@material-ui/core/Snackbar";
import { CreateCampaign } from "./create-campaign";
import { CampaignCard } from "./campaign-card";
import { EmptyCampaigns } from "./empty-campaings";
import "./campaigns.scss";

export const Campaigns = () => {

  const [snack, setSnack] = useState({
    open: false,
    error: false,
    msg: '',
  });

  const handleCloseSnack = () => {
    setSnack({
      open: false,
      error: false,
      msg: '',
    });
  };

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_CAMPAIGNS);

  const [ createCampaign, { loading: mutationLoading }] = useMutation(CREATE_CAMPAIGN, {
    
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
      setSnack({
        open: true,
        error: false,
        msg: "Campaign \"" + createdCampaign + "\" created",
      });
    },

    onError: (error) => {
      setSnack({
        open: true,
        error: true,
        msg: error.message || "ERROR!",
      });
    }
  });

  if (queryLoading) {
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
      <div className='campaigns-container'>
        {campaigns.length > 0 ? 
          campaigns.map((campaign: CampaignResult) => (
            <CampaignCard campaign={campaign} />
          )) 
        : 
        <EmptyCampaigns/>}
        
      </div>
      
      <div className='create-campaigns-container'>
        <CreateCampaign mutationFn={createCampaign} />
      </div>
    </>
  );
};
