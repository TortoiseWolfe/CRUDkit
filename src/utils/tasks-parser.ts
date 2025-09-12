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
    
    // Add cache-busting timestamp to ensure fresh data
    const url = `${baseUrl}/TASKS.md?t=${Date.now()}`;
    const response = await fetch(url);
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
    
    // Parse Sprint 2 Phase 1 (Testing Foundation)
    // Count completed tasks T001-T012
    let phase1Completed = 0;
    const phase1Total = 12;
    for (let i = 1; i <= 12; i++) {
      const taskNum = String(i).padStart(3, '0');
      const taskPattern = new RegExp(`T${taskNum}.*?\\[x\\] Complete`, 's');
      if (taskPattern.test(content)) {
        phase1Completed++;
      }
    }
    sprint2Phases['Phase 1'] = {
      complete: phase1Completed === phase1Total,
      description: `Testing Foundation (Weeks 1-2) - ${phase1Completed}/${phase1Total} tasks`
    };
    
    // Parse Sprint 2 Phase 2 (Developer Experience)
    // Count completed tasks T013-T024
    let phase2Completed = 0;
    const phase2Total = 12;
    for (let i = 13; i <= 24; i++) {
      const taskNum = String(i).padStart(3, '0');
      const taskPattern = new RegExp(`T${taskNum}.*?\\[x\\] Complete`, 's');
      if (taskPattern.test(content)) {
        phase2Completed++;
      }
    }
    sprint2Phases['Phase 2'] = {
      complete: phase2Completed === phase2Total,
      description: `Developer Experience (Weeks 3-4) - ${phase2Completed}/${phase2Total} tasks`
    };
    
    // Parse Sprint 2 Phase 3 (First Simple Feature)
    // Count completed tasks T025-T036
    let phase3Completed = 0;
    const phase3Total = 12;
    for (let i = 25; i <= 36; i++) {
      const taskNum = String(i).padStart(3, '0');
      const taskPattern = new RegExp(`T${taskNum}.*?\\[x\\] Complete`, 's');
      if (taskPattern.test(content)) {
        phase3Completed++;
      }
    }
    sprint2Phases['Phase 3'] = {
      complete: phase3Completed === phase3Total,
      description: `First Simple Feature (Weeks 5-6) - ${phase3Completed}/${phase3Total} tasks`
    };
    
    // Parse Sprint 2 Phase 4 (Quality Baseline)
    // Count completed tasks T037-T048
    let phase4Completed = 0;
    const phase4Total = 12;
    for (let i = 37; i <= 48; i++) {
      const taskNum = String(i).padStart(3, '0');
      const taskPattern = new RegExp(`T${taskNum}.*?\\[x\\] Complete`, 's');
      if (taskPattern.test(content)) {
        phase4Completed++;
      }
    }
    sprint2Phases['Phase 4'] = {
      complete: phase4Completed === phase4Total,
      description: `Quality Baseline (Weeks 7-8) - ${phase4Completed}/${phase4Total} tasks`
    };
    
    // Parse Sprint 2 Phase 5 (Foundation Completion)
    // Count completed tasks T049-T060
    let phase5Completed = 0;
    const phase5Total = 12;
    for (let i = 49; i <= 60; i++) {
      const taskNum = String(i).padStart(3, '0');
      const taskPattern = new RegExp(`T${taskNum}.*?\\[x\\] Complete`, 's');
      if (taskPattern.test(content)) {
        phase5Completed++;
      }
    }
    sprint2Phases['Phase 5'] = {
      complete: phase5Completed === phase5Total,
      description: `Foundation Completion (Weeks 9-10) - ${phase5Completed}/${phase5Total} tasks`
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