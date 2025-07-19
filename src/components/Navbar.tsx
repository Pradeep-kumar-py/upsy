'use client'
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navbarItems = [
        { name: "Home", href: "/" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Who It’s For", href: "#who-its-for" },
        { name: "FAQs", href: "#faqs" },
    ];

    return (
        <nav className='bg-white flex justify-between items-center shadow-md sticky w-full py-4 px-[6%] z-50 top-0'>
            {/* Logo */}
            <div>
                <a href="/" className='text-3xl font-bold text-blue-600'>
                    Upsy
                </a>
            </div>
            {/* Hamburger Icon */}
            <button
                className="md:hidden flex items-center px-3  cursor-pointer rounded text-blue-600 focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <RxHamburgerMenu className='text-3xl' />
            </button>
            {/* Navbar Items (Desktop) */}
            <ul className='md:flex space-x-[4vw] md:text-lg hidden font-bold'>
                {navbarItems.map(item => (
                    <li key={item.name}>
                        <a href={item.href} className='text-gray-600 text-xl hover:text-blue-700 font-medium transition-colors duration-200'>{item.name}</a>
                    </li>
                ))}
            </ul> 
            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
                <a href="#cta" className='bg-blue-600 text-white text-lg px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200'>
                    Get Early Access
                </a>
            </div>
            {/* Mobile Menu with transition */}
            <div
                className={`
                    absolute top-full left-0 w-full bg-white shadow-md md:hidden z-40
                    transition-all duration-300 ease-in-out
                    ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
                `}
            >
                <ul className="flex flex-col items-center py-4 space-y-4 font-bold">
                    {navbarItems.map(item => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className='text-gray-600 hover:text-blue-700 underline font-medium transition-colors duration-200 text-lg'
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#cta"
                            className='bg-blue-600 text-white text-lg px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200 block'
                            onClick={() => setMenuOpen(false)}
                        >
                            Get Early Access
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default Navbar