import Hand from './components/hand.jsx';
import Navigation from './components/Navigation.jsx'
import './App.css'


export default function App() {
    return (
        <div className="overflow-x-hidden">
            <Navigation />
            
            <section id="hand" className="h-screen">
                <Hand />
            </section>
            
            <section id="model2" className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"> Title = H2 </h2>
                    <p className="text-xl text-white/70"> Description = P </p>
                </div>
            </section>
            
            <section id="model3" className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"> Title = H2</h2>
                    <p className="text-xl text-white/70"> Description = P </p>
                </div>
            </section>
            
            <section id="model4" className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 tracking-wide"> Title = H2 </h2>
                    <p className="text-xl text-white/70"> Description = P </p>
                </div>
            </section>
            
        </div>
    );
}
