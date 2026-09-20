import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkIndex from "@/components/WorkIndex";
import Principles from "@/components/Principles";
import StackSchedule from "@/components/StackSchedule";
import Profile from "@/components/Profile";
import Contact from "@/components/Contact";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="shell">
      <Hero />

      <Section id="work" index="01" title="Selected work" meta={`${projects.length} entries`}>
        <WorkIndex />
      </Section>

      <Section id="approach" index="02" title="Approach" meta="Working rules">
        <Principles />
      </Section>

      <Section id="stack" index="03" title="Stack schedule" meta="Tools & where they're used">
        <StackSchedule />
      </Section>

      <Section id="profile" index="04" title="Profile" meta="Particulars">
        <Profile />
      </Section>

      <Section id="contact" index="05" title="Contact" meta="Open to work">
        <Contact />
      </Section>
    </div>
  );
}
