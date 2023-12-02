"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const { data: session } = useSession();

  const handleSearchChange = async (e) => {
    const search = e.target.value;
    setSearchText(e.target.value);

    try {
      if (search === "") {
        return;
      }

      const res = await fetch(
        `/api/users/${session?.user.id}/posts?search=${search}`
      );
      const data = await res.json();

      res.ok && setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    session?.user.id && fetchPosts();
  }, [session?.user.id]);

  return (
    <section className="feed">
      {session?.user.id ? (
        <form className="relative w-full flex-cente">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
            placeholder="Search for a tag or username"
          />
        </form>
      ) : null}

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
