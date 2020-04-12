import React from 'react';
import { CREATE_CAMPAIGN, CampaignMutationInput } from './campaigns-gql';
import { useMutation } from "@apollo/react-hooks";
import { ApolloError } from "apollo-boost";

export const CreateCampaignMenu = () => {
  let nameInput: HTMLInputElement;
  let descriptionInput: HTMLTextAreaElement;
  const [createCampaign, { loading, error, data }] = useMutation(CREATE_CAMPAIGN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) return <p>Created!</p>;

  return (
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
  );
};