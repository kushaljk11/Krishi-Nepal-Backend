import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    description: "Name of the product"
  },
  description: {
    type: String,
    trim: true,
    description: "Detailed description of the product"
  },
  category: {
    type: String,
    required: true,
    description: "Category of the product (e.g., seeds, tools, produce)"
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    description: "Price of the product in NPR"
  },
  unit: {
    type: String,
    default: "kg",
    description: "Unit of measurement (kg, liter, piece, etc.)"
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    description: "Available stock quantity"
  },
  location: {
    province: {
      type: String,
      required: false,
      description: "Province in Nepal where the product is available"
    },
    district: {
      type: String,
      required: false,
      description: "District of the seller"
    }
  },
  seller: {
    name: {
      type: String,
      required: false,
      description: "Seller's name or organization"
    },
    phone: {
      type: String,
      required: false,
      description: "Seller contact number"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Date when the product was added"
  }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
