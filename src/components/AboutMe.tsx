import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <section className="flex w-full min-w-full flex-col justify-between bg-[#FFF3E4] lg:flex-row">
      {/* About Me description */}
      <div className="container flex min-h-[50vh] flex-col items-start justify-between py-10 lg:!w-1/2">
        <div className="lg:mt-32">
          <h2 className="text-background py-5 text-4xl font-bold lg:text-5xl">
            Philosophy & values
          </h2>
          <p className="text-background/90 max-w-4xl text-base lg:text-lg">
            I think everyone wants the same thing - relationship with humanity,
            peace with the metaphysical, and experience with the universe. I try
            to grasp these things with my values: authenticity, creativity, &
            hospitality.
          </p>
        </div>
        {/* More about me button */}
        <Link href="/about" className="cursor-pointer">
          <Button
            size="lg"
            className="text-background relative z-10 h-12 overflow-hidden before:absolute before:top-0 before:left-0 before:z-0 before:h-full before:w-0 before:bg-blue-700 before:transition-all before:content-[''] after:absolute after:bottom-0 after:left-0 after:z-0 after:h-[1px] after:w-full after:bg-blue-700 hover:scale-x-110 hover:text-white hover:before:w-full hover:before:duration-300 hover:before:ease-in-out"
          >
            <span className="z-10">More About Me</span>
          </Button>
        </Link>
      </div>
      {/* Philosophy Image */}
      <div className="h-full lg:w-1/2">
        <Image
          src="/Images/AboutMe.jpeg"
          alt="Philosophy Image"
          width={900}
          height={300}
          className="h-[400px] w-full origin-center object-cover lg:h-[600px]"
        />
      </div>
    </section>
  );
};

export default AboutMe;
