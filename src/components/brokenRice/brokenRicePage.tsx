import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Container, createStyles, IconButton, List, makeStyles, Theme } from '@material-ui/core';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';
import BrokenRiceItem from './BrokenRiceItem';
import { AddCircle } from '@material-ui/icons';
import BrokenRiceModal from './BrokenRiceModal';
import Grid from '@material-ui/core/Grid';
import { GET_BROKEN_RICE_RESPONSE } from '../../hooks/graphql/brokenRice/queries/get-BrokenRiceResponse';
import { BrokenRice } from '../../types/schema';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    container: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      spacing: 10,
      padding: '20px',
    },
    button: {
      textAlign: 'center',
      background: 'lightblue',
      color: 'red',
    },
  })
);

const BrokenRicePage: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedBrokenRice, setSelectedBrokenRice] = React.useState<Partial<BrokenRice>>();

  const handleOpen = (brokenRice?: BrokenRice): void => {
    setSelectedBrokenRice(brokenRice);
    setOpen(true);
  };

  const { loading, data, fetchMore } = useQuery(GET_BROKEN_RICE_RESPONSE, {
    variables: {
      limit: 3,
      cursor: '',
      totalCount: 0,
    },
  });

  if (loading) return <CardItemSkeleton data-testid="brokenRice-page-loading" />;

  const { connection, brokenRices } = data.brokenRicePage;
  const brokenRiceList = brokenRices.map((brokenRice: BrokenRice) => (
    <BrokenRiceItem data-testid={`brokenRice-item-${brokenRice.id}`} key={brokenRice.id} handleOpen={handleOpen} brokenRice={brokenRice} />
  ));

  var buttonDisplay = 'Load More Broken Rices ...';
  if (!connection.hasNextPage) {
    buttonDisplay = 'No more Broken Rices !';
  }

  return (
    <Container>
      <PageHeader pageHeader={'Broken Rices'} />
      <Grid>
        <List className={classes.container}>
          <div className={classes.right}>
            <h2>
              <i>Add Main Dish </i> ::: <span> </span>
              <IconButton edge="start" aria-label="modify" type="button" onClick={(): void => handleOpen()}>
                <AddCircle />
              </IconButton>
            </h2>
          </div>
          {brokenRiceList}
        </List>
      </Grid>
      <BrokenRiceModal selectedBrokenRice={selectedBrokenRice} setSelectedBrokenRice={setSelectedBrokenRice} open={open} setOpen={setOpen} />
      <Button
        className={classes.button}
        onClick={() => {
          if (connection.hasNextPage) {
            fetchMore({
              variables: {
                limit: 3,
                cursor: data.brokenRicePage.connection.cursor,
                totalCount: data.brokenRicePage.connection.totalCount,
              },
              updateQuery: (prev: any, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                fetchMoreResult.brokenRicePage.brokenRices = [...prev.brokenRicePage.brokenRices, ...fetchMoreResult.brokenRicePage.brokenRices];
                return fetchMoreResult;
              },
            });
          }
        }}
      >
        {buttonDisplay}
      </Button>
    </Container>
  );
};
export default BrokenRicePage;
