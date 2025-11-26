import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import SkillSet from '@/components/Skillset';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Experience />
      <AboutMe />
      <SkillSet />
      <Contact />
    </main>
  );
}
