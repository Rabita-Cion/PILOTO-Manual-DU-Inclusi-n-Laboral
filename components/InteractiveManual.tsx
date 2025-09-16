
import React, { useState } from 'react';
import { MANUAL_MODULES } from '../constants';
import { ManualModule, ContentType, QuizContent } from '../types';

const QuizComponent: React.FC<{ quiz: QuizContent }> = ({ quiz }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  const getButtonClass = (index: number, isCorrect: boolean) => {
    if (!showResult) {
      return 'bg-white hover:bg-gray-100';
    }
    if (index === selected) {
      return isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    }
    if (isCorrect) {
      return 'bg-green-200 text-green-800';
    }
    return 'bg-white';
  };

  return (
    <div className="mt-4 p-6 bg-brand-light rounded-lg shadow-inner">
      <h4 className="font-bold text-lg text-brand-dark">{quiz.question}</h4>
      <div className="space-y-3 mt-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${getButtonClass(index, option.isCorrect)}`}
            disabled={showResult}
          >
            {option.text}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
          <p className="font-semibold">Explicación:</p>
          <p>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
};


const InteractiveManual: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ManualModule>(MANUAL_MODULES[0]);

  return (
    <section id="manual" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-brand-dark mb-4">Manual Interactivo</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Una experiencia de aprendizaje progresiva y adaptable para fomentar una cultura de inclusión real en tu organización.
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-24">
              <ul className="space-y-2">
                {MANUAL_MODULES.map((module) => (
                  <li key={module.id}>
                    <button
                      onClick={() => setActiveModule(module)}
                      className={`w-full text-left p-4 rounded-lg flex items-center transition-all duration-200 ${activeModule.id === module.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-brand-dark'}`}
                    >
                      {module.icon}
                      <div>
                        <p className="font-semibold">{module.title}</p>
                        <p className="text-sm opacity-90">{module.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="lg:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-3xl font-bold text-brand-primary mb-6">{activeModule.title}</h3>
              <div className="space-y-8">
                {activeModule.contentBlocks.map((block, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                     {block.title && <h4 className="text-2xl font-semibold text-brand-dark mb-4">{block.title}</h4>}
                    {block.type === ContentType.TEXT && <p className="text-gray-700 leading-relaxed">{block.content as string}</p>}
                    {block.type === ContentType.VIDEO && (
                       <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                         <iframe src={block.content as string} title={block.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                       </div>
                    )}
                    {block.type === ContentType.INFOGRAPHIC && <img src={block.content as string} alt={block.title || 'Infografía'} className="w-full h-auto rounded-lg shadow-md" />}
                    {block.type === ContentType.DOWNLOAD && (
                      <a href={block.content as string} download className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white font-semibold rounded-lg hover:bg-brand-secondary/90 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Descargar {block.title}
                      </a>
                    )}
                    {block.type === ContentType.QUIZ && <QuizComponent quiz={block.content as QuizContent} />}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default InteractiveManual;
