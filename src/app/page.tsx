import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutMe />
      <Contact />
    </main>
  );
}
