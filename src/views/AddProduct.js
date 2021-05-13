import React, { useState } from "react";
import { addProductRequest } from "../fetchRequests";
import { ADDAPRODUCT, UPDATECART, useStore } from "../store/store";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
    backgroundColor: red[500],
  },
}));

function AddProduct(props) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    shortDesc: "",
    description: "",
  });
  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user);

  const saveProduct = (e) => {
    e.preventDefault();
    addProductRequest(formData, user.token).then((res) =>
      dispatch({ type: ADDAPRODUCT, payload: res })
    );
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((state) => ({ ...state, [inputName]: inputValue }));
  };

  const classes = useStyles();

  const { cart } = useStore((state) => state);
  const product = {
    id: "hdmdu0t80yjkfqselfc",
    name: "shoes",
    stock: 10,
    price: 399.99,
    shortDesc: "Nulla facilisi. Curabitur at lacus ac velit ornare lobortis.",
    description:
      "Cras sagittis. Praesent nec nisl a purus blandit viverra. Ut leo. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Fusce a quam.",
  };

  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <h4>AddProduct</h4>
      <form onSubmit={saveProduct}>
        <div>
          <label htmlFor="name">Product Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Available in Stock :</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="shortdesc">Short Description :</label>
          <input
            type="text"
            name="shortDesc"
            value={formData.shortDesc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Product</button>
      </form>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {formData.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <TextField
              id="filled-basic"
              label="Product Name"
              variant="filled"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          }
          subheader={
            <TextField
              id="filled-basic"
              label="Product Price"
              variant="filled"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          }
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          alt={product.shortDesc}
        />
        <CardContent>
          {
            <TextField
              id="filled-basic"
              label="Stock"
              variant="filled"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          }
          <Typography variant="body2" color="textSecondary" component="p">
            {
              <TextField
                id="filled-basic"
                label="Short Description"
                variant="filled"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
              />
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="add to cart">
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
            <Typography paragraph>{
              <TextField
                id="filled-basic"
                label="Whole Description"
                variant="filled"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            }</Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          <Button size="large" onClick={(e) => saveProduct(e)}>
            Add Product
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default AddProduct;
