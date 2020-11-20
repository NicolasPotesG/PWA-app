import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 150,
    fontFamily: "Bebas Neue",
    color: "#fff",
  },
  message: {
    fontSize: 60,
    fontFamily: "Bebas Neue",
    color: "#fff",
  },
});

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("characters") === null) {
        setMessage("Error while connecting with API. Try again.");
      } else {
        setCharacters(localStorage.getItem("characters"));
      }
    } else {
      const URL =
        "https://gateway.marvel.com:443/v1/public/characters?apikey=5a0a0569628e543f4d96f69fe8e58ff1&hash=dfd61a622e03a1786f4c0007cf49891a&ts=hola";
      fetch(URL)
        .then((res) => {
          console.log(res);
          res.json();
        })
        .then((res) => {
          console.log(res);
          setCharacters(res.data.results);
          localStorage.setItem("characters", res.data.results);
        });
    }
  }, []);

  return (
    <Container fixed>
      <Typography
        align="center"
        variant="h1"
        component="h1"
        className={classes.title}
      >
        Marvel's Characters
      </Typography>
      <Typography
        align="center"
        variant="h3"
        component="h3"
        className={classes.message}
      >
        {message}
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        {characters.map((c) => (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Marvel Character"
                  height="140"
                  image={c.thumbnail.path + "." + c.thumbnail.extension}
                  title="Marvel Character"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {c.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {c.description === "" ? "No description" : c.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Characters;
