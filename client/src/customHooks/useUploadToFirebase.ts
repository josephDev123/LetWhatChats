import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

import { useState } from "react";

export function useUploadFirebaseToFirebase() {
  const [downloadedUrl, setdownloadedUrl] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadStageStatus, setUploadStageStatus] = useState<string | null>(
    null
  );

  const uploadFile = async (pathname: string, file: File) => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageDb = getStorage();
    const timestamp = Date.now();
    // const filename = `${file.name}-${timestamp}`;
    // Upload file and metadata to the object 'images/mountains.jpg'

    const storageRef = ref(storageDb, `${pathname}/ ${file.name}-${timestamp}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            setUploadStageStatus("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setUploadStageStatus("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setErrorMsg("storage/unauthorized");
            break;
          case "storage/canceled":
            // User canceled the upload
            setErrorMsg("storage/canceled");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setdownloadedUrl(downloadURL);
          setUploadStageStatus(null);
          setErrorMsg(null);
        });
      }
    );
  };

  return { downloadedUrl, errorMsg, uploadStageStatus, uploadFile };
}
