// apps/frontend / src / components / DropdownMenu.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import LogoutButton from '@/components/LogoutButton';
/**
 * DropdownMenu component.
 * Displays a dropdown menu with various options.
 */
export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 rounded-md
                    bg-netflix-light-border text-netflix-light-secondary hover:bg-netflix-light-secondary
                    dark:bg-netflix-dark-border dark:text-netflix-dark-secondary dark:hover:bg-netflix-dark-secondary
                    transition-colors duration-200 ease-in-out"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="mr-2 hidden sm:inline">Menu</span>
                <FiChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>



            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                     bg-netflix-light-dark dark:bg-netflix-dark-light ring-1 ring-black ring-opacity-5
                     focus:outline-none z-50 origin-top-right animate-fade-in-scale"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="border-t border-netflix-light-border dark:border-netflix-dark-border my-1"></div>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
}