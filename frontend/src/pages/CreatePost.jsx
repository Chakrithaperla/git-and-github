import { useState } from "react";
import axios from "../services/axiosInstance";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (file) => {
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedUrl = imageUrl;

    // Step 1: Upload image
    if (file && !imageUrl) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("/api/upload", formData);
      uploadedUrl = res.data.secure_url;
      setImageUrl(uploadedUrl);
    }

    // Step 2: Create post
    await axios.post("/api/posts", {
      title,
      content,
      coverImage: uploadedUrl,
    });

    alert("Post created!");
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ImageUpload onUpload={handleUpload} />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;