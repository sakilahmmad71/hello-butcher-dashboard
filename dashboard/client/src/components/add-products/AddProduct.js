import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';

import './AddProduct.css';
// import isEmpty from '../validations/is_empty';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productAction';
import ImageUpload from '../components/add-products/ImageUpload';
import productData from '../components/product/productData';
import Alert from '@material-ui/lab/Alert';

// Some styles
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

// Product Upload Component
const CreateProduct = (props) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [pieces, setPieces] = useState(0);
    const [checked, setChecked] = useState(false);

    const [submit, setSubmit] = useState(false);

    const dispatch = useDispatch();

    const classes = useStyles();

    const handleMainProductImage = (e) => {
        const files = e.target.files;
        setProductImages([...files]);
    };

    const clearFields = () => {
        setName('');
        setTitle('');
        setPrice(0);
        setDescription('');
        setProductImages([]);
        setPieces(0);
        setChecked(false);
        setSubmit(true);
    };

    const onHandleSubmitProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newProduct = {
            id: Math.floor(Math.random() * 1000 + 1),
            name,
            title,
            price,
            description,
            image: 'http://via.placeholder.com/1050x700/C6FF00/767676/',
            pieces,
            skinned: checked,
        };

        productData.push(newProduct);

        clearFields();
    };

    // Making Errors Alert Components
    // const showSuccessMessage = success ? (
    //     <Alert severity="success">Product Successfully Created.</Alert>
    // ) : null;

    return (
        <div className="addproduct">
            <Container
                spacing={3}
                maxWidth="sm"
                className="addproduct__container"
            >
                <Box mx="auto" textAlign="center">
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h3" color="primary" gutterBottom>
                            Create A Product
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Make Sure You Have Filled Up All Required Fields.
                        </Typography>
                    </Grid>
                </Box>

                <Box>
                    {submit && (
                        <Alert severity="success">
                            Product Successfully Created.
                        </Alert>
                    )}
                    <form
                        margin="normal"
                        onSubmit={onHandleSubmitProduct}
                        encType="multipart/form-data"
                    >
                        <TextField
                            margin="normal"
                            label="Enter Product Name"
                            name="name"
                            fullWidth
                            variant="outlined"
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            label="Enter Product Title"
                            name="title"
                            fullWidth
                            variant="outlined"
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            label="Product Price"
                            name="price"
                            fullWidth
                            variant="outlined"
                            required
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            label="Product Description"
                            name="description"
                            fullWidth
                            variant="outlined"
                            required
                            multiline
                            rows={12}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <ImageUpload
                            id="main-product-image"
                            title="Upload Product Images (min : 1 - max : 4)"
                            name="images"
                            productImage={productImages}
                            onChangeFile={handleMainProductImage}
                        />

                        <Grid container style={{ margin: 30 }}>
                            <Grid item md={3}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel htmlFor="meat-pieces">
                                        Pieces
                                    </InputLabel>
                                    <Select
                                        native
                                        fullWidth
                                        value={pieces}
                                        onChange={(e) =>
                                            setPieces(e.target.value)
                                        }
                                        label="Pieces"
                                        inputProps={{
                                            name: 'pieces',
                                            id: 'meat-pieces',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={2}>Two</option>
                                        <option value={4}>Four</option>
                                        <option value={6}>Six</option>
                                        <option value={8}>Eight</option>
                                        <option value={10}>Ten</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={6}></Grid>
                            <Grid item md={3}>
                                <Box>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={() =>
                                                        setChecked(!checked)
                                                    }
                                                    name="checked"
                                                    color="primary"
                                                />
                                            }
                                            label="Skinned"
                                        />
                                    </FormGroup>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                size="large"
                                type="submit"
                            >
                                Create Product
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default CreateProduct;
