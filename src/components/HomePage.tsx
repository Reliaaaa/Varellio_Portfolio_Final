import { motion } from "motion/react";
import { Terminal, Activity } from "lucide-react";
import { experienceData } from "../data";

export function HomePage() {
  const experience = experienceData;

  return (
    <main className="pt-24">
      <section className="px-6 md:px-12 pt-10 pb-20 md:pt-20 md:pb-40 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="text-primary font-semibold uppercase tracking-[0.2em] block mb-6 text-sm">
              My Portfolio
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9] mb-12">
              The only way <br />
              to do great is to <br />
              <span className="text-primary italic">love what you do</span>
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed font-light max-w-lg">
              - Steve Jobs.
            </p>
          </div>
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square w-full bg-surface-container rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10"
            >
              <img
                src="/profile.jpeg"
                alt="Varellio Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-40 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-8">About Me</h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed font-light text-xl">
                <p>
                  My name is Varellio Louis Tinangon. Currently i'm in 12th grade class XIIB/23 at SMAK Frateran Surabaya preparing for final exams. I'm currently a 4.0 GPA in the 11th grade from my academic record.
                </p>
                <p>
                  I won a business competition in 2025. I directed funds as Student Council Treasurer from 2025 to 2026. I engaged the community as a Public Relations member from 2024 to 2025. I organized the annual Frateran Cup and Frateran Solve the Case events in 2023 and 2025. I can leverage my management and communication experience to reach organizational goals. I plan to bring these capabilities to an institution. Im also a self-taught tech enthusiast at home.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square w-full max-w-md bg-surface-container rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10"
                >
                <img
                  src="/about_me.jpg"
                  alt="Varellio Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <h2 className="text-slate-400 uppercase tracking-widest mb-20 text-sm font-semibold">
          Experience
        </h2>
        <div className="space-y-12">
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ x: 10 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center py-12 border-b border-outline-variant/20 hover:bg-surface-container-high transition-colors px-4 rounded-xl cursor-default"
            >
              <div className="md:col-span-3 lg:col-span-3 text-slate-400 font-light tabular-nums">
                {exp.year}
              </div>
              <div className="md:col-span-5 lg:col-span-5">
                <h3 className="text-2xl font-bold">{exp.title}</h3>
                <p className="text-on-surface-variant">{exp.company}</p>
              </div>
              <div className="md:col-span-4 lg:col-span-4 mt-4 md:mt-0 md:text-right">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold">
                  {exp.tags}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
