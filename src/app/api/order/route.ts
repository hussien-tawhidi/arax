import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { dbConnect } from "@/libs/db";
import mongoose from "mongoose";
import { auth } from "../../../../auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    await dbConnect();

    const data = await request.json();
    console.log("🚀 ~ POST ~ data:", data);

    const {
      cartItems,
      province,
      city,
      address,
      houseNumber,
      unit,
      name,
      phone,
      selectedDelivery,
      selectedPayment,
      code,
      applied,
    } = data;

    // Step 1: Validate cart items
    let totalPrice = 0;
    const validatedCartItems = [];

    for (const item of cartItems) {
      const productId = item._id || item.productId;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID format: " + productId);
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found: " + productId);
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      validatedCartItems.push({
        _id: product._id,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    // Step 2: Add delivery cost (could be based on selectedDelivery)
    const deliveryCost = 0; // Calculate based on location/delivery method

    // Step 3: Apply discount if valid
    let finalPrice = totalPrice + deliveryCost;
    let discountAmount = 0;

    if (applied && code) {
      // TODO: Validate code from Discount model
      discountAmount = 20000; // Example
      finalPrice -= discountAmount;
    }

    // Step 4: Save order
    const newOrder = new Order({
      user: session?.user?.id,
      province,
      city,
      address,
      houseNumber,
      unit,
      name,
      phone,
      selectedDelivery,
      selectedPayment,
      totalPrice: finalPrice,
      deliveryCost,
      discountCode: code,
      discountApplied: applied,
      cartItems: validatedCartItems,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        message: "Order created securely",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("🚨 Order error:", error);
    return NextResponse.json({ error: "خطا در ثبت سفارش" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { message: "کاربر احراز هویت نشده است." },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const orders = await Order.find({ user: userId }).populate("user");
    console.log("🚀 ~ GET ~ orders:", orders);
    return NextResponse.json(orders, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("🚨 GET orders error:", error);
    return NextResponse.json(
      { message: "خطا در بازیابی سفارشات", error: error.message },
      { status: 500 }
    );
  }
}
