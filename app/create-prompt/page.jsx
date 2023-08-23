"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  function getValidTag(tag) {
    let tagArray = tag.split('#');
    if (tagArray.length > 1 && tagArray[1] !== '') {
      return '#' + tagArray[1];
    } else {
      return tagArray[0];
    }
  }
  const CreatePrompt = async (event) => {
    event.preventDefault(); // this prevents the default behaviour of the borwser.
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userID: session?.user.id,
          prompt: post.prompt,
          tag: getValidTag(post.tag),
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={CreatePrompt}
    />
  );
};

export default CreatePrompt;
