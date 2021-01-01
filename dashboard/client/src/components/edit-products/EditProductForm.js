// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, Input, InputAdornment, InputLabel, makeStyles, MenuItem, OutlinedInput, Select, Switch, TextField, Typography } from '@material-ui/core';
// import clsx from 'clsx';
// import { connect } from 'react-redux'

// import './EditProductForm.css'
// import { updateProduct } from '../../redux/actions/productAction';

// // Edit Product form styl 
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         marginTop: theme.spacing(2),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {},
// }));

// const EditProductForm = (props) => {
//     const classes = useStyles();

//     const editedProduct = props.selectedProduct

//     console.log(editedProduct)

//     const [title, setTitle] = useState(editedProduct.title);
//     const [category, setCategory] = useState(editedProduct.category);
//     const [price, setPrice] = useState(editedProduct.price);
//     const [description, setDescription] = useState(editedProduct.description);
//     let [file, setFile] = useState(null);
//     const [weight, setWeight] = useState(editedProduct.weight);
//     const [discount, setDiscount] = useState(editedProduct.discount);
//     const [skin, setSkin] = useState(editedProduct.skin === "true" ? true : false);
//     const [fat, setFat] = useState(editedProduct.fat === "true" ? true : false);
//     const [smallcut, setSmallcut] = useState(editedProduct.smallcut === "true" ? true : false);
//     const [mediumcut, setMediumcut] = useState(editedProduct.mediumcut === "true" ? true : false);
//     const [bigcut, setBigcut] = useState(editedProduct.bigcut === "true" ? true : false);

//     const handlFileChange = (e) => {
//         const file = e.target.files[0];
//         setFile(file);
//     };

//     const handleCategoryChange = (event) => {
//         setCategory(event.target.value);
//     };

//     const handleUpdateProduct = async (e, id) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const data = new FormData();

//         data.append('title', title);
//         data.append('category', category);
//         data.append('price', price);
//         data.append('description', description);
//         data.append('weight', weight);
//         data.append('discount', discount);
//         data.append('skin', skin);
//         data.append('fat', fat);
//         data.append('smallcut', smallcut);
//         data.append('mediumcut', mediumcut);
//         data.append('bigcut', bigcut);
//         data.set("file", file)

//         await props.updateProduct(id, data, props.history)
//     };

//     return (
//         <div className="productupdateform">
//             <Container maxWidth="md" className="productupdateform__container">
//                 <Box mx="auto" textAlign="center">
//                     <Grid container direction="column" justify="center" alignItems="center">
//                         <Typography variant="h4" component="h4" color="primary" gutterBottom >Edit Product </Typography>
//                     </Grid>
//                 </Box>

//                 <Box>
//                     <form margin="normal" encType="multipart/form-data" onSubmit={(e) => handleUpdateProduct(e, editedProduct._id)}>
//                         {/* Select category */}
//                         <FormControl variant="outlined" required fullWidth className={classes.margin} margin="normal">
//                             <InputLabel id="category-select-label"> Category</InputLabel>
//                             <Select labelId="category-select-label" value={category} onChange={handleCategoryChange} label="Category">
//                                 <MenuItem value="beef">Beef</MenuItem>
//                                 <MenuItem value="chicken">Chicken</MenuItem>
//                                 <MenuItem value="sheep">Sheep</MenuItem>
//                                 <MenuItem value="lamb">Lamb</MenuItem>
//                                 <MenuItem value="mutton">Mutton</MenuItem>
//                             </Select>
//                         </FormControl>

//                         {/* product title */}
//                         <TextField margin="normal" label="Title" name="title" fullWidth variant="outlined" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

//                         {/* Product description */}
//                         <TextField margin="normal" required label="Description" name="description" fullWidth variant="outlined" multiline rows={12} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

//                         {/* Product weight */}
//                         <TextField margin="normal" label="Weight" id="outlined-start-adornment" className={clsx(classes.margin)} variant="outlined" fullWidth value={weight} onChange={(e) => setWeight(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         GM
//                                     </InputAdornment>
//                                 ),
//                             }} />

//                         {/* Product price with pound sign */}
//                         <FormControl fullWidth className={classes.margin} variant="outlined">
//                             <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
//                             <OutlinedInput id="outlined-adornment-amount" labelWidth={80} required value={price} type="number" onChange={(e) => setPrice(e.target.value)}
//                                 startAdornment={
//                                     <InputAdornment position="start"> £</InputAdornment>
//                                 } />
//                         </FormControl>

//                         {/* Discount price with pound sign */}
//                         <FormControl
//                             fullWidth
//                             className={classes.margin}
//                             variant="outlined"
//                         >
//                             <InputLabel htmlFor="outlined-adornment-discount">
//                                 Discount
//                             </InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-discount"
//                                 required
//                                 type="number"
//                                 value={discount}
//                                 onChange={(e) => setDiscount(e.target.value)}
//                                 startAdornment={
//                                     <InputAdornment position="start">
//                                         £
//                                     </InputAdornment>
//                                 }
//                                 labelWidth={100}
//                             />
//                         </FormControl>

//                         {/* Product Image file */}
//                         <TextField margin="normal" type="file" accept="image/*" fullWidth variant="filled" name="file" onChange={handlFileChange} />



//                         <Typography
//                             variant="h5"
//                             color="primary"
//                             className={clsx(classes.margin)}
//                         >
//                             Options
//                         </Typography>

//                         {/* Product Options */}

//                         {/* Product skin */}
//                         <FormGroup row>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="skin"
//                                         color="primary"
//                                         checked={skin}
//                                         onChange={() => setSkin(!skin)}
//                                     />
//                                 }
//                                 label="Skin (On / Off)"
//                             />
//                         </FormGroup>

//                         {/* Product fat */}
//                         <FormGroup row>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="fat"
//                                         color="primary"
//                                         checked={fat}
//                                         onChange={() => setFat(!fat)}
//                                     />
//                                 }
//                                 label="Fat (On / Off)"
//                             />
//                         </FormGroup>

//                         {/* Product smallcut */}
//                         <FormGroup row>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="smallcut"
//                                         color="primary"
//                                         checked={smallcut}
//                                         onChange={() => setSmallcut(!smallcut)}
//                                     />
//                                 }
//                                 label="Cutting Requirements (2, 4, 8, 12, Small, Whole)"
//                             />
//                         </FormGroup>

//                         {/* Product mediumcut */}
//                         <FormGroup row>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="mediumcut"
//                                         color="primary"
//                                         checked={mediumcut}
//                                         onChange={() =>
//                                             setMediumcut(!mediumcut)
//                                         }
//                                     />
//                                 }
//                                 label="Cutting Requirements (Small, Medium, Large, Slice)"
//                             />
//                         </FormGroup>

//                         {/* Product bigcut */}
//                         <FormGroup row>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         name="bigcut"
//                                         color="primary"
//                                         checked={bigcut}
//                                         onChange={() => setBigcut(!bigcut)}
//                                     />
//                                 }
//                                 label="Cutting Requirements (Thik, Medium, Thin)"
//                             />
//                         </FormGroup>

//                         <Grid container>
//                             <Grid item md={12} sm={12}>
//                                 <Button variant="contained" fullWidth color="primary" size="large" type="submit" className={clsx(classes.margin)}>Update Product</Button>
//                                 <Button variant="contained" fullWidth color="secondary" size="large" className={clsx(classes.margin)}>Cancel</Button>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </Box>
//             </Container>

//         </div>
//     );
// };

// export default connect(null, { updateProduct })(EditProductForm)
