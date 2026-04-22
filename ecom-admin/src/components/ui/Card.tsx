import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  header, 
  footer, 
  title, 
  subtitle, 
  className, 
  noPadding,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {(header || title) && (
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          {header}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-6")}>
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 text-sm">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
