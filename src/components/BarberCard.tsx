"use client";

import Link from "next/link";
import Image from "next/image";
import type { Barber } from "@/types";
import { getEffectiveCutTypes } from "@/lib/filters";
import { CUT_TYPE_LABELS } from "@/lib/filters";
import { useCompare } from "@/context/CompareContext";

interface BarberCardProps {
  barber: Barber;
  rank?: number;
  distanceMiles?: number;
  showVerified?: boolean;
}

function isBestValue(barber: Barber): boolean {
  return barber.fadeScore >= 4.5 && barber.avgPrice <= 40;
}

function isIndividualBarber(barber: Barber): boolean {
  return barber.name.toLowerCase() !== barber.shopName.toLowerCase();
}

function formatCardLocation(barber: Barber): string {
  const street = barber.address?.trim();
  if (street) return street;
  return `${barber.city}, ${barber.state}`;
}

export function BarberCard({ barber, rank, distanceMiles, showVerified = true }: BarberCardProps) {
  const cutTypes = getEffectiveCutTypes(barber).slice(0, 3);
  const showBestValue = isBestValue(barber);
  const isBarber = isIndividualBarber(barber);
  const { toggle, isSelected, isFull } = useCompare();
  const selected = isSelected(barber.slug);
  const locationLabel = formatCardLocation(barber);

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle({ slug: barber.slug, name: barber.name, fadeScore: barber.fadeScore });
  }

  return (
    <Link
      href={`/barber/${barber.slug}`}
      className={`group flex h-full flex-col rounded-2xl border p-5 shadow-sm shadow-fade-navy/[0.04] transition-all hover:shadow-md hover:shadow-fade-navy/10 hover:-translate-y-0.5 ${selected ? "border-fade-accent bg-fade-accent/5" : "border-fade-navy/8 bg-white/90 hover:border-fade-accent/35"}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fade-canvas border border-fade-navy/8 group-hover:border-fade-accent/25 transition-colors">
          <Image
            src={isBarber ? "/icons/user.png" : "/icons/barbershop.png"}
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {rank != null && (
            <span className="text-xs font-bold text-fade-accent">#{rank}</span>
          )}
          <div className="flex flex-wrap justify-end gap-1">
            {barber.isHiddenGem && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-fade-accent">
                <Image src="/icons/diamond.png" alt="" width={14} height={14} />
                Hidden Gem
              </span>
            )}
            {showBestValue && !barber.isHiddenGem && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                <Image
                  src="/icons/piggy-bank.png"
                  alt=""
                  width={14}
                  height={14}
                  className="object-contain shrink-0"
                />
                Best value
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm font-semibold text-fade-navy tabular-nums">
        <Image
          src="/icons/star-filled.png"
          alt=""
          width={16}
          height={16}
          className="inline-block mr-1 -mt-0.5"
        />
        {barber.fadeScore}
        <span className="mx-1 font-normal text-fade-muted">·</span>
        <span className="text-fade-navy">${barber.avgPrice}</span>
        <span className="text-xs font-normal text-fade-muted ml-0.5">avg</span>
      </p>

      <h3 className="font-name font-semibold mt-3 text-fade-navy text-lg leading-snug group-hover:text-fade-accent transition-colors">
        {barber.name}
      </h3>
      <p className="text-sm text-fade-muted mt-1 flex items-center gap-1">
        <Image src="/icons/barbershop.png" alt="" width={14} height={14} />
        <span
          role="link"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/shop/${barber.shopSlug}`;
          }}
          className="font-name hover:text-fade-accent hover:underline cursor-pointer"
        >
          {barber.shopName}
        </span>
      </p>
      <p className="text-sm text-fade-muted mt-1 flex items-start gap-1.5">
        <Image
          src="/icons/pin.png"
          alt=""
          width={14}
          height={14}
          className="shrink-0 mt-0.5"
        />
        <span className="min-w-0 break-words leading-snug">
          {locationLabel}
          {distanceMiles != null && (
            <span className="whitespace-nowrap"> · {distanceMiles} mi</span>
          )}
        </span>
      </p>
      <div className="flex items-center gap-1 text-sm text-fade-muted mt-2">
        <Image src="/icons/reviews.png" alt="" width={14} height={14} />
        <span>{barber.reviewCount} reviews</span>
      </div>
      {cutTypes.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 mt-3">
          <Image src="/icons/hair-clipper.png" alt="" width={14} height={14} className="mr-0.5 opacity-80" />
          {cutTypes.map((ct) => (
            <span
              key={ct}
              className="px-2 py-0.5 rounded-full text-xs border border-fade-pill/40 bg-fade-pill/15 text-fade-navy"
            >
              {CUT_TYPE_LABELS[ct]}
            </span>
          ))}
        </div>
      )}
      {/* Verified badge — hidden until shops are manually verified */}
      <div className="min-h-0 flex-1" aria-hidden />
      <button
        onClick={handleCompare}
        disabled={!selected && isFull}
        className={`mt-3 self-start text-xs transition-colors ${
          selected
            ? "text-fade-accent font-medium hover:text-red-500"
            : isFull
              ? "text-fade-muted/40 cursor-not-allowed"
              : "text-fade-muted hover:text-fade-accent"
        }`}
      >
        {selected ? "- Remove" : "+ Compare"}
      </button>
    </Link>
  );
}
