import Hand from './components/hand.jsx';
import Navigation from './components/Navigation.jsx'
import Scroll from './components/Scroll.jsx'
import './App.css'

import { useState, useEffect } from 'react';

// Only keep the Scroll component since you have separate component files for Hand and Navigation
const ScrollComponent = () => {
    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        { id: 'hand', name: 'Hand' },
        { id: 'model2', name: 'Model 2' },
        { id: 'model3', name: 'Model 3' },
        { id: 'model4', name: 'Model 4' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const currentSection = Math.floor(scrollPosition / windowHeight);
            setActiveSection(Math.min(currentSection, sections.length - 1));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    const scrollToSection = (index) => {
        const targetPosition = index * window.innerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50">
            <nav className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full py-8 px-4 shadow-2xl">
                <div className="flex flex-col space-y-4">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(index)}
                            className={`relative group transition-all duration-300 ${
                                activeSection === index 
                                    ? 'scale-125'
                                    : 'hover:scale-110'
                            }`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                activeSection === index
                                    ? 'bg-white border-white shadow-lg shadow-white/50'
                                    : 'bg-white/20 border-white/40 hover:bg-white/40 hover:border-white/60'
                            }`} />
                        </button>
                    ))}
                </div>

            </nav>
        </div>
    );
};

export default function App() {
    return (
        <div className="overflow-x-hidden">
            <Navigation />
            
            <section id="hand" className="h-screen">
                <Hand />
            </section>
            
            <section id="model2" className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"></h2>
                    <p className="text-xl text-white/70"></p>
                </div>
            </section>
            
            <section id="model3" className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"></h2>
                    <p className="text-xl text-white/70"></p>
                </div>
            </section>
            
            <section id="model4" className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"></h2>
                    <p className="text-xl text-white/70"></p>
                </div>
            </section>
            
            <ScrollComponent />
        </div>
    );
}
