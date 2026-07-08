import { useState, useCallback } from "react";
import { CartProvider } from "./lib/store";
import Hero from "./components/Hero";
import PourModule from "./components/PourModule";
import Gallery from "./components/Gallery";
import TrustBadges from "./components/TrustBadges";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

export default function App() {
  const [preset, setPreset] = useState(null);
  const consumePreset = useCallback(() => setPreset(null), []);

  return (
    <CartProvider>
      <Cart />
      <Hero />
      <main>
        <PourModule preset={preset} onPresetConsumed={consumePreset} />
        <Gallery onPreset={setPreset} />
        <TrustBadges />
        <Reviews />
      </main>
      <Footer />
    </CartProvider>
  );
}
