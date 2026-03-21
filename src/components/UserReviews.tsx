import { createSupabaseAdmin } from "@/lib/supabase/admin";

interface UserReviewsProps {
  barberId: string;
}

export async function UserReviews({ barberId }: UserReviewsProps) {
  const supabase = createSupabaseAdmin();
  const { data: reviews } = await supabase
    .from("user_reviews")
    .select("id, display_name, rating, comment, verified_at, created_at")
    .eq("barber_id", barberId)
    .eq("email_verified", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-fade-navy mb-3">Customer Reviews</h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-fade-navy/10 bg-white p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s}
                    src={s <= r.rating ? "/icons/star-filled.png" : "/icons/star-empty.png"}
                    alt=""
                    width={16}
                    height={16}
                  />
                ))}
              </span>
              <span className="font-medium text-sm text-fade-navy">
                {r.display_name}
              </span>
              <span className="text-xs text-fade-muted">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
            {r.comment && (
              <p className="text-sm text-fade-muted">{r.comment}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
