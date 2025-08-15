# Manager Pro - PWA de Gestión de Proyectos

Una aplicación de gestión de proyectos moderna y optimizada para móviles, construida con Angular 20 y configurada como PWA (Progressive Web App).

## 🚀 Características

- **PWA Completa**: Instalable en dispositivos móviles
- **Diseño Mobile-First**: Optimizada para uso en smartphones
- **Offline First**: Funciona sin conexión a internet
- **Interfaz Moderna**: Diseño limpio y intuitivo
- **Gestión de Proyectos**: Crear, editar y gestionar proyectos
- **Sistema de Tareas**: Organizar tareas con prioridades
- **Equipo**: Gestión de miembros del equipo
- **Reportes**: Visualización de estadísticas

## 📱 Tecnologías

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos avanzados
- **Service Worker** - Funcionalidad offline
- **PWA** - Progressive Web App
- **SSR** - Server-Side Rendering

## 🛠️ Instalación

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 20.1.0

### Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd manager

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm start              # Servidor de desarrollo
npm run build:dev      # Build de desarrollo
npm run watch          # Build con watch mode
npm test               # Ejecutar tests
npm run test:watch     # Tests en modo watch
```

### Producción
```bash
npm run build:prod     # Build de producción
npm run serve:prod     # Servir build de producción
npm run deploy:prepare # Preparar para deployment
npm run analyze        # Analizar bundle
npm run pwa:test       # Test de PWA con Lighthouse
```

## 📦 Build de Producción

### Build Completo
```bash
npm run build:prod
```

Esto generará:
- `dist/manager/browser/` - Archivos del cliente
- `dist/manager/server/` - Archivos del servidor (SSR)
- Service Worker configurado
- Manifest PWA
- Iconos optimizados

### Optimizaciones Aplicadas

- **Minificación**: CSS y JS minificados
- **Tree Shaking**: Eliminación de código no usado
- **Code Splitting**: División automática de bundles
- **Compresión**: Gzip y Brotli habilitados
- **Caching**: Estrategias de cache optimizadas
- **PWA**: Service Worker y manifest configurados

## 🌐 Deployment

### Opciones de Hosting

#### 1. Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### 2. Netlify
```bash
# Build
npm run build:prod

# Deploy manual o con Netlify CLI
netlify deploy --prod --dir=dist/manager/browser
```

#### 3. Firebase Hosting
```bash
# Instalar Firebase CLI
npm i -g firebase-tools

# Inicializar proyecto
firebase init hosting

# Deploy
firebase deploy
```

#### 4. Servidor Tradicional
```bash
# Build
npm run build:prod

# Copiar archivos a servidor web
cp -r dist/manager/browser/* /var/www/html/
```

### Variables de Entorno

Crear archivo `.env.production`:
```env
API_URL=https://api.managerpro.com
ENVIRONMENT=production
ENABLE_ANALYTICS=true
DEBUG_MODE=false
```

## 📊 Monitoreo y Analytics

### Lighthouse Score
```bash
npm run pwa:test
```

### Bundle Analyzer
```bash
npm run analyze
```

## 🔧 Configuración PWA

### Manifest
- **Nombre**: Manager Pro
- **Tema**: #6366f1
- **Display**: standalone
- **Orientación**: portrait-primary

### Service Worker
- **Cache Strategy**: Network-first para API, Cache-first para assets
- **Offline Support**: Página offline personalizada
- **Background Sync**: Sincronización en segundo plano

## 📱 Instalación en Dispositivos

### Android
1. Abrir la aplicación en Chrome
2. Tocar "Instalar aplicación" en el menú
3. Confirmar instalación

### iOS
1. Abrir la aplicación en Safari
2. Tocar el botón compartir
3. Seleccionar "Agregar a pantalla de inicio"

## 🧪 Testing

### Tests Unitarios
```bash
npm test
```

### Tests E2E
```bash
ng e2e
```

### Performance
```bash
npm run pwa:test
```

## 📈 Performance

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimizaciones Implementadas
- Lazy loading de componentes
- Preloading de recursos críticos
- Optimización de imágenes
- Compresión de assets
- Cache inteligente

## 🔒 Seguridad

- HTTPS obligatorio en producción
- Headers de seguridad configurados
- CSP (Content Security Policy)
- Sanitización de datos
- Validación de inputs

## 📝 Changelog

### v1.0.0
- Lanzamiento inicial
- PWA completa
- Gestión de proyectos y tareas
- Interfaz mobile-first
- Service Worker configurado

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: support@managerpro.com
- **Documentación**: [docs.managerpro.com](https://docs.managerpro.com)
- **Issues**: [GitHub Issues](https://github.com/managerpro/issues)

---

**Manager Pro** - Gestiona tus proyectos de manera eficiente 🚀
