import Prompt from "@models/prompt";

const { connectToDB } = require("@utils/database");

// GET /api/prompt/:id
export const GET = async (req, { params }) => {
  // user id
  const { id } = params;

  try {
    // Connect to database
    await connectToDB();

    // Find prompt by id
    const prompt = await Prompt.findById(id).populate("creator");

    // Return prompt
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    // Return error
    return new Response(error, { status: 500 });
  }
};

// PATCH /api/prompt/:id
export const PATCH = async (req, { params }) => {
  // get id from request params
  const { id } = params;

  // get prompt and tags from request body
  const { prompt, tag } = await req.json();

  try {
    // Connect to database
    await connectToDB();

    // Find prompt by id
    const promptData = await Prompt.findById(id).populate("creator");

    if (!promptData) {
      // Return error
      return new Response("Prompt not found", { status: 404 });
    }
    console.log(prompt, tag);

    // Update prompt
    promptData.set({ prompt, tag });
    await promptData.save();

    // Return prompt
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    // Return error
    return new Response(error, { status: 500 });
  }
};

// DELETE /api/prompt/:id
export const DELETE = async (req, { params }) => {
  // Connect to database
  const { id } = params;

  try {
    // Connect to database
    await connectToDB();

    // Find prompt by id
    const prompt = await Prompt.findById(id);

    if (!prompt) {
      // Return error
      return new Response("Prompt not found", { status: 404 });
    }

    console.log(prompt);

    // Delete prompt
    await prompt.deleteOne();

    // Return prompt
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    // Return error
    return new Response(error, { status: 500 });
  }
};
