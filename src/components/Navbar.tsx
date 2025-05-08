
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchDialog from "./SearchDialog";

export default function Navbar({ transparent = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle navbar background on scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  const navbarClass = transparent && !isScrolled 
    ? "bg-transparent" 
    : "bg-background/95 backdrop-blur-sm shadow";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClass}`}>
        <div className="content-container flex items-center justify-between py-4">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-sapphic-pink to-sapphic-purple bg-clip-text text-transparent">SapphicScreen</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground/80 hover:text-sapphic-pink transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-foreground/80 hover:text-sapphic-pink transition-colors">
                Browse
              </Link>
              <Link to="/browse?category=films" className="text-foreground/80 hover:text-sapphic-pink transition-colors">
                Films
              </Link>
              <Link to="/browse?category=series" className="text-foreground/80 hover:text-sapphic-pink transition-colors">
                Series
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground/80 hover:text-sapphic-pink"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
      
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
