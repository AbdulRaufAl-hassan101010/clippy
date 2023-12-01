"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    console.log("deleting...");
    const hasConfirmed = confirm("Are you sure you want to edit this prompt?");

    if (hasConfirmed) {
      try {
        const prompt = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        // fetch prompt again
        await fetchPosts();

        return true;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
