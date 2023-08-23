"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleProfile = (post) => {
    if (pathName !== "/profile" && session?.user.id === post.creator._id) {
      router.push('/profile');
    } else if (pathName === "/" ) {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
    
  };
  return (
    <div className="prompt_card flex flex-col justify-between">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={()=>handleProfile(post)}
          className="flex-1 flex justify-start items-center cursor-pointer gap-3"
        >
          <Image
            alt="User_image"
            className="object-contain rounded-full"
            width={40}
            height={40}
            src={post.creator.image}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-gray-100 font-semibold">
              {post.creator.username.length > 15
                ? post.creator.username.slice(0, 15)
                : post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {post.creator.email.length > 26
                ? `${post.creator.email.slice(0, 25)}...`
                : post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            width={16}
            height={16}
            alt="copy_icon"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <div>
        <p className="my-4 font-satoshi text-sm text-gray-250">
          {post.prompt.length > 200
            ? `${post.prompt.slice(0, 250)}...`
            : post.prompt}
        </p>
        <p>
          <span
            className="font-inter text-sm cursor-pointer relative"
            style={{
              background: "linear-gradient(45deg, #FFA258, #FFC34D, #FFD75E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => {
              handleTagClick && handleTagClick(post.tag);
            }}
          >
            {post.tag.slice(0, 1)[0] === "#" ? "" : "#"}
            {post.tag.length > 30 ? `${post.tag.slice(0, 30)}...` : post.tag}

            <span className="gradient-underline"></span>
          </span>
        </p>
      </div>
      <div></div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="gap-4 flex-end mt-5 pt-3">
          <span className="backdrop-blur-lg backdrop-filter transition-all duration-300 hover:-translate-y-1  md:hover:scale-150  hover:bg-white/10 w-19 h-19 rounded-full">
            <Image
              className="cursor-pointer mix-blend-multiply"
              onClick={handleEdit}
              width={15}
              height={15}
              alt="edit_logo"
              src={"/assets/icons/edit.svg"}
            />
          </span>
          <span
            onClick={onOpen}
            className="backdrop-blur-lg backdrop-filter transition-all duration-300 hover:-translate-y-1  md:hover:scale-150 hover:bg-white/5 w-19 h-19 rounded-full"
          >
            <Image
              className="cursor-pointer"
              width={18}
              height={18}
              alt="delete_logo"
              src={"/assets/icons/delete.svg"}
            />
          </span>
          <Modal
            className="dark text-white"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Deleting Prompt
                  </ModalHeader>
                  <ModalBody>
                    <p>Are you sure?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="text-gray-400"
                      variant="light"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onPress={() => {
                        handleDelete();
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
