import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconCheck, IconChevronDown } from "@/lib/icons";
import { Label } from "./label";

export function ComboBox({
  placeholder = "",
  id = undefined,
  label = "",
  data = [],
  onChange,
  isRequired = false,
}: {
  placeholder: string;
  id?: string;
  data: { label: string; value: string }[];
  onChange: (value: string) => void;
  label: string;
  isRequired: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const contactIdLabel = id ? id : label;
  return (
    <div className="w-full space-y-0.5">
      <Label htmlFor={contactIdLabel} label={label} isRequired={isRequired}>
        {label}
      </Label>
      <input
        required
        type="hidden"
        name={contactIdLabel}
        value={value}
        id={contactIdLabel}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? data.find((framework) => framework.value === value)?.label
              : placeholder}
            <IconChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 ">
          <Command shouldFilter={false}>
            <CommandInput
              required
              placeholder="Escriba para buscar"
              onInput={(e: any) => {
                onChange(e!.target!.value);
              }}
              className="h-9 w-full"
            />
            <CommandList className="w-full">
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {data.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : framework.value);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <IconCheck
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
