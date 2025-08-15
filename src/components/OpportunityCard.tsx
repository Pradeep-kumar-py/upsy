'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OpportunityCardProps {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
  gradient: string;
  textColor: string;
}

export default function OpportunityCard({ 
  title, 
  count, 
  description, 
  icon: Icon, 
  gradient,
  textColor 
}: OpportunityCardProps) {
  return (
    <div className={`${gradient} rounded-2xl p-6 text-white hover:scale-105 transition-transform cursor-pointer`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
          <p className="text-2xl font-bold mt-1">{count}</p>
          <p className={`text-xs ${textColor} mt-1`}>{description}</p>
        </div>
        <Icon size={24} className={textColor} />
      </div>
    </div>
  );
}
