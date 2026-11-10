import About from "@/components/home/about";
import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Services from "@/components/home/services";
import getDictionary from "@/dict/dict";
import { LOCALES } from "@/lib/const";
import { getLang } from "@/lib/utils";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Page({ params }: Params) {
  const lang = getLang(params.locale);
  const { home, projects, contact } = await getDictionary(lang);

  return (
    <>
      <Hero hero={home.hero} whatsappUrl={contact.social.whatsapp.url} />
      <Projects locale={params.locale} labels={home.projects} items={projects.items} />
      <Experience experience={home.experience} />
      <Services services={home.services} />
      <About about={home.about} />
    </>
  );
}
