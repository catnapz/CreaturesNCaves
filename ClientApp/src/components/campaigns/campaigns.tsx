import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {GET_CAMPAIGNS, CampaignsQueryResult, CampaignResult} from './campaigns-gql';
import { CreateCampaignMenu } from "./create-campaign-menu";
import './campaigns.scss';

export const Campaigns = () => {
    const { loading, error, data } = useQuery(GET_CAMPAIGNS);

    if (loading) {
        return (
            <>
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
                <Card key={campaign.campaignId} className="campaigns-card">
                    <CardActionArea>
                        <CardMedia
                            className="campaigns-card-media"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            image="https://as1.ftcdn.net/jpg/00/74/00/86/500_F_74008682_y3MIzggMbN75SokhUkoGnNw6pr5Kyt6m.jpg"
                            title="Dragon"
                        />
                    </CardActionArea>
                    
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {campaign.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {campaign.description}
                        </Typography>
                    </CardContent>
                    
                    <CardActions>
                        <Button size="small">Button1</Button>
                    </CardActions>
                </Card>
            ))}
            <CreateCampaignMenu/>
        </>
    );
    
};