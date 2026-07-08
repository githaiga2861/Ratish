import {
  BadgeRegistered,
  BadgeCertified,
  BadgeFermented,
  BadgeHandcrafted,
} from "./Icons";

const BADGES = [
  { Icon: BadgeRegistered, label: "Registered Brand" },
  { Icon: BadgeCertified, label: "Certified Authentic" },
  { Icon: BadgeFermented, label: "Naturally Fermented" },
  { Icon: BadgeHandcrafted, label: "Handcrafted in Kenya" },
];

export default function TrustBadges() {
  return (
    <section className="bg-coal text-cream">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {BADGES.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col sm:flex-row items-center gap-3 justify-center text-center sm:text-left">
            <Icon className="w-10 h-10 text-gold-soft shrink-0" />
            <span className="text-sm tracking-wide text-cream/90">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
