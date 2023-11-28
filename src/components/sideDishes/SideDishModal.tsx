import React from "react"
import { AddCircle, Delete } from "@material-ui/icons"
import {
  Backdrop,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core"

import useSideDishMutations from "../../hooks/sideDish/use-sideDish-mutations"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
        justifyContent: "center",
      },
    },
  })
)

interface SideDishModalProps {
  selectedSideDish?: any;
  setSelectedSideDish: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideDishModal = ({
  selectedSideDish,
  setSelectedSideDish,
  open,
  setOpen,
}: SideDishModalProps): JSX.Element => {
  const classes = useStyles()

  const { onCreateSideDish, onDeleteSideDish, onUpdateSideDish } =
    useSideDishMutations()

  return (
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
      <Fade in={open}>
        <Paper className={classes.paper}>
          <h2>{selectedSideDish ? "Edit" : "Add"} SideDish</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="name-input"
              label="SideDish Name"
              defaultValue={selectedSideDish?.name}
              onChange={(event): void =>
                setSelectedSideDish({
                  ...selectedSideDish,
                  name: event.target.value,
                })
              }
            />
            <TextField
              id="price-input"
              label="SideDish Price in Cents"
              type="number"
              defaultValue={selectedSideDish?.priceCents}
              onChange={(event): void =>
                setSelectedSideDish({
                  ...selectedSideDish,
                  priceCents: parseInt(event.target.value),
                })
              }
            />
            <IconButton
              edge="end"
              aria-label="update"
              type="button"
              onClick={(): void => {
                selectedSideDish?.id
                  ? onUpdateSideDish(selectedSideDish)
                  : onCreateSideDish(selectedSideDish)
                setOpen(false)
              }}
            >
              <AddCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              type="button"
              onClick={(): void => {
                onDeleteSideDish(selectedSideDish);
                setOpen(false);
              }}
            >
              <Delete />
            </IconButton>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default SideDishModal;
