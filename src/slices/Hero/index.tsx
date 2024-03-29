"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";

import { Shapes } from "@/slices/Hero/Shapes";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.fromTo(
        ".name-animation",
        { x: "-100", opacity: 0, rotate: -10 },
        {
          x: "0",
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      t1.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
          duration: 1,
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: String) => {
    if (!name) return null; // Return null or any other appropriate fallback value
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} opacity-0 inline-block`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section
      ref={component}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-10 md:px-6 md:py-14 lg:py-16"
    >
      <div className="container w-full mx-auto max-w-7xl ">
        <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
          <Shapes />
          <div className="col-start-1 md:row-start-1">
            <h1
              className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
              aria-label={
                slice.primary.first_name + "" + slice.primary.last_name
              }
            >
              <span className="block text-slate-300">
                {renderLetters(slice.primary.first_name, "first")}
              </span>
              <span className="-mt-[.2em] block text-slate-500">
                {renderLetters(slice.primary.last_name, "last")}
              </span>
            </h1>
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold tracking-[.2em] uppercase text-transparent opacity-0 md:text-4xl">
              {slice.primary.role}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
