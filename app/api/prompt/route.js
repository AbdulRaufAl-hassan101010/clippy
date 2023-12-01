import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
  try {
    // const {userId} = await
    await connectToDB();

    const posts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get posts", { status: 500 });
  }
};
