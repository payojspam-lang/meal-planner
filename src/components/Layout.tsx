import { Calendar, Users, Utensils, Settings, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import React, { useState } from "react";

export type TabId = 'dashboard' | 'family' | 'calendar' | 'grocery';

interface LayoutProps {
    children: React.ReactNode;
    onOpenSettings: () => void;
    activeTab: TabId;
    onChangeTab: (tab: TabId) => void;
}

export default function Layout({ children, onOpenSettings, activeTab, onChangeTab }: LayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    const navItems: { icon: React.ElementType, label: string, target: TabId }[] = [
        { icon: Utensils, label: 'Meals', target: 'dashboard' },
        { icon: Users, label: 'Family', target: 'family' },
        { icon: Calendar, label: 'Calendar', target: 'calendar' },
        { icon: ShoppingCart, label: 'Grocery', target: 'grocery' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Left Rail Navigation */}
            <nav className={`
        ${collapsed ? 'md:w-20' : 'md:w-56'}
        w-full md:border-b-0 md:border-r border-muted/30 
        flex p-3 md:flex-col items-center justify-between 
        sticky top-0 md:h-screen z-30 shrink-0 
        bg-surface shadow-sm transition-all duration-300
      `}>
                <div className="flex md:flex-col items-center gap-4 w-full md:w-auto">
                    {/* Logo + Collapse Toggle */}
                    <div className="flex items-center gap-2 w-full justify-between md:justify-center mb-0 md:mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm font-bold text-xl shrink-0">
                                M
                            </div>
                            {!collapsed && <span className="hidden md:block font-bold text-textMain text-sm">Meal Planner</span>}
                        </div>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden md:flex p-1.5 text-muted hover:text-textMain transition-colors rounded-lg hover:bg-gray-100"
                        >
                            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>

                    {/* Nav Items */}
                    {navItems.map(item => (
                        <button
                            key={item.target}
                            onClick={() => onChangeTab(item.target)}
                            className={`
                flex items-center gap-3 p-3 transition-colors rounded-xl w-full
                ${collapsed ? 'justify-center' : 'md:justify-start justify-center'}
                ${activeTab === item.target ? 'bg-primary/10 text-primary font-bold' : 'text-muted hover:bg-gray-100 hover:text-textMain'}
              `}
                            title={item.label}
                        >
                            <item.icon size={22} className="shrink-0" />
                            {!collapsed && <span className="hidden md:block text-sm font-medium">{item.label}</span>}
                        </button>
                    ))}
                </div>

                {/* Settings */}
                <button
                    onClick={onOpenSettings}
                    className={`
            flex items-center gap-3 p-3 text-muted hover:text-textMain transition-colors rounded-xl hover:bg-gray-100 w-full mt-auto
            ${collapsed ? 'justify-center' : 'md:justify-start justify-center'}
          `}
                    title="Settings"
                >
                    <Settings size={22} className="shrink-0" />
                    {!collapsed && <span className="hidden md:block text-sm font-medium">Settings</span>}
                </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 max-h-screen overflow-y-auto w-full">
                <div className="max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
