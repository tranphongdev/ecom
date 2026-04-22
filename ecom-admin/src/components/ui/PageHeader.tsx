import React from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  actions, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description && <p className="text-slate-500 mt-1 text-lg">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
      </div>
    </div>
  );
};
