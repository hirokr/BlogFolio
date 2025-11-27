'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { sendContactEmail } from '@/server/sendMail';

gsap.registerPlugin(useGSAP);

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  // Refs **MUST** be used
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  useGSAP(() => {
    if (!btnRef.current || !lineRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      lineRef.current,
      { width: '0%', scaleY: 0 },
      {
        width: '100%',
        scaleY: 1,
        duration: 0.45,
        ease: 'power2.out',
      }
    ).fromTo(
      lineRef.current,
      { height: '5%' },
      { height: '100%', duration: 0.25, ease: 'power2.out' }
    );

    const btn = btnRef.current;

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    btn.addEventListener('mouseenter', handleEnter);
    btn.addEventListener('mouseleave', handleLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleEnter);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success('Message sent successfully!', {
          description:
            'Thank you for reaching out. I will get back to you soon.',
        });
        form.reset();
      } else {
        toast.error('Failed to send message', {
          description:
            result.message || 'Please try again later or contact me directly.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later or contact me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto mt-10 flex max-w-[70%] flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-2">
        <div className="mb-8">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            Let's talk business
          </h2>
          <p className="text-foreground/60 lg:text-xl">
            Now that you know a lot about me, let me know if you want to work
            with me.
          </p>
        </div>

        <div className="max-w-4xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-sidebar-accent/70 border-0 opacity-90"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500/70" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="bg-sidebar-accent/70 border-0 opacity-90"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500/70" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-sidebar-accent/70 min-h-[120px] resize-none opacity-90"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500/70" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                id="btnHover"
                ref={btnRef}
                disabled={isSubmitting}
                className="btn relative h-12 w-full overflow-hidden border-2 border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="z-10 bg-transparent font-semibold uppercase">
                  {isSubmitting ? 'Sending...' : "Let's Get Started"}
                </div>
                <div
                  ref={lineRef}
                  id="lineToBg"
                  className="absolute top-0 left-0 h-full w-0 origin-bottom bg-blue-500"
                />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
