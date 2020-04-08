import {gql} from "apollo-boost";

export const GET_CAMPAIGNS = gql`
  {
    me {
      campaigns {
        campaignId
        name
        description
      }
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
mutation createCampaignMutation($campaign: CampaignInput!) {
  createCampaign(campaign: $campaign) {
    campaignId
    name
    description
  }
}
`;

export interface CampaignMutationInput {
    description?: string;
    name: string;
}


export interface CampaignsQueryResult {
    me: {
        campaigns: CampaignResult[];
    };
}

export interface CampaignResult {
    campaignId: string;
    name: string;
    description: string;
}