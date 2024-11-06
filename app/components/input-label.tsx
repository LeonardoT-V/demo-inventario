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
}

export default function InputLabel({
  label = "",
  placeholder = "",
  value = "",
  isTextArea = false,
  isRequired = false,
  description,
  ...props
}: InputProps) {
  const InputComponent = isTextArea ? Textarea : Input;

  return (
    <div className="w-full  space-y-0.5">
      <Label label={label} isRequired={isRequired}>
        {label}
      </Label>
      <InputComponent
        id={label}
        name={label}
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
