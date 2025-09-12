/**
 * Parse TASKS.md to extract project progress dynamically
 */

export interface SprintProgress {
  name: string;
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  status: 'completed' | 'in-progress' | 'not-started';
}

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
  sprint2Phases?: {
    [key: string]: {
      complete: boolean;
      description: string;
    };
  };
  lastUpdated: string | null;
  sprints?: SprintProgress[];
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
    
    // Extract overall completion info from header
    const progressMatch = content.match(/\((\d+)% Complete[^)]*\)/);
    const percentage = progressMatch ? parseInt(progressMatch[1]) : 0;
    
    // Extract overall task counts
    const taskCountMatch = content.match(/(\d+)\/(\d+) Tasks/);
    const completedTasks = taskCountMatch ? parseInt(taskCountMatch[1]) : 0;
    const totalTasks = taskCountMatch ? parseInt(taskCountMatch[2]) : 0;
    
    // Extract last updated
    const lastUpdatedMatch = content.match(/Last Updated: ([^(]+)/);
    const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1].trim() : null;
    
    // Parse sprint information
    const sprints: SprintProgress[] = [];
    
    // Sprint 1
    const sprint1Match = content.match(/Sprint 1[^:]*:.*?(\d+)\/(\d+) tasks.*?(\d+)%/);
    if (sprint1Match) {
      sprints.push({
        name: 'Sprint 1: Core Implementation',
        completedTasks: parseInt(sprint1Match[1]),
        totalTasks: parseInt(sprint1Match[2]),
        percentage: parseInt(sprint1Match[3]),
        status: 'completed'
      });
    }
    
    // Sprint 2
    const sprint2Match = content.match(/Sprint 2[^:]*:.*?(\d+)\/(\d+) tasks.*?(\d+)%/);
    if (sprint2Match) {
      sprints.push({
        name: 'Sprint 2: Fix the Foundation',
        completedTasks: parseInt(sprint2Match[1]),
        totalTasks: parseInt(sprint2Match[2]),
        percentage: parseInt(sprint2Match[3]),
        status: parseInt(sprint2Match[1]) > 0 ? 'in-progress' : 'not-started'
      });
    }
    
    // Extract Sprint 1 phase statuses
    const phases: TaskProgress['phases'] = {};
    
    // Sprint 1 Phase 0
    if (content.includes('✅ **Phase 0 Complete**')) {
      phases['Phase 0'] = {
        complete: true,
        description: 'Next.js app deployed to GitHub Pages'
      };
    }
    
    // Sprint 1 Phase 1
    if (content.includes('✅ **Phase 1 Complete**')) {
      phases['Phase 1'] = {
        complete: true,
        description: 'Storybook deployed with Text component'
      };
    }
    
    // Sprint 1 Phase 2
    if (content.includes('✅ **Phase 2 Complete**')) {
      phases['Phase 2'] = {
        complete: true,
        description: 'Theme system with 32 themes'
      };
    }
    
    // Sprint 1 Phase 3
    if (content.includes('✅ **Phase 3 Complete**')) {
      phases['Phase 3'] = {
        complete: true,
        description: 'Component gallery deployed'
      };
    }
    
    // Sprint 1 Phase 4
    if (content.includes('✅ **Phase 4 Complete**')) {
      phases['Phase 4'] = {
        complete: true,
        description: 'PWA features with testing and monitoring'
      };
    }
    
    // Extract Sprint 2 phase statuses
    const sprint2Phases: TaskProgress['sprint2Phases'] = {};
    
    // Sprint 2 phases are not yet started, so we define them manually
    sprint2Phases['Phase 1'] = {
      complete: false,
      description: 'Testing Foundation (Weeks 1-2)'
    };
    
    sprint2Phases['Phase 2'] = {
      complete: false,
      description: 'Developer Experience (Weeks 3-4)'
    };
    
    sprint2Phases['Phase 3'] = {
      complete: false,
      description: 'First Simple Feature (Weeks 5-6)'
    };
    
    sprint2Phases['Phase 4'] = {
      complete: false,
      description: 'Quality Baseline (Weeks 7-8)'
    };
    
    sprint2Phases['Phase 5'] = {
      complete: false,
      description: 'Foundation Completion (Weeks 9-10)'
    };
    
    return {
      totalTasks,
      completedTasks,
      percentage,
      phases,
      sprint2Phases,
      lastUpdated,
      sprints
    };
  } catch (error) {
    console.error('Failed to parse TASKS.md:', error);
    // Return fallback data
    return {
      totalTasks: 161,
      completedTasks: 95,
      percentage: 59,
      phases: {},
      lastUpdated: null,
      sprints: [
        {
          name: 'Sprint 1: Core Implementation',
          totalTasks: 96,
          completedTasks: 95,
          percentage: 99,
          status: 'completed'
        },
        {
          name: 'Sprint 2: Fix the Foundation',
          totalTasks: 65,
          completedTasks: 0,
          percentage: 0,
          status: 'not-started'
        }
      ]
    };
  }
}