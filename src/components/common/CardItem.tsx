import React from 'react';
import { Card, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '2px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(4, 4, 4),
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface CardItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  rootClassName?: string;
}

const CardItem = ({ children, onClick, rootClassName, ...props }: CardItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card {...props} className={`${classes.root} ${rootClassName}`} onClick={onClick}>
      {children}
    </Card>
  );
};

export default CardItem;
