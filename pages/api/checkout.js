import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }
  const order = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,

    success_url: process.env.PAYMENT_SUCCESS_URL + "/cart?success=1",
    cancel_url: process.env.PAYMENT_CANCEL_URL + "/cart/canceled=1",
    metadata: {
      orderId: order._id.toString(),
    },
  });
  res.json({ url: session.url });
}
