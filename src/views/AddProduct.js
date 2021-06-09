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
import { red, grey, deepPurple, purple, blueGrey } from "@material-ui/core/colors";
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
    [theme.breakpoints.up("xs")]: {
      // backgroundColor: theme.palette.secondary.main,
      maxWidth: "90vw",
      margin: "0 auto",
      marginBottom: "10vh",
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70vw",
      // backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      // backgroundColor: theme.palette.success.main,
      maxWidth: "750px"
    },
  },
  addProductTitleBox: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: 'row',
      alignItems: "flex-start",
    },
  },
  addProductTitleDiv: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%"
    },
  },
  addImage: {
    [theme.breakpoints.up("xs")]: {
      border: "2px black dashed",
      margin: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  imageIcon: {
    [theme.breakpoints.up("xs")]: {
      height: "60%",
      width: "60%",
    },
  },
  productDetails: {
    [theme.breakpoints.up("xs")]: {
      width: "90%",
      marginBottom: '-1rem',
      "& > *": {
        width: "100%",
        marginBottom: "2rem",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginTop: "8%"
    },
  },
  productDescription: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "-85%",
      width: "185%"
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
                <TextField
                  className={classes.productDescription}
                  id="filled-basic"
                  label="Short Description"
                  variant="outlined"
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.productDescription}
                  id="filled-basic"
                  label="Long Description"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </CardContent>
            </Box>
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
