import { useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} width="150" />}
    </div>
  );
};

export default ImageUpload;