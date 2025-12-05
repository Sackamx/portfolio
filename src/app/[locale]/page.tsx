import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import ServiceCard from "@/components/service-card";
import { Badge } from "@/components/ui/badge";
import getDictionary from "@/dict/dict";
import { LOCALES } from "@/lib/const";
import { getLang } from "@/lib/utils";
import Image from "next/image";
import Markdown from "react-markdown";

export const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Page({ params }: Params) {
  const lang = getLang(params.locale);
  const {
    about,
    header,
    name,
    initials,
    avatarUrl,
    services,
    skills,
    education,
    projects,
  } = await getDictionary(lang);
  return (
    <div className="pt-12 sm:pt-24 flex flex-col gap-10">
      <section id="hero">
        <div className="space-y-8">
          <div className="gap-8 flex items-center justify-between">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="size-32 sm:size-40 border rounded-full overflow-hidden">
                <Image
                  width={240}
                  height={240}
                  priority
                  loading="eager"
                  className="object-cover w-full h-full"
                  alt={name}
                  src={avatarUrl}
                />
              </div>
            </BlurFade>
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl/none"
                yOffset={8}
                text={`${header.title} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={header.description}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{about.title}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {about.description}
          </Markdown>
        </BlurFade>
      </section>
      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {dict.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{education.title}</h2>
          </BlurFade>
          {education.items.map((item, id) => (
            <BlurFade key={item.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={item.school}
                href={item.href}
                logoUrl={item.logoUrl}
                altText={item.school}
                title={item.school}
                subtitle={item.degree}
                period={`${item.start} - ${item.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{skills.title}</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {skills.items.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="services">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{services.title}</h2>
          </BlurFade>
          <ul className="grid sm:grid-cols-2 gap-6 sm:gap-3">
            {services.items.map((service, id) => (
              <BlurFade
                key={service.title}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <ServiceCard {...service} index={id} key={service.title + id} />
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {projects.badge}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {projects.title}
                </h2>
                <p className="text-muted-foreground sm:text-lg text-pretty prose dark:prose-invert">
                  {projects.description}
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {/* <div className="grid grid-cols-1 gap-6 sm:gap-3 sm:flex flex-wrap max-w-[800px] mx-auto"> */}
            {Object.entries(projects.items).map(([slug, project], id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={`/${params.locale}/projects/${slug}`}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.tags}
                  // tags={project.technologies}
                  image={project.images[0]}
                  // video={project.video}
                  // links={project.links}
                />
              </BlurFade>
            ))}
            {/* {projects["in-progress"] && (
              <ProjectCard {...projects["in-progress"]} />
            )} */}
          </div>
        </div>
      </section>
      {/* <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {dict.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {dict.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
    </div>
  );
}
