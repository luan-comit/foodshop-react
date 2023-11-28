import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    display: 'flex',
    margin: theme.spacing(2, 0, 2),
    fontSize: theme.typography.pxToRem(6),
    textTransform: 'capitalize',
    fontFamily: 'Papyrus',
    color: 'blue',
    bottom: 20,
    left: 50,
  },
}));

interface PageFooterProps {
  pageFooter?: string;
}


const PageFooter = ({ pageFooter = '© Food Shop - a TypeScript & GraphQL & React project of Luan Le' }: PageFooterProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <h1>{pageFooter}</h1>
    </div>
  );
};

export default PageFooter;
