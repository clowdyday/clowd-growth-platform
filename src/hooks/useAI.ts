import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type AIFeature =
  | "estimate_recommendation"
  | "ad_copy"
  | "social_calendar"
  | "website_copy"
  | "strategy_brief"
  | "onboarding_help"
  | "onboarding_assistant";

interface UseAIResult {
  generate: (feature: AIFeature, context: Record<string, any>) => Promise<string | null>;
  loading: boolean;
  error: string | null;
  result: string | null;
  reset: () => void;
}

export function useAI(): UseAIResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generate = async (
    feature: AIFeature,
    context: Record<string, any>
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-generate", {
        body: { feature, context },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);

      const output = data?.result ?? null;
      setResult(output);
      return output;
    } catch (err: any) {
      const msg = err.message || "AI generation failed. Please try again.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return { generate, loading, error, result, reset };
}
