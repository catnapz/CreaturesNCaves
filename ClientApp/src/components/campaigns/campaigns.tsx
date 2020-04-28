import React from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
import {
  enqueueNotification,
  EnqueueNotificationAction,
  dismissNotification,
  NotificationAction,
} from "../layout/notifications/notification-store.slice";
import Button from "@material-ui/core/Button";

export const Campaigns = () => {
  const dispatch = useDispatch();

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_CAMPAIGNS);

  const [createCampaign, { loading: mutationLoading }] = useMutation(
    CREATE_CAMPAIGN,
    {
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
        const notificationKey = new Date().getTime() + Math.random();
        const enqueueActionPayload: EnqueueNotificationAction = {
          notification: {
            dismissed: false,
            message: 'Campaign "' + createdCampaign + '" created',
            key: notificationKey,
            options: {
              key: notificationKey,
              variant: "success",
              action: (key) => {
                const dismissActionPayload: NotificationAction = { key };
                return (
                  <Button
                    onClick={() =>
                      dispatch(dismissNotification(dismissActionPayload))
                    }
                  >
                    Dismiss
                  </Button>
                );
              },
            },
          },
        };
        dispatch(enqueueNotification(enqueueActionPayload));
      },

      onError: (error) => {
        const notificationKey = new Date().getTime() + Math.random();
        const enqueueActionPayload: EnqueueNotificationAction = {
          notification: {
            dismissed: false,
            message: error.message || "ERROR!",
            key: notificationKey,
            options: {
              key: notificationKey,
              variant: "warning",
              action: (key) => {
                const dismissActionPayload: NotificationAction = { key };
                return (
                  <Button
                    onClick={() =>
                      dispatch(dismissNotification(dismissActionPayload))
                    }
                  >
                    Dismiss
                  </Button>
                );
              },
            },
          },
        };
        dispatch(enqueueNotification(enqueueActionPayload));
      },
    }
  );

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
