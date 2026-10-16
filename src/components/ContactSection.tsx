import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ContactSectionProps {
  initialDiscipline?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialDiscipline = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('10k - 25k €');
  const [service, setService] = useState(initialDiscipline || 'Direction Artistique');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = ['5k - 10k €', '10k - 25k €', '25k - 50k €', '50k+ €'];
  const serviceOptions = [
    'Direction Artistique',
    'Expérience WebGL',
    '3D & Motion',
    'Spatial & Scénographie',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    soundEngine.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      soundEngine.playConfirm();
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Coordinates & Studio Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E1E] uppercase tracking-widest">
                <span>06. COLLABORATION</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500">BRIEF STUDIO</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
                Inaugurons <span className="text-[#FF1E1E]">Ensemble</span>.
              </h2>

              <p className="text-base text-[#A1A1AA] leading-relaxed font-sans">
                Chaque grand projet commence par une conversation sans filtre. Parlez-nous de vos ambitions esthétiques, de vos contraintes techniques et de vos échéances.
              </p>
            </div>

            {/* Direct Studio Contacts */}
            <div className="space-y-4 pt-4 border-t border-[#222222] text-xs font-mono">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-500">EMAIL DIRECT</span>
                <a
                  href="mailto:mml.gerant@gmail.com"
                  className="text-white hover:text-[#FF1E1E] transition-colors"
                >
                  mml.gerant@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-500">ATELIER PARIS</span>
                <span className="text-white">18 Rue de Paradis, 75010 Paris</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-neutral-500">DISPONIBILITÉ</span>
                <span className="text-[#FF1E1E] font-bold">Q4 2026 // 2 CRÉNEAUX</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Contrast Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-[#262626]">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#FF1E1E]/20 text-[#FF1E1E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase">
                    Brief Reçu avec Succès
                  </h3>
                  <p className="text-sm text-[#A1A1AA] max-w-md mx-auto font-sans">
                    Merci {name}. Notre direction de création étudie votre demande et reviendra vers vous sous 24h ouvrées.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-6 px-6 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF1E1E] hover:text-white transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Discipline / Service Choice */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
                      Type de Discipline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {serviceOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setService(opt);
                          }}
                          className={`py-2 px-2 text-[11px] font-mono uppercase tracking-wider rounded border text-center transition-all ${
                            service === opt
                              ? 'bg-white text-black font-bold border-white'
                              : 'border-[#262626] text-neutral-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
                        Votre Nom / Entité *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Alexis de Neoclub"
                        className="w-full px-4 py-3 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E1E] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alexis@neoclub.fr"
                        className="w-full px-4 py-3 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E1E] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget Options */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
                      Fourchette de Budget Indicative
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setBudget(b);
                          }}
                          className={`py-2 px-2 text-xs font-mono tracking-wider rounded border text-center transition-all ${
                            budget === b
                              ? 'bg-[#FF1E1E] text-white font-bold border-[#FF1E1E]'
                              : 'border-[#262626] text-neutral-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
                      Votre Vision & Échéances
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Décrivez votre projet, vos références esthétiques et votre date cible de lancement..."
                      className="w-full px-4 py-3 bg-[#141414] border border-[#2B2B2B] rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF1E1E] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#FF1E1E] hover:bg-[#E01010] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 rounded"
                  >
                    {isSubmitting ? (
                      <span>Transmission en cours...</span>
                    ) : (
                      <>
                        <span>Transmettre le brief studio</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
