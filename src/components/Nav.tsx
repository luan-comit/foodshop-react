import { NavLink, useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'space-between',
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 0, 2),
      maxWidth: 'md',
    },
    link: {
      textDecoration: 'none',
      fontWeight: 700,
      color: 'white',
      fontSize: theme.typography.pxToRem(20),
      padding: theme.spacing(0, 2),
      fontFamily: 'Papyrus',
    },
    logo: {
      width: theme.typography.pxToRem(50),
    },
    logoText: {
      fontFamily: 'Papyrus',
    },
  })
);

const Nav = (): JSX.Element | null => {
  const classes = useStyles();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.linkContainer}>
          <NavLink className={classes.link} to="/">
            <img
              alt="brokenRice-cuisine"
              className={classes.logo}
              src={'https://www.dropbox.com/scl/fi/6l368kkjwf9rervjzsqok/logo.jpeg?rlkey=7dvi2nwe01ev7jpp7m2ky84c0&raw=1'}
            />
          </NavLink>
          <NavLink className={classes.link} to="/brokenRices">
            Main Dishes
          </NavLink>
          <NavLink className={classes.link} to="/sideDishes">
            Side Dishes
          </NavLink>
        </div>
        <h1 className={classes.logoText}>VIETNAMESE CUISINE</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
