import React, { useState, useEffect, useRef } from "react";
import {
  MapPin, ShieldCheck, CheckCircle2, Home, Egg, Plane,
  MessageCircle, Users, ArrowRight, Phone, Menu, X, FileCheck2, Mail,
} from "lucide-react";

const WORDS = ["un terrain.", "vos œufs.", "votre voyage."];

function useCycler(list, interval = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list.length, interval]);
  return list[i];
}

function Stamp({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="stampCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="#D9660B" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#D9660B" strokeWidth="1.5" strokeDasharray="2 4" />
      <text fill="#1F4E79" fontSize="13.5" fontWeight="700" letterSpacing="3">
        <textPath href="#stampCircle" startOffset="2%">
          VÉRIFIÉ AVANT SIGNATURE • LE GUIDE IBRYSS •
        </textPath>
      </text>
      <g transform="translate(100,100)">
        <path d="M -24,-2 L -8,16 L 26,-22" fill="none" stroke="#D9660B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function PillarCard({ icon: Icon, tag, title, desc, points, cta, featured }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={"relative overflow-hidden rounded-2xl border transition-shadow duration-300 " + (featured
          ? "bg-[#1F4E79] border-[#1F4E79] text-white shadow-xl md:col-span-2"
          : "bg-white border-slate-200 text-slate-900 hover:shadow-lg")}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div
            className={"inline-flex items-center justify-center w-12 h-12 rounded-full " + (featured ? "bg-white/15" : "bg-[#EDF2F8]")}
          >
            <Icon className={featured ? "w-6 h-6 text-white" : "w-6 h-6 text-[#1F4E79]"} strokeWidth={2} />
          </div>
          <span
            className={"text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full " + (featured ? "bg-[#D9660B] text-white" : "bg-[#FBEADD] text-[#D9660B]")}
          >
            {tag}
          </span>
        </div>
        <h3 className={"text-2xl md:text-3xl font-bold mb-3 " + (featured ? "text-white" : "text-[#1F4E79]")} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h3>
        <p className={"mb-5 leading-relaxed " + (featured ? "text-white/85" : "text-slate-600")}>{desc}</p>
        <ul className="space-y-2 mb-6">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className={"w-4 h-4 mt-0.5 shrink-0 " + (featured ? "text-[#FFA25B]" : "text-[#D9660B]")} />
              <span className={featured ? "text-white/90" : "text-slate-700"}>{p}</span>
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/2250749946357"
          className={"inline-flex items-center gap-2 font-semibold text-sm rounded-full px-5 py-3 transition-colors " + (featured
              ? "bg-white text-[#1F4E79] hover:bg-[#FBEADD]"
              : "bg-[#1F4E79] text-white hover:bg-[#163b5c]")}
        >
          <MessageCircle className="w-4 h-4" />
          {cta}
        </a>
      </div>
      <div
        className={"absolute -right-4 -bottom-4 transition-all duration-500 " + (hover ? "opacity-100 scale-100 rotate-[-8deg]" : "opacity-0 scale-90 rotate-[-18deg]")}
      >
        <FileCheck2 className={featured ? "w-20 h-20 text-white/10" : "w-20 h-20 text-[#1F4E79]/5"} />
      </div>
    </div>
  );
}

export default function LeGuideIbrysSite() {
  const [navOpen, setNavOpen] = useState(false);
  const word = useCycler(WORDS);
  const marqueeRef = useRef(null);

  const trustLine = [
    "Dossier vérifié avant chaque proposition",
    "Accompagnement juridique dédié",
    "Communauté active en Côte d'Ivoire et dans la diaspora",
    "Transparence sur chaque document",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <style>{
        "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Work+Sans:wght@400;500;600;700&display=swap');" +
        "@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }" +
        ".marquee-track { animation: marquee 28s linear infinite; }" +
        "@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }" +
        ".focus-ring:focus-visible { outline: 3px solid #D9660B; outline-offset: 2px; }"
      }</style>

      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1F4E79] flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span className="font-bold text-[#1F4E79] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              LE GUIDE IBRYSS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#apropos" className="hover:text-[#1F4E79] focus-ring">À propos</a>
            <a href="#terrain" className="hover:text-[#1F4E79] focus-ring">Terrain</a>
            <a href="#alimentaire" className="hover:text-[#1F4E79] focus-ring">Ferme</a>
            <a href="#voyage" className="hover:text-[#1F4E79] focus-ring">Voyage</a>
            <a href="#communaute" className="hover:text-[#1F4E79] focus-ring">Communauté</a>
            <a href="#contact" className="hover:text-[#1F4E79] focus-ring">Contact</a>
          </nav>
          <a
            href="https://wa.me/2250749946357"
            className="hidden md:inline-flex items-center gap-2 bg-[#D9660B] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:bg-[#c05a09] transition-colors focus-ring"
          >
            <MessageCircle className="w-4 h-4" /> 07 49 94 63 57
          </a>
          <button
            className="md:hidden text-[#1F4E79] focus-ring"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-slate-100 px-5 py-4 flex flex-col gap-4 text-sm font-medium text-slate-700">
            <a href="#apropos" onClick={() => setNavOpen(false)}>À propos</a>
            <a href="#terrain" onClick={() => setNavOpen(false)}>Terrain</a>
            <a href="#alimentaire" onClick={() => setNavOpen(false)}>Ferme</a>
            <a href="#voyage" onClick={() => setNavOpen(false)}>Voyage</a>
            <a href="#communaute" onClick={() => setNavOpen(false)}>Communauté</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
            <a href="https://wa.me/2250749946357" className="inline-flex items-center gap-2 bg-[#D9660B] text-white rounded-full px-4 py-2.5 w-fit">
              <MessageCircle className="w-4 h-4" /> 07 49 94 63 57
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E79] via-[#1F4E79] to-[#173d5f]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9660B]/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <p className="text-[#FFB578] font-semibold tracking-widest text-xs uppercase mb-4">
              Découvrez une nouvelle façon d'acheter
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tout savoir avant d'acheter
              <br />
              <span className="text-[#FFB578]">{word}</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
              Les conseils qui protègent avant de signer, où que ce soit et quoi que ce soit,
              chez nous et partout ailleurs. Votre allié pour un investissement sûr et rentable,
              en Côte d'Ivoire comme dans la diaspora.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/2250749946357"
                className="inline-flex items-center gap-2 bg-[#D9660B] text-white font-semibold rounded-full px-6 py-3.5 hover:bg-[#c05a09] transition-colors focus-ring"
              >
                <MessageCircle className="w-4.5 h-4.5" /> Écrire sur WhatsApp
              </a>
              <a
                href="#terrain"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold rounded-full px-6 py-3.5 border border-white/25 hover:bg-white/20 transition-colors focus-ring"
              >
                Découvrir les offres <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <Stamp className="w-64 h-64 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="border-y border-slate-100 bg-[#F7FAFD] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track" ref={marqueeRef}>
          {[...trustLine, ...trustLine].map((t, idx) => (
            <span key={idx} className="flex items-center gap-2 text-sm font-medium text-[#1F4E79] mx-8">
              <ShieldCheck className="w-4 h-4 text-[#D9660B]" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="apropos" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Qui sommes-nous</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F4E79] mt-3 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              L'allié qui protège avant de vendre
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Le Guide IBRYSS est né sur le terrain, au sein d'IBRYSS GROUP HOLDING, un groupe
              ivoirien qui bâtit depuis plusieurs années dans l'immobilier, l'élevage, le voyage
              et la construction. Ce qui revenait sans cesse dans les échanges avec les clients,
              c'était le même regret : avoir manqué une information simple avant de signer.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Ce guide existe pour combler cet écart. Chaque conseil publié vient du terrain,
              vérifié avant d'être partagé, et appuyé si besoin par un accompagnement juridique
              dédié. Pas de promesse en l'air, seulement ce qu'il faut savoir avant d'acheter.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              La force d'une marque, c'est sa communauté. C'est pour ça que ce n'est pas une
              vitrine institutionnelle : c'est un espace pensé pour informer d'abord, ici en
              Côte d'Ivoire comme dans la diaspora, et vendre en toute confiance ensuite.
            </p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="w-14 h-14 rounded-full bg-[#1F4E79] flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                SD
              </div>
              <div>
                <p className="font-semibold text-[#1F4E79]">Seny David</p>
                <p className="text-sm text-slate-500">Responsable Commercial & Marketing, IBRYSS GROUP HOLDING</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: ShieldCheck, title: "Sécurité", desc: "Chaque dossier est vérifié avant d'être proposé, jamais l'inverse." },
              { icon: FileCheck2, title: "Transparence", desc: "Les documents, les prix et les délais réels, sans zone d'ombre." },
              { icon: Users, title: "Communauté", desc: "Un espace qui informe d'abord, en Côte d'Ivoire et dans la diaspora." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-[#F7FAFD] rounded-2xl p-5 border border-slate-100">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-[#D9660B]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F4E79]">{title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
            <blockquote className="mt-2 border-l-4 border-[#D9660B] pl-5 py-1 text-[#1F4E79] font-medium italic">
              « Avec nous, vous ne souscrivez pas à une offre. Vous achetez la tranquillité, la sécurité et la transparence. »
            </blockquote>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 bg-[#F7FAFD]">
        <div className="max-w-2xl mb-12">
          <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Nos trois piliers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F4E79] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Un achat impeccable, secteur par secteur
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div id="terrain">
            <PillarCard
              featured
              icon={Home}
              tag="Priorité du mois"
              title="Immobilier — Terrain"
              desc="Des lots vérifiés, documentés et accompagnés jusqu'au titre, dans les zones en développement autour de Bouaké et Abidjan."
              points={[
                "Reçu d'achat, contrat de vente, extrait topographique",
                "Attestation villageoise avec enregistrement",
                "Sites viabilisés et électrifiés",
              ]}
              cta="Écrire TERRAIN"
            />
          </div>
          <div id="alimentaire">
            <PillarCard
              icon={Egg}
              tag="Ferme"
              title="Alimentaire"
              desc="Des œufs livrés directement de la ferme au syndic de votre immeuble, sans intermédiaire ni surprise sur le prix."
              points={["Traçabilité de la ferme à la livraison", "Prix syndic sans intermédiaire"]}
              cta="Écrire OEUF"
            />
          </div>
          <div id="voyage">
            <PillarCard
              icon={Plane}
              tag="Voyage"
              title="Billets & bourses d'études"
              desc="Un accompagnement honnête sur les délais réels et les dossiers, billets d'avion et bourses d'études à l'étranger."
              points={["Aucune promesse de délai garanti", "Vérification du dossier avant dépôt"]}
              cta="Écrire VISA"
            />
          </div>
        </div>
      </section>

      {/* FEATURED LISTING */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <span className="text-[#D9660B] font-bold tracking-widest text-xs uppercase">Offre du moment</span>
            <h2 className="text-3xl font-bold text-[#1F4E79] mt-3 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Terrain à vendre — Kondoubo
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Diabo, à 5 km de Bouaké, route de Diabo, juste après l'échangeur, derrière l'usine
              d'anacarde. Lots de 500 m², dans le corridor de développement du PND 2026-2030.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
              <MapPin className="w-4 h-4 text-[#D9660B]" /> Bouaké, Kondoubo — Diabo
            </div>
            <a
              href="https://wa.me/2250749946357"
              className="inline-flex items-center gap-2 bg-[#1F4E79] text-white font-semibold rounded-full px-6 py-3.5 hover:bg-[#163b5c] transition-colors focus-ring"
            >
              <MessageCircle className="w-4.5 h-4.5" /> Demander les infos
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="flex justify-between items-baseline pb-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500">Paiement cash</span>
              <span className="text-2xl font-bold text-[#1F4E79]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1 000 000 FCFA</span>
            </div>
            <div className="flex justify-between items-baseline py-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-500">Paiement échelonné</span>
              <span className="text-2xl font-bold text-[#D9660B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1 500 000 FCFA</span>
            </div>
            <p className="text-xs text-slate-400 pt-3">Échelonné sur 6 mois après un apport initial de 750 000 FCFA.</p>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="communaute" className="max-w-6xl mx-auto px-5 md:px-8 py-20 text-center">
        <Users className="w-10 h-10 text-[#D9660B] mx-auto mb-5" />
        <h2 className="text-3xl font-bold text-[#1F4E79] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Rejoignez la communauté
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-8">
          En Côte d'Ivoire ou dans la diaspora, suivez Le Guide IBRYSS pour ne rien manquer des
          prochains conseils, avant vos prochains achats.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-sm text-[#1F4E79] hover:bg-[#F7FAFD] transition-colors">
            Facebook — Le Guide IBRYSS
          </a>
          <a href="#" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-sm text-[#1F4E79] hover:bg-[#F7FAFD] transition-colors">
            TikTok — @leguideibryss
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="bg-[#1F4E79] rounded-3xl px-8 py-14 md:px-16 md:py-16 text-center relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#D9660B]/15 blur-3xl" />
          <span className="text-[#FFB578] font-bold tracking-widest text-xs uppercase relative">Un seul contact, toutes les réponses</span>
          <h2 className="text-white text-3xl md:text-4xl font-bold mt-3 mb-8 relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Écrivez-nous, on vous répond vite
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto relative">
            <a
              href="https://wa.me/2250749946357"
              className="flex items-center justify-center gap-2 bg-[#D9660B] text-white font-semibold rounded-full px-6 py-4 hover:bg-[#c05a09] transition-colors focus-ring"
            >
              <MessageCircle className="w-4.5 h-4.5" /> 07 49 94 63 57
            </a>
            <a
              href="mailto:leguideibryss@gmail.com"
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold rounded-full px-6 py-4 border border-white/25 hover:bg-white/20 transition-colors focus-ring"
            >
              <Mail className="w-4.5 h-4.5" /> leguideibryss@gmail.com
            </a>
          </div>
          <p className="text-white/60 text-sm mt-6 relative">
            Le 07 49 94 63 57 est aussi notre numéro WhatsApp Business, un seul contact pour tout.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#122E47] text-white/80">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LE GUIDE IBRYSS</span>
            <p className="mt-3 text-white/60 leading-relaxed">Tout savoir pour un achat impeccable.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Contact</p>
            <p className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4" /> 07 49 94 63 57 (WhatsApp Business)</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> leguideibryss@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Agences</p>
            <p className="mb-1">Abidjan : 27 22 35 36 46</p>
            <p>Bouaké : 27 22 35 36 46</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} IBRYSS GROUP HOLDING SARL — Le Guide IBRYSS
        </div>
      </footer>
    </div>
  );
}
