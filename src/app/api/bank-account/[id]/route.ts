/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/bank-accounts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import BankAccount from "@/models/BankAccount";
import { dbConnect } from "@/libs/db";


// PUT /api/bank-accounts/:id
export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await BankAccount.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Bank account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error updating account" },
      { status: 400 }
    );
  }
}
export async function DELETE(req: NextRequest, { params }: any) {
  console.log("🚀 ~ DELETE ~ params:", params)
  await dbConnect();
  const param=await params
  const id = param.id;

  try {
    const updated = await BankAccount.findByIdAndDelete(id);

    if (!updated) {
      return NextResponse.json(
        { error: "Bank account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error updating account" },
      { status: 400 }
    );
  }
}