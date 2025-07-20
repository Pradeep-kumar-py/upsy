'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navbarItems = useMemo(() => [
        { name: "Home", href: "#home", id: "home" },
        { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
        { name: "Who It's For", href: "#who-its-for", id: "who-its-for" },
        { name: "Success Stories", href: "#use-cases", id: "use-cases" },
        { name: "FAQs", href: "#faqs", id: "faqs" },
    ], []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            
            // Update active section based on scroll position with better detection
            const sections = navbarItems.map(item => document.getElementById(item.id)).filter(Boolean);
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            let currentSection = 'home';
            sections.forEach((section, index) => {
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        currentSection = navbarItems[index].id;
                    }
                }
            });
            
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navbarItems]);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                const offsetTop = (element as HTMLElement).offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.querySelector('nav');
            if (menuOpen && nav && !nav.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const navVariants = {
        initial: {
            // backgroundColor: 'from-blue-600 via-blue-700 to-blue-800',
            backdropFilter: 'blur(0px)',
        },
        scrolled: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }
    };

    return (
        <>
            <motion.nav
                initial="initial"
                animate={isScrolled ? "scrolled" : "initial"}
                variants={navVariants}
                transition={{ duration: 0.3 }}
                className={`
                    fixed top-0 w-full z-50
                    ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4 md:py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'}
                `}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className={`
                                w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300
                                ${isScrolled 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-md' 
                                    : 'bg-white/20 backdrop-blur-sm border border-white/30'
                                }
                            `}>
                                <span className="font-bold text-base sm:text-lg text-white">U</span>
                            </div>
                            <a 
                                href="#home" 
                                onClick={(e) => {e.preventDefault(); handleNavClick('#home');}}
                                className={`
                                    text-xl sm:text-2xl font-bold transition-all duration-300 hover:scale-105
                                    ${isScrolled 
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent' 
                                        : 'text-white'
                                    }
                                `}
                            >
                                Upsy
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className='hidden md:flex items-center space-x-1 lg:space-x-2'>
                            {navbarItems.map(item => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href}
                                        onClick={(e) => {e.preventDefault(); handleNavClick(item.href);}}
                                        className={`
                                            relative py-2 px-3 lg:px-4 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base
                                            ${activeSection === item.id
                                                ? isScrolled
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-yellow-300 bg-white/15'
                                                : isScrolled 
                                                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                            }
                                        `}
                                    >
                                        {item.name}
                                        {activeSection === item.id && (
                                            <div className={`
                                                absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 rounded-full transition-all duration-300
                                                ${isScrolled ? 'bg-blue-600' : 'bg-yellow-300'}
                                            `} />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul> 

                        {/* CTA Button (Desktop) */}
                        <div className="hidden md:block">
                            <Link 
                                href="/form"
                                className={`
                                    group relative px-4 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-xl font-semibold transition-all duration-300
                                    ${isScrolled 
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105' 
                                        : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30'
                                    }
                                `}
                            >
                                <span className="group-hover:mr-1 transition-all duration-300">Get Early Access</span>
                                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`
                                md:hidden relative z-60 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-300
                                ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}
                            `}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <div className="relative">
                                <RxCross1 className={`absolute text-lg sm:text-xl transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
                                <RxHamburgerMenu className={`text-lg sm:text-xl transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu with Framer Motion */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>
                
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: menuOpen ? 0 : '100%' }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="md:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] max-w-[85vw] bg-white/95 backdrop-blur-md shadow-2xl z-50"
                >
                    {/* Mobile menu content */}
                    <div className="h-full overflow-y-auto">
                        <div className="p-4">
                            {/* Mobile menu header */}
                            <div className="flex items-center justify-between mb-8 pt-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                        <span className="font-bold text-sm text-white">U</span>
                                    </div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                        Upsy
                                    </span>
                                </div>
                            </div>

                            {/* Navigation items */}
                            <ul className="space-y-2">
                                {navbarItems.map(item => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => {e.preventDefault(); handleNavClick(item.href);}}
                                            className={`
                                                block py-3 px-4 rounded-xl font-medium transition-all duration-300
                                                ${activeSection === item.id
                                                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                }
                                            `}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile CTA Button */}
                            <div className="mt-8">
                                <Link
                                    href="/form"
                                    className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg text-center block'
                                >
                                    Get Early Access →
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Dynamic spacer */}
            <div className={`transition-all duration-300 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}></div>
        </>
    );
}

export default Navbar
