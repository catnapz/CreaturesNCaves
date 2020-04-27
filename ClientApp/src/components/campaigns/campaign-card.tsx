import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CampaignResult } from './campaigns-gql';

interface CampaignCardProps {
  campaign: CampaignResult
}

export const CampaignCard = (props: CampaignCardProps) => (
  <Card key={props.campaign.campaignId} className="campaigns-card">
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
        className="campaigns-card-name-text"
      >
        {props.campaign.name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className="campaigns-card-description-text"
      >
        {props.campaign.description}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small">Button1</Button>
    </CardActions>
  </Card>
);