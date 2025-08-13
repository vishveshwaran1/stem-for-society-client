
import React, { useState } from 'react';
import { Button } from '@/components1/ui/button';
import { Checkbox } from '@/components1/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components1/ui/popover';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  onOptionChange: (optionId: string, checked: boolean) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, options, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="flex items-center justify-between min-w-[120px] h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded"
        >
          <span>{title}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-white border border-gray-200 shadow-lg" align="start">
        <div className="p-3 space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={option.checked}
                onCheckedChange={(checked: boolean) => onOptionChange(option.id, checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor={option.id}
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDropdown;
