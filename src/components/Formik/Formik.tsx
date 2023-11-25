import React from 'react';
import { useFormik } from 'formik';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { GET_SIDE_DISHES } from '../../hooks/graphql/sideDish/queries/get-sideDishes';
import { useQuery } from '@apollo/client';
import { SideDish } from '../../types';
import useBrokenRiceMutations from '../../hooks/brokenRice/use-brokenRice-mutations';
import { Delete } from '@material-ui/icons';
import toDollars from '../../lib/format-dollars';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      border: '3px solid',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'left',
      margin: '10px',
      padding: '10px 15px',
    },
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
        width: '25ch',
      },
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    input: {
      background: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: theme.typography.pxToRem(15),
      color: 'blue',
    },
    Submit: {
      fontSize: theme.typography.pxToRem(15),
      background: 'black',
      color: 'silver',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      hover: 'red',
      margin: '20px',
      borderRadius: '5px',
      padding: '5px 15px',
    },
    mutation: {
      display: 'flex',
    },
    cad: {
      color: 'blue',
    },
    header: {
      margin: '10px',
    },
  })
);

interface BrokenRiceFormikProps {
  selectedBrokenRice?: any;
  setSelectedBrokenRice: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutationClick: string;
}

const BrokenRiceFormix = ({ selectedBrokenRice, setOpen, mutationClick }: BrokenRiceFormikProps): JSX.Element => {
  const classes = useStyles();

  const { onCreateBrokenRice, onDeleteBrokenRice, onUpdateBrokenRice } = useBrokenRiceMutations();
  const { data } = useQuery(GET_SIDE_DISHES);

  const sideDishIdsFromSelectedBrokenRice = selectedBrokenRice?.sideDishes.map((sideDish: SideDish) => {
    return sideDish.id;
  });
  const sideDishesFromSelectedBrokenRice = data?.sideDishes.map((sideDish: SideDish) => {
    const selected = sideDishIdsFromSelectedBrokenRice?.includes(sideDish.id) ? true : false;
    return (
      <option value={sideDish.id} selected={selected}>
        {sideDish.name} - {toDollars(sideDish.priceCents)}
      </option>
    );
  });

  const formik = useFormik({
    initialValues: {
      name: selectedBrokenRice?.name,
      description: selectedBrokenRice?.description,
      imgSrc: selectedBrokenRice?.imgSrc,
      id: selectedBrokenRice?.id,
      sideDishes: selectedBrokenRice?.sideDishes,
      mutation: mutationClick,
    },
    onSubmit: (values) => {
      const { id, name, description, imgSrc } = values;
      const sideDishIds = values.sideDishes;

      selectedBrokenRice
        ? onUpdateBrokenRice({ id, name, description, imgSrc, sideDishIds })
        : onCreateBrokenRice({ name, description, imgSrc, sideDishIds });
      setOpen(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes.header}>
        <h2>{selectedBrokenRice ? 'Edit' : 'Add'} BrokenRice </h2>
      </div>
      <div className={classes.input}>
        <label className={classes.label} htmlFor="Name">
          BrokenRice Name:
        </label>
        <input
          className={classes.form}
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className={classes.input}>
        <label className={classes.label} htmlFor="Description">
          Description:
        </label>
        <input
          className={classes.form}
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </div>
      <div className={classes.input}>
        <label className={classes.label} htmlFor="Description">
          Image URL:
        </label>
        <input
          className={classes.form}
          id="imgSrc"
          name="imgSrc"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.imgSrc}
        />
      </div>
      <div className={classes.input}>
        <label className={classes.label} htmlFor="sideDishIds">
          SideDishes:
        </label>
        <select className={classes.form} multiple id="sideDishes" name="sideDishes" onChange={formik.handleChange}>
          {sideDishesFromSelectedBrokenRice}
        </select>
      </div>
      <div className={classes.mutation}>
        <button className={classes.Submit} type="submit">
          {formik.values.mutation}
        </button>
        <IconButton
          edge="end"
          aria-label="delete"
          type="button"
          onClick={(): void => {
            onDeleteBrokenRice(selectedBrokenRice);
            setOpen(false);
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </form>
  );
};

export default BrokenRiceFormix;
