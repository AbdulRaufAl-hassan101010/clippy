import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (_, { params }) => {
  try {
    // connect to db
    await connectToDB();

    // find prompts by creator id
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    // return prompts
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    // return error
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
