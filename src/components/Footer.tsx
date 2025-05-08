
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card py-10 mt-16">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-sapphic-pink to-sapphic-purple bg-clip-text text-transparent">SapphicScreen</span>
            </Link>
            <p className="text-sm text-foreground/70">
              The premier streaming service for lesbian, sapphic, and queer women's stories from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link to="/" className="hover:text-sapphic-pink transition-colors">Home</Link></li>
                <li><Link to="/browse" className="hover:text-sapphic-pink transition-colors">Browse</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Recently Added</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">My List</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Films</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Series</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Documentaries</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Short Films</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Account</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-sapphic-pink transition-colors">Gift Cards</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} SapphicScreen. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-foreground/60">
            <Link to="#" className="hover:text-sapphic-pink transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-sapphic-pink transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-sapphic-pink transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
