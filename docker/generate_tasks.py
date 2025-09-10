#!/usr/bin/env python3
"""
Generate TASKS.md from PLAN.md
Extracts actionable tasks, milestones, and commands from the implementation plan
"""

import json
import re
from datetime import datetime

print("=== Generating TASKS.md from PLAN.md ===")

content = open("PLAN.md").read()
lines = content.split("\n")

tasks = []
task_id = 1
phase = "Setup"
timeline = "Day 1"

for i, line in enumerate(lines):
    # Phase headers
    if "## Phase" in line:
        phase = line.replace("##", "").strip()
        
    # Day/time headers  
    elif "### Day" in line or "### Morning" in line or "### Afternoon" in line or "### Evening" in line:
        timeline = line.replace("###", "").strip()
        
    # Bash command blocks - look for commands in code blocks
    elif i > 0 and "```bash" in lines[i-1]:
        # Start collecting commands until we hit the closing ```
        j = i
        while j < len(lines) and "```" not in lines[j]:
            cmd_line = lines[j].strip()
            if cmd_line and not cmd_line.startswith("#"):
                # Extract meaningful commands
                if any(cmd in cmd_line for cmd in ["npx", "pnpm", "git", "npm", "gh", "mkdir", "cat", "curl", "docker"]):
                    tasks.append({
                        "id": task_id,
                        "phase": phase,
                        "timeline": timeline,
                        "task": f"Execute: {cmd_line[:100]}..." if len(cmd_line) > 100 else f"Execute: {cmd_line}",
                        "type": "command",
                        "status": "pending"
                    })
                    task_id += 1
            j += 1
            
    # Milestones
    elif "🎯" in line:
        milestone = re.sub(r"\*\*|🎯", "", line).strip()
        if milestone and ":" in milestone:
            milestone_text = milestone.split(":", 1)[1].strip() if ":" in milestone else milestone
            tasks.append({
                "id": task_id,
                "phase": phase,
                "timeline": timeline,
                "task": milestone_text,
                "type": "milestone",
                "status": "pending"
            })
            task_id += 1
            
    # Implementation tasks from bullet points
    elif line.strip().startswith("- ") and "Phase" in phase:
        task_text = line.strip()[2:]
        # Filter out generic checklist items
        if not task_text.startswith("[") and len(task_text) > 10:
            tasks.append({
                "id": task_id,
                "phase": phase,
                "timeline": timeline,
                "task": task_text,
                "type": "task",
                "status": "pending"
            })
            task_id += 1

# Write TASKS.md
with open("TASKS.md", "w") as f:
    f.write("# CRUDkit Implementation Tasks\n\n")
    f.write("Generated from PLAN.md - " + datetime.now().strftime("%Y-%m-%d %H:%M") + "\n\n")
    f.write("## Deploy Early, Deploy Often Strategy\n\n")
    f.write("Every phase includes deployment milestones. GitHub Pages deployment from Day 1.\n\n")
    
    current_phase = ""
    for task in tasks:
        if task["phase"] != current_phase:
            current_phase = task["phase"]
            f.write(f"\n## {current_phase}\n\n")
            
        status_emoji = "⬜" if task["status"] == "pending" else "✅"
        
        if task["type"] == "milestone":
            task_type = "🎯"
        elif task["type"] == "command":
            task_type = "🔧"
        else:
            task_type = "📋"
        
        f.write(f"{status_emoji} **Task {task['id']:03d}** {task_type} [{task['timeline']}]\n")
        f.write(f"   - {task['task']}\n\n")
    
    f.write(f"\n---\n\nTotal Tasks: {len(tasks)}\n")
    f.write(f"Milestones: {len([t for t in tasks if t['type'] == 'milestone'])}\n")
    f.write(f"Commands: {len([t for t in tasks if t['type'] == 'command'])}\n")
    f.write(f"Implementation Tasks: {len([t for t in tasks if t['type'] == 'task'])}\n")

print(f"\nGenerated TASKS.md with {len(tasks)} tasks")
print(f"- Milestones: {len([t for t in tasks if t['type'] == 'milestone'])}")
print(f"- Commands: {len([t for t in tasks if t['type'] == 'command'])}")
print(f"- Implementation Tasks: {len([t for t in tasks if t['type'] == 'task'])}")