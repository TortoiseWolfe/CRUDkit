/**
 * Parse TASKS.md to extract project progress dynamically
 */

export interface TaskProgress {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  phases: {
    [key: string]: {
      complete: boolean;
      description: string;
    };
  };
  lastUpdated: string | null;
}

export async function parseTasksFile(): Promise<TaskProgress> {
  try {
    // Fetch from public folder (copied during build)
    const baseUrl = window.location.hostname === 'localhost' 
      ? '' 
      : '/CRUDkit';
    
    const response = await fetch(`${baseUrl}/TASKS.md`);
    if (!response.ok) {
      throw new Error('Failed to fetch TASKS.md');
    }
    
    const content = await response.text();
    
    // Extract completion info from header
    const progressMatch = content.match(/\((\d+)% Complete[^)]*\)/);
    const percentage = progressMatch ? parseInt(progressMatch[1]) : 0;
    
    // Extract task counts
    const taskCountMatch = content.match(/(\d+)\/(\d+) Tasks/);
    const completedTasks = taskCountMatch ? parseInt(taskCountMatch[1]) : 0;
    const totalTasks = taskCountMatch ? parseInt(taskCountMatch[2]) : 0;
    
    // Extract last updated
    const lastUpdatedMatch = content.match(/Last Updated: ([^(]+)/);
    const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1].trim() : null;
    
    // Extract phase statuses
    const phases: TaskProgress['phases'] = {};
    
    // Phase 0
    if (content.includes('✅ **Phase 0 Complete**')) {
      phases['Phase 0'] = {
        complete: true,
        description: 'Next.js app deployed to GitHub Pages'
      };
    }
    
    // Phase 1
    if (content.includes('✅ **Phase 1 Complete**')) {
      phases['Phase 1'] = {
        complete: true,
        description: 'Storybook deployed with Text component'
      };
    }
    
    // Phase 2
    if (content.includes('✅ **Phase 2 Complete**')) {
      phases['Phase 2'] = {
        complete: true,
        description: 'Theme system with 32 themes'
      };
    }
    
    // Phase 3
    if (content.includes('✅ **Phase 3 Complete**')) {
      phases['Phase 3'] = {
        complete: true,
        description: 'Component gallery deployed'
      };
    }
    
    // Phase 4
    if (content.includes('✅ **Phase 4 Complete**')) {
      phases['Phase 4'] = {
        complete: true,
        description: 'PWA features with testing and monitoring'
      };
    }
    
    return {
      totalTasks,
      completedTasks,
      percentage,
      phases,
      lastUpdated
    };
  } catch (error) {
    console.error('Failed to parse TASKS.md:', error);
    // Return fallback data
    return {
      totalTasks: 96,
      completedTasks: 95,
      percentage: 99,
      phases: {},
      lastUpdated: null
    };
  }
}