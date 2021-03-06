import React from "react";
import { UPDATECART, useStore, toastifyMessage } from "../store/store";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import bags from "../assets/bag.jpeg";
import shirts from "../assets/shirts.jpeg";
import shoes from "../assets/shoe.png";
import shorts from "../assets/shorts.png";
import temporary from "../assets/temp_image.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    width: "60%",
    margin: "0 auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ProductItem(props) {
  const classes = useStyles();

  const { cart, dispatch } = useStore((state) => state);
  const product = props.product;

  const addToCart = (product) => {
    const cartCopy = cart;
    if (cartCopy[product.id]) {
      cartCopy[product.id].amount += product.amount;
    } else {
      cartCopy[product.id] = product;
    }
    if (cartCopy[product.id].amount > product.product.stock) {
      cartCopy[product.id].amount = product.product.stock;
      toastifyMessage(
        `${product.product.name} has already been added to your cart, and is now out of stock.`,
        "error"
      );
    }
    dispatch({ type: UPDATECART, payload: cartCopy });
    toastifyMessage(
      `${product.product.name} has been added to your cart.`,
      "success"
    );
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const preview = props.preview ? props.preview : false;

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {product.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
          {product.stock > 0 ? (
            <>{product.stock + " Available"}</>
          ) : (
            "Out of Stock"
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            {product.shortDesc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" color="secondary">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="add to cart"
            disabled={preview}
            onClick={(e) =>
              addToCart({
                id: product.name,
                product,
                amount: 1,
              })
            }
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Typography variant="caption">More about {product.name}:</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default ProductItem;
