import type { Barber, HairType, CutType } from "@/types";

export const HAIR_TYPE_LABELS: Record<HairType, string> = {
  "textured-coily": "Textured / Coily",
  wavy: "Wavy",
  straight: "Straight",
  all: "All Hair Types",
};

export const CUT_TYPE_LABELS: Record<CutType, string> = {
  "skin-fade": "Skin Fade",
  "taper-fade": "Taper Fade",
  lineup: "Lineup",
  beard: "Beard",
  designs: "Designs",
  locs: "Locs",
  braids: "Braids",
  "razor-fade": "Razor Fade",
  "classic-cut": "Classic Cut",
  "straight-razor": "Straight Razor",
  styling: "Styling",
  colors: "Colors",
  "precision-cut": "Precision Cut",
};

/** Maps free-form specialty strings (lowercased) to standardized CutType values */
const SPECIALTY_TO_CUT_TYPE: Record<string, CutType> = {
  "skin fade": "skin-fade",
  "taper": "taper-fade",
  "tapers": "taper-fade",
  "taper fade": "taper-fade",
  "line up": "lineup",
  "lineup": "lineup",
  "edge up": "lineup",
  "beard": "beard",
  "designs": "designs",
  "locs": "locs",
  "braids": "braids",
  "razor fade": "razor-fade",
  "classic cuts": "classic-cut",
  "classic cut": "classic-cut",
  "classic shave": "straight-razor",
  "straight razor": "straight-razor",
  "hot lather shave": "straight-razor",
  "styling": "styling",
  "colors": "colors",
  "modern cuts": "precision-cut",
  "precision cut": "precision-cut",
  "clipper cuts": "classic-cut",
  "military cuts": "classic-cut",
  "burst fade": "skin-fade",
  "scalp treatment": "styling",
};

/** Auto-map existing free-form specialties array to CutType[] */
export function deriveCutTypes(specialties: string[]): CutType[] {
  const types = new Set<CutType>();
  for (const s of specialties) {
    const key = s.toLowerCase();
    const mapped = SPECIALTY_TO_CUT_TYPE[key];
    if (mapped) types.add(mapped);
    // "Fades" (generic) maps to skin-fade as default
    if (key === "fades") types.add("skin-fade");
  }
  return Array.from(types);
}

/** Returns the effective hair types for a barber, with sensible defaults */
export function getEffectiveHairTypes(barber: Barber): HairType[] {
  if (barber.hairTypes && barber.hairTypes.length > 0) return barber.hairTypes;
  return ["textured-coily", "wavy"];
}

/** Returns the effective cut types, falling back to deriveCutTypes */
export function getEffectiveCutTypes(barber: Barber): CutType[] {
  if (barber.cutTypes && barber.cutTypes.length > 0) return barber.cutTypes;
  return deriveCutTypes(barber.specialties);
}

/**
 * Filter barbers by hair types and cut types.
 * Hair type filter: OR logic (barber matches if any selected hair type matches, or barber has "all")
 * Cut type filter: AND logic (barber must have ALL selected cut types)
 * Empty filter arrays = no filtering (show all)
 */
export function filterBarbers(
  barbers: Barber[],
  hairTypes: HairType[],
  cutTypes: CutType[],
): Barber[] {
  return barbers.filter((barber) => {
    // Hair type filter (OR logic)
    if (hairTypes.length > 0) {
      const effective = getEffectiveHairTypes(barber);
      const matchesHair =
        effective.includes("all") ||
        hairTypes.some((ht) => effective.includes(ht));
      if (!matchesHair) return false;
    }

    // Cut type filter (AND logic)
    if (cutTypes.length > 0) {
      const effective = getEffectiveCutTypes(barber);
      const matchesCut = cutTypes.every((ct) => effective.includes(ct));
      if (!matchesCut) return false;
    }

    return true;
  });
}
