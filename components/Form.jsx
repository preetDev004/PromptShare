import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  // const { type, post, setPost, submitting, handleSubmit } = props;
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc px-1">
        {type} & Share amazing prompts with the world, and let your imagination
        run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-white/70 text-base">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt} // whatever we write is a vlaue for prompt
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }} // we update prompt value when we type anything. So we setPost as the existing post value and then change value of prompt by event.target.value.
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-white/70 text-base">
            Tag{` `}
            <span className="font-normal">
              (#product #webdevelopment #idea...)
            </span>
          </span>

          <textarea
            value={post.tag} // whatever we write is a vlaue for tag
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }} // we update tag value when we type anything. So we setPost as the existing post value and then change value of tag by event.target.value.
            placeholder="#Tag..."
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-300 text-sm hover:text-gray-100 ">
            <button
              onClick={() => {
                setPost({ prompt: "", tag: "" });
              }}
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm  bg-gradient-to-tr from-amber-500 via-orange-600 to-yellow-500 text-white rounded-2xl hover:bg-gradient-to-bl hover:from-orange-600 hover:via-amber-500 hover:to-orange-600 transition-all ease-in duration-1000 transform hover:scale-105"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
