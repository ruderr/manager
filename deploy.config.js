/**
 * Configuración de deployment para Manager Pro
 * Configuración para diferentes entornos de producción
 */

const environments = {
  development: {
    name: 'Development',
    apiUrl: 'http://localhost:3000/api',
    environment: 'development',
    enableDebug: true,
    enableAnalytics: false
  },
  staging: {
    name: 'Staging',
    apiUrl: 'https://staging-api.managerpro.com/api',
    environment: 'staging',
    enableDebug: true,
    enableAnalytics: true
  },
  production: {
    name: 'Production',
    apiUrl: 'https://api.managerpro.com/api',
    environment: 'production',
    enableDebug: false,
    enableAnalytics: true
  }
};

// Configuración de PWA
const pwaConfig = {
  name: 'Manager Pro',
  shortName: 'Manager Pro',
  description: 'Aplicación de gestión de proyectos optimizada para móviles',
  themeColor: '#6366f1',
  backgroundColor: '#f8fafc',
  display: 'standalone',
  orientation: 'portrait-primary',
  scope: '/',
  startUrl: '/',
  icons: [
    {
      src: 'icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'maskable any'
    },
    {
      src: 'icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable any'
    }
  ],
  shortcuts: [
    {
      name: 'Nuevo Proyecto',
      shortName: 'Proyecto',
      description: 'Crear un nuevo proyecto',
      url: '/?action=new-project',
      icons: [
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96'
        }
      ]
    },
    {
      name: 'Nueva Tarea',
      shortName: 'Tarea',
      description: 'Agregar una nueva tarea',
      url: '/?action=new-task',
      icons: [
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96'
        }
      ]
    }
  ]
};

// Configuración de Service Worker
const swConfig = {
  cacheName: 'manager-pro-v1',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  strategies: {
    api: 'network-first',
    assets: 'cache-first',
    images: 'stale-while-revalidate'
  },
  offlinePage: '/offline.html'
};

// Configuración de optimización
const optimizationConfig = {
  compression: {
    gzip: true,
    brotli: true
  },
  caching: {
    staticAssets: '1 year',
    apiResponses: '1 hour',
    images: '1 week'
  },
  performance: {
    preloadCriticalResources: true,
    lazyLoadImages: true,
    minifyCSS: true,
    minifyJS: true
  }
};

module.exports = {
  environments,
  pwaConfig,
  swConfig,
  optimizationConfig
};
