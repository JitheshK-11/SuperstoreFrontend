import categoryService from "../services/category.service.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdParamSchema,
} from "../validators/category.validation.js";



const formatZodError = (error) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};



const addCategory = async (req, res) => {
  try {
    const bodyResult = categoryCreateSchema.safeParse(req.body);
    if (!bodyResult.success) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: formatZodError(bodyResult.error) });
    }

    const category = await categoryService.createCategory({
      name: bodyResult.data.name,
    });

    if(!category) {
      return res.status(500).json({ message: "Failed to create category" });
    }

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();

  if(!categories) {
    return res.status(500).json({ message: "Failed to retrieve categories" });
  }

  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const paramsResult = categoryIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

const updateCategory = async (req, res) => {
  const paramsResult = categoryIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const bodyResult = categoryUpdateSchema.safeParse(req.body);
  if (!bodyResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(bodyResult.error) });
  }

  if (Object.keys(bodyResult.data).length === 0) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  const updated = await categoryService.updateCategory(req.params.id, bodyResult.data);
  if (!updated) {
    return res.status(404).json({ message: "Category not found" });
  }
    res.json(updated);

};

const deleteCategory = async (req, res) => {
  const paramsResult = categoryIdParamSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: formatZodError(paramsResult.error) });
  }

  const deletecategory=await categoryService.deleteCategory(req.params.id);
  if (!deletecategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ message: "Category deleted successfully" });
};

export default {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
