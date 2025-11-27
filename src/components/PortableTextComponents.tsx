import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface PortableTextComponentsProps {
  value: {
    asset?: {
      _ref?: string;
      url?: string;
    };
    alt?: string;
    caption?: string;
  };
}

export const PortableTextComponents = {
  types: {
    image: ({ value }: PortableTextComponentsProps) => {
      if (!value?.asset) return null;

      const imageUrl = value.asset.url
        ? urlFor(value.asset.url).width(1200).height(800).url()
        : '';

      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800">
            <Image
              src={imageUrl || '/Images/default-blog.jpg'}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-zinc-400 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 leading-relaxed text-zinc-300">{children}</p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-12 mb-6 text-4xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-5 text-3xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-4 text-2xl font-bold text-white">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 mb-4 text-xl font-bold text-white">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-4 border-orange-500 bg-zinc-900/50 py-4 pr-4 pl-6 text-zinc-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-zinc-300">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-zinc-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-medium text-orange-400 underline decoration-orange-400/30 underline-offset-2 transition-colors hover:text-orange-300 hover:decoration-orange-300"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-zinc-800 px-2 py-1 font-mono text-sm text-orange-300">
        {children}
      </code>
    ),
  },
};
