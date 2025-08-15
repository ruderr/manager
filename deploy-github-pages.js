#!/usr/bin/env node

/**
 * Script de deployment para GitHub Pages
 * Este script automatiza el proceso de build y deployment a GitHub Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deployment a GitHub Pages...\n');

try {
  // 1. Limpiar el directorio dist
  console.log('📁 Limpiando directorio dist...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 2. Build para GitHub Pages
  console.log('🔨 Compilando para GitHub Pages...');
  execSync('npm run build:github', { stdio: 'inherit' });

  // 3. Verificar que el build fue exitoso
  if (!fs.existsSync('dist/manager/browser')) {
    throw new Error('❌ El build no se completó correctamente');
  }

  // 4. Crear archivo 404.html para SPA routing
  console.log('📄 Creando archivo 404.html para SPA routing...');
  const indexContent = fs.readFileSync('dist/manager/browser/index.csr.html', 'utf8');
  fs.writeFileSync('dist/manager/browser/404.html', indexContent);
  
  // 5. Renombrar index.csr.html a index.html
  console.log('📄 Renombrando index.csr.html a index.html...');
  fs.copyFileSync('dist/manager/browser/index.csr.html', 'dist/manager/browser/index.html');

  // 6. Crear archivo .nojekyll para evitar problemas con Jekyll
  console.log('📄 Creando archivo .nojekyll...');
  fs.writeFileSync('dist/manager/browser/.nojekyll', '');

  // 7. Crear un directorio temporal para el deployment
  console.log('📁 Preparando archivos para deployment...');
  const deployDir = 'deploy-temp';
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(deployDir);

  // 8. Copiar todos los archivos del directorio browser al directorio temporal
  const browserDir = 'dist/manager/browser';
  const copyRecursive = (src, dest) => {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  copyRecursive(browserDir, deployDir);

  // 9. Inicializar git en el directorio temporal
  console.log('🔧 Inicializando repositorio git...');
  execSync(`cd ${deployDir} && git init`, { stdio: 'inherit' });

  // 10. Agregar todos los archivos
  console.log('📦 Agregando archivos al repositorio...');
  execSync(`cd ${deployDir} && git add .`, { stdio: 'inherit' });

  // 11. Commit de los cambios
  console.log('💾 Haciendo commit de los cambios...');
  const commitMessage = `Deploy to GitHub Pages - ${new Date().toISOString()}`;
  execSync(`cd ${deployDir} && git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // 12. Agregar el remote origin
  console.log('🔗 Configurando remote origin...');
  execSync(`cd ${deployDir} && git remote add origin https://github.com/ruderr/manager.git`, { stdio: 'inherit' });

  // 13. Push a la rama gh-pages
  console.log('🚀 Haciendo push a la rama gh-pages...');
  execSync(`cd ${deployDir} && git push origin HEAD:gh-pages --force`, { stdio: 'inherit' });

  // 14. Limpiar directorio temporal
  console.log('🧹 Limpiando archivos temporales...');
  fs.rmSync(deployDir, { recursive: true, force: true });

  console.log('\n✅ ¡Deployment completado exitosamente!');
  console.log('🌐 Tu aplicación estará disponible en: https://ruderr.github.io/manager/');
  console.log('\n📝 Notas importantes:');
  console.log('   - GitHub Pages puede tardar unos minutos en actualizar');
  console.log('   - La aplicación debería cargar correctamente ahora');

} catch (error) {
  console.error('\n❌ Error durante el deployment:', error.message);
  console.log('\n🔧 Solución manual:');
  console.log('   1. Ejecuta: npm run build:github');
  console.log('   2. Ve al directorio: dist/manager/browser');
  console.log('   3. Sube manualmente los archivos a la raíz de la rama gh-pages');
  process.exit(1);
}
