import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, TextareaAutosize, TextField } from '@mui/material';
import { FormProvider, RHFTextField } from '../../../components/hook-form';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};

export default function BookingConfirmation(props) {
  const [open, setOpen] = React.useState(props.isOpen);
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');


  const handleConfirming = () => {
    props.onConfirm(name, description);
    setOpen(false);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  return (
    <div>
      <BootstrapDialog
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.onClose}>
          Confirm your booking
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center">
              <TextField fullWidth label="Booking Name" value={name} variant="standard" onChange={handleNameChange}/>
            </Stack>
            <Stack direction="row" alignItems="center">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={20}
                placeholder="Booking Description"
                value={description}
                onChange={handleDescriptionChange}
                style={{ width: 500 }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirming}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
