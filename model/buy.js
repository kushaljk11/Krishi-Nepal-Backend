import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    description: "Full name of the buyer"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    description: "Buyer email address"
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    description: "Buyer contact number"
  },
  address: {
    province: {
      type: String,
      required: false,
      description: "Province of the buyer in Nepal"
    },
    district: {
      type: String,
      required: true,
      description: "District of the buyer"
    },
    localLevel: {
      type: String,
      description: "Municipality or ward"
    },
    fullAddress: {
      type: String,
      description: "Detailed street or tole address"
    }
  },
  preferences: {
    categories: {
      type: [String],
      default: [],
      description: "Preferred product categories (e.g., seeds, produce, fertilizer)"
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Bank Transfer", "eSewa", "Khalti"],
      default: "COD",
      description: "Preferred payment method"
    }
  },
  orders: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        description: "Product purchased by the buyer"
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        description: "Quantity of product ordered"
      },
      price: {
        type: Number,
        required: true,
        description: "Price paid for the product"
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
        description: "Order status"
      },
      orderDate: {
        type: Date,
        default: Date.now,
        description: "Date when order was placed"
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Date when buyer account was created"
  }
});

const Buyer = mongoose.model("Buyer", BuyerSchema);

export default Buyer;
