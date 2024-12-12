const { products } = require("../data");

const getProducts = (req, res) => {
    const newProducts = products.map((product) => {
      const { id, name, image, price, desc } = product;
      return { id, name, image, price, desc };
    });
    res.json(newProducts);
  };

  const getProductById = (req, res) => {
    const { productID } = req.params;
    const product = products.find(product => product.id === parseInt(productID));
  
    if (!product) {
      return res.status(404).send({ message: "That product was not found." });
    }
    return res.status(200).json(product);
  };

// filter 
const getByQuery = (req, res) => {
    let { search, limit, priceP } = req.query;
    let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(product => product.name.startsWith(search));
  }

  if (priceP) {
    filteredProducts = filteredProducts.filter(product => product.price < +priceP);
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, +limit);
  }

  res.status(200).json(filteredProducts);
};

module.exports = {
  getProducts,
  getProductById,
  getByQuery,
};
