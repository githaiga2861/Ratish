import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StarIcon, CloseIcon } from "./Icons";
import { GourdDivider } from "./Brand";
import { loadReviews, saveReviews } from "../lib/store";

function Stars({ rating, onRate, size = "w-5 h-5" }) {
  return (
    <div className="flex gap-0.5 text-gold" role={onRate ? "radiogroup" : "img"} aria-label={`${rating} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) =>
        onRate ? (
          <button
            key={n}
            type="button"
            onClick={() => onRate(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="hover:scale-110 transition-transform"
          >
            <StarIcon className={size} filled={n <= rating} />
          </button>
        ) : (
          <StarIcon key={n} className={size} filled={n <= rating} />
        ),
      )}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(loadReviews);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      setError("Add your name and a short comment to post the review.");
      return;
    }
    const next = [
      { id: `r-${Date.now()}`, name: form.name.trim(), rating: form.rating, quote: form.comment.trim() },
      ...reviews,
    ];
    setReviews(next);
    saveReviews(next);
    setForm({ name: "", rating: 5, comment: "" });
    setError("");
    setOpen(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
      <GourdDivider />
      <h2 className="text-center text-4xl sm:text-5xl font-medium mt-4">From the table</h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.slice(0, 6).map((r) => (
          <article key={r.id} className="bg-ivory border border-sand p-6 flex flex-col gap-4">
            <Stars rating={r.rating} />
            <p className="text-ink/85 leading-relaxed flex-1">{r.quote}</p>
            <p className="text-sm tracking-[0.15em] uppercase text-ink/55">{r.name}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => setOpen(true)}
          className="border border-coal px-8 py-3 font-semibold tracking-wide hover:bg-coal hover:text-cream transition-colors"
        >
          Leave a review
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-coal/60 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory w-full max-w-md p-7 relative"
              role="dialog"
              aria-modal="true"
              aria-label="Leave a review"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-ink/60 hover:text-ink"
              >
                <CloseIcon />
              </button>
              <h3 className="text-2xl font-medium">Leave a review</h3>
              <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  Your name
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-beige bg-cream px-3 py-2.5 focus:border-gold outline-none"
                  />
                </label>
                <div className="flex flex-col gap-1.5 text-sm">
                  Rating
                  <Stars rating={form.rating} onRate={(n) => setForm({ ...form, rating: n })} size="w-7 h-7" />
                </div>
                <label className="flex flex-col gap-1.5 text-sm">
                  Comment
                  <textarea
                    rows={3}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="border border-beige bg-cream px-3 py-2.5 focus:border-gold outline-none resize-none"
                  />
                </label>
                {error && <p className="text-sm text-gold">{error}</p>}
                <button type="submit" className="bg-coal text-cream py-3 font-semibold tracking-wide hover:bg-gold transition-colors">
                  Post review
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
