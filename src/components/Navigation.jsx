

export default function Navigation() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8">
            <nav className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-12 py-4 shadow-2xl">
                <ul className="flex items-center justify-center">
                    <li className="mx-8">
                        <a 
                            href="#home"
                            className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide uppercase relative group"
                        >
                            Home
                            <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li className="mx-12">
                        <a 
                            href="#services" 
                            className="text-white hover:text-white transition-all duration-300 font-semibold text-base tracking-wide uppercase relative group"
                        >
                            Services
                            <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li className="ml-8">
                        <a 
                            href="#contact" 
                            className="text-white hover:text-white transition-all duration-300 font-semibold text-base tracking-wide uppercase relative group"
                        >
                            Contact
                            <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
