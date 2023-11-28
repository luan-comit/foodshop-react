import { NavLink } from "react-router-dom"
import { createStyles, makeStyles, Theme } from "@material-ui/core"
import PageFooter from "./common/PageFooter"
import { theme } from "../theme/theme"

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      maxWidth: "md",
      color: "white",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      height: "100vh",
      position: "fixed",
      overflow: "hidden",
    },
    img: {
      maxWidth: "md",
      position: "absolute",
      width: "100%",
      zIndex: -1,
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      textDecoration: "none",
      fontWeight: 700,
      color: "black",
      fontSize: "larger",
      width: "50%",
      fontFamily: "Papyrus",
    },
    link: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      fontWeight: 700,
      color: "black",
      fontSize: "normal",
      width: "50%",
      fontFamily: "Papyrus",
      paddingTop: 30,
      "&:hover": {
        cursor: "pointer",
      },
    },
    buttonContainer: {
      padding: 20,
      textAlign: "center",
    },
    header: {
      fontWeight: 700,
      color: "black",
      fontSize: theme.typography.pxToRem(25),
      position: "absolute",
      top: 20,
      width: "100%",
    },
    footer: {
      width: "100%",
      position: "absolute",
      bottom: 20,
      left: 50,
      display: "flex",
      textAlign: "center",
    },
  })
)

const Home = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <NavLink className={classes.menu} to="/">
          Food Shop:
        </NavLink>
        <NavLink className={classes.link} to="/brokenRices">
          Main Dishes
        </NavLink>
        <NavLink className={classes.link} to="/sideDishes">
          Side Dishes
        </NavLink>
      </div>
      <img
        alt="brokenRice-background"
        className={classes.img}
        src={
          "https://www.dropbox.com/scl/fi/x8v8q0ixoddaoq15fl8lk/home-page.png?rlkey=dol169cfr4xfv6q9268lhw7c8&raw=1"
        }
      />
      <div className={classes.footer}>
        <PageFooter />
      </div>
    </div>
  )
}

export default Home
