import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { formatDate } from '@/lib/formatFunc';
import { type LucideIcon } from 'lucide-react';

import { type DatePickerState } from './NotesMaximizeTableFilter';

export const DateFilterPopover = ({
  state,
  icon: Icon,
  placeholder,
}: {
  state: DatePickerState;
  icon: LucideIcon;
  placeholder: string;
}) => (
  <Popover open={state.isOpen} onOpenChange={state.setIsOpen}>
    <PopoverTrigger asChild>
      <Button variant="outline">
        <Icon />
        {state.date
          ? formatDate(state.date, { includeTime: false })
          : placeholder}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="end">
      <Calendar mode="single" selected={state.date} onSelect={state.onSelect} />
    </PopoverContent>
  </Popover>
);
