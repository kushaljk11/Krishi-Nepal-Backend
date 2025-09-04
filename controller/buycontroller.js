import farmer from "../model/farmer.js";
import Product from "../model/product.js";

export const buyProduct = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;


    const user = await farmer.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role !== "Buyer" && user.role !== "both") {
      return res.status(403).json({ success: false, message: "User is not allowed to buy products" });
    }

  
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock available" });
    }

    
    product.stock -= quantity;
    await product.save();

   
    const order = {
      product: product._id,
      productName: product.name,
      quantity,
      totalPrice: product.price * quantity,
      buyerId: user._id,
      buyerName: user.name,
      orderDate: new Date(),
      status: "pending"
    };


    res.status(201).json({ success: true, message: "Purchase successful", data: order });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
