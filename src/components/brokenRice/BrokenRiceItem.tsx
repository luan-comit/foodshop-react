import React from 'react';
import CardItem from '../common/CardItem';
import { BrokenRice } from '../../types';
import {
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  Grid,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import toDollars from '../../lib/format-dollars';
import { AddCircle, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '65%',
      display: 'flex',
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    imgSize: {
      width: '85%',
      height: '50%',
    },
    sideDishes: {
      fontSize: theme.typography.pxToRem(10),
      color: 'blue',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    dollar: {
      fontSize: theme.typography.pxToRem(15),
      color: 'orange',
      display: 'flex',
      justifyContent: 'center',
    },
    description: {
      fontSize: theme.typography.pxToRem(8),
      display: 'flex',
      padding: '5px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  })
);
export interface BrokenRiceItemProps {
  brokenRice?: BrokenRice;
  handleOpen: (brokenRice?: BrokenRice) => void;
}

const getSideDishNames = (brokenRice: any) => {
  const sideDishes = brokenRice?.sideDishes.map((sideDish: any) => <span key={sideDish.id}>+{sideDish.name}</span>);
  return sideDishes;
};

const BrokenRiceItem: React.FC<BrokenRiceItemProps> = ({ handleOpen, brokenRice, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <CardItem {...props} rootClassName={classes.root}>
        <div data-testid={`brokenRice-button-${brokenRice?.id}`} className={classes.right}>
          <IconButton edge="start" aria-label="modify" type="button" onClick={(): void => handleOpen(brokenRice)}>
            {brokenRice ? <Edit /> : <AddCircle />}
          </IconButton>
        </div>
        <CardMedia
          title='test'
          component="img"
          alt="green iguana"
          height="100"
          data-testid={`brokenRice-image-${brokenRice?.id}`}
          src={brokenRice?.imgSrc} //className={classes.imgSize}
        ></CardMedia>
        <CardContent>
          <Typography component="div" data-testid={`brokenRice-name-value-${brokenRice?.id}`}>
            <h5>{brokenRice?.name}</h5>
          </Typography>
          <Typography data-testid={`brokenRice-price-${brokenRice?.id}`} className={classes.dollar}>
            {brokenRice ? toDollars(brokenRice.priceCents) : ''}
          </Typography>
          <Typography variant="body2" data-testid={`brokenRice-sideDishes-${brokenRice?.id}`} className={classes.sideDishes}>
            {getSideDishNames(brokenRice)}
          </Typography>
          <Typography data-testid={`brokenRice-description-${brokenRice?.id}`} className={classes.description}>
            {brokenRice?.description}
          </Typography>
        </CardContent>
      </CardItem>
    </Grid>
  );
};

export default BrokenRiceItem;
export { getSideDishNames };
