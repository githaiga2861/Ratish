import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Pour2D from "./Pour2D";
import { CartIcon, TapIcon, ArrowBendIcon, DragHandleIcon } from "./Icons";
import { GourdDivider } from "./Brand";
import { priceForLiters, formatKES, useCart, PRICE_PER_LITER } from "../lib/store";

const Pour3D = lazy(() => import("./Pour3D"));

const SOURCE_LITERS = 20;
const POUR_RATE = 1.4; // liters per second

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

const STEPS = [
  "1. Open the tap",
  "2. Stop when full",
  "3. Drag your container to the cart",
  "4. Checkout",
];

export default function PourModule({ preset, onPresetConsumed }) {
  const cart = useCart();
  const [webgl] = useState(supportsWebGL);
  const [liteMode, setLiteMode] = useState(false);

  const [capacity, setCapacity] = useState(5);
  const [liters, setLiters] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | pouring | stopped | dropped
  const [justAdded, setJustAdded] = useState(false);

  // refs mirrored for the rAF loop and the 3D scene
  const litersRef = useRef(0);
  const pouringRef = useRef(false);
  const rafRef = useRef(null);
  const cartZoneRef = useRef(null);
  const [overCart, setOverCart] = useState(false);

  // Gallery presets land here
  useEffect(() => {
    if (preset == null) return;
    setCapacity(preset);
    setLiters(0);
    litersRef.current = 0;
    setPhase("idle");
    onPresetConsumed?.();
  }, [preset, onPresetConsumed]);

  useEffect(() => {
    pouringRef.current = phase === "pouring";
    if (phase !== "pouring") {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      const next = Math.min(litersRef.current + dt * POUR_RATE, capacity);
      litersRef.current = next;
      setLiters(next);
      if (next >= capacity) {
        setPhase("stopped");
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, capacity]);

  const toggleTap = () => {
    if (phase === "pouring") setPhase("stopped");
    else if (phase === "idle" || phase === "stopped") {
      if (litersRef.current >= capacity) return;
      setPhase("pouring");
    }
  };

  const resetPour = () => {
    litersRef.current = 0;
    setLiters(0);
    setPhase("idle");
  };

  const handleDrag = (_e, info) => {
    setOverCart(pointInCartZone(info.point));
  };

  const pointInCartZone = (point) => {
    const el = cartZoneRef.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const x = point.x - window.scrollX;
    const y = point.y - window.scrollY;
    return x >= r.left - 20 && x <= r.right + 20 && y >= r.top - 20 && y <= r.bottom + 20;
  };

  const handleDragEnd = (_e, info) => {
    if (pointInCartZone(info.point)) {
      const l = Math.round(litersRef.current * 10) / 10;
      cart.add({ label: `Poured ${l.toFixed(1)} L`, liters: l, price: priceForLiters(l) });
      setPhase("dropped");
      setJustAdded(true);
      setOverCart(false);
      setTimeout(() => {
        setJustAdded(false);
        resetPour();
      }, 900);
    } else {
      setOverCart(false);
    }
  };

  const price = priceForLiters(liters);
  const use3D = webgl && !liteMode;
  const canDrag = phase === "stopped" && liters > 0.05;

  const capacities = useMemo(() => [0.5, 1, 5, 20], []);

  return (
    <section id="pour" className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
      <GourdDivider />
      <h2 className="text-center text-4xl sm:text-5xl font-medium mt-4">Pour your order</h2>
      <p className="text-center mt-3 text-ink/70">
        Draw straight from the 20L reserve. {formatKES(PRICE_PER_LITER)} per litre.
      </p>

      {/* Persistent instruction strip — plain numbered text, nothing else */}
      <div className="mt-8 border-y border-gold/30 py-3 flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm tracking-wide text-ink/80">
        {STEPS.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      {/* capacity presets */}
      <div className="mt-8 flex justify-center gap-2 flex-wrap" role="group" aria-label="Container size">
        {capacities.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCapacity(c);
              resetPour();
            }}
            className={`px-5 py-2 text-sm tracking-wide border transition-colors ${
              capacity === c
                ? "bg-coal text-cream border-coal"
                : "border-beige text-ink hover:border-gold"
            }`}
          >
            {c < 1 ? `${c * 1000} ml` : `${c} L`}
          </button>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_300px] gap-10 items-stretch">
        {/* Scene */}
        <div className="relative bg-ivory border border-sand rounded-sm min-h-[420px] sm:min-h-[520px] overflow-hidden">
          {use3D ? (
            <Suspense fallback={<Pour2D liters={liters} pouring={false} capacity={capacity} sourceLiters={SOURCE_LITERS} onTap={toggleTap} />}>
              <Pour3D
                litersRef={litersRef}
                pouringRef={pouringRef}
                capacity={capacity}
                sourceLiters={SOURCE_LITERS}
                onTap={toggleTap}
              />
            </Suspense>
          ) : (
            <div className="absolute inset-0 p-6">
              <Pour2D
                liters={liters}
                pouring={phase === "pouring"}
                capacity={capacity}
                sourceLiters={SOURCE_LITERS}
                onTap={toggleTap}
              />
            </div>
          )}

          {/* tap tooltip */}
          <AnimatePresence>
            {phase === "idle" && liters === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-6 left-6 flex items-center gap-2 text-ink/80 text-sm bg-cream/90 border border-sand px-3 py-2"
              >
                <ArrowBendIcon className="w-6 h-6 text-gold" />
                Click the tap to start pouring
              </motion.div>
            )}
          </AnimatePresence>

          {/* live counter next to the receiving container */}
          <div className="absolute bottom-6 left-6 sm:left-8">
            <p className="text-xs tracking-[0.25em] uppercase text-ink/50">In your container</p>
            <p className="font-display text-4xl sm:text-5xl text-coal tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
              {liters.toFixed(1)}
              <span className="text-xl ml-1 text-gold">L</span>
            </p>
            <p className="text-sm text-ink/70 tabular-nums">{formatKES(price)}</p>
          </div>

          {/* tap / stop control */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
            <button
              onClick={toggleTap}
              className={`flex items-center gap-2 px-6 py-3 font-semibold tracking-wide transition-colors ${
                phase === "pouring"
                  ? "bg-coal text-cream hover:bg-ink"
                  : "bg-gold text-ivory hover:bg-coal"
              }`}
            >
              <TapIcon className="w-5 h-5" />
              {phase === "pouring" ? "Stop" : liters > 0 ? "Pour again" : "Open the tap"}
            </button>
            {liters > 0 && phase !== "pouring" && (
              <button onClick={resetPour} className="text-xs underline text-ink/60 hover:text-ink">
                Empty and start over
              </button>
            )}
            {webgl && (
              <button
                onClick={() => setLiteMode((v) => !v)}
                className="text-xs text-ink/40 hover:text-ink/70"
              >
                {liteMode ? "Use 3D view" : "Use lite view"}
              </button>
            )}
          </div>
        </div>

        {/* Cart zone + draggable container */}
        <div className="flex flex-col gap-6">
          <div
            ref={cartZoneRef}
            className={`flex-1 min-h-[220px] border-2 border-dashed rounded-sm flex flex-col items-center justify-center gap-3 transition-colors ${
              overCart ? "border-gold bg-sand/60" : canDrag ? "border-gold/60 bg-ivory" : "border-beige bg-ivory/60"
            }`}
            aria-label="Cart drop zone"
          >
            <CartIcon className={`w-10 h-10 ${overCart ? "text-gold" : "text-ink/50"}`} />
            <p className="text-sm tracking-wide text-ink/70 text-center px-4">
              {canDrag ? "Drop your container here" : "Your cart zone"}
            </p>
            <AnimatePresence>
              {justAdded && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="text-gold font-semibold"
                >
                  Added to cart
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-xs text-ink/50">
              {cart.count} item{cart.count === 1 ? "" : "s"} · {formatKES(cart.total)}
            </p>
          </div>

          {/* Draggable filled container */}
          <AnimatePresence>
            {canDrag && (
              <motion.div
                key="filled"
                drag
                dragSnapToOrigin={!overCart}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileDrag={{ scale: 1.06, zIndex: 40 }}
                className="cursor-grab active:cursor-grabbing select-none bg-ivory border border-gold/50 shadow-lg px-5 py-4 flex items-center gap-4 touch-none"
              >
                <svg viewBox="0 0 40 52" className="w-9 h-12" aria-hidden="true">
                  <path d="M6 8h28l-3 38a5 5 0 0 1-5 4H14a5 5 0 0 1-5-4L6 8Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2" />
                  <path d="M9 22h22l-1.8 24a4 4 0 0 1-4 3H14.8a4 4 0 0 1-4-3L9 22Z" fill="#E2C39E" opacity="0.75" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-coal tabular-nums">{liters.toFixed(1)} L poured</p>
                  <p className="text-sm text-ink/60 tabular-nums">{formatKES(price)}</p>
                </div>
                <DragHandleIcon className="w-5 h-5 text-gold" />
              </motion.div>
            )}
          </AnimatePresence>
          {canDrag && (
            <p className="text-xs text-ink/50 text-center -mt-3">Drag this container into the cart zone</p>
          )}
        </div>
      </div>
    </section>
  );
}
