import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaInstallService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private platformId = inject(PLATFORM_ID);
  
  // Signals para el estado de instalación
  public readonly canInstall = signal(false);
  public readonly isInstalled = signal(false);
  public readonly showInstallPrompt = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePWA();
    }
  }

  private initializePWA(): void {
    // Solo ejecutar en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Detectar si la PWA ya está instalada
    this.checkIfInstalled();
    
    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.canInstall.set(true);
      this.showInstallPrompt.set(true);
      console.log('PWA: Instalación disponible');
    });

    // Escuchar cuando la PWA se instala
    window.addEventListener('appinstalled', () => {
      this.isInstalled.set(true);
      this.canInstall.set(false);
      this.showInstallPrompt.set(false);
      this.deferredPrompt = null;
      console.log('PWA: Aplicación instalada exitosamente');
    });

    // Detectar cambios en el modo de visualización
    window.addEventListener('load', () => {
      this.checkIfInstalled();
    });
  }

  private checkIfInstalled(): void {
    // Solo ejecutar en el navegador
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined') {
      return;
    }

    // Verificar si la aplicación está en modo standalone (instalada)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true;
    
    this.isInstalled.set(isStandalone);
    
    if (isStandalone) {
      this.canInstall.set(false);
      this.showInstallPrompt.set(false);
      console.log('PWA: Aplicación ya está instalada');
    }
  }

  public async installPWA(): Promise<boolean> {
    // Solo ejecutar en el navegador
    if (!isPlatformBrowser(this.platformId) || !this.deferredPrompt) {
      console.log('PWA: No hay prompt de instalación disponible');
      return false;
    }

    try {
      // Mostrar el prompt de instalación
      await this.deferredPrompt.prompt();
      
      // Esperar la respuesta del usuario
      const choiceResult = await this.deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA: Usuario aceptó la instalación');
        this.canInstall.set(false);
        this.showInstallPrompt.set(false);
        this.deferredPrompt = null;
        return true;
      } else {
        console.log('PWA: Usuario rechazó la instalación');
        this.showInstallPrompt.set(false);
        return false;
      }
    } catch (error) {
      console.error('PWA: Error durante la instalación:', error);
      return false;
    }
  }

  public dismissInstallPrompt(): void {
    this.showInstallPrompt.set(false);
    console.log('PWA: Prompt de instalación descartado');
  }

  public getInstallationStatus(): {
    canInstall: boolean;
    isInstalled: boolean;
    showPrompt: boolean;
  } {
    return {
      canInstall: this.canInstall(),
      isInstalled: this.isInstalled(),
      showPrompt: this.showInstallPrompt()
    };
  }
}
