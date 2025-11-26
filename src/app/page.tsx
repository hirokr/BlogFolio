import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Images from '@/components/Images';
import SkillSet from '@/components/Skillset';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Experience />
      <AboutMe />
      <SkillSet />
      <Images />
      <Contact />
    </main>
  );
}
