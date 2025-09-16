
import React from 'react';
import { ManualModule, ContentType } from './types';

// Helper component for icons
const ModuleIcon = ({ d }: { d: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);


export const MANUAL_MODULES: ManualModule[] = [
  {
    id: 'module1',
    title: 'Entendiendo la Discapacidad',
    description: 'Definiciones, modelos, mitos y realidades.',
    icon: <ModuleIcon d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    contentBlocks: [
      {
        type: ContentType.TEXT,
        title: 'Introducción a la Discapacidad',
        content: 'La discapacidad es un concepto que evoluciona y que resulta de la interacción entre las personas con deficiencias y las barreras debidas a la actitud y al entorno que evitan su participación plena y efectiva en la sociedad, en igualdad de condiciones con las demás. Es crucial superar los mitos y entender la discapacidad desde un modelo social y de derechos humanos.'
      },
      {
        type: ContentType.VIDEO,
        title: 'Video: El Modelo Social de la Discapacidad',
        content: 'https://www.youtube.com/embed/p62Y_oA5G_g' // Placeholder Video
      },
      {
        type: ContentType.QUIZ,
        title: 'Verifica tu Conocimiento',
        content: {
          question: '¿Cuál es el enfoque principal del modelo social de la discapacidad?',
          options: [
            { text: 'Las limitaciones médicas de una persona.', isCorrect: false },
            { text: 'Las barreras en la sociedad que impiden la inclusión.', isCorrect: true },
            { text: 'La necesidad de caridad para las personas con discapacidad.', isCorrect: false },
          ],
          explanation: 'El modelo social se centra en cómo la sociedad crea barreras (físicas, de actitud, de comunicación) que "discapacitan" a las personas. El objetivo es eliminar estas barreras para lograr la plena inclusión.'
        }
      }
    ],
  },
  {
    id: 'module2',
    title: 'Reclutamiento Inclusivo',
    description: 'Atraer talento diverso sin sesgos.',
    icon: <ModuleIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    contentBlocks: [
       {
        type: ContentType.TEXT,
        title: 'Descripciones de Puestos Inclusivas',
        content: 'Utiliza un lenguaje neutral y céntrate en las funciones esenciales del puesto. Evita requisitos que no sean estrictamente necesarios y que puedan excluir a candidatos capacitados. Por ejemplo, en lugar de "requiere licencia de conducir", considera si "capacidad para desplazarse a diferentes lugares" es más apropiado.'
      },
      {
        type: ContentType.DOWNLOAD,
        title: 'Plantilla de Descripción Inclusiva',
        content: '/plantilla-descripcion-inclusiva.pdf'
      },
      {
        type: ContentType.INFOGRAPHIC,
        title: 'Canales de Búsqueda de Talento',
        content: 'https://picsum.photos/800/450'
      }
    ]
  },
  {
    id: 'module3',
    title: 'Adaptación del Entorno Laboral',
    description: 'Accesibilidad física, digital y ajustes razonables.',
    icon: <ModuleIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    contentBlocks: [
      {
        type: ContentType.TEXT,
        title: '¿Qué son los Ajustes Razonables?',
        content: 'Los "ajustes razonables" son las modificaciones y adaptaciones necesarias y adecuadas que no impongan una carga desproporcionada o indebida, cuando se requieran en un caso particular, para garantizar a las personas con discapacidad el goce o ejercicio, en igualdad de condiciones con las demás, de todos los derechos humanos y libertades fundamentales. Esto puede incluir software especializado, mobiliario ergonómico o flexibilidad horaria.'
      },
       {
        type: ContentType.QUIZ,
        title: 'Verifica tu Conocimiento',
        content: {
          question: '¿Cuál de los siguientes es un ejemplo de ajuste razonable?',
          options: [
            { text: 'Un lector de pantalla para un empleado con discapacidad visual.', isCorrect: true },
            { text: 'Reducir el salario del empleado.', isCorrect: false },
            { text: 'Excluir al empleado de reuniones de equipo.', isCorrect: false },
          ],
          explanation: 'Un lector de pantalla es una tecnología de apoyo que permite a una persona con discapacidad visual acceder a la información digital, siendo un ajuste razonable y efectivo.'
        }
      }
    ]
  },
];
