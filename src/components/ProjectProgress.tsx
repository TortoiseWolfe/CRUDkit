'use client';

import React, { useEffect, useState } from 'react';
import { parseTasksFile, TaskProgress } from '@/utils/tasks-parser';
import { Card } from '@/components/atomic/Card/Card';

export const ProjectProgress: React.FC = () => {
  const [taskProgress, setTaskProgress] = useState<TaskProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTaskProgress();
  }, []);

  const loadTaskProgress = async () => {
    try {
      const progress = await parseTasksFile();
      setTaskProgress(progress);
    } catch (error) {
      console.error('Failed to load task progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card title="Project Progress" className="w-full" bordered>
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </Card>
    );
  }

  if (!taskProgress) {
    return null;
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'progress-success';
    if (percentage >= 75) return 'progress-info';
    if (percentage >= 50) return 'progress-warning';
    return 'progress-error';
  };

  return (
    <Card 
      title={
        <div className="flex items-center justify-between w-full">
          <span>Project Progress</span>
          <div className="badge badge-success badge-lg">
            {taskProgress.percentage}% Complete
          </div>
        </div>
      }
      className="w-full" 
      bordered
    >
      <div className="space-y-4">
        {/* Task Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Tasks Completed</span>
            <span className="text-sm text-base-content/70">
              {taskProgress.completedTasks}/{taskProgress.totalTasks}
            </span>
          </div>
          <progress 
            className={`progress ${getProgressColor(taskProgress.percentage)} w-full`}
            value={taskProgress.percentage} 
            max={100}
          ></progress>
        </div>

        {/* Phase Indicators */}
        {Object.keys(taskProgress.phases).length > 0 && (
          <>
            <div className="divider my-2 text-sm">Development Phases</div>
            <div className="space-y-2">
              {Object.entries(taskProgress.phases).map(([phase, info]) => (
                <div key={phase} className="flex items-center gap-2">
                  <span className={`text-lg ${info.complete ? 'text-success' : 'text-base-content/30'}`}>
                    {info.complete ? '✅' : '⭕'}
                  </span>
                  <div className="flex-1">
                    <span className="font-medium text-sm">{phase}</span>
                    <span className="text-xs text-base-content/60 ml-2">
                      {info.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Metadata */}
        <div className="pt-2 border-t border-base-300">
          <div className="flex justify-between items-center text-xs text-base-content/60">
            {taskProgress.lastUpdated && (
              <span>Updated: {taskProgress.lastUpdated}</span>
            )}
            <a 
              href="/status" 
              className="link link-hover text-primary"
            >
              View Details →
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};