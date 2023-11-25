import React from 'react';
import { Backdrop, createStyles, Grid, makeStyles, Modal, Theme } from '@material-ui/core';
import BrokenRiceFormix from '../Formik/Formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
  })
);

interface BrokenRiceModalProps {
  selectedBrokenRice?: any;
  setSelectedBrokenRice: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrokenRiceModal = ({ selectedBrokenRice, setSelectedBrokenRice, open, setOpen }: BrokenRiceModalProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={(): void => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <BrokenRiceFormix
          selectedBrokenRice={selectedBrokenRice}
          setSelectedBrokenRice={setSelectedBrokenRice}
          open={open}
          setOpen={setOpen}
          mutationClick={selectedBrokenRice ? 'Update' : 'Add'}
        />
      </Modal>
    </Grid>
  );
};

export default BrokenRiceModal;
