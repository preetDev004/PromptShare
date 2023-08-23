"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [posts, setPosts] = useState("");

  const name =
    searchParams.get("name").length > 15
      ? searchParams.get("name").slice(0, 15)
      : searchParams.get("name");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data.reverse());
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      name={`${name}'s`}
      desc={`You can read/copy and take advantage of all the AI-Powered prompts ${name} has posted!`}
      data={posts}
    />
  );
};

export default UserProfile;
