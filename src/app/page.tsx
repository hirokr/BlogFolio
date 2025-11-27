import Header from '@/components/Header';
import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Images from '@/components/Images';
import SkillSet from '@/components/Skillset';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Experience />
        <section id="about">
          <AboutMe />
        </section>
        <SkillSet />
        <section id="works">
          <Images />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}
