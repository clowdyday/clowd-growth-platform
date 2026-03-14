import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Circle, ChevronRight, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export interface OnboardingField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "url" | "email" | "tel";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface OnboardingStepConfig {
  key: string;
  label: string;
  desc: string;
  fields: OnboardingField[];
}

interface OnboardingFormProps {
  steps: OnboardingStepConfig[];
  serviceId: string;
  onboarding: Tables<"service_onboarding">[];
  setOnboarding: (data: Tables<"service_onboarding">[]) => void;
  onAllComplete: () => void;
  accentClass?: string;
}

export function OnboardingForm({
  steps,
  serviceId,
  onboarding,
  setOnboarding,
  onAllComplete,
  accentClass = "bg-accent",
}: OnboardingFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const completedSteps = onboarding.filter((s) => s.completed).length;

  const handleOpenStep = (stepKey: string) => {
    const existing = onboarding.find((o) => o.step_key === stepKey);
    if (existing?.completed) return;
    // Pre-fill from existing step_data
    const existingData = existing?.step_data as Record<string, string> | null;
    setFormData(existingData || {});
    setActiveStep(stepKey);
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveStep = async (stepKey: string, stepFields: OnboardingField[]) => {
    if (!user) return;

    // Validate required fields
    for (const field of stepFields) {
      if (field.required && !formData[field.name]?.trim()) {
        toast({ title: `${field.label} is required`, variant: "destructive" });
        return;
      }
    }

    setSaving(true);
    const existing = onboarding.find((o) => o.step_key === stepKey);

    if (existing) {
      await supabase
        .from("service_onboarding")
        .update({ step_data: formData as any, completed: true })
        .eq("id", existing.id);
      setOnboarding(
        onboarding.map((o) =>
          o.id === existing.id ? { ...o, step_data: formData as any, completed: true } : o
        )
      );
    } else {
      const { data } = await supabase
        .from("service_onboarding")
        .insert({
          user_id: user.id,
          service_id: serviceId,
          step_key: stepKey,
          step_data: formData as any,
          completed: true,
        })
        .select()
        .single();
      if (data) setOnboarding([...onboarding, data]);
    }

    setSaving(false);
    setActiveStep(null);
    toast({ title: "Step completed!" });

    // Check if all done
    const newCompleted = completedSteps + (existing?.completed ? 0 : 1);
    if (newCompleted >= steps.length) {
      onAllComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">Onboarding Progress</h2>
        <span className="text-sm text-muted-foreground">
          {completedSteps}/{steps.length} complete
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${accentClass} rounded-full transition-all duration-500`}
          style={{ width: `${(completedSteps / steps.length) * 100}%` }}
        />
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const completed = onboarding.some((o) => o.step_key === step.key && o.completed);
          const isOpen = activeStep === step.key;

          return (
            <div key={step.key} className="glass-card overflow-hidden transition-all">
              <button
                onClick={() => (isOpen ? setActiveStep(null) : handleOpenStep(step.key))}
                className={`w-full p-5 flex items-center gap-4 text-left transition-all ${
                  completed ? "opacity-60" : "hover:bg-muted/30 cursor-pointer"
                }`}
                disabled={completed}
              >
                {completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.desc}</div>
                </div>
                {!completed && (
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                )}
                <span className="text-xs text-muted-foreground">Step {i + 1}</span>
              </button>

              {isOpen && !completed && (
                <div className="px-5 pb-5 pt-2 border-t border-border space-y-4">
                  {step.fields.map((field) => (
                    <div key={field.name}>
                      <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>

                      {field.type === "select" ? (
                        <Select
                          value={formData[field.name] || ""}
                          onValueChange={(val) => handleFieldChange(field.name, val)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={field.placeholder || "Select..."} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "textarea" ? (
                        <Textarea
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[80px]"
                        />
                      ) : (
                        <Input
                          type={field.type}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}

                  <Button
                    variant="cta"
                    size="sm"
                    onClick={() => handleSaveStep(step.key, step.fields)}
                    disabled={saving}
                  >
                    <Save className="mr-1 w-4 h-4" />
                    {saving ? "Saving..." : "Save & Complete Step"}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
