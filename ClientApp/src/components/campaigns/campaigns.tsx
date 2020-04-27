import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GET_CAMPAIGNS, CampaignsQueryResult, CampaignResult } from './campaigns-gql';
import { CreateCampaignMenu } from "./create-campaign-menu";
import './campaigns.scss';
import { CampaignCard } from './campaign-card';

export const Campaigns = () => {
  const { loading, error, data, refetch} = useQuery(GET_CAMPAIGNS);
  if (loading) {
    return (
      <>
        <p>{JSON.stringify(error)}</p>
        <p>Loading...</p>
        <CreateCampaignMenu/>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>{JSON.stringify(error)}</p>
        <p>Error :( </p>
        <CreateCampaignMenu/>
      </>

    );
  }

  const campaignsResult: CampaignsQueryResult = data;

  return (
    <>
      {campaignsResult.me.campaigns.map((campaign: CampaignResult) => (
        <CampaignCard campaign={campaign}/>
      ))}
      <CreateCampaignMenu/>
    </>
  );

};