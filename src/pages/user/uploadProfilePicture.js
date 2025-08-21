import React, { useState } from "react";
import AWS from "aws-sdk";

const UploadProfilePicture = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET,
      Key: `profile-pictures/${file.name}`, // Adjust the path as needed
      Body: file,
      ContentType: file.type,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      await sendUrlToBackend(Location);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading to S3:", error);
    }
  };

  const sendUrlToBackend = async (s3Url) => {
    try {
      await fetch(
        "http://localhost:5000/api/users/update-user-details/66e5793765c447e666d082b7",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture: s3Url }),
        }
      );
    } catch (error) {
      console.error("Error sending URL to backend:", error);
    }
  };

  return (
    <div>
      <h1>Upload Profile Picture</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadProfilePicture;
