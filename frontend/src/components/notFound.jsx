import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import errorimg from "../Assests/404page.png";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    // paddingTop: theme.spacing(10),
  },
  image: {
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",

    // marginBottom: theme.spacing(4),
  },
  button: {
    // marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={errorimg} alt="Page Not Found" className={classes.image} />
      <Typography variant="h4">Oops! Page not found.</Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className={classes.button}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
