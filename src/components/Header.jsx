import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { navigation } from '../constants';

const Header = () => {
    const [scrolled, setscrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setscrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlenavClick = (e, url) => {
      e.preventDefault();
      const targetElement = document.querySelector(url);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Update the URL in the browser without reloading the page
        window.history.pushState(null, '', url);
      }
      setMenuOpen(false); // Close the menu on navigation
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-lg' : ''}`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <a href='#about'
                        className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent hover:text-purple-400 bg-clip-text'>
                        MR
                    </a>
                    {/* Hamburger Menu Icon For Smaller Screens */}
                    <div className='sm:hidden'>
                        <button onClick={() => setMenuOpen(!menuOpen)}
                            className='hover:text-purple-400 transition-colors bg-purple-900 p-2 rounded-md'>
                            {menuOpen ? (
                                //Cross Icon
                                <FontAwesomeIcon icon={faTimes} className='text-white w-5 h-5' />
                            ) : (
                                //Hamburger Icon
                                <FontAwesomeIcon icon={faBars} className='text-white w-5 h-5' />
                            )}
                        </button>
                    </div>

                    {/* Navigation Links for Larger Screens */}
                    <div className='hidden sm:flex space-x-8'>
                        {navigation.map((item) => (
                            <a key={item.id}
                                href={item.url}
                                onClick={(e) => handlenavClick(e, item.url)}
                                className='text-white hover:text-purple-400 transition-colors bg-transparent' >
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
                {/*For  Mobile Menu */}
                {menuOpen && (
                    <div className='sm:hidden bg-black/70 backdrop-blur-lg p-4 rounded-lg mt-2'>
                        <div className='flex flex-col space-y-4'>
                            {navigation.map((item) => (
                                <a key={item.id}
                                    href={item.url}
                                    onClick={(e) => handlenavClick(e, item.url)}
                                    className='text-white hover:text-purple-400 transition-colors bg-transparent'>
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header