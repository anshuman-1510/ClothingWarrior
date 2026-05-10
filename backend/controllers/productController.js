const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const { category, size, color, sort, search } = req.query;
  let query = {};

  if (category) query.category = category;
  if (size) query.sizes = { $in: [size] };
  if (color) query.colors = { $in: [color] };
  if (search) query.name = { $regex: search, $options: 'i' };

  let products = Product.find(query).populate('category', 'name');

  if (sort === 'newest') {
    products = products.sort({ createdAt: -1 });
  } else if (sort === 'price-low-high') {
    products = products.sort({ price: 1 });
  } else if (sort === 'price-high-low') {
    products = products.sort({ price: -1 });
  }

  const result = await products;
  res.json(result);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    sizes,
    colors,
    stockQuantity,
    sku,
    featured
  } = req.body;

  const product = new Product({
    name,
    price,
    description,
    images,
    category,
    sizes,
    colors,
    stockQuantity,
    sku,
    featured
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    sizes,
    colors,
    stockQuantity,
    sku,
    featured
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.sku = sku || product.sku;
    product.featured = featured !== undefined ? featured : product.featured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
