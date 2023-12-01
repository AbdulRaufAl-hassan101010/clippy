import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share prompts with the world, and let your imagination run
        wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        action=""
        className="mt-10 w-full max-w-2xl flex flex-col gap-z glassmorphism "
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-grey-700">
            You AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="write your prompt here..."
            className="form_textarea"
            required
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-grey-700">
            Tag <span>(#product, #webdevelopment, #idea)</span>
          </span>

          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag1 #tag2 #tag3"
            className="form_input mb-4"
            required
          ></textarea>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-grey-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
