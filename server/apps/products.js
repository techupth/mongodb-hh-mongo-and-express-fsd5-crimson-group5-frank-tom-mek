import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("pizzaOrders");

  const pizzaOrders = await collection
    .find({ category: "it" })
    .limit(10)
    .toArray();

  return res.json({ data: pizzaOrders });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("pizzaOrders");
    const pizzaOrdersData = { ...req.body, created_at: new Date() };
    const pizzaOrders = await collection.insertOne(pizzaOrdersData);

    return res.json({
      message: `Product (${pizzaOrders.insertedId})has been created successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("pizzaOrders");
    const newProductData = { ...req.body, modified_at: new Date() };
    const productId = new ObjectId(req.params.id);

    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );
    return res.json({
      message: `Product Id ${req.params.id}has been updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("pizzaOrders");
    const productId = new ObjectId(req.params.id);
    await collection.deleteOne({ _id: productId });

    return res.json({
      message: `Product ID(${req.params.id})has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default productRouter;
