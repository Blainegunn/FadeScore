export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/,/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function cityToSlug(city: string, state?: string): string {
  const base = toSlug(city);
  if (state && (city === "Washington" || city === "Portland")) {
    return state.toLowerCase().includes("district") ? "washington-dc" : base;
  }
  if (base === "portland") return "portland"; // Oregon default
  return base;
}
