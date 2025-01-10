import { NavBar } from "@/components/landing/nav-bar";
import auth_bg_img from "@/assets/images/auth_bg_img.png";
import ViteLogo from "@/assets/vite.png";
import ZustandLogo from "@/assets/zustand.svg";
import TypeScriptLogo from "@/assets/typescript.svg";
import { Button } from "@/components/ui/button";
import { VscGithubAlt } from "react-icons/vsc";

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${auth_bg_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen flex flex-col"
    >
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-4 text-center">
          <div className="flex flex-col">
            <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-bold font-sans tracking-tighter mb-4">
              Vitecord
            </h1>
            <p className="text-white text-xl sm:text-2xl mb-8">
              An offline Discord clone built with modern web technologies.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              <TechLogo src={ViteLogo} alt="Vite" />
              <TechLogo src={TypeScriptLogo} alt="TypeScript" />
              <TechLogo src={ZustandLogo} alt="Zustand" />
            </div>
            <div>
              <a
                href="https://github.com/drxc00/vitecord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <VscGithubAlt className="mr-2" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface TechLogoProps {
  src: string;
  alt: string;
}

function TechLogo({ src, alt }: TechLogoProps) {
  return (
    <div className="hover:scale-105 transition duration-300 ease-in-out">
      <img src={src} alt={alt} className="w-16 h-16 sm:w-20 sm:h-20" />
    </div>
  );
}
