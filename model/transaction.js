import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farmer",
    required: true,
    description: "Buyer (farmer with role = buyer/both)"
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "farmer",
    required: true,
    description: "Seller (farmer with role = seller/both)"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    description: "Product being purchased"
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    description: "Quantity purchased"
  },
  pricePerUnit: {
    type: Number,
    required: true,
    description: "Price of one unit at the time of purchase"
  },
  totalAmount: {
    type: Number,
    required: true,
    description: "Total = quantity * pricePerUnit"
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Bank Transfer", "eSewa", "Khalti"],
    default: "COD",
    description: "How buyer paid"
  },
  status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
    description: "Transaction/payment status"
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    description: "When the transaction occurred"
  }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
