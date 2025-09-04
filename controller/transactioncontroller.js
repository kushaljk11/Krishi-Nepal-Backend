import farmer from "../model/farmer.js";
import Product from "../model/product.js";
import Transaction from "../model/transaction.js";

export const buyProduct = async (req, res) => {
  try {
    const { userId, productId, quantity, paymentMethod } = req.body;

    const user = await farmer.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role !== "buyer" && user.role !== "both") {
      return res.status(403).json({ success: false, message: "User is not allowed to buy products" });
    }

    const product = await Product.findById(productId).populate("seller");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock available" });
    }

    product.stock -= quantity;
    await product.save();

    const transaction = await Transaction.create({
      buyer: user._id,
      seller: product.seller,
      product: product._id,
      quantity,
      pricePerUnit: product.price,
      totalAmount: product.price * quantity,
      paymentMethod: paymentMethod || "COD",
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Purchase successful",
      data: {
        transactionId: transaction._id,
        product: product.name,
        quantity,
        totalAmount: transaction.totalAmount,
        paymentMethod: transaction.paymentMethod,
        status: transaction.status,
        orderDate: transaction.transactionDate
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
