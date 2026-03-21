"use client";

import Link from "next/link";

interface ClaimButtonProps {
  shopSlug: string;
  shopName: string;
}

export function ClaimButton({ shopSlug }: ClaimButtonProps) {
  return (
    <Link
      href={`/barber-intake?shop=${shopSlug}`}
      className="text-fade-accent hover:underline font-medium text-sm"
    >
      Claim this shop
    </Link>
  );
}
