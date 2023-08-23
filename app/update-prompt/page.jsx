"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const searchParams = useSearchParams();
  const PromptID = searchParams.get("id");
  const router = useRouter();
  useEffect(() => {
    const getPromptDetails = async () => {
      const promptToUpdate = await fetch(`/api/prompt/${PromptID}`);
      if (!promptToUpdate.ok) {
        router.push('/');
        return;
      }
      const data = await promptToUpdate.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (PromptID) getPromptDetails();
  }, [PromptID]);
  const editPrompt = async (event) => {
    event.preventDefault(); // this prevents the default behaviour of the borwser.
    setSubmitting(true);
    if(!PromptID) return new alert("No prompt found!");
    try {
      const response = await fetch(`/api/prompt/${PromptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
