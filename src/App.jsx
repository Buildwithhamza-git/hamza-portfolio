import SmoothScroll from '@/components/common/SmoothScroll'
import CustomCursor from '@/components/common/CustomCursor'
import ThemeToggle from '@/components/common/ThemeToggle'
import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Stats from '@/components/about/Stats'
import TechStack from '@/components/skills/TechStack'
import Projects from '@/components/projects/Projects'
import Architecture from '@/components/architecture/Architecture'
import Philosophy from '@/components/architecture/Philosophy'
import Journey from '@/components/journey/Journey'
import Lab from '@/components/lab/Lab'
import Certifications from '@/components/certifications/Certifications'
import ResumeCTA from '@/components/resume/ResumeCTA'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Stats />
        <TechStack />
        <Projects />
        <Architecture />
        <Philosophy />
        <Journey />
        <Lab />
        <Certifications />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
