import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Home,
  Package,
  ShoppingCart,
  BarChart4,
  ChevronLeft,
} from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  console.log('DashboardSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/reports', icon: BarChart4, label: 'Reports' },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center xl:justify-start gap-4 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
    }`;

  return (
    <aside
      className={`hidden md:flex flex-col border-r bg-muted/40 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center border-b px-4 shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          {!isCollapsed && <span>Analytics Co.</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <NavLink to={item.to} className={getNavLinkClass} end={item.to === '/'}>
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                <span className="sr-only">{item.label}</span>
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;