import React from 'react';
import { CREATE_CAMPAIGN, CampaignMutationInput, CampaignsQueryResult, GET_CAMPAIGNS, MutationResult, CampaignResult } from './campaigns-gql';
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { CampaignCard } from './campaign-card';

export const CreateCampaignMenu = () => {
  const client = useApolloClient();
  
  let nameInput: HTMLInputElement;
  let descriptionInput: HTMLTextAreaElement;
  const [createCampaign, { loading, error, data}] = useMutation(
    CREATE_CAMPAIGN,
    {
      update(client, { data: {createCampaign} }) {
        const cachedData : CampaignsQueryResult = client.readQuery({ query: GET_CAMPAIGNS }) as CampaignsQueryResult;
        const updatedData = cachedData;
        updatedData.me.campaigns.push(createCampaign);
        client.writeQuery({
          query: GET_CAMPAIGNS,
          data: updatedData
        });
      }
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const mutationData: MutationResult = data;

  return (
    <>
    {mutationData ? 
      <>
        Created {mutationData.createCampaign.name}
      </> : null}
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          const campaignInput: CampaignMutationInput = {
            name: nameInput!.value,
            description: descriptionInput?.value ?? ""
          };

          createCampaign({ variables: { campaignInput: campaignInput } })
            .catch(error => console.error(error));

          nameInput.value = '';
          descriptionInput.value = '';
        }}
      >
        <input
          id="create-campaign-name-input"
          ref={(node: HTMLInputElement) => {
            nameInput = node;
          }}
        />

        <textarea
          id="create-campaign-description-input"
          ref={(node: HTMLTextAreaElement) => {
            descriptionInput = node;
          }}
        />

        <button type="submit">Add Campaign</button>
      </form>
    </div>
    </>
  );
};