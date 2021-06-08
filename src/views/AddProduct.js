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
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, grey } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import bag from "../assets/bag.jpeg";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addproduct: {
    maxWidth: "70vw",
    margin: "0 auto",
    backgroundColor: grey[100],
    marginBottom: '10rem',
    "& > *": {
      margin: theme.spacing(3),
      // width: "50ch",
    },
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      maxWidth: "90vw",
    },
  },
  addProductTitleBox: {
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      flexDirection: "column",
      alignItems: "center",
      // width: '90%'
      marginBottom: "-15%"
    },
  },
  addProductTitleDiv: {
    width: "40%",
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      width: "90%",
      textAlign: "center"
    },
  },
  addImage: {
    border: "2px black dashed",
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
    },
  },
  imageIcon: {
    height: "80%",
    width: "80%",
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
    },
  },
  productDetails: {
    width: "50%",
    "& > *": {
      width: "110%",
      paddingBottom: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      width: "90%",
      "& > *": {
        width: "100%",
        paddingBottom: '2rem',
      },
    },
  },
  productDescription: {
    width: "80%",
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: theme.palette.secondary.main,
      "& > *": {
        "& > *": {
          width: "96%",
          paddingBottom: '1rem',
        },
      },
    },
    "& > *": {
      "& > *": {
        width: "96%",
        paddingBottom: '1rem',
      },
    },
  },
  root: {
    maxWidth: 500,
    margin: "0 auto",
    alignContent: "space-around",
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
  const [expanded, setExpanded] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(false);

  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user);

  const classes = useStyles();

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {!previewProduct ? (
        <>
          <Card className={classes.addproduct}>
            <Box className={classes.addProductTitleBox}>
              <CardContent className={classes.addProductTitleDiv}>
                <CardHeader title="Add Product" />
                <CardContent className={classes.addImage}>
                  <AddCircleIcon className={classes.imageIcon} />

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Add image
                  </Typography>
                </CardContent>
              </CardContent>
              <CardContent className={classes.productDetails}>
                <TextField
                  id="filled-basic"
                  label="Product Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <TextField
                  id="filled-basic"
                  label="Product Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <TextField
                  id="filled-basic"
                  label="Stock"
                  variant="outlined"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </CardContent>
            </Box>
            <CardContent className={classes.productDescription}>

            <Typography variant="body2" color="textSecondary" component="p">
              <TextField
                id="filled-basic"
                label="Short Description"
                variant="outlined"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
              />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <TextField
                id="filled-basic"
                label="Long Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Typography>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <h4>Preview Product</h4>
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
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              }
              subheader={
                <TextField
                  id="filled-basic"
                  label="Product Price"
                  variant="outlined"
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
              alt={formData.shortDesc}
            />
            <CardContent>
              {
                <TextField
                  id="filled-basic"
                  label="Stock"
                  variant="outlined"
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
                    variant="outlined"
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
              <Typography variant="caption">
                More about {formData.name}:
              </Typography>
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
                <Typography paragraph>{formData.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </>
      )}
    </>
  );
}

export default AddProduct;
