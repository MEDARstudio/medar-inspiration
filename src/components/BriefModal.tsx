import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDiscipline?: string;
  preselectedModules?: string[];
}

export const BriefModal: React.FC<BriefModalProps> = ({
  isOpen,
  onClose,
  preselectedDiscipline = '',
  preselectedModules = [],
}) => {
  const [step, setStep] = useState(1);
  const [discipline, setDiscipline] = useState(preselectedDiscipline || 'Direction Artistique');
  const [timeline, setTimeline] = useState('4-6 semaines');
  const [budget, setBudget] = useState('15k - 30k €');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedDiscipline) {
      setDiscipline(preselectedDiscipline);
    }
  }, [preselectedDiscipline]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const disciplines = [
    'Direction Artistique',
    'Expérience WebGL & Dev',
    '3D, Motion & CGI',
    'Scénographie & Sonore',
  ];

  const timelines = ['Moins d’un mois', '4-6 semaines', '2-3 mois', 'Date flexible'];
  const budgets = ['8k - 15k €', '15k - 30k €', '30k - 60k €', '60k+ €'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playConfirm();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0E0E0E] border border-[#262626] rounded-2xl shadow-2xl z-10 overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF1E1E]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              BRIEF STUDIO // ÉTAPE {step} SUR 3
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white border border-white/10 hover:border-[#FF1E1E] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FF1E1E]/20 text-[#FF1E1E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
                Brief Transmis à l’Atelier
              </h3>
              <p className="text-sm text-[#A1A1AA] max-w-md mx-auto font-sans">
                Merci {name || 'cher visiteur'}. L’équipe Medar Studio va analyser vos éléments et préparer une première note de cadrage.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-[#FF1E1E] text-white font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E01010] transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                      Quelle est la nature du projet ?
                    </h3>
                    <p className="text-xs text-[#8E8E93] font-mono">
                      Sélectionnez la dominante créative principale.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {disciplines.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setDiscipline(d);
                        }}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          discipline === d
                            ? 'bg-[#181818] border-[#FF1E1E] text-white font-bold shadow-md shadow-red-950/20'
                            : 'bg-[#121212] border-[#222222] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-mono block mb-1 text-[#FF1E1E]">0{disciplines.indexOf(d) + 1}</span>
                        <span className="text-sm font-display">{d}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setStep(2);
                      }}
                      className="px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF1E1E] hover:text-white transition-colors flex items-center gap-2 rounded"
                    >
                      <span>Continuer</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                      Échéances & Enveloppe
                    </h3>
                    <p className="text-xs text-[#8E8E93] font-mono">
                      Ajustez les paramètres prévisionnels de production.
                    </p>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase">Budget Estimé</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setBudget(b);
                          }}
                          className={`p-3 rounded border text-xs font-mono transition-all ${
                            budget === b
                              ? 'bg-[#FF1E1E] text-white font-bold border-[#FF1E1E]'
                              : 'bg-[#121212] border-[#222222] text-neutral-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase">Délai Souhaité</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelines.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setTimeline(t);
                          }}
                          className={`p-3 rounded border text-xs font-mono transition-all ${
                            timeline === t
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-[#121212] border-[#222222] text-neutral-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setStep(1);
                      }}
                      className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Retour</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setStep(3);
                      }}
                      className="px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF1E1E] hover:text-white transition-colors flex items-center gap-2 rounded"
                    >
                      <span>Dernière étape</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                      Vos Coordonnées
                    </h3>
                    <p className="text-xs text-[#8E8E93] font-mono">
                      Où devons-nous adresser notre retour stratégique ?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-[#8E8E93] uppercase">Votre Nom *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alexis Fontaine"
                        className="w-full px-4 py-2.5 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white focus:outline-none focus:border-[#FF1E1E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-[#8E8E93] uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alexis@brand.com"
                        className="w-full px-4 py-2.5 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white focus:outline-none focus:border-[#FF1E1E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#8E8E93] uppercase">Marque ou Organisation</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Neoclub Records / Maison Noire"
                      className="w-full px-4 py-2.5 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white focus:outline-none focus:border-[#FF1E1E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#8E8E93] uppercase">Notes & Liens de Référence</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Précisez tout lien Figma, site d'inspiration ou contexte utile..."
                      className="w-full px-4 py-2.5 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white focus:outline-none focus:border-[#FF1E1E] resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setStep(2);
                      }}
                      className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Retour</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#FF1E1E] hover:bg-[#E01010] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 rounded"
                    >
                      <span>Transmettre le brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
