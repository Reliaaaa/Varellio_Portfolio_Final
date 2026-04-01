import { motion } from "motion/react";
import { Database, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { skillsData } from "../data";

export function SkillsPage() {
  const skills = skillsData;

  return (
    <main className="pt-32">
      <section className="px-6 md:px-12 mb-20 max-w-[1440px] mx-auto">
        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-4 block">
          Quotes of the day
        </span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl text-on-surface">
          In the middle of <span className="text-primary italic">difficulty</span> lies opportunity. - Albert Einstein
        </h1>
      </section>

      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-slate-400 uppercase tracking-widest mb-12 text-sm font-semibold">
            My Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col bg-surface-container-low p-10 rounded-2xl group hover:bg-surface-container-high transition-colors border border-outline-variant/10"
              >
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-6">
                  {skill.category}
                </span>
                <h3 className="text-3xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <div className="mt-auto pt-12">
                  <div className="w-12 h-1 bg-primary/20 rounded-full group-hover:bg-primary group-hover:w-24 transition-all duration-500 ease-out-expo"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-12">
          Interested in working together?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a 
            href="https://wa.me/6285859869377" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-5 bg-primary text-white rounded-xl font-bold text-lg hover:scale-95 duration-200 transition-transform inline-block"
          >
            Start a project
          </a>
        </div>
      </section>
    </main>
  );
}
