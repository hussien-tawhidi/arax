import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public/uploads");

  // Create the uploads directory if it doesn't exist
  await mkdir(uploadDir, { recursive: true });

  // Generate a unique filename
  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const fullPath = join(uploadDir, fileName);

  // Write the file
  await writeFile(fullPath, buffer);

  // Return public URL path
  return `/uploads/${fileName}`;
}
