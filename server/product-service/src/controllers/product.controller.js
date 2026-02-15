import productService from "../services/product.service.js";
import {
  productCreateSchema,
  productUpdateSchema,
  productIdParamSchema,
} from "../validators/product.validation.js";

const formatZodError = (error) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

const addProduct = async (req, res) => {
  try {
    const bodyResult = productCreateSchema.safeParse(req.body);
    if (!bodyResult.success) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: formatZodError(bodyResult.error) });
    }

    const { name, price, categoryId } = req.body;

    if(!name || !price || !categoryId) {
      return res.status(400).json({ message: "Name, price and categoryId are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image = `uploads/${req.file.filename}`;

    if(!image) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const product = await productService.createProduct({
      name: bodyResult.data.name,
      price: bodyResult.data.price,
      categoryId: bodyResult.data.categoryId,
      image,
    });

    if(!product) {
      return res.status(500).json({ message: "Failed to create product" });
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  if(!products) {
    return res.status(500).json({ message: "Failed to retrieve products" });
  }
  res.json(products);
};

const getProductById = async (req, res) => {
  const paramsResult = productIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

const updateProduct = async (req, res) => {
  const paramsResult = productIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const bodyResult = productUpdateSchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(bodyResult.error) });
  }

  const image = req.file ? `uploads/${req.file.filename}` : undefined;
   
  if(!image)
  {
    return res.status(400).json({ message: "Image upload failed" });
  }


  const updateData = {
    ...bodyResult.data,
    ...(image && { image }),
  };

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  const updated = await productService.updateProduct(req.params.id, updateData);

  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updated);
};

const deleteProduct = async (req, res) => {
  const paramsResult = productIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const deleteproduct=await productService.deleteProduct(req.params.id);
  if (!deleteproduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  res.json({ message: "Product deleted successfully" });
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};


