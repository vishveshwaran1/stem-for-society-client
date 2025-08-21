import React, { useState } from 'react';
import { Button } from '@/components1/ui/button';
import { Checkbox } from '@/components1/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components1/ui/popover';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

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
  const selectedCount = options.filter(opt => opt.checked).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center space-x-2 h-10 px-3 text-sm rounded-md border transition-colors ${
            selectedCount > 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
          }`}
        >
          <Filter className="h-4 w-4 text-gray-500" />
          <span>{title}</span>
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs">
              {selectedCount}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 ml-1 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-56 p-0 !bg-white border border-gray-200 shadow-md rounded-md" 
        align="start"
        sideOffset={4}
      >
        <div className="p-2 space-y-1">
          {options.map((option) => (
            <div 
              key={option.id} 
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
            >
              <Checkbox
                id={option.id}
                checked={option.checked}
                onCheckedChange={(checked: boolean) => onOptionChange(option.id, checked)}
                className="h-4 w-4 rounded border-gray-300 data-[state=checked]:bg-[#0389FF] data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
              />
              <label
                htmlFor={option.id}
                className="text-sm text-gray-700 cursor-pointer select-none flex-1"
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