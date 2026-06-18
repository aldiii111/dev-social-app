import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOOKING_FOR_OPTIONS } from "@/features/feed/types";
import type { LookingFor } from "@/types";

export interface LookingForSelectFieldProps {
  value: LookingFor;
  onChange: (value: LookingFor) => void;
  disabled?: boolean;
}

export default function LookingForSelectField({
  value,
  onChange,
  disabled = false,
}: LookingForSelectFieldProps) {
  return (
    <div className="space-y-2 text-left">
      <Label htmlFor="looking-for-select" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Peran yang Dicari
      </Label>
      <Select
        value={value}
        onValueChange={(next) => onChange(next as LookingFor)}
        disabled={disabled}
      >
        <SelectTrigger id="looking-for-select" className="w-full">
          <SelectValue placeholder="Pilih peran partner" />
        </SelectTrigger>
        <SelectContent>
          {LOOKING_FOR_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
