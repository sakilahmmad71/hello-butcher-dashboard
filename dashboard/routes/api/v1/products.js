// importing/requiring external dependencies
const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp')

// importing/requiring local files or dependencies
const Product = require('../../../models/Product');
const productCreationInputsValidation = require('../../../validations/product-creation');
const { errorResponse, successResponse, errorResponseMessage } = require('../../../utility/responseReport');
const { checkUserRole } = require('../../../middlewares/auth');
const generateProductCode = require('../../../utility/generateProductCode');
const { parse } = require('path');

// Initializing router for chaining http methods
const router = express.Router();

// Configuring multer for file uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products/images');
    },

    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, and .jpeg images'));
        }
    },
});

/*
    @route              POST http://localhost:4000/api/v1/products/product
    @description        Create product route create a product and saves it to DB
    @required Data      name, title, price, images, sku, decsription
    @optional Data      skinned, pieces
    @access             private  
    TODO: Image upload functionality needed add when images are available.
*/

router.post(
    '/product',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['admin']),
    upload.single('file'),
    async (req, res) => {
        try {
            const { errors, isValid } = productCreationInputsValidation(
                req.body,
                req.file
            );

            if (!isValid) {
                return res.status(400).json(errorResponse(400, errors));
            }

            const { title, category, price, description, weight, discount, skin, fat, smallcut, mediumcut, bigcut } = req.body;

            const product = await Product.findOne({ title });

            if (product) {
                return res.status(400).json(errorResponseMessage(400, 'Similar product already exists.'));
            }

            let fileUrl, thumbnailUrl
            if (req.file) {
                const fp = req.file.path.split("\\");
                fileUrl = `${req.protocol}://${req.hostname}:4000/${fp[1]}/${fp[2]}/${fp[3]}`;

                const thumbnailName = `uploads/products/images/${Date.now()}-thumbnail-${req.file.originalname.replace(/\s/g, '')}`
                await sharp(req.file.path).resize(256, 256).toFile(thumbnailName)

                const thp = thumbnailName.split("/")
                thumbnailUrl = `${req.protocol}://${req.hostname}:4000/${thp[1]}/${thp[2]}/${thp[3]}`;
            }

            const options = []

            if (skin === "true") {
                options.push({ title: "Skin", values: ["On", "Off"], selected: "0" })
            }

            if (fat === "true") {
                options.push({ title: "Fat", values: ["On", "Off"], selected: "0" })
            }

            if (smallcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["2", "4", "8", "12", "Small", "Whole"], selected: "0" })
            }

            if (mediumcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["Small", "Medium", "Large", "Slice"], selected: "0" })
            }

            if (bigcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["Thik", "Medium", "Thin"], selected: "0" })
            }

            const newProduct = new Product({
                code: generateProductCode(),
                title,
                category,
                price: +price,
                description,
                file: fileUrl,
                thumbnail: thumbnailUrl,
                weight,
                discount: +discount,
                options: options,
                skin,
                fat,
                smallcut,
                mediumcut,
                bigcut
            });

            await newProduct.save();

            console.log(newProduct)

            return res.status(200).json(successResponse(200, 'Product created successfully.'));
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    },
    (error, req, res, next) => {
        return res.status(400).json(errorResponseMessage(400, error));
    }
);

/*
    @route              UPDATE http://localhost:4000/api/v1/products/product
    @description        Update product by changeing the fields
    @required Data      none
    @optional Data      none
    @access             public  
*/
router.patch('/product/:id',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['admin']),
    upload.single('file'),
    async (req, res) => {
        try {

            const id = req.params.id

            if (!id) {
                return res
                    .status(400)
                    .json(
                        errorResponseMessage(
                            400,
                            'Product ID is required for update the item.'
                        )
                    );
            }

            const { title, category, price, description, weight, discount, skin, fat, smallcut, mediumcut, bigcut } = req.body;

            const options = []

            if (skin === "true") {
                options.push({ title: "Skin", values: ["On", "Off"], selected: "0" })
            }

            if (fat === "true") {
                options.push({ title: "Fat", values: ["On", "Off"], selected: "0" })
            }

            if (smallcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["2", "4", "8", "12", "Small", "Whole"], selected: "0" })
            }

            if (mediumcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["Small", "Medium", "Large", "Slice"], selected: "0" })
            }

            if (bigcut === "true") {
                options.push({ title: "Cutting Requirements(Pcs)", values: ["Thik", "Medium", "Thin"], selected: "0" })
            }

            const updatedProduct = { title, category, price, description, weight, discount, options, skin, fat, smallcut, mediumcut, bigcut };

            let fileUrl, thumbnailUrl
            if (req.file) {
                const fp = req.file.path.split("\\");
                fileUrl = `${req.protocol}://${req.hostname}:4000/${fp[1]}/${fp[2]}/${fp[3]}`;
                updatedProduct.file = fileUrl;

                const thumbnailName = `uploads/products/images/${Date.now()}-thumbnail-${req.file.originalname.replace(/\s/g, '')}`
                await sharp(req.file.path).resize(256, 256).toFile(thumbnailName)

                const thp = thumbnailName.split("/")
                thumbnailUrl = `${req.protocol}://${req.hostname}:4000/${thp[1]}/${thp[2]}/${thp[3]}`;

                updatedProduct.thumbnail = thumbnailUrl
            }

            const product = await Product.findOneAndUpdate({ _id: id }, updatedProduct, { new: true })

            if (!product) {
                return res.status(404).json(errorResponseMessage(404, 'No Product Found With This ID.'));
            }

            return res.status(200).json(successResponse(200, 'Product Updated successfully.'));
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    },
    (error, req, res, next) => {
        return res.status(400).json(errorResponseMessage(400, error));
    })

/*
    @route              GET http://localhost:4000/api/v1/products/product?category="category_name"
    @description        Getting products by category
    @required Data      none
    @optional Data      none
    @access             public  
*/
router.get('/product/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });

        if (products.length === 0) {
            return res
                .status(404)
                .json(errorResponseMessage(404, 'No product found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'Products fetched successfully',
            },
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              GET http://localhost:4000/api/v1/products/product
    @description        Getting all availble products
    @required Data      none
    @optional Data      none
    @access             public  
*/
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res
                .status(404)
                .json(errorResponseMessage(404, 'No product found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'Products fetched successfully',
            },
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              GET http://localhost:4000/api/v1/products/product/productId
    @description        Getting single product
    @required Data      none
    @optional Data      none
    @access             public  
*/
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // if (!id) {
        //     return res
        //         .status(400)
        //         .json(
        //             errorResponseMessage(
        //                 400,
        //                 'Product id is required as parameter.'
        //             )
        //         );
        // }

        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res
                .status(404)
                .json(errorResponseMessage(404, 'No product found'));
        }

        return res.status(200).json({
            code: 200,
            success: {
                message: 'Product fetched successfully',
            },
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            errorResponseMessage(500, 'Something went wrong.')
        );
    }
});

/*
    @route              DELETE http://localhost:4000/api/v1/products/product/:id
    @description        Delete a single product
    @required Data      id
    @optional Data      none
    @access             private  
*/
router.delete(
    '/product/:id',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['admin']),
    async (req, res) => {
        try {
            const id = req.params.id

            if (!id) {
                return res
                    .status(400)
                    .json(
                        errorResponseMessage(
                            400,
                            'Product id is required as parameter.'
                        )
                    );
            }

            const product = await Product.findByIdAndDelete(id)

            if (!product) {
                return res
                    .status(404)
                    .json(errorResponseMessage(404, 'No product found'));
            }

            return res.status(200).json({
                code: 200,
                success: {
                    message: 'Product deleted Successfully',
                },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

/*
    @route              DELETE http://localhost:4000/api/v1/products
    @description        Delete all products
    @required Data      none
    @optional Data      none
    @access             private  
*/
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkUserRole(['admin']),
    async (req, res) => {
        try {
            await Product.deleteMany({});

            return res.status(200).json({
                code: 200,
                success: {
                    message: 'All Products deleted Successfully',
                },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(
                errorResponseMessage(500, 'Something went wrong.')
            );
        }
    }
);

module.exports = router;
