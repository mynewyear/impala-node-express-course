//console.log('Express Tutorial')
const express = require('express');
const app = express();
const {products} = require('./data');
const port = 3000;

// setup static and middleware
app.use(express.static("./public"));

// verify that the server is working
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
});

// Get all products
app.get('/api/v1/products', (req, res) => {
    console.log('Get request for Products');
    res.json(products);     // products array
});

// Get a single product
app.get('/api/v1/products/:productID', (req, res) => {
    const { productID } = req.params;
    const product = products.find(product => product.id === parseInt(productID));

    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
});

// filter 
app.get('/api/v1/query', (req, res) => {
    let { search, limit, priceP, regex } = req.query;
    let filteredProducts = [...products];
    
    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().startsWith(search.toLowerCase())
        );
    }
    
    if (priceP) {
        filteredProducts = filteredProducts.filter(product =>
            product.price < parseFloat(priceP)
        );
    }
    
    if (limit) {
        filteredProducts = filteredProducts.slice(0, +limit);
    }

    if (filteredProducts.length === 0) {
        return res.json({ message: "No products found" });
    }

    if (regex) {
        try {
            const regExp = new RegExp(regex, 'i'); // Case-insensitive
            filteredProducts = filteredProducts.filter(product =>
                regExp.test(product.name)
            );
        } catch (err) {
            return res.status(400).json({ message: 'Invalid regular expression' });
        }
    }

    if (filteredProducts.length === 0) {
        return res.json({ message: "No products match the criteria" });
    }

    res.json(filteredProducts);
});

app.get('/api/v1/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// handle 404 error
app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1><a href="/">Go back to Home</a>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});