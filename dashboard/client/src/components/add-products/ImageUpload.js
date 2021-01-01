import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import SelectedFilesName from './SelectedFilesName';

// Some styles
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const ImageUpload = ({ id, title, productImage, onChangeFile }) => {
    const classes = useStyles();
    return (
        <div>
            <Box style={{ margin: 30 }}>
                <div className={classes.root}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        name="images"
                        id={id}
                        type="file"
                        multiple
                        onChange={onChangeFile}
                    />
                    <label htmlFor={id}>
                        <Button variant="contained" component="span" fullWidth>
                            <PhotoCamera style={{ marginRight: 10 }} /> {title}
                        </Button>
                    </label>

                    {productImage.length > 0
                        ? productImage.map((product) => (
                              <SelectedFilesName
                                  key={product.name}
                                  image={product}
                              />
                          ))
                        : null}
                </div>
            </Box>
        </div>
    );
};

export default ImageUpload;
