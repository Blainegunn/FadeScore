/**
 * FadeScore calculation.
 *
 * fadeScore = (weightedAvgRating * 0.6) + (reviewVolumeScore * 0.2) + (priceValueScore * 0.2)
 *
 * - weightedAvgRating: weighted average across platforms (Google 0.5, Yelp 0.3, others 0.2)
 * - reviewVolumeScore: log-scaled review count (0–5 scale)
 * - priceValueScore: inverse price relative to city average (0–5 scale)
 */

interface ReviewInput {
  platform: string;
  rating: number;
  reviewCount: number;
}

const PLATFORM_WEIGHTS: Record<string, number> = {
  google: 0.5,
  yelp: 0.3,
  facebook: 0.1,
  booksy: 0.05,
  squire: 0.05,
};

export function calculateFadeScore(
  reviews: ReviewInput[],
  avgPrice: number,
  cityAvgPrice: number
): number {
  if (reviews.length === 0) return 0;

  // 1. Weighted average rating
  let totalWeight = 0;
  let weightedSum = 0;
  for (const r of reviews) {
    const weight = PLATFORM_WEIGHTS[r.platform] ?? 0.1;
    weightedSum += r.rating * weight;
    totalWeight += weight;
  }
  const weightedAvgRating = totalWeight > 0 ? weightedSum / totalWeight : 0;

  // 2. Review volume score (log-scaled, 0–5)
  const totalReviews = reviews.reduce((sum, r) => sum + r.reviewCount, 0);
  // log2(1) = 0, log2(32) ≈ 5, log2(1024) ≈ 10 → cap at 5
  const reviewVolumeScore = Math.min(5, Math.log2(Math.max(1, totalReviews)) * 0.5);

  // 3. Price value score (inverse price relative to city average, 0–5)
  // If barber is cheaper than city average, higher score
  const effectiveCityAvg = cityAvgPrice > 0 ? cityAvgPrice : 35;
  const priceRatio = effectiveCityAvg / Math.max(avgPrice, 1);
  const priceValueScore = Math.min(5, Math.max(0, priceRatio * 2.5));

  const fadeScore = weightedAvgRating * 0.6 + reviewVolumeScore * 0.2 + priceValueScore * 0.2;

  return Math.round(fadeScore * 10) / 10;
}
