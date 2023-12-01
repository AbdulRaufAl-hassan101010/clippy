import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mb-5">
        Discover & Share <br className="mx-md:hidden" />
        <span className="orange_gradient">Global Clipboard Access</span>
      </h1>
      <p className="desc text-center">
        Access your clipboard from anywhere in the world.{" "}
        <br className="mx-md:hidden" />
        Just signup with us for free and start sharing.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
