
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Search for movies and series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
