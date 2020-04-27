import React from 'react';
import { CampaignMutationInput } from './campaigns-gql';
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';

interface CreateCampaignMenuProps {
  mutationFn: (options?: MutationFunctionOptions<any, Record<string, any>> | undefined) => Promise<ExecutionResult<any>>
}

export const CreateCampaignMenu = (props: CreateCampaignMenuProps) => { 
  let nameInput: HTMLInputElement;
  let descriptionInput: HTMLTextAreaElement;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          const campaignInput: CampaignMutationInput = {
            name: nameInput!.value,
            description: descriptionInput?.value ?? ""
          };

          props.mutationFn({ variables: { campaignInput: campaignInput } })
            .catch((error) => console.error(error));

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