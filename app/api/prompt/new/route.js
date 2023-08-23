import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const POST = async (req) => {

  const reqBody = await req.text();
  const { userID, prompt, tag } = JSON.parse(reqBody);

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userID,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Prompt!", { status: 500 });
  }
};

