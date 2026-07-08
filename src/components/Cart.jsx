import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import { formatKES, useCart, WHATSAPP_NUMBER } from "../lib/store";

function buildWhatsAppLink(items, total, form) {
  const lines = [
    "Hello Ratish, I would like to order:",
    ...items.map((it) => `- ${it.label} — ${formatKES(it.price)}`),
    `Total: ${formatKES(total)}`,
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Delivery address: ${form.address}`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function Cart() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const startCheckout = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Fill in your name, phone, and delivery address to send the order.");
      return;
    }
    window.open(buildWhatsAppLink(cart.items, cart.total, form), "_blank", "noopener");
    setError("");
  };

  return (
    <>
      {/* floating cart button */}
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open cart, ${cart.count} items`}
        className="fixed z-40 bottom-5 right-5 bg-coal text-cream px-4 py-3 flex items-center gap-2.5 shadow-lg hover:bg-gold transition-colors"
      >
        <CartIcon className="w-5 h-5" />
        <span className="text-sm font-semibold tabular-nums">
          {cart.count} · {formatKES(cart.total)}
        </span>
      </button>

      
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed z-40 bottom-5 left-5 bg-gold text-ivory p-3.5 rounded-full shadow-lg hover:bg-coal transition-colors"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-coal/60 flex justify-end"
            onClick={() => {
              setOpen(false);
              setCheckout(false);
            }}
          >
            <motion.aside
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory w-full max-w-md h-full overflow-y-auto p-7 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Your cart"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium">Your cart</h3>
                <button
                  onClick={() => {
                    setOpen(false);
                    setCheckout(false);
                  }}
                  aria-label="Close cart"
                  className="text-ink/60 hover:text-ink"
                >
                  <CloseIcon />
                </button>
              </div>

              {cart.count === 0 ? (
                <p className="mt-10 text-ink/60">
                  Nothing here yet. Open the tap and pour your first container.
                </p>
              ) : (
                <ul className="mt-6 flex flex-col divide-y divide-sand">
                  {cart.items.map((it) => (
                    <li key={it.key} className="py-3.5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{it.label}</p>
                        <p className="text-sm text-ink/60 tabular-nums">{formatKES(it.price)}</p>
                      </div>
                      <button
                        onClick={() => cart.remove(it.key)}
                        className="text-xs underline text-ink/50 hover:text-ink"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {cart.count > 0 && (
                <div className="mt-auto pt-6 border-t border-sand">
                  <div className="flex justify-between font-semibold text-lg tabular-nums">
                    <span>Total</span>
                    <span>{formatKES(cart.total)}</span>
                  </div>

                  {!checkout ? (
                    <button
                      onClick={() => setCheckout(true)}
                      className="mt-5 w-full bg-coal text-cream py-3.5 font-semibold tracking-wide hover:bg-gold transition-colors"
                    >
                      Checkout
                    </button>
                  ) : (
                    <form onSubmit={startCheckout} className="mt-5 flex flex-col gap-3">
                      <input
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border border-beige bg-cream px-3 py-2.5 focus:border-gold outline-none"
                      />
                      <input
                        placeholder="Phone number"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="border border-beige bg-cream px-3 py-2.5 focus:border-gold outline-none"
                      />
                      <textarea
                        placeholder="Delivery address"
                        rows={2}
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="border border-beige bg-cream px-3 py-2.5 focus:border-gold outline-none resize-none"
                      />
                      {error && <p className="text-sm text-gold">{error}</p>}
                      <button
                        type="submit"
                        className="w-full bg-gold text-ivory py-3.5 font-semibold tracking-wide hover:bg-coal transition-colors flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-5 h-5" />
                        Send order on WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={cart.clear}
                        className="text-xs underline text-ink/50 hover:text-ink"
                      >
                        Clear cart
                      </button>
                    </form>
                  )}
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
