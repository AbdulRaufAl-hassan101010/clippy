"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-5">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/favicon/favicon.ico"
          alt="promptia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Clippy</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              {" "}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt="profile image"
                width={30}
                height={30}
                className="rounded-full "
              />
            </Link>
          </div>
        ) : (
          <>
            {session?.user ? null : (
              <button type="button" className="black_btn" onClick={signIn}>
                Sign In
              </button>
            )}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            {" "}
            <Image
              src={session?.user?.image}
              alt="profile image"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 black_btn w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="black_btn" onClick={signIn}>
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
