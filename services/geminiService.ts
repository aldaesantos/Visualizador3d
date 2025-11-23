import { GoogleGenAI, Type } from "@google/genai";
import { GeminiMoleculeInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchMoleculeInfo = async (moleculeName: string): Promise<GeminiMoleculeInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Forneça informações detalhadas sobre a molécula ${moleculeName}.`,
      config: {
        systemInstruction: `Você é um especialista em química e professor.
        Forneça informações precisas e educativas sobre moléculas químicas.
        Mantenha o tom profissional, mas acessível.
        A resposta deve estar estritamente em Português do Brasil.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "Uma descrição geral da molécula e seu uso comum, cerca de 2-3 frases."
            },
            properties: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 3 a 5 propriedades físico-químicas importantes (ex: ponto de ebulição, polaridade)."
            },
            funFact: {
              type: Type.STRING,
              description: "Uma curiosidade interessante ou fato histórico sobre a molécula."
            },
            safety: {
              type: Type.STRING,
              description: "Aviso resumido sobre segurança ou toxicidade."
            }
          },
          required: ["description", "properties", "funFact", "safety"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiMoleculeInfo;
    }
    
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data in case of error (or missing API key)
    return {
      description: "Não foi possível carregar as informações detalhadas da IA no momento. Verifique sua chave de API.",
      properties: ["Dados indisponíveis"],
      funFact: "A química está em toda parte!",
      safety: "Consulte a ficha técnica de segurança (FISPQ)."
    };
  }
};
