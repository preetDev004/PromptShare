"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

const PromptCardList = ({ data, handleTagClick, isLoading, setIsLoading }) => {
  useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading])
  
  return (
    <>
      {data.length !== 0 ? (
        <div
          className={`mt-16 ${
            data.length === 1 ? "" : "w-full sm:w-auto prompt_grid"
          }`}
        >
          {data &&
            data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              />
            ))}
        </div>
      ) : (
        <div className="mt-16 w-full flex justify-center items-center">
          {isLoading ? (<Image
            width={50}
            height={50}
            alt="loader"
            src={"/assets/icons/loader.svg"}
          />) : (
            <p className="text-md md:text-xl font-semibold opacity-80 text-gray-400">No posts found!</p>)
          }
        </div>
      )}
    </>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const filterPosts = (searchText) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      const finalSearchText =
        lowerCaseSearchText.slice(0, 1)[0] === "@" ? "" : lowerCaseSearchText;
      const filtered = originalPosts.filter((post) => {
        const lowerCaseUsername = post.creator.username.toLowerCase();
        const lowerCasePrompt = post.prompt.toLowerCase();
        const lowerCaseTag = post.tag.toLowerCase();
        return (
          lowerCaseUsername.includes(finalSearchText) ||
          lowerCasePrompt.includes(finalSearchText) ||
          lowerCaseTag.includes(finalSearchText)
        );
      });
      if (filtered.length===0) {
        setIsLoading(true);
      }
      setPosts(filtered);
    };
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data.reverse());
      setOriginalPosts(data);
      if (posts.length===0) {
        setIsLoading(true);
      }
    };
    if (!searchText) {
      fetchPosts();
    } else {
      setIsLoading(false);
      filterPosts(searchText);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for #Tag or @Username"
          value={searchText}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
      </form>
      <PromptCardList
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={posts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;
