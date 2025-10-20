import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Linkedin, FileText, Check } from "lucide-react";

const email = "justin.tufte@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/justin-tufte/";
const resumeUrl = "/Justin-Tufte-Resume.pdf";

function App() {
  const [copied, setCopied] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set([0])
  );
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionsRef.current.map((section, index) => {
      if (!section) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              } else {
                newSet.delete(index);
              }
              return newSet;
            });
          });
        },
        {
          threshold: 0.3,
          rootMargin: "-50px",
        }
      );

      observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = sectionsRef.current[1];
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      >
        <div
          className={`text-center transition-all duration-1500 ${
            visibleSections.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-slate-700 mb-6 tracking-tight">
            HELLO
          </h1>
        </div>

        <button
          onClick={scrollToNext}
          className="absolute bottom-12 animate-bounce text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={40} />
        </button>
      </section>

      {/* About Section with Headshot */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div
          className={`max-w-4xl mx-auto transition-all duration-1500 delay-200 ${
            visibleSections.has(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-light text-slate-700 mb-6">
                IS IT ME
              </h2>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center shadow-xl flex-shrink-0 overflow-hidden">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-100 via-blue-100 to-teal-100 flex items-center justify-center">
                  <img src="/headshot.jpeg"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div
          className={`max-w-5xl mx-auto transition-all duration-1500 delay-300 text-center${
            visibleSections.has(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className=" text-center text-4xl md:text-5xl font-light text-slate-700 mb-8">
            YOU'RE LOOKING FOR?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-200/70 to-teal-200/70 backdrop-blur-sm text-slate-700 hover:from-rose-200 hover:to-teal-200 hover:shadow-lg transition-all duration-300 font-light text-lg flex items-center gap-3"
            >
              <Linkedin
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={copyEmailToClipboard}
              className="group px-8 py-4 rounded-full bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg transition-all duration-300 font-light text-lg flex items-center gap-3"
            >
              {copied ? (
                <>
                  <Check size={20} className="text-teal-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Mail
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>{email}</span>
                </>
              )}
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-rose-200/70 to-teal-200/70 backdrop-blur-sm text-slate-700 hover:from-rose-200 hover:to-teal-200 hover:shadow-lg transition-all duration-300 font-light text-lg flex items-center gap-3"
            >
              <FileText
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
