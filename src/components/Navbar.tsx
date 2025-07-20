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

    // Close mobile menu when clicking outside or on escape
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.querySelector('nav');
            const mobileMenu = document.querySelector('[data-mobile-menu]');
            if (menuOpen && nav && mobileMenu && 
                !nav.contains(event.target as Node) && 
                !mobileMenu.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const navVariants = {
        initial: {
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
                    fixed top-0 w-full z-40
                    ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'}
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
                                md:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 touch-manipulation
                                ${isScrolled ? 'text-gray-700 hover:bg-gray-100 active:bg-gray-200' : 'text-white hover:bg-white/10 active:bg-white/20'}
                            `}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                <RxCross1 className={`absolute text-lg transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`} />
                                <RxHamburgerMenu className={`absolute text-lg transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Backdrop and Sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMenuOpen(false)}
                        />
                        
                        {/* Mobile Menu Sidebar */}
                        <motion.div
                            data-mobile-menu
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            className="md:hidden fixed top-0 right-0 h-full w-[min(85vw,320px)] bg-white shadow-2xl z-50"
                        >
                            {/* Mobile menu content */}
                            <div className="h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                            <span className="font-bold text-sm text-white">U</span>
                                        </div>
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                            Upsy
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        aria-label="Close menu"
                                    >
                                        <RxCross1 className="text-lg" />
                                    </button>
                                </div>

                                {/* Navigation items */}
                                <div className="flex-1 overflow-y-auto px-4 py-4">
                                    <ul className="space-y-1">
                                        {navbarItems.map(item => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => {e.preventDefault(); handleNavClick(item.href);}}
                                                    className={`
                                                        block py-3 px-4 rounded-xl font-medium transition-all duration-200 text-base
                                                        ${activeSection === item.id
                                                            ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                                                        }
                                                    `}
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Mobile CTA Button */}
                                <div className="p-4 border-t border-gray-100">
                                    <Link
                                        href="/form"
                                        onClick={() => setMenuOpen(false)}
                                        className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 text-center block touch-manipulation'
                                    >
                                        Get Early Access →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Dynamic spacer */}
            <div className={`transition-all duration-300 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-18'}`}></div>
        </>
    );
}

export default Navbar
