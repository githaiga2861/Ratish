import { motion } from "framer-motion";
import { GourdDivider } from "./Brand";
import { GalleryVessel } from "./Vessels";
import { PRODUCTS, formatKES, useCart } from "../lib/store";

const VARIANTS = { ml500: "flask", l1: "bottle", l5: "jerry", l20: "keg" };

export default function Gallery({ onPreset }) {
  const cart = useCart();

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
      <GourdDivider />
      <h2 className="text-center text-4xl sm:text-5xl font-medium mt-4">The collection</h2>
      <p className="text-center mt-3 text-ink/70">Four sizes, one batch, the same pale pour.</p>

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {PRODUCTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="bg-ivory border border-sand flex flex-col"
          >
            <div className="p-6 sm:p-8 bg-gradient-to-b from-sand/40 to-ivory">
              <GalleryVessel variant={VARIANTS[p.id]} className="w-full h-40 sm:h-48" />
            </div>
            <div className="px-5 pb-5 flex-1 flex flex-col">
              <h3 className="font-medium text-xl">{p.label}</h3>
              <p className="text-gold font-semibold mt-1 tabular-nums">{formatKES(p.price)}</p>
              <div className="mt-4 flex flex-col gap-2 mt-auto pt-4">
                <button
                  onClick={() =>
                    cart.add({ label: p.label, liters: p.liters, price: p.price })
                  }
                  className="bg-coal text-cream py-2.5 text-sm font-semibold tracking-wide hover:bg-gold transition-colors"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    onPreset(p.liters);
                    document.getElementById("pour")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-beige py-2.5 text-sm tracking-wide hover:border-gold transition-colors"
                >
                  Pour this size
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
