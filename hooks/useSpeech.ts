
import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        utteranceRef.current = null;
    }
    setIsSpeaking(false);
    setSpeakingId(null);
  }, []);

  const speak = useCallback(async (text: string, id: string) => {
    if (speakingId === id && isSpeaking) {
      cancel();
      return;
    }

    cancel();

    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    setIsSpeaking(true);
    setSpeakingId(id);

    // Try Gemini AI Voice first
    try {
      if (process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: cleanText }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' }, // High quality AI voice
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioUrl = `data:audio/wav;base64,${base64Audio}`;
          const audio = new Audio(audioUrl);
          audioRef.current = audio;
          
          audio.onended = () => {
            setIsSpeaking(false);
            setSpeakingId(null);
            audioRef.current = null;
          };
          
          audio.onerror = () => {
            console.error("AI Audio playback error");
            setIsSpeaking(false);
            setSpeakingId(null);
          };

          await audio.play();
          return; // Success, don't fallback
        }
      }
    } catch (err) {
      console.warn("Gemini AI Voice failed, falling back to browser TTS:", err);
    }

    // Fallback to Browser TTS
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSpeaking(false);
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google US English') || 
      v.name.includes('Microsoft Zira') || 
      v.name.includes('Samantha') || 
      (v.lang === 'en-US' && v.name.includes('Natural')) ||
      (v.lang.startsWith('en') && v.default)
    );
    
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    // Normal, natural settings
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 
    utterance.volume = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
      utteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') {
        setIsSpeaking(false);
        setSpeakingId(null);
        return;
      }
      console.warn("Speech synthesis error:", e.error || 'Unknown error');
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Failed to start fallback speech:", err);
      setIsSpeaking(false);
      setSpeakingId(null);
    }

  }, [cancel, isSpeaking, speakingId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const load = () => { window.speechSynthesis.getVoices(); };
        load();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = load;
        }
    }
    return () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };
  }, []);

  return {
    speak,
    cancel,
    isSpeaking,
    speakingId
  };
};
