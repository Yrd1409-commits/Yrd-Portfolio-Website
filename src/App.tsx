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
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Category, Project, projects } from './data/projects';
import { LearningIcon, LearningItem, learning } from './data/learning';
import { HeroScene } from './components/HeroScene';

const PRIMARY_TEXT = '#E1E0CC';
const NAV_COLOR = 'rgba(225, 224, 204, 0.8)';
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CARD_EASE = [0.22, 1, 0.36, 1] as const;

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
    [0.2, 1],
  );

  return <motion.span style={{ opacity }}>{character === ' ' ? '\u00A0' : character}</motion.span>;
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="transition-colors duration-300"
      style={{ color: NAV_COLOR }}
      onMouseEnter={(event) => {
        event.currentTarget.style.color = PRIMARY_TEXT;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.color = NAV_COLOR;
      }}
    >
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-black p-4 md:p-6">
      <div className="relative min-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl bg-black md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem]">
        <div className="ambient-gradient absolute inset-0 opacity-60" aria-hidden="true" />
        <HeroScene />
        <div
          className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
          aria-hidden="true"
        />

        <nav className="absolute left-1/2 top-0 z-20 max-w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded-b-2xl bg-black px-3 py-2 md:rounded-b-3xl md:px-8">
          <div className="flex items-center justify-center gap-2 whitespace-nowrap text-[9px] font-normal uppercase tracking-[0.08em] sm:gap-6 sm:text-xs sm:tracking-[0.16em] md:gap-12 md:text-sm lg:gap-14">
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid items-end gap-5 lg:grid-cols-12 lg:gap-8">
            <h1
              className="lg:col-span-8"
              aria-label="Yash Raj"
              style={{ color: PRIMARY_TEXT }}
            >
              <WordsPullUp
                text="Yash Raj"
                showAsterisk
                className="whitespace-nowrap text-[16vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[18vw] md:text-[16vw] lg:text-[15vw] xl:text-[14vw] 2xl:text-[14.5vw]"
              />
            </h1>

            <div className="max-w-sm pb-2 lg:col-span-4 lg:ml-auto md:pb-4">
              <motion.p
                className="text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
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
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-medium text-black transition-[gap,transform] duration-300 hover:gap-3 active:scale-[0.98] sm:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
              >
                See the work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary" strokeWidth={1.8} />
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
              { text: 'a marketer turned builder.', className: 'font-serif italic' },
              {
                text: 'I work across paid media, automation, and the web.',
                className: 'font-normal',
              },
            ]}
          />
        </h2>
        <AnimatedLetter
          className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
          text="Over the last few years I've gone from running campaigns to building the systems behind them - Google Ads and SEO, then n8n and GoHighLevel automations, and now code. This site is where I ship that work as I learn, from spec campaigns to full-stack builds."
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
          <img src={project.media.src} alt="" className="h-full w-full object-cover" />
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
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-primary/70 transition-colors duration-300 hover:border-primary/30 hover:text-primary active:scale-[0.98]"
    >
      {children}
    </a>
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
        href="mailto:hello@yashr.co"
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
