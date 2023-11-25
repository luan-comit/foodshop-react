import { NavLink } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    color: 'black',
    fontSize: theme.typography.pxToRem(40),
    width: '100%',
    fontFamily: 'Papyrus',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
}));

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <NavLink className={classes.link} to="/brokenRices">
          Broken Rices
        </NavLink>
        <NavLink className={classes.link} to="/sideDishes">
          Side Dishes
        </NavLink>
      </div>
      <img
        alt="brokenRice-background"
        className={classes.img}
        src= {'https://www.dropbox.com/scl/fi/x8v8q0ixoddaoq15fl8lk/home-page.png?rlkey=dol169cfr4xfv6q9268lhw7c8&raw=1'}
      />
    </div>
  );
};

export default Home;
