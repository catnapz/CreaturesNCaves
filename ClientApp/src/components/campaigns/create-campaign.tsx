import React, { useState } from 'react';
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { CampaignMutationInput } from './campaigns-gql';
import './create-campaign.scss';

interface CreateCampaignProps {
  mutationFn: (options?: MutationFunctionOptions<any, Record<string, any>> | undefined) => Promise<ExecutionResult<any>>
}

export const CreateCampaign = (props: CreateCampaignProps) => {
  const [name, setName] = useState('');
  const [nameCheck, setNameCheck] = useState({ error: false, helperText: '' });
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameCheck({ error: false, helperText: '' });
  };

  const handleDescriptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  const handleSubmit = async () => {

    setName(name.trim());
    if (name) {
      const campaignInput: CampaignMutationInput = {
        name: name,
        description: description
      };

      try {
        await props.mutationFn({ variables: { campaignInput: campaignInput } });
      } catch (error) {
        console.error(error);
      }
      handleClose();

    } else {
      setNameCheck({ error: true, helperText: 'Please enter name' });
    }

  };

  return (
    <>
      <Tooltip title="Add Campaign" arrow>
        <Fab color="secondary" onClick={handleOpen}>
          <AddIcon className='add-campaign-icon'/>
        </Fab>
      </Tooltip>

      <Dialog
        className='create-campaign-dialog'
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <DialogTitle id="create-campaign-dialog-title">Create Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a campaign, please enter at least the campaign's name here.
          </DialogContentText>

          <FormGroup className="create-campaign-form-group">

            <FormControl variant="outlined" fullWidth>
              <InputLabel
                error={nameCheck.error}
                htmlFor="create-campaign-name"
              >
                Name
              </InputLabel>

              <OutlinedInput
                id="create-campaign-name"
                label="Name"
                error={nameCheck.error}
                value={name}
                onChange={handleNameInput}
              />

              <FormHelperText
                id="password-field-helper-text"
                error={nameCheck.error}
              >
                {nameCheck.helperText}
              </FormHelperText>

            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="create-campaign-description">Description</InputLabel>
              <OutlinedInput
                multiline
                id="create-campaign-description"
                label="Description"
                value={description}
                onChange={handleDescriptionInput}
              />
            </FormControl>

          </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>

          <Button color="secondary" onClick={handleSubmit} variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};