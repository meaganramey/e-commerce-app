import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import bags from "../assets/bag.jpeg";
import shirts from "../assets/shirts.jpeg";
import shoes from "../assets/shoe.png";
import shorts from "../assets/shorts.png";
import temporary from "../assets/temp_image.jpeg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "50%",
    margin: "0 auto",
  },
  root: {
    maxWidth: 500,
    margin: "0 auto",
    alignContent: "space-around",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function CartItem(props) {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;

  const classes = useStyles();

  let title = product.name.slice(0, 1).toUpperCase() + product.name.slice(1);
  const lastLetter = product.name.slice(-1);
  if (lastLetter === "s") {
    title = product.name.slice(0, 1).toUpperCase() + product.name.slice(1, -1);
  }
  let photo;
  if (product.name === "bags") {
    photo = bags;
  } else if (product.name === "shirts") {
    photo = shirts;
  } else if (product.name === "shoes") {
    photo = shoes;
  } else if (product.name === "shorts") {
    photo = shorts;
  } else {
    photo = temporary;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {product.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          title={title}
          subheader={product.price}
        />
        <CardMedia
          className={classes.media}
          image={photo}
          alt={product.shortDesc}
        />
        <CardContent>
          <h3>
          {amount} in Cart
          </h3>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.shortDesc}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={(e) => props.removeFromCart(cartKey)}
          >
            Remove From Cart
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default CartItem;
