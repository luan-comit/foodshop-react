import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';

import { SideDish } from '../../types';
import { GET_SIDE_DISHES } from '../../hooks/graphql/sideDish/queries/get-sideDishes';
import PageHeader from '../common/PageHeader';
import SideDishModal from './SideDishModal';
import SideDishItem from './SideDishItem';
import PageFooter from '../common/PageFooter';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(800),
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
      fontSize: 'large',
      fontWeight: 600,
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
    list: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);

const SideDishes: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedSideDish, setSelectedSideDish] = React.useState<Partial<SideDish>>();

  const { loading, data } = useQuery(GET_SIDE_DISHES);

  const handleOpen = (sideDish?: SideDish): void => {
    setSelectedSideDish(sideDish);
    setOpen(true);
  };

  if (loading) {
    return <div className={classes.skeleton}>Loading ...</div>;
  }

  const sideDishList = data?.sideDishes.map((sideDish: SideDish) => (
    <SideDishItem
      data-testid={`sideDish-item-${sideDish?.id}`}
      key={sideDish.id}
      handleOpen={handleOpen}
      sideDish={sideDish}
    />
  ));

  return (
    <Container>
      <PageHeader pageHeader={'Side Dishes for Broken Rice'} />
      <List className={classes.container}>
        <ListItem className={classes.header}>
          <div className={classes.list}>
            <p>Side Dish</p>
            <p>Price</p>
            <p>Modify</p>
          </div>
        </ListItem>
        <SideDishItem key="add-sideDish" handleOpen={handleOpen} />
        {sideDishList}
      </List>

      <SideDishModal
        selectedSideDish={selectedSideDish}
        setSelectedSideDish={setSelectedSideDish}
        open={open}
        setOpen={setOpen}
      />
      <PageFooter />
    </Container>
  );
};

export default SideDishes;
