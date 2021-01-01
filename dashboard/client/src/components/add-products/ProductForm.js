import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, makeStyles, MenuItem, OutlinedInput, Select, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'

import './ProductForm.css'
import { addProductToApi } from '../../redux/actions/productAction';
import Alert from '@material-ui/lab/Alert';
import isEmpty from '../../validations/is_empty';

const useStyles = makeStyles((theme) => ({
    root: { display: 'flex', flexWrap: 'wrap' },
    margin: { marginTop: theme.spacing(2) },
    withoutLabel: { marginTop: theme.spacing(3) },
    textField: {},
}));

const ProductForm = (props) => {
    const classes = useStyles();
    const location = useLocation()

    const { errors } = props

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(undefined);
    const [weight, setWeight] = useState('');
    const [discount, setDiscount] = useState('');
    const [skin, setSkin] = useState(false);
    const [fat, setFat] = useState(false);
    const [smallcut, setSmallcut] = useState(false);
    const [mediumcut, setMediumcut] = useState(false);
    const [bigcut, setBigcut] = useState(false);

    const [uploadSuccessful, setUploadSuccessful] = useState(false);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handlFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const setDefaultState = () => {
        setTitle('');
        setCategory('');
        setPrice(0);
        setDescription('');
        setWeight('');
        setFile('');
        setDiscount(0);
        setSkin(false);
        setFat(false);
        setSmallcut(false);
        setMediumcut(false);
        setBigcut(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = new FormData();

        data.append('title', title);
        data.append('category', category);
        data.append('price', price);
        data.append('description', description);
        data.append('weight', weight);
        data.append('discount', discount);
        data.append('file', file);
        data.append('skin', skin);
        data.append('fat', fat);
        data.append('smallcut', smallcut);
        data.append('mediumcut', mediumcut);
        data.append('bigcut', bigcut);

        await props.addProductToApi(data)

        setDefaultState();
        setUploadSuccessful(true);

        location.props.history.push('/products')
    };

    // Making Success Alert Components
    const showProductUploadSucceddfulAlert = uploadSuccessful ? (
        <Alert severity="success">Product Successfully Uploaded</Alert>
    ) : null;

    // Making Errors Alert Components
    const showTitleErrorAlert = !isEmpty(errors) ? (
        errors.title ? (
            <Alert severity="error">{errors.title}</Alert>
        ) : null
    ) : null;

    const showPriceErrorAlert = !isEmpty(errors) ? (
        errors.price ? (
            <Alert severity="error">{errors.price}</Alert>
        ) : null
    ) : null;

    const showDescriptionErrorAlert = !isEmpty(errors) ? (
        errors.description ? (
            <Alert severity="error">{errors.description}</Alert>
        ) : null
    ) : null;

    const showCategoryErrorAlert = !isEmpty(errors) ? (
        errors.category ? (
            <Alert severity="error">{errors.category}</Alert>
        ) : null
    ) : null;

    const showfileErrorAlert = !isEmpty(errors) ? (
        errors.image ? (
            <Alert severity="error">{errors.image}</Alert>
        ) : null
    ) : null;

    return (
        <div className="addproduct__root">
            <Container maxWidth="md" className="addproduct__container">
                <Box mx="auto" textAlign="center">
                    <Grid container direction="column" justify="center" alignItems="center" >
                        <Typography variant="h4" component="h4" color="primary" gutterBottom >Create A Product</Typography>
                        <Typography variant="h6" gutterBottom>Make Sure You Have Filled Required Fields</Typography>
                    </Grid>
                </Box>

                <Box>
                    <form margin="normal" onSubmit={handleFormSubmit} encType="multipart/form-data">
                        {/* Select category */}
                        {showProductUploadSucceddfulAlert}
                        {showCategoryErrorAlert}
                        <FormControl variant="outlined" required fullWidth className={classes.margin} margin="normal">
                            <InputLabel id="category-select-label"> Category</InputLabel>
                            <Select labelId="category-select-label" value={category} onChange={handleCategoryChange} label="Category">
                                <MenuItem value="beef">Beef</MenuItem>
                                <MenuItem value="chicken">Chicken</MenuItem>
                                <MenuItem value="sheep">Sheep</MenuItem>
                                <MenuItem value="lamb">Lamb</MenuItem>
                                <MenuItem value="mutton">Mutton</MenuItem>
                            </Select>
                        </FormControl>

                        {/* product title */}
                        {showTitleErrorAlert}
                        <TextField margin="normal" label="Title" name="title" fullWidth variant="outlined" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        {/* Product description */}
                        {showDescriptionErrorAlert}
                        <TextField margin="normal" required label="Description" name="description" fullWidth variant="outlined" multiline rows={6} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                        {/* Product weight */}
                        <TextField margin="normal" label="Weight" id="outlined-start-adornment" className={clsx(classes.margin)} variant="outlined" fullWidth type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start">Gm</InputAdornment>) }}
                        />

                        {/* Product price with pound sign */}
                        {showPriceErrorAlert}
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput id="outlined-adornment-amount" labelWidth={80} required value={price} type="number" onChange={(e) => setPrice(e.target.value)}
                                startAdornment={<InputAdornment position="start"> £</InputAdornment>}
                            />
                        </FormControl>

                        {/* Discount price with pound sign */}
                        <FormControl fullWidth className={classes.margin} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-discount">Discount</InputLabel>
                            <OutlinedInput id="outlined-adornment-discount" required type="number" value={discount} onChange={(e) => setDiscount(e.target.value)}
                                startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                labelWidth={100}
                            />
                        </FormControl>

                        {/* Product Image file */}
                        {showfileErrorAlert}
                        <TextField required margin="normal" type="file" accept="image/*" fullWidth variant="filled" name="file" onChange={handlFileChange} />

                        {/* Product Options */}
                        <Typography variant="h5" color="primary" className={clsx(classes.margin)}>Options</Typography>

                        {/* Product skin */}
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="skin" color="primary" checked={skin} onChange={() => setSkin(!skin)} />}
                                label="Skin (On / Off)"
                            />
                        </FormGroup>

                        {/* Product fat */}
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="fat" color="primary" checked={fat} onChange={() => setFat(!fat)} />}
                                label="Fat (On / Off)"
                            />
                        </FormGroup>

                        {/* Product smallcut */}
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="smallcut" color="primary" checked={smallcut} onChange={() => setSmallcut(!smallcut)} />}
                                label="Cutting Requirements (2, 4, 8, 12, Small, Whole)"
                            />
                        </FormGroup>

                        {/* Product mediumcut */}
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="mediumcut" color="primary" checked={mediumcut} onChange={() => setMediumcut(!mediumcut)} />}
                                label="Cutting Requirements (Small, Medium, Large, Slice)"
                            />
                        </FormGroup>

                        {/* Product bigcut */}
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="bigcut" color="primary" checked={bigcut} onChange={() => setBigcut(!bigcut)} />}
                                label="Cutting Requirements (Thik, Medium, Thin)"
                            />
                        </FormGroup>

                        <Grid container>
                            <Grid item md={12} sm={12}>
                                <Button variant="contained" fullWidth color="primary" size="large" type="submit" className={clsx(classes.margin)}>Create Product</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addProductToApi })(ProductForm);
