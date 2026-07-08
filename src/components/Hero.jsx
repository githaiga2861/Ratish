import { motion } from "framer-motion";
import { Wordmark } from "./Brand";
import { CarvedCup } from "./Vessels";

export default function Hero() {
  return (
    <header
      className="relative min-h-[92vh] flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(168deg, #1c1712 0%, #3a2c1a 34%, #96793e 62%, #e8d09e 84%, #fdf8ea 100%)",
      }}
    >
      {/* faint carved band across the dark field */}
      <svg
        className="absolute top-24 left-0 w-full h-8 text-gold-soft/20"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <path key={i} d={`M${i * 30} 20 l9 -14 l9 14 Z`} stroke="currentColor" strokeWidth="1" fill="none" />
        ))}
      </svg>

      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-7 text-cream">
        <Wordmark />
        <a
          href="#pour"
          className="hidden sm:inline-block text-sm tracking-[0.2em] uppercase border border-gold-soft/60 text-gold-soft px-5 py-2.5 hover:bg-gold-soft hover:text-coal transition-colors"
        >
          Order now
        </a>
      </div>

      <div className="relative z-10 flex-1 grid lg:grid-cols-2 items-center gap-10 px-6 sm:px-10 pb-16 pt-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-cream"
        >
          <p className="text-gold-soft tracking-[0.3em] uppercase text-xs mb-6">
            Naturally fermented Muratina
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.04] font-medium">
            Muratina.
            <br />
            Crafted with tradition.
          </h1>
          <p className="mt-6 max-w-md text-cream/80 text-lg">
            Pale, delicate, and alive — drawn from the sausage-tree fruit the way it has been for generations.
          </p>
          <a
            href="#pour"
            className="mt-10 inline-block bg-gold-soft text-coal font-semibold tracking-wide px-9 py-4 hover:bg-cream transition-colors"
          >
            Order now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          className="justify-self-center"
        >
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(240,223,196,0.28), transparent)" }}
              aria-hidden="true"
            />
            <CarvedCup className="relative w-64 sm:w-80 lg:w-96 drop-shadow-2xl" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
