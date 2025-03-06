// This is a client-side implementation of the Gemini API

export interface GeminiConfig {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export class GeminiAPI {
  private apiKey: string;
  private model: string;
  private config: GeminiConfig;
  private history: ChatMessage[];

  constructor(
    apiKey: string,
    model = "gemini-2.0-flash",
    config: GeminiConfig = {},
  ) {
    this.apiKey = apiKey;
    this.model = model;
    this.config = {
      temperature: config.temperature || 1,
      topP: config.topP || 0.95,
      topK: config.topK || 40,
      maxOutputTokens: config.maxOutputTokens || 8192,
      responseMimeType: config.responseMimeType || "text/plain",
    };
    this.history = [];
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API key is required");
    }

    // Add user message to history
    this.history.push({ role: "user", content: message });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: this.formatHistoryForAPI(),
            generationConfig: this.config,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${errorData.error?.message || response.statusText}`,
        );
      }

      const data = await response.json();
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated";

      // Add model response to history
      this.history.push({ role: "model", content: responseText });

      return responseText;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  private formatHistoryForAPI() {
    return this.history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
  }

  clearHistory() {
    this.history = [];
    return this;
  }

  getHistory(): ChatMessage[] {
    return [...this.history];
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    return this;
  }
}

// Singleton instance
let geminiInstance: GeminiAPI | null = null;

export const getGeminiAPI = (apiKey?: string): GeminiAPI => {
  if (!geminiInstance) {
    geminiInstance = new GeminiAPI(apiKey || "");
  } else if (apiKey) {
    geminiInstance.setApiKey(apiKey);
  }

  return geminiInstance;
};
