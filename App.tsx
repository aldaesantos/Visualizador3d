import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOLECULES } from './constants';
import { MoleculeData, GeminiMoleculeInfo } from './types';
import { MoleculeScene } from './components/MoleculeScene';
import { fetchMoleculeInfo } from './services/geminiService';
import { Loader2, Atom, Info, FlaskConical, AlertTriangle, Lightbulb, ChevronRight, Search, X } from 'lucide-react';

export default function App() {
  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData>(MOLECULES[0]);
  const [aiInfo, setAiInfo] = useState<GeminiMoleculeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadAiInfo = useCallback(async (moleculeName: string) => {
    setIsLoading(true);
    setAiInfo(null);
    try {
      const info = await fetchMoleculeInfo(moleculeName);
      setAiInfo(info);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAiInfo(selectedMolecule.name);
  }, [selectedMolecule, loadAiInfo]);

  const filteredMolecules = useMemo(() => {
      const lowerSearch = searchTerm.toLowerCase();
      return MOLECULES.filter(mol => 
          mol.name.toLowerCase().includes(lowerSearch) || 
          mol.formula.toLowerCase().includes(lowerSearch)
      );
  }, [searchTerm]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950 overflow-hidden text-slate-100">
      
      {/* Sidebar - Molecule Selector */}
      <aside 
        className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0 opacity-0 md:w-0 md:opacity-0'} 
        transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col z-20 absolute md:relative h-full`}
      >
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-science-600 rounded-lg">
                    <Atom className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Molécula 3D</h1>
                    <p className="text-xs text-science-500 font-medium">Visualizador Interativo</p>
                </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400">
                 <ChevronRight />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                  type="text"
                  placeholder="Buscar molécula ou fórmula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-8 py-2 text-sm text-slate-200 focus:outline-none focus:border-science-500 transition-colors"
              />
              {searchTerm && (
                  <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                      <X className="w-3 h-3" />
                  </button>
              )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              {filteredMolecules.length} Moléculas Encontradas
          </h3>
          
          {filteredMolecules.length === 0 ? (
              <div className="text-center text-slate-500 py-8 text-sm">
                  Nenhuma molécula encontrada para "{searchTerm}"
              </div>
          ) : (
            filteredMolecules.map((mol) => (
                <button
                key={mol.id}
                onClick={() => {
                    setSelectedMolecule(mol);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group
                    ${selectedMolecule.id === mol.id 
                    ? 'bg-science-600 text-white shadow-lg shadow-science-900/20' 
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'}`}
                >
                <div>
                    <span className="font-semibold block">{mol.name}</span>
                    <span className={`text-xs ${selectedMolecule.id === mol.id ? 'text-science-200' : 'text-slate-500 group-hover:text-slate-400'}`}>
                        {mol.formula}
                    </span>
                </div>
                {selectedMolecule.id === mol.id && <ChevronRight className="w-4 h-4 opacity-75" />}
                </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Powered by Gemini AI • React Three Fiber
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Mobile Header Toggle */}
        {!isSidebarOpen && (
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-4 left-4 z-20 bg-slate-900/80 p-2 rounded-lg text-white backdrop-blur border border-white/10 md:hidden"
            >
                <Atom className="w-6 h-6" />
            </button>
        )}

        {/* 3D Viewport */}
        <div className="flex-1 relative bg-black">
          <MoleculeScene molecule={selectedMolecule} />
        </div>

        {/* Info Panel (Bottom Sheet style on desktop, scrollable below on mobile) */}
        <div className="bg-slate-900 border-t border-slate-800 h-1/3 md:h-64 overflow-y-auto p-6 md:p-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-10 relative">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                            {selectedMolecule.name} 
                            <span className="text-xl font-mono text-science-400 bg-science-900/30 px-2 py-1 rounded border border-science-500/20">
                                {selectedMolecule.formula}
                            </span>
                        </h2>
                    </div>
                    {/* Visual indicator for AI loading */}
                    {isLoading ? (
                        <div className="flex items-center gap-2 text-science-400 animate-pulse bg-science-950/50 px-3 py-1 rounded-full border border-science-900">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs font-medium">Gemini analisando...</span>
                        </div>
                    ) : (
                         <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-900/50">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-xs font-medium">Info carregada</span>
                        </div>
                    )}
                </div>

                {isLoading ? (
                   <div className="space-y-4 animate-pulse opacity-50">
                       <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                       <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                       <div className="h-20 bg-slate-700 rounded w-full"></div>
                   </div>
                ) : aiInfo ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                           <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                               <h3 className="text-sm font-semibold text-science-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                                   <Info className="w-4 h-4" /> Descrição
                               </h3>
                               <p className="text-slate-300 leading-relaxed text-sm">
                                   {aiInfo.description}
                               </p>
                           </div>
                           
                           <div>
                               <h3 className="text-sm font-semibold text-science-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                                   <FlaskConical className="w-4 h-4" /> Propriedades
                               </h3>
                               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                   {aiInfo.properties.map((prop, idx) => (
                                       <li key={idx} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-700/30">
                                           <span className="w-1.5 h-1.5 rounded-full bg-science-500"></span>
                                           {prop}
                                       </li>
                                   ))}
                               </ul>
                           </div>
                       </div>

                       <div className="space-y-4">
                            <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/30">
                               <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                                   <Lightbulb className="w-4 h-4" /> Curiosidade
                               </h3>
                               <p className="text-amber-100/80 italic text-sm border-l-2 border-amber-600/50 pl-3">
                                   "{aiInfo.funFact}"
                               </p>
                           </div>

                           <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                               <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                                   <AlertTriangle className="w-4 h-4" /> Segurança
                               </h3>
                               <p className="text-red-200/70 text-sm">
                                   {aiInfo.safety}
                               </p>
                           </div>
                       </div>
                   </div>
                ) : (
                    <div className="text-center text-slate-500 py-8">
                        Não foi possível carregar os dados. Verifique a conexão.
                    </div>
                )}
             </div>
        </div>
      </main>
    </div>
  );
}