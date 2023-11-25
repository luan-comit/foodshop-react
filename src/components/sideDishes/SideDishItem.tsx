import { IconButton, ListItem, Theme } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import toDollars from '../../lib/format-dollars';
import { SideDish } from '../../types';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    display: 'flex',
  },
  name: {
    minWidth: typography.pxToRem(500),
  },
  right: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

export interface SideDishItemProps {
  sideDish?: SideDish;
  handleOpen: (sideDish?: SideDish) => void;
}

const SideDishItem: React.FC<SideDishItemProps> = ({ sideDish, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <ListItem {...props} className={classes.container}>
      <p data-testid={`sideDish-name-${sideDish?.id}`} className={classes.name}>
        {sideDish?.name ?? <strong><i>Add side dish </i></strong>}
      </p>
      <div className={classes.right}>
        <p data-testid={`sideDish-price-${sideDish?.id}`}>{sideDish?.priceCents ? toDollars(sideDish.priceCents) : ''}</p>
        <IconButton edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(sideDish)}>
          {sideDish ? <Edit /> : <AddCircle />}
        </IconButton>
      </div>
    </ListItem>
  );
};

export default SideDishItem;
