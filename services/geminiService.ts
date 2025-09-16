
import { GoogleGenAI, Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const SYSTEM_INSTRUCTION = `Eres 'Acti', un asistente de IA amigable y experto para la plataforma 'Inclusión Laboral Activa'. Tu propósito es ayudar a los usuarios a comprender la conciencia sobre la discapacidad, el reclutamiento inclusivo y la accesibilidad en el lugar de trabajo. Responde preguntas basadas en el contenido de la plataforma, define términos clave como 'ajustes razonables' y guía a los usuarios a través del manual interactivo. Mantén un tono de apoyo, alentador y profesional. No proporciones asesoramiento legal o médico. Si te hacen una pregunta fuera de tu alcance, guía suavemente al usuario de vuelta a los temas de inclusión laboral. Responde en español.`;

export const createChatSession = (): Chat | null => {
  if (!API_KEY) {
    return null;
  }
  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chat;
  } catch (error) {
    console.error("Failed to create chat session:", error);
    return null;
  }
};
