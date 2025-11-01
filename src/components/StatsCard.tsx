import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  trend?: 'up' | 'down';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  trend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? '?' : '?'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-100' : 'bg-primary-100'
        }`}>
          <Icon className={`h-8 w-8 ${
            trend === 'up' ? 'text-green-600' : 'text-primary-600'
          }`} />
        </div>
      </div>
    </div>
  );
};
