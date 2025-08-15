import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PwaInstallBannerComponent } from './pwa-install-banner/pwa-install-banner.component';

interface Stats {
  activeProjects: number;
  completedTasks: number;
  teamMembers: number;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  color: string;
}

interface Task {
  id: number;
  title: string;
  time: string;
  priority: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, PwaInstallBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('manager');
  
  // Notifications
  protected readonly notificationCount = signal(3);
  
  // Stats
  protected readonly stats = signal<Stats>({
    activeProjects: 12,
    completedTasks: 89,
    teamMembers: 8
  });
  
  // Recent Projects
  protected readonly recentProjects = signal<Project[]>([
    {
      id: 1,
      name: 'Reposición de frutas y vegetales',
      description: 'Solicitud de frutas y vegetales al proveedor',
      status: 'en-progreso',
      progress: 75,
      color: '#6366f1'
    },
    {
      id: 2,
      name: 'Compra de bebidas',
      description: 'Solicitud de bebidas al proveedor',
      status: 'planificando',
      progress: 25,
      color: '#10b981'
    },
    {
      id: 3,
      name: 'Reposición de productos de limpieza',
      description: 'Solicitud de productos de limpieza al proveedor',
      status: 'completado',
      progress: 100,
      color: '#f59e0b'
    }
  ]);
  
  // Today's Tasks
  protected readonly todaysTasks = signal<Task[]>([
    {
      id: 1,
      title: 'Comprar aceite de oliva',
      time: '09:00',
      priority: 'alta',
      completed: false
    },
    {
      id: 2,
      title: 'Reponer leche',
      time: '11:30',
      priority: 'media',
      completed: true
    },
    {
      id: 3,
      title: 'Comprar camarones',
      time: '14:00',
      priority: 'alta',
      completed: false
    },
    {
      id: 4,
      title: 'Reponer bandejas y cubiertos',
      time: '16:30',
      priority: 'baja',
      completed: false
    }
  ]);
  
  // Methods
  protected toggleNotifications(): void {
    console.log('Toggle notifications');
  }
  
  protected toggleProfile(): void {
    console.log('Toggle profile');
  }
  
  protected createProject(): void {
    console.log('Create new project');
  }
  
  protected addTask(): void {
    console.log('Add new task');
  }
  
  protected scheduleMeeting(): void {
    console.log('Schedule meeting');
  }
  
  protected viewReports(): void {
    console.log('View reports');
  }
  
  protected viewAllProjects(): void {
    console.log('View all projects');
  }
  
  protected viewAllTasks(): void {
    console.log('View all tasks');
  }
  
  protected toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.todaysTasks.set([...this.todaysTasks()]);
  }
  
  protected navigateTo(route: string): void {
    console.log('Navigate to:', route);
  }
  
  protected trackProject(index: number, project: Project): number {
    return project.id;
  }
  
  protected trackTask(index: number, task: Task): number {
    return task.id;
  }
}
