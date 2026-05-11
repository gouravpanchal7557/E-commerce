import expess from 'express';
import{
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct   
} from '../controllers/productController.js';



const router = expess.Router();

// router to create a new product
router.post("/add", createProduct);

// router to get all products
router.get("/", getProducts);

// router to update a product by ID
router.put("/update/:id", updateProduct);

// router to delete a product by ID
router.delete("/delete/:id", deleteProduct);

export default router;