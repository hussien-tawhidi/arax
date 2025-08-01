import UpdateOffCode from "@/components/admin/off-codes/UpdateOffCode";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function updateOffCodes({ params }: any) {
  const id = await params.id;
  return <UpdateOffCode id={id} />;
}
