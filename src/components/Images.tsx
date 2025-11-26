import { client } from '@/sanity/lib/client';
import { categoriesQuery, photoCategoriesQuery } from '@/sanity/lib/queries';

const Images = async () => {
  const [categories, photos] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(photoCategoriesQuery),
  ]);
  console.log(categories);
  console.log(photos);

  return (
    <section className="container w-full min-w-full">
      <div>
        <h2 className="my-5 text-4xl font-semibold lg:text-5xl">Photography</h2>
        <p className="text-foreground/60 max-w-[70%] text-lg">
          Here is a collection of my best travel pictures that I took while
          traveling places all around the world.
        </p>
      </div>

      <div className="">
        <div className="">{/* Categories */}</div>
        <div>{/* Photos Grid */}</div>
      </div>
    </section>
  );
};

export default Images;
