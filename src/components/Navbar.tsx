import React from 'react'

const Navbar = () => {

    const navbarItems = [
        { name: "Home", href: "/" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Who It’s For", href: "#who-its-for" },
        { name: "FAQs", href: "#faqs" },
    ];

    return (
        <nav className='bg-white flex justify-between items-center shadow-md sticky w-full py-4 px-[5%]'>
            {/* Logo */}
            <div>
                <a href="/" className='text-3xl font-bold text-blue-600 px-6'>
                    Upsy
                </a>
            </div>
            {/* Navbar Items */}
            <ul className='flex space-x-10 text-lg font-bold'>
                {navbarItems.map(item => (
                    <li key={item.name}>
                        <a href={item.href} className='text-gray-600 hover:text-blue-700 font-medium transition-colors duration-200'>{item.name}</a>
                    </li>
                ))}
            </ul>
            {/* CTA Button */}
            <div>
                <a href="#cta" className='bg-blue-600 text-white text-lg px-4 py-2 rounded hover:bg-blue-700 transition duration-200'>
                    Get Early Access
                </a>
            </div>

        </nav>
    );
}


export default Navbar