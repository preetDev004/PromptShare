"use client";

import PromptCard from "./PromptCard";
import { useEffect, useState } from "react";
import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="feed">
        {data.length !== 0 ? (
          <div
            className={`${
              data.length === 1 ? "" : "w-full sm:w-auto prompt_grid"
            }`}
          >
            {data &&
              data.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleDelete={() => {
                    handleDelete && handleDelete(post);
                  }}
                  handleEdit={() => {
                    handleEdit && handleEdit(post);
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="mt-16 w-full flex justify-center items-center">
            {isLoading ? (
              <Image
                width={50}
                height={50}
                alt="loader"
                src={"/assets/icons/loader.svg"}
              />
            ) : (
              <p className="text-md md:text-xl font-semibold opacity-80 text-gray-400">
                You do not have any Posts yet!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
