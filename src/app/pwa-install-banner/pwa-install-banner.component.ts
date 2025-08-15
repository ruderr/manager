import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaInstallService } from '../pwa-install.service';

@Component({
  selector: 'app-pwa-install-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pwa-banner" *ngIf="pwaService.showInstallPrompt() && !pwaService.isInstalled()">
      <div class="banner-content">
        <div class="banner-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="banner-text">
          <h4>Instalar Manager Pro</h4>
          <p>Accede rápidamente desde tu pantalla de inicio</p>
        </div>
        <div class="banner-actions">
          <button class="btn-install" (click)="installApp()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Instalar
          </button>
          <button class="btn-dismiss" (click)="dismissBanner()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pwa-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      z-index: 1000;
      padding: var(--spacing-md);
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.3s ease-out;
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      max-width: 480px;
      margin: 0 auto;
    }

    .banner-icon {
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .banner-text {
      flex: 1;
    }

    .banner-text h4 {
      margin: 0 0 4px 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .banner-text p {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.9;
      line-height: 1.4;
    }

    .banner-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .btn-install {
      background-color: white;
      color: var(--primary-color);
      border: none;
      padding: 8px 16px;
      border-radius: var(--border-radius-sm);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .btn-install:hover {
      background-color: #f8fafc;
      transform: translateY(-1px);
    }

    .btn-dismiss {
      background: none;
      border: none;
      color: white;
      padding: 8px;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .btn-dismiss:hover {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.1);
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* Ajuste para el contenido principal cuando el banner está visible */
    .pwa-banner + .app-container .main-content {
      padding-bottom: 140px;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .banner-content {
        gap: var(--spacing-sm);
      }
      
      .banner-text h4 {
        font-size: 0.9rem;
      }
      
      .banner-text p {
        font-size: 0.8rem;
      }
      
      .btn-install {
        padding: 6px 12px;
        font-size: 0.8rem;
      }
    }
  `]
})
export class PwaInstallBannerComponent {
  protected readonly pwaService = inject(PwaInstallService);

  async installApp(): Promise<void> {
    try {
      const success = await this.pwaService.installPWA();
      if (success) {
        console.log('PWA instalada exitosamente');
      }
    } catch (error) {
      console.error('Error al instalar PWA:', error);
    }
  }

  dismissBanner(): void {
    this.pwaService.dismissInstallPrompt();
  }
}
