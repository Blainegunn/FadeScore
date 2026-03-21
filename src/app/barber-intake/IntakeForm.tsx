"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useActionState } from "react";
import type { HairType, CutType } from "@/types";
import { HAIR_TYPE_LABELS, CUT_TYPE_LABELS } from "@/lib/filters";
import { submitBarberIntake, type IntakeFormState } from "./actions";

const ALL_HAIR: HairType[] = ["textured-coily", "wavy", "straight", "all"];
const ALL_CUT: CutType[] = [
  "skin-fade", "taper-fade", "lineup", "beard", "designs", "locs", "braids",
  "razor-fade", "classic-cut", "straight-razor", "styling", "colors", "precision-cut",
];

interface ShopOption {
  slug: string;
  name: string;
  city: string;
  state: string;
}

interface IntakeFormProps {
  shops: ShopOption[];
  defaultShopSlug?: string;
}

export function IntakeForm({ shops, defaultShopSlug }: IntakeFormProps) {
  const [notListed, setNotListed] = useState(false);
  const [state, formAction, isPending] = useActionState<IntakeFormState | null, FormData>(
    async (_, formData) => submitBarberIntake(formData),
    null
  );

  // Shop autocomplete state
  const defaultShop = defaultShopSlug ? shops.find((s) => s.slug === defaultShopSlug) : undefined;
  const [query, setQuery] = useState(defaultShop ? `${defaultShop.name} — ${defaultShop.city}, ${defaultShop.state}` : "");
  const [selectedShopSlug, setSelectedShopSlug] = useState(defaultShopSlug ?? "");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return shops.slice(0, 20);
    const lower = query.toLowerCase();
    return shops
      .filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.city.toLowerCase().includes(lower) ||
          s.state.toLowerCase().includes(lower)
      )
      .slice(0, 20);
  }, [query, shops]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectShop(shop: ShopOption) {
    setQuery(`${shop.name} — ${shop.city}, ${shop.state}`);
    setSelectedShopSlug(shop.slug);
    setShowDropdown(false);
  }

  return (
    <form action={formAction} className="space-y-8 max-w-xl">
      {/* Listing confirmation */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-fade-navy">
          Confirm your listing
        </legend>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="listingChoice"
              checked={!notListed}
              onChange={() => setNotListed(false)}
              className="rounded-full border-gray-300 text-fade-accent focus:ring-fade-accent"
            />
            <span className="text-fade-navy">I&apos;m already on FadeScore</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="listingChoice"
              checked={notListed}
              onChange={() => setNotListed(true)}
              className="rounded-full border-gray-300 text-fade-accent focus:ring-fade-accent"
            />
            <span className="text-fade-navy">I&apos;m not listed yet</span>
          </label>
        </div>

        {!notListed ? (
          <div className="relative">
            <label htmlFor="shopSearch" className="block text-sm font-medium text-fade-muted mb-1">
              Find your shop
            </label>
            <input type="hidden" name="shopSlug" value={selectedShopSlug} />
            <input
              ref={inputRef}
              id="shopSearch"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedShopSlug("");
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Start typing shop name or city..."
              autoComplete="off"
              className="w-full rounded-xl border border-fade-navy/12 bg-white px-4 py-2.5 text-sm text-fade-navy placeholder:text-fade-muted/60 focus:outline-none focus:ring-2 focus:ring-fade-accent/50"
            />
            {showDropdown && filtered.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-fade-navy/10 bg-white shadow-lg"
              >
                {filtered.map((shop) => (
                  <button
                    key={shop.slug}
                    type="button"
                    onClick={() => selectShop(shop)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-fade-pill/15 transition-colors border-b border-fade-navy/5 last:border-0"
                  >
                    <span className="font-medium text-fade-navy">{shop.name}</span>
                    <span className="text-fade-muted ml-2">
                      {shop.city}, {shop.state}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {showDropdown && query.trim() && filtered.length === 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-xl border border-fade-navy/10 bg-white shadow-lg px-4 py-3 text-sm text-fade-muted">
                No shops found. Try a different name or choose &quot;I&apos;m not listed yet&quot;.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-fade-navy/10 p-4 bg-fade-canvas/50">
            <input type="hidden" name="notListed" value="true" readOnly aria-hidden />
            <div>
              <label htmlFor="customName" className="block text-sm font-medium text-fade-muted mb-1">Your name</label>
              <input id="customName" name="customName" type="text" className="w-full rounded-xl border border-fade-navy/12 bg-white px-4 py-2 text-sm text-fade-navy" placeholder="Barber name" />
            </div>
            <div>
              <label htmlFor="customShopName" className="block text-sm font-medium text-fade-muted mb-1">Barbershop name</label>
              <input id="customShopName" name="customShopName" type="text" className="w-full rounded-xl border border-fade-navy/12 bg-white px-4 py-2 text-sm text-fade-navy" placeholder="Shop name" />
            </div>
            <div>
              <label htmlFor="customCity" className="block text-sm font-medium text-fade-muted mb-1">City</label>
              <input id="customCity" name="customCity" type="text" className="w-full rounded-xl border border-fade-navy/12 bg-white px-4 py-2 text-sm text-fade-navy" placeholder="City" />
            </div>
            <div>
              <label htmlFor="customState" className="block text-sm font-medium text-fade-muted mb-1">State</label>
              <input id="customState" name="customState" type="text" className="w-full rounded-xl border border-fade-navy/12 bg-white px-4 py-2 text-sm text-fade-navy" placeholder="State" />
            </div>
          </div>
        )}
      </fieldset>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-lg font-semibold text-fade-navy mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-fade-navy/12 bg-white text-fade-navy px-4 py-2.5 text-sm"
        />
        <p className="mt-1 text-sm text-fade-muted">We&apos;ll use this to confirm your info and reach out about your listing.</p>
      </div>

      {/* Hair types */}
      <fieldset>
        <legend className="text-lg font-semibold text-fade-navy mb-2">
          Hair types you work with <span className="text-red-500">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {ALL_HAIR.map((ht) => (
            <label key={ht} className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="hairTypes" value={ht} className="rounded border-gray-300 text-fade-accent focus:ring-fade-accent" />
              <span className="text-fade-navy">{HAIR_TYPE_LABELS[ht]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Cut types */}
      <fieldset>
        <legend className="text-lg font-semibold text-fade-navy mb-2">
          Cuts & services you offer <span className="text-red-500">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {ALL_CUT.map((ct) => (
            <label key={ct} className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="cutTypes" value={ct} className="rounded border-gray-300 text-fade-accent focus:ring-fade-accent" />
              <span className="text-fade-navy">{CUT_TYPE_LABELS[ct]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-fade-muted mb-1">Anything else?</label>
        <textarea id="notes" name="notes" rows={3} className="w-full rounded-xl border border-fade-navy/12 bg-white text-fade-navy px-4 py-2 text-sm" placeholder="Corrections, extra services, etc." />
      </div>

      {state?.ok === false && (
        <p className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {state.error}
        </p>
      )}
      {state?.ok === true && (
        <p className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm">
          Thanks! We&apos;ve saved your info and will be in touch.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-fade-accent px-6 py-3 text-fade-navy font-semibold hover:bg-fade-accent/90 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
      >
        {isPending ? "Sending\u2026" : "Submit"}
      </button>
    </form>
  );
}
