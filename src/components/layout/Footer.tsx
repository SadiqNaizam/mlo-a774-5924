import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto px-4 py-3 md:px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          &copy; {currentYear} Analytics Co. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span>App Version: 1.0.0</span>
          <div className="h-4 w-px bg-border" />
          <Link to="/#" className="hover:text-primary transition-colors">
            Support
          </Link>
          <Link to="/#" className="hover:text-primary transition-colors">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;