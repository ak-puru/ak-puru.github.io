import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionIds = useMemo(() => NAV.map((n) => n.id), []);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-15% 0px -70% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <BackgroundGlow />

      <Navbar
        active={active}
        onNav={(id) => {
          setMenuOpen(false);
          scrollToId(id);
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <Hero
          onPrimary={() => scrollToId("projects")}
          onSecondary={() => scrollToId("contact")}
        />

        <Section id="about" title="About">
          <div className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
            <Reveal>
              <p className="text-zinc-300 leading-relaxed">
                I’m a Computer & Software Engineering (Co-op) student who likes building
                practical automation and clean UIs. Recently, I built Flask APIs that
                turn PDF transcripts into structured Minutes of Meeting and export-ready
                Word/Excel documents using LLMs — and I enjoy polishing projects until
                they feel production-ready.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Tailwind", "Framer Motion", "Flask", "APIs", "Automation", "Postman"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm text-zinc-400">Highlights</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                  <li>• Built an LLM-powered MOM automation pipeline (Flask + exports)</li>
                  <li>• Automated structured extraction into internal Excel templates</li>
                  <li>• Iterate with QA/testing to improve reliability and output quality</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-4 md:grid-cols-2">
            <ProjectCard
              title="Eventure"
              subtitle="Java • Android Studio • Firebase"
              body="Android event management app with real-time creation and registration backed by Firebase authentication and cloud database services"
              tags={["Java", "App", "Firebase", "Androis Studio"]}
            />
            <ProjectCard
              title="Automated MOM Generator"
              subtitle="Flask • Postman • ChatGPT API • Word/Excel"
              body="Converts PDF transcripts into structured minutes and export-ready documents."
              tags={["API", "Automation", "Docs Export"]}
            />
            <ProjectCard
              title="Emoji Selector"
              subtitle="SwiftUI • iOS"
              body="UI-focused iOS app that lets users select and display emoji cleanly."
              tags={["UI/UX", "SwiftUI", "Mobile"]}
              github="https://github.com/ak-puru/EmojiSelector"
            />
            <ProjectCard
              title="Wordl"
              subtitle="C • CLI"
              body="Wordle-style word guessing game with color-coded feedback and input validation."
              tags={["C", "CLI", "Logic"]}
              github="https://github.com/ak-puru/Wordl"
            />
            <ProjectCard
              title="Conway’s Game of Life"
              subtitle="C++ • Simulation"
              body="Cellular automata simulation with stepping controls and dynamic updates."
              tags={["C++", "Simulation", "State"]}
            />
          </div>

          <div className="mt-6 text-sm text-zinc-400">
            Tip: add screenshots later in <span className="text-zinc-200">/public/projects</span>.
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-4">
            <TimelineItem
              role="AI Process & Automation Intern"
              where="NTWIST • June 2025 - August 2025"
              bullets={[
                "Built Flask API to generate MOMs from PDFs with Word/Excel outputs using LLMs",
                "Automated extraction into internal Excel (AID) templates from AI-generated summaries",
                "Tested endpoints and refined outputs with Postman and QA iteration",
              ]}
            />
            <TimelineItem
              role="Student Intern — Project Management"
              where="Linkbuffer Studios • Feb 2025 – May 2025"
              bullets={[
                "Created flowcharts, wireframes, and a project description for a mobile app",
                "Self-taught Swift, Dart, and Flutter to prototype UI components",
                "Streamlined documentation and reporting workflows using Excel",
              ]}
            />
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-[1fr,1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-zinc-400">Let’s connect</div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  Want to chat about an internship or a project?
                </div>
                <div className="mt-3 text-sm text-zinc-300">
                  I’m open to software, automation, and AI-adjacent roles.
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <LinkButton href="public/ResumeAkhshraPuru.pdf" label="Resume PDF" />
                  <LinkButton href="https://github.com/ak-puru" label="GitHub" external />
                  <LinkButton
                    href="https://www.linkedin.com/in/akhshrapuru/"
                    label="LinkedIn"s
                    external
                  />
                  <LinkButton href="mailto:akhshrapuru@gmail.com" label="Email" />
                  <LinkButton href="tel:+17802009214" label="Call" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-zinc-400">Now playing</div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  A clean UI, smooth transitions, and real projects.
                </div>
                <div className="mt-3 text-sm text-zinc-300">
                  Next upgrades: project modals, scroll progress bar, and case-study pages.
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium hover:bg-white/10"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>

      <Footer />

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            active={active}
            onClose={() => setMenuOpen(false)}
            onNav={(id) => {
              setMenuOpen(false);
              scrollToId(id);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ active, onNav, menuOpen, setMenuOpen }) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="inline-block size-2 rounded-full bg-white/70 group-hover:bg-white" />
          Akhshra Puru
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={[
                "relative text-sm transition",
                active === n.id ? "text-white" : "text-zinc-400 hover:text-zinc-200",
              ].join(" ")}
            >
              {n.label}
              {active === n.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 mx-auto h-px w-8 bg-white/70"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNav("contact")}
            className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 md:inline-flex"
          >
            Contact
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ active, onClose, onNav }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      <motion.div
        className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-zinc-950 p-5"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center justify-between">
          <div className="font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={[
                "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                active === n.id
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
              ].join(" ")}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="mt-6 text-xs text-zinc-500">
          Tip: press <span className="text-zinc-300">Esc</span> to close.
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero({ onPrimary, onSecondary }) {
  return (
    <header className="relative pt-16 pb-10">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          <span className="inline-block size-2 rounded-full bg-white/70" />
          React • Tailwind • Motion
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
          Akhshra Puru
        </h1>

        <p className="mt-5 max-w-2xl text-zinc-300">
          4th Year Computer & Software Engineering Student (Co-op)
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onPrimary}
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 hover:opacity-90"
          >
            View Projects
          </button>
          <button
            onClick={onSecondary}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium hover:bg-white/10"
          >
            Contact
          </button>
        </div>
      </Reveal>
    </header>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-10 scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ title, subtitle, body, tags, github }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.13),transparent_55%)]" />
      </div>

      <div className="relative">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium">{title}</h3>
          <span className="text-xs text-zinc-400">{subtitle}</span>
        </div>

        <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{body}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200"
            >
              {t}
            </span>
          ))}
        </div>

        {github && (
          <div className="mt-4">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
            >
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TimelineItem({ role, where, bullets }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-medium">{role}</h3>
        <span className="text-xs text-zinc-400">{where}</span>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function LinkButton({ href, label, external }) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-zinc-400">
        Built with React, Tailwind, and Framer Motion • Hosted on GitHub Pages
      </div>
    </footer>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-18rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[-12rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-white/5 blur-3xl" />
    </div>
  );
}
