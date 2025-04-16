'use client';

import React from 'react';
import { cn } from '../../lib/utils';

const CustomSwitch = ({ checked, onCheckedChange, className, id, ...props }) => {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-blue-500" : "bg-gray-200",
        className
      )}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};

export { CustomSwitch }; 