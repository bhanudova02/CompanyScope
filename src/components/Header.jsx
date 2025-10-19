import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 w-full z-50 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 shadow-xs py-3 px-8 relative">
                <Link to="/">
                    <img src="./logo.png" width={100} height={100} alt="logo" className="w-52" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-6 font-medium text-zinc-700">
                    <li>
                        <Link to="/" className="hover:text-orange-600">Home</Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="hover:text-orange-600">About-Us</Link>
                    </li>
                    <li>
                        <Link to="/help" className="hover:text-orange-600">Help</Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div className="block md:hidden">
                    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                        <RiMenu3Line className="text-gray-600 text-2xl" />
                    </button>
                </div>

                {/* Sidebar Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/40 bg-opacity-40 z-40" onClick={() => setIsOpen(false)}></div>
                )}

                {/* Sidebar Drawer */}
                <div
                    className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div>
                            <img src="./logo.png" width={100} height={100} alt="logo" className="w-32" />
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <RiCloseLine className="text-gray-500 text-2xl" />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-5 p-6 text-gray-700 font-medium">
                        <li>
                            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-600">Home</Link>
                        </li>
                        <li>
                            <Link to="/about-us" onClick={() => setIsOpen(false)} className="hover:text-orange-600">About Us</Link>
                        </li>
                        <li>
                            <Link to="/help" onClick={() => setIsOpen(false)} className="hover:text-orange-600">Help</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
