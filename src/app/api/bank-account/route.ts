/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import BankAccount from "@/models/BankAccount";
import { dbConnect } from "@/libs/db";
import { auth } from "../../../../auth";
// GET /api/bank-accounts?userId=xxxxx
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const accounts = await BankAccount.find({ userId }).sort({ isDefault: -1 });
    return NextResponse.json(accounts);
  } catch (err) {
    console.log("🚀 ~ GET ~ err:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/bank-accounts
export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await auth();
  const userId = session?.user.id;
  const body = await req.json();
 
  const {
    bankName,
    accountNumber,
    cardNumber,
    shabaNumber,
    ownerName,
    isDefault,
  } = body;
  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const newAccount = await BankAccount.create(
      {
        userId,
        bankName,
        accountNumber,
        cardNumber,
        shabaNumber,
        ownerName,
        isDefault,
        status: "pending",
      }
    );
    return NextResponse.json(
      { newAccount, message: "bank account created" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error creating account" },
      { status: 500 }
    );
  }
}
