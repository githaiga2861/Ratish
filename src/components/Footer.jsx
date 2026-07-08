import { Wordmark } from "./Brand";
import { WhatsAppIcon } from "./Icons";
import { WHATSAPP_NUMBER } from "../lib/store";

export default function Footer() {
  const display = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`;
  return (
    <footer className="bg-coal text-cream">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 flex flex-col items-center gap-6 text-center">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-lg font-semibold text-gold-soft hover:text-cream transition-colors"
        >
          <WhatsAppIcon className="w-7 h-7" />
          {display}
        </a>
        <Wordmark className="text-cream" />
        <p className="text-sm text-cream/60">
          © {new Date().getFullYear()} Ratish. Muratina, poured the way it has always been.
        </p>
      </div>
    </footer>
  );
}
