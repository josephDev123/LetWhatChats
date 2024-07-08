import { getStorage, ref, deleteObject } from "firebase/storage";

export async function deleteFileOnFirebase(path: string): Promise<string> {
  try {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, path);

    // Delete the file
    await deleteObject(desertRef);

    return "success";
  } catch (error) {
    console.log(error);
    throw error;
  }
}
