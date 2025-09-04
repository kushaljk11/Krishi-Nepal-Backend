import dotenv from 'dotenv';
import Product from '../model/product.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, unit, stock, location, seller } = req.body;

    // Validate required fields
    if (!name || !category || !price || !stock || !location || !seller || !seller.phone || !seller.name) {
      return res.status(400).json({ message: "Sorry, all fields are required, including seller name and phone." });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Sorry, a product with this name already exists." });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      stock,
      unit: unit || "kg",
      location,
      seller: { name: seller.name, phone: seller.phone }
    });

    await newProduct.save();
    res.status(201).json({ message: "Yayyy... Product added successfully!" });
  } catch (error) {
    console.error("Oops, error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Oops, Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, unit, stock, location, seller } = req.body; 
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sorry, Product not found" });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.unit = unit || product.unit;
    product.stock = stock || product.stock;
    product.location = location || product.location;
    product.seller = seller || product.seller;
    await product.save();
    res.status(200).json({ message: "Yayyy.... Product updated successfully" });
  } catch (error) {
    console.error("Oops, Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sorry, Product not found" });
    }
    await product.remove();
    res.status(200).json({ message: "Yayyy.... Product deleted successfully" });
  } catch (error) {
    console.error("Oops, Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}