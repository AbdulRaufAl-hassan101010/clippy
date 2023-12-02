import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    const url = new URL(req.url);
    let search = url.searchParams.get("search");

    // connect to db
    await connectToDB();

    let prompts = [];

    if (params.id === "undefined") {
      return new Response(JSON.stringify([]), {
        status: 400,
      });
    }

    if (!search) {
      search = undefined;
    }

    // find prompts by creator id and search query
    prompts = await Prompt.find({
      creator: params.id,
      $or: [
        { tag: new RegExp(search, "i") },
        { prompt: new RegExp(search, "i") },
      ],
    }).populate("creator");

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
