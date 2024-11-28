import { Input, Label } from "./ui";
import { Textarea } from "./ui/textarea";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  value?: string;
  isTextArea?: boolean;
  description?: string;
  isRequired?: boolean;
  id?: string;
}

export default function InputLabel({
  label = "",
  placeholder = "",
  value = "",
  isTextArea = false,
  isRequired = false,
  description,
  id = undefined,
  ...props
}: InputProps) {
  const InputComponent = isTextArea ? Textarea : Input;
  const contactIdLabel = id ? id : label;
  return (
    <div className="w-full space-y-0.5">
      <Label htmlFor={id} label={label} isRequired={isRequired}>
        {label}
      </Label>
      <InputComponent
        id={contactIdLabel}
        name={contactIdLabel}
        placeholder={placeholder}
        className="bg-background"
        defaultValue={value}
        required={isRequired}
        {...props}
      />
      {description && (
        <span className="flex justify-end px-4 text-xs text-muted-foreground">
          {description}
        </span>
      )}
    </div>
  );
}