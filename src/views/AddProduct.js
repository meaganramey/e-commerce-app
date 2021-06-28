import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { addProductRequest } from "../fetchRequests";
import { ADDAPRODUCT, useStore } from "../store/store";
import ProductItem from "../components/ProductItem";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addproduct: {
    [theme.breakpoints.up("xs")]: {
      // backgroundColor: theme.palette.secondary.main,
      maxWidth: "90vw",
      margin: "0 auto",
      marginBottom: "10vh",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70vw",
      // backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      // backgroundColor: theme.palette.success.main,
      maxWidth: "750px",
    },
  },
  addProductTitleBox: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
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
      width: "40%",
    },
  },
  addImage: {
    [theme.breakpoints.up("xs")]: {
      border: `2px ${theme.palette.primary.dark} dashed`,
      margin: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: theme.palette.secondary.main,
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
      marginBottom: "-1rem",
      "& > *": {
        width: "100%",
        marginBottom: "2rem",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginTop: "8%",
    },
  },
  productDescription: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "-85%",
      width: "185%",
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
  const [previewProduct, setPreviewProduct] = useState(false);

  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user);

  const classes = useStyles();

  const saveProduct = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.price > 0 &&
      formData.stock > 0 &&
      formData.shortDesc &&
      formData.description
    ) {
      addProductRequest(formData, user.token)
        .then((res) => dispatch({ type: ADDAPRODUCT, payload: res }))
        .then(() => history.push("/products"));
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((state) => ({ ...state, [inputName]: inputValue }));
  };

  const setPreview = (e) => {
    setPreviewProduct(!previewProduct);
  };

  const history = useHistory();

  return (
    <>
      {!previewProduct ? (
        <>
          <Card className={classes.addproduct}>
            <form id="add-product-form" onSubmit={saveProduct}>
              <Box className={classes.addProductTitleBox}>
                <CardContent className={classes.addProductTitleDiv}>
                  <CardHeader title="Add Product" />
                  <CardContent className={classes.addImage}>
                    <AddCircleIcon
                      className={classes.imageIcon}
                      color="secondary"
                    />

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
                  <Button
                    className={classes.productDescription}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={setPreview}
                  >
                    Preview Product
                  </Button>
                  <Button
                    className={classes.productDescription}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    Add Product
                  </Button>
                </CardContent>
              </Box>
            </form>
          </Card>
        </>
      ) : (
        <>
          <Card className={classes.addproduct}>
            <Box className={classes.addProductTitleBox}>
              <CardContent className={classes.addProductTitleDiv}>
                <h2>Preview Product</h2>

                <ProductItem product={formData} preview={previewProduct} />
              </CardContent>

              <CardContent className={classes.productDetails}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={setPreview}
                >
                  Continue Editing Product
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={saveProduct}
                >
                  Add Product
                </Button>
              </CardContent>
            </Box>
          </Card>
        </>
      )}
    </>
  );
}

export default AddProduct;
