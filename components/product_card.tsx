"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(product._id));
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2 cursor-pointer"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">{product.price} VNĐ</p>
        <button onClick={handleLike}>
          <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
