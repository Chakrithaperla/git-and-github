import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {post.coverImage && (
            <img src={post.coverImage} width="200" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;