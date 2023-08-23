"use client"; // Make this client side rendering as we are going to interact the navbar with the client
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  // const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!(session?.user)) {
      router.push("/");
    }
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);

        
      } catch (error) {
        throw new Error(error);
      }
    };
    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptShare logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptShare</p>
      </Link>

      {/* navigaion */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut({
                  callbackUrl: "/",
                  onSignOut: () => {
                    router.push("/");
                  },
                });
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <div className="rounded-3xl border-2 w-50 h-50 bg-black overflow-hidden cursor-pointer">
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="User Profile Logo"
                  width={45}
                  height={45}
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // We can have many providers like google/github/facebook..... so we have to take care of all of them
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="flex sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            <Dropdown className="dark dropdown">
              <div className="rounded-3xl border-2 w-45 h-45 bg-black overflow-hidden cursor-pointer">
                <DropdownTrigger>
                  <Image
                    src={session?.user.image}
                    alt="User Profile Logo"
                    width={40}
                    height={40}
                  />
                </DropdownTrigger>
              </div>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  textValue="My profile"
                  className="dark text-white"
                  key="profile"
                >
                  <Link href="/profile">
                    <div className="w-full">My Profile</div>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  textValue="Create prompt"
                  key="create_prompt"
                  className="dark text-white"
                >
                  <Link href="/create-prompt">
                    <div className="w-full">Create Post</div>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  textValue="Sign out"
                  key="Sign_out"
                  className="dark text-white mt-5"
                  color=""
                >
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                    }}
                    className="black_btn w-full "
                  >
                    Sign Out
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <div className="rounded-3xl border-2 w-45 h-45 bg-black overflow-hidden cursor-pointer">
             
              <Image
                src={session?.user.image}
                alt="User Profile Logo"
                width={40}
                height={40}
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
               
               
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn w-full mt-5 "
                >
                  Sign Out
                </button>
               
              </div>
            )} */}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // We can have many providers like google/github/facebook..... so we have to take care of all of them
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
