import { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { Category, Project, projects } from './data/projects';
import { LearningIcon, LearningItem, learning } from './data/learning';

const PRIMARY_TEXT = '#E1E0CC';
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CARD_EASE = [0.22, 1, 0.36, 1] as const;
const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4';

const filters: Array<'All' | Category> = [
  'All',
  'Marketing Project',
  'Automation',
  'Web App / Website',
];

const categoryColors: Record<Category, string> = {
  'Marketing Project': '#DEDBC8',
  Automation: '#A8B89C',
  'Web App / Website': '#9CA8B8',
};

const categoryIcons: Record<Category, typeof BarChart3> = {
  'Marketing Project': BarChart3,
  Automation: Workflow,
  'Web App / Website': Code2,
};

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

interface StyledSegment {
  text: string;
  className?: string;
}

function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ').filter(Boolean);

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-flex ${
            showAsterisk && index === words.length - 1 ? 'overflow-visible pr-[0.18em]' : 'overflow-hidden'
          } ${index === words.length - 1 ? '' : 'mr-[0.16em]'}`}
        >
          <motion.span
            className="relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: index * 0.08, ease: EASE_OUT }}
          >
            {word}
            {showAsterisk && index === words.length - 1 ? (
              <sup className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">
                *
              </sup>
            ) : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className = '',
}: {
  segments: StyledSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = segments.flatMap((segment, segmentIndex) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({
        word,
        segmentIndex,
        className: segment.className ?? '',
      })),
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map(({ word, segmentIndex, className: wordClassName }, index) => (
        <span
          key={`${segmentIndex}-${word}-${index}`}
          className={`inline-flex overflow-hidden ${index === words.length - 1 ? '' : 'mr-[0.18em]'}`}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.82, delay: index * 0.08, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedLetter({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const characters = Array.from(text);

  return (
    <p ref={ref} className={className}>
      {characters.map((character, index) => (
        <ScrollCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          progress={scrollYProgress}
          totalChars={characters.length}
        />
      ))}
    </p>
  );
}

function ScrollCharacter({
  character,
  index,
  progress,
  totalChars,
}: {
  character: string;
  index: number;
  progress: MotionValue<number>;
  totalChars: number;
}) {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.42, 1],
  );

  return <motion.span style={{ opacity }}>{character}</motion.span>;
}

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: 'Work', href: '#work', active: true },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section className="relative bg-black px-3 pb-0 pt-3 md:min-h-[100dvh] md:p-6">
      <div className="relative isolate min-h-[76dvh] overflow-hidden rounded-2xl bg-black sm:min-h-[82dvh] md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem]">
        <div className="ambient-gradient absolute inset-0 opacity-70" aria-hidden="true" />
        <video
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80 md:object-[42%_center] lg:object-[36%_center] xl:object-[32%_center]"
          src={BG_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div
          className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(222,219,200,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.78))]"
          aria-hidden="true"
        />

        <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-center px-4 py-4 sm:px-6 md:px-8">
          <div className="liquid-glass hidden items-center gap-1 rounded-2xl px-2 py-2 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  link.active ? 'bg-primary/15 text-primary' : 'text-primary/65 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="liquid-glass ml-auto rounded-xl p-2 text-primary transition-colors hover:bg-white/5 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="liquid-glass absolute left-4 right-4 top-[72px] z-30 flex flex-col gap-1 rounded-2xl p-4 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  link.active ? 'bg-primary/15 text-primary' : 'text-primary/70 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="absolute bottom-[clamp(2rem,6dvh,4rem)] left-0 right-0 p-4 sm:bottom-[clamp(3rem,8dvh,5.5rem)] sm:p-6 md:bottom-0 md:p-8 lg:p-10">
          <div className="min-w-0 max-w-[46rem] lg:max-w-[58rem]">
            <h1
              className="min-w-0"
              aria-label="Yash Raj"
              style={{ color: PRIMARY_TEXT }}
            >
              <WordsPullUp
                text="Yash Raj"
                showAsterisk
                className="max-w-full whitespace-nowrap text-[clamp(3.75rem,16vw,12.8rem)] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[clamp(5.5rem,16vw,12.8rem)] lg:text-[clamp(6.75rem,12.4vw,11.8rem)]"
              />
            </h1>

            <div className="max-w-[21rem] pb-0 max-md:mt-3 sm:max-w-sm md:mt-5 md:max-w-[31rem] md:pb-4 lg:mt-6">
              <motion.p
                className="text-xs leading-[1.25] text-primary/75 drop-shadow-[0_1px_18px_rgba(0,0,0,0.45)] sm:text-sm md:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
              >
                I build marketing systems, automation workflows, and websites - turning campaigns,
                no-code stacks, and code into things that actually ship. Currently a digital
                marketer learning to engineer, in public.
              </motion.p>

              <motion.a
                href="#work"
                className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary py-2 pl-4 pr-2 text-xs font-medium text-black transition-colors hover:bg-primary/90 active:scale-[0.98] sm:gap-3 sm:py-3 sm:pl-5 sm:pr-3 sm:text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT }}
              >
                <span>See the work</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-primary transition-transform duration-300 group-hover:translate-x-0.5 sm:h-8 sm:w-8">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-black px-4 py-20 sm:px-6 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.04] bg-[#101010] px-5 py-16 text-center sm:px-8 md:rounded-[2rem] md:py-24 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">About</p>
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl">
          <WordsPullUpMultiStyle
            className="justify-center"
            segments={[
              { text: "I'm Yash Raj,", className: 'font-normal' },
              { text: 'an aspiring paid media marketer.', className: 'font-serif italic' },
              {
                text: 'I build campaign plans, automations, and web projects as I learn.',
                className: 'font-normal',
              },
            ]}
          />
        </h2>
        <AnimatedLetter
          className="mx-auto mt-8 max-w-3xl break-words text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
          text="I'm a Google Ads Search and GA4 certified digital marketer based in Glasgow, building hands-on projects around PPC campaign structure, RSA copy, negative keywords, conversion tracking, reporting, and marketing automation. Before moving into paid media, I spent 4+ years in customer-facing hospitality roles, which shaped how I communicate with clients and understand service businesses. This portfolio is where I document the work I'm building as I move toward my first paid media role."
        />
      </div>
    </section>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState<'All' | Category>('All');

  const sortedProjects = useMemo(
    () => [...projects].sort((first, second) => second.date.localeCompare(first.date)),
    [],
  );

  const counts = useMemo(() => {
    return filters.reduce(
      (accumulator, filter) => {
        accumulator[filter] =
          filter === 'All'
            ? projects.length
            : projects.filter((project) => project.category === filter).length;
        return accumulator;
      },
      {} as Record<'All' | Category, number>,
    );
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? sortedProjects
        : sortedProjects.filter((project) => project.category === activeFilter),
    [activeFilter, sortedProjects],
  );

  const gridSizeClass =
    filteredProjects.length === 1
      ? 'mx-auto max-w-md grid-cols-1'
      : filteredProjects.length === 2
        ? 'mx-auto max-w-3xl grid-cols-1 md:grid-cols-2'
        : projects.length <= 3
          ? 'mx-auto max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'mx-auto max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id="work" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="block">
              <WordsPullUpMultiStyle
                segments={[
                  {
                    text: 'Selected work across marketing projects, automations, and web builds.',
                    className: 'text-[#E1E0CC]',
                  },
                ]}
              />
            </span>
            <span className="block">
              <WordsPullUpMultiStyle
                segments={[{ text: 'Built to ship. Updated as I learn.', className: 'text-gray-500' }]}
              />
            </span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 active:scale-[0.98] sm:text-sm ${
                    isActive
                      ? 'bg-primary text-black'
                      : 'border border-white/15 text-primary/70 hover:border-primary/35 hover:text-primary'
                  } focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
                >
                  <span>{filter}</span>
                  <span className="ml-2 opacity-60">{counts[filter]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className={`mt-10 grid gap-3 sm:gap-4 ${gridSizeClass}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const CategoryIcon = categoryIcons[project.category];
  const categoryColor = categoryColors[project.category];
  const hasLinks = Boolean(project.links?.live || project.links?.repo || project.links?.caseStudy);
  const primaryAction = getPrimaryAction(project);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      exit={{ opacity: 0, scale: 0.96, y: 14 }}
      transition={{
        duration: 0.58,
        delay: index * 0.1,
        ease: CARD_EASE,
        layout: { duration: 0.42, ease: CARD_EASE },
      }}
      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#212121] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/25"
    >
      <div className="relative aspect-video overflow-hidden">
        {project.media?.type === 'image' ? (
          <img
            src={project.media.src}
            alt=""
            className={`h-full w-full ${project.media.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
          />
        ) : project.media?.type === 'video' ? (
          <video
            src={project.media.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="media-fallback relative h-full w-full">
            <div className="bg-noise absolute inset-0 opacity-20" aria-hidden="true" />
            <div
              className="absolute inset-x-6 bottom-6 top-6 border border-white/[0.07]"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-primary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
          {project.category}
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-primary/80 backdrop-blur">
          {project.status}
        </div>

        <CategoryIcon
          className="absolute bottom-4 right-4 h-7 w-7 text-primary/25"
          strokeWidth={1.5}
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-medium leading-tight text-[#E1E0CC]">{project.title}</h3>
        <p className="mt-2 min-h-[2.5rem] text-sm leading-snug text-gray-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasLinks ? (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            {primaryAction ? (
              <a
                href={primaryAction.href}
                onClick={(event) => handleHashLinkClick(event, primaryAction.href)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-[#E1E0CC]"
              >
                {primaryAction.label}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
                  strokeWidth={1.8}
                />
              </a>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              {project.links?.repo ? (
                <IconLink href={project.links.repo} label="Repository">
                  <Github className="h-4 w-4" strokeWidth={1.8} />
                </IconLink>
              ) : null}
              {project.links?.live ? (
                <IconLink href={project.links.live} label="Live site">
                  <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                </IconLink>
              ) : null}
              {project.links?.caseStudy ? (
                <IconLink href={project.links.caseStudy} label="Case study">
                  <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                </IconLink>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function getPrimaryAction(project: Project) {
  if (project.links?.caseStudy) {
    return { label: 'Read case study', href: project.links.caseStudy };
  }

  if (project.links?.live) {
    return { label: 'Live site', href: project.links.live };
  }

  if (project.links?.repo) {
    return { label: 'View', href: project.links.repo };
  }

  return null;
}

function handleHashLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#') || href.length < 2) {
    return;
  }

  const target = document.querySelector(href);

  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', href);
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      onClick={(event) => handleHashLinkClick(event, href)}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-primary/70 transition-colors duration-300 hover:border-primary/30 hover:text-primary active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

function JohnClarkAudiCaseStudyPage() {
  const buildItems = [
    'Campaign settings with Aberdeen and Dundee geo-targeting, plus Glasgow and Edinburgh deliberately excluded.',
    'Five intent-segmented ad groups built to serve both locations without duplicating budget across single-city groups.',
    'Keyword sets with match types assigned by intent, including Dundee variants alongside Aberdeen terms.',
    'Campaign and ad-group negative keywords with written reasoning so the logic is transparent.',
    'Responsive search ads with 15 headlines and 4 descriptions per ad group, validated against character limits.',
    'Sitelinks, callouts and structured snippets built around Test Drive, Finance, Trade-In, Stock and Approved Used signals.',
  ];

  const proofCards = [
    {
      title: '8 workbook tabs',
      body: 'Campaign settings, ad groups, keywords, negatives, RSA copy, extra RSAs, sitelinks and callouts/snippets.',
    },
    {
      title: 'Two-location logic',
      body: 'Aberdeen and Dundee are handled as one tightly themed Audi franchise structure instead of a single-city guess.',
    },
    {
      title: 'Offer-led copy',
      body: 'Real public offers were worked into the ad assets so search intent and landing-page message match.',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black px-4 py-4 sm:px-6 md:py-6" style={{ color: PRIMARY_TEXT }}>
      <div className="mx-auto max-w-6xl">
        <nav className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#101010] px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-primary/70 sm:text-xs">
          <a href="/#work" className="transition-colors hover:text-primary">
            Back to work
          </a>
          <a
            href="/projects/john-clark-audi-google-ads-workbook.ods"
            download
            className="transition-colors hover:text-primary"
          >
            Download workbook
          </a>
        </nav>

        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              Marketing Project
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-medium leading-[0.92] tracking-[-0.04em] text-[#E1E0CC] sm:text-5xl md:text-6xl lg:text-7xl">
              John Clark Audi Google Ads account build
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary/70 sm:text-base">
              A full search campaign structure, built from scratch on public data for the
              Aberdeen and Dundee Audi franchise. No account access, no client data - just a
              defensible outside-in build.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Google Ads', 'Search', 'Campaign Architecture', 'Automotive'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/projects/john-clark-audi-google-ads-workbook.ods"
                download
                className="group inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:scale-[0.98]"
              >
                Download workbook
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.8} />
                </span>
              </a>
              <a
                href="#work"
                className="inline-flex min-h-[52px] items-center rounded-full border border-white/10 px-5 text-sm font-medium text-primary/80 transition-colors hover:border-primary/35 hover:text-primary"
              >
                Back to work
              </a>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#f7f4ea]">
            <img
              src="/projects/john-clark-audi-google-ads.svg"
              alt=""
              className="block aspect-video h-auto max-h-[520px] w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              The approach
            </p>
            <h3 className="mt-4 text-2xl font-medium leading-tight text-[#E1E0CC] sm:text-3xl">
              Message match before anything else.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Most spec builds skip the research and jump straight to keywords. I started on
              John Clark's live Audi pages, pulled the actual offers, then built the campaign
              around what a searcher would really land on.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              This is a self-initiated sample build. It is not affiliated with or endorsed by
              John Clark Motor Group or Audi.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              The build
            </p>
            <ul className="mt-5 space-y-3">
              {buildItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={1.8} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {proofCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-white/[0.06] bg-[#212121] p-5">
              <span className="text-sm font-medium text-[#E1E0CC]">{card.title}</span>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            The honest close
          </p>
          <h3 className="mt-4 text-2xl font-medium leading-tight text-[#E1E0CC] sm:text-3xl">
            The first move would still be an audit.
          </h3>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-400 sm:text-base">
            This is how I would approach the account from the outside - a thinking exercise, not
            a campaign I would switch on blind. The real first move in the seat would be auditing
            the live account, pulling 90 days of search-query data, finding where budget is leaking
            and fixing that before adding anything new.
          </p>
        </div>
      </div>
    </main>
  );
}

function AlignGrowthBookingRecoveryCaseStudyPage() {
  const stats = [
    { label: 'Event paths', value: '4', body: 'Bookings, missed calls, cancellations and reschedules.' },
    { label: 'n8n nodes', value: '72', body: 'Validation, branching, logging and response handling.' },
    { label: 'Data layer', value: 'Sheets', body: 'Appointment, follow-up and recovery report tabs.' },
    { label: 'Next hooks', value: 'SMS', body: 'Ready for Twilio, voice, calendar or clinic CRM logic.' },
  ];

  const workflowPanels = [
    {
      eyebrow: 'Flow 01',
      title: 'New booking intake',
      image: '/projects/aligngrowth-flow-new-booking.png',
      accent: '#A8B89C',
      body: 'Captures a new booking request, checks the event type, validates required details and separates complete requests from missing-field cases.',
      points: ['Webhook intake', 'Required-field check', 'Appointment and recovery logging'],
    },
    {
      eyebrow: 'Flow 02',
      title: 'Missed call recovery',
      image: '/projects/aligngrowth-flow-missed-call.png',
      accent: '#C08A4A',
      body: 'Turns a missed call into a follow-up path by capturing caller details, creating a placeholder SMS step and recording the recovery attempt.',
      points: ['Caller capture', 'Follow-up SMS placeholder', 'Recovery report row'],
    },
    {
      eyebrow: 'Flow 03',
      title: 'Cancellation handling',
      image: '/projects/aligngrowth-flow-cancellation.png',
      accent: '#8EA7D8',
      body: 'Finds the matching appointment, updates the booking status, logs the cancellation and sends the correct response for found or not-found cases.',
      points: ['Appointment lookup', 'Status update branch', 'Cancellation recovery log'],
    },
    {
      eyebrow: 'Flow 04',
      title: 'Reschedule handling',
      image: '/projects/aligngrowth-flow-reschedule.png',
      accent: '#A8B89C',
      body: 'Finds the original booking, updates the new preferred date and time, then logs the reschedule result for the clinic team.',
      points: ['Original booking lookup', 'New time update', 'Reschedule success or not-found path'],
    },
  ];

  const buildItems = [
    'Webhook entry points for booking, missed call, cancellation and reschedule events.',
    'Set nodes that clean incoming payloads into consistent fields before branching.',
    'IF branches that reject wrong event types and catch missing details before the workflow continues.',
    'Google Sheets logging across appointment, follow-up and recovery report tabs.',
    'Manual SMS placeholder nodes for the MVP, ready to swap for Twilio, voice or clinic-specific messaging.',
    'Disabled Calendar, Cal.com and Twilio nodes kept in the workflow as integration points for a real client setup.',
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black px-4 py-4 sm:px-6 md:py-6" style={{ color: PRIMARY_TEXT }}>
      <div className="mx-auto max-w-[88rem]">
        <nav className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#101010] px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-primary/70 sm:text-xs">
          <a href="/#work" className="transition-colors hover:text-primary">
            Back to work
          </a>
          <span>Automation case study</span>
        </nav>

        <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-[#101010]">
          <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">
                  Automation MVP
                </p>
                <h1 className="mt-5 max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-[#E1E0CC] sm:text-5xl lg:text-6xl">
                  AlignGrowth booking recovery MVP
                </h1>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary/75 sm:text-base">
                  A proof-of-concept n8n system for aesthetics clinics that captures booking,
                  missed call, cancellation and reschedule events, then routes each one into a
                  recovery flow with logging and follow-up placeholders.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
                  The current version uses test payloads and fake messaging nodes. In a real setup,
                  the same structure can connect to voice, calendar, SMS or clinic CRM tools based
                  on the business requirement.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['n8n', 'Webhooks', 'Google Sheets', 'Lead Recovery', 'Aesthetics Clinics'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-primary/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/[0.06] bg-[#171717] p-4 lg:border-l lg:border-t-0 lg:p-5">
              <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070d17] p-5 sm:min-h-[360px] sm:p-7">
                <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(10,174,235,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_54%)]"
                  aria-hidden="true"
                />
                <div className="relative flex min-h-[170px] items-center justify-center sm:min-h-[220px]">
                  <img
                    src="/projects/aligngrowth-logo.png"
                    alt="AlignGrowth"
                    className="block w-full max-w-[520px] object-contain"
                  />
                </div>
                <div className="relative flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-sm leading-relaxed text-primary/65">
                    AlignGrowth is the service agency brand behind this booking recovery MVP.
                  </p>
                  <a
                    href="https://aligngrowthuk.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:text-[#E1E0CC] active:scale-[0.98]"
                  >
                    Visit site
                    <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                    <p className="mt-2 text-xl font-medium text-[#E1E0CC]">{stat.value}</p>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{stat.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              The idea
            </p>
            <h2 className="mt-4 text-2xl font-medium leading-tight text-[#E1E0CC] sm:text-3xl">
              Recover the leads that usually leak out.
            </h2>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
            <p className="max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
              This MVP is built around a simple service-business problem: a person books,
              misses a call, cancels or asks to reschedule, and the clinic needs the next step
              logged before the enquiry goes cold. The workflow turns those events into
              structured recovery paths rather than leaving them as scattered admin tasks.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
                Workflow gallery
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.03em] text-[#E1E0CC] sm:text-4xl">
                Four separate recovery flows.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-500">
              Each screenshot keeps the n8n architecture visible while hiding test payload and
              webhook details.
            </p>
          </div>

          <div className="grid gap-4">
            {workflowPanels.map((panel, index) => (
              <motion.article
                key={panel.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: EASE_OUT }}
                className="grid min-w-0 overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-[#101010] lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: panel.accent }}>
                      {panel.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-medium leading-tight text-[#E1E0CC] sm:text-3xl">
                      {panel.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                      {panel.body}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {panel.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={1.8} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="min-w-0 border-t border-white/[0.06] bg-[#171717] p-3 sm:p-4 lg:border-l lg:border-t-0">
                  <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-[#202020]">
                    <img
                      src={panel.image}
                      alt=""
                      className="block h-auto w-[760px] max-w-none md:w-full"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            The build
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {buildItems.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/[0.06] bg-[#171717] p-4 text-sm leading-relaxed text-gray-400">
                <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={1.8} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
                Work with AlignGrowth
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-tight text-[#E1E0CC] sm:text-3xl">
                Want this adapted for your clinic or service business?
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
                The MVP can be shaped around your booking tools, missed-call process, calendar,
                SMS follow-up and reporting needs.
              </p>
            </div>
            <a
              href="https://aligngrowthuk.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:scale-[0.98]"
            >
              Visit AlignGrowth
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                <ExternalLink className="h-4 w-4 text-primary" strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.06] bg-[#101010] p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            The honest close
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-gray-400 sm:text-base">
            This is a working proof-of-concept, not a finished client deployment. The value is in
            the structure: event capture, validation, branching, logging and clear places to attach
            production tools once a real clinic has chosen its calendar, voice and messaging stack.
          </p>
          <div className="mt-7">
            <a
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:scale-[0.98]"
            >
              Back to work
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 md:py-20">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
          Currently building
        </p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 sm:gap-4">
          {learning.map((item, index) => (
            <LearningCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningCard({ item, index }: { item: LearningItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = getLearningIcon(item.icon);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
      className="min-w-[240px] flex-1 rounded-2xl border border-white/[0.06] bg-[#101010] p-4 sm:min-w-[280px]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-black">
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <span className="text-xs text-gray-500">{item.progress}%</span>
      </div>
      <h3 className="mt-5 text-sm font-medium leading-tight text-[#E1E0CC] sm:text-base">
        {item.title}
      </h3>
      <div className="mt-4 h-1 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.progress}%` } : undefined}
          transition={{ duration: 0.8, delay: 0.18 + index * 0.08, ease: EASE_OUT }}
        />
      </div>
      <p className="mt-3 text-xs leading-snug text-gray-500">{item.note}</p>
    </motion.div>
  );
}

function getLearningIcon(icon: LearningIcon) {
  const icons = {
    Sparkles,
    Code2,
    Workflow,
  };

  return icons[icon];
}

function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black px-4 py-20 text-center sm:px-6 md:py-28">
      <h2 className="text-4xl font-normal leading-none text-[#E1E0CC] sm:text-5xl md:text-7xl lg:text-8xl">
        <WordsPullUp text="Let's build something." className="justify-center" />
      </h2>

      <a
        href="mailto:yashrajdhillor@gmail.com"
        className="group mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:scale-[0.98] sm:text-base"
      >
        Get in touch
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
          <Mail className="h-4 w-4 text-primary" strokeWidth={1.8} />
        </span>
      </a>

      <div className="mt-8 flex items-center justify-center gap-3">
        <IconLink href="#" label="GitHub">
          <Github className="h-4 w-4" strokeWidth={1.8} />
        </IconLink>
        <IconLink href="#" label="LinkedIn">
          <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
        </IconLink>
        <IconLink href="#work" label="Selected work">
          <Check className="h-4 w-4" strokeWidth={1.8} />
        </IconLink>
      </div>

      <p className="mt-10 text-xs text-gray-500">Yash Raj - {year}</p>
    </footer>
  );
}

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/work/john-clark-audi-google-ads') {
    return <JohnClarkAudiCaseStudyPage />;
  }

  if (window.location.pathname.replace(/\/$/, '') === '/work/aligngrowth-booking-recovery') {
    return <AlignGrowthBookingRecoveryCaseStudyPage />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black" style={{ color: PRIMARY_TEXT }}>
      <Hero />
      <About />
      <Work />
      <CurrentlyBuilding />
      <ContactFooter />
    </main>
  );
}
