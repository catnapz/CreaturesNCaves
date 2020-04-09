import React from 'react';
import { CREATE_CAMPAIGN, CampaignMutationInput } from './campaigns-gql';
import { useMutation } from "@apollo/react-hooks";
import { ApolloError } from "apollo-boost";

export const CreateCampaignMenu = () => {
    let nameInput: HTMLInputElement;
    let descriptionInput: HTMLTextAreaElement;
    const [createCampaign, { data }] = useMutation(CREATE_CAMPAIGN, {onError: (error: ApolloError )=> console.error(error)});

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    
                    const campaignInput: CampaignMutationInput = {
                        name: nameInput!.value,
                        description: descriptionInput?.value ?? ""
                    };
                    
                    createCampaign({ variables: { campaignInput: campaignInput }})
                        .catch(error => console.error(error));
                    
                    nameInput.value = '';
                    descriptionInput.value = '';
                }}
            >
                <input
                    ref={(node: HTMLInputElement) => {
                        nameInput = node;
                    }}
                />
                
                <textarea
                    ref={(node: HTMLTextAreaElement) => {
                        descriptionInput = node;
                    }}
                />
                
                <button type="submit">Add Campaign</button>
            </form>
        </div>
    );
};