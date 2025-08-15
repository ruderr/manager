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
  const indexContent = fs.readFileSync('dist/manager/browser/index.html', 'utf8');
  fs.writeFileSync('dist/manager/browser/404.html', indexContent);

  // 5. Crear archivo .nojekyll para evitar problemas con Jekyll
  console.log('📄 Creando archivo .nojekyll...');
  fs.writeFileSync('dist/manager/browser/.nojekyll', '');

  // 6. Inicializar git en el directorio dist si no existe
  if (!fs.existsSync('dist/manager/.git')) {
    console.log('🔧 Inicializando repositorio git en dist...');
    execSync('cd dist/manager && git init', { stdio: 'inherit' });
  }

  // 7. Agregar todos los archivos
  console.log('📦 Agregando archivos al repositorio...');
  execSync('cd dist/manager && git add .', { stdio: 'inherit' });

  // 8. Commit de los cambios
  console.log('💾 Haciendo commit de los cambios...');
  const commitMessage = `Deploy to GitHub Pages - ${new Date().toISOString()}`;
  execSync(`cd dist/manager && git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // 9. Agregar el remote origin si no existe
  console.log('🔗 Configurando remote origin...');
  try {
    execSync('cd dist/manager && git remote get-url origin', { stdio: 'pipe' });
  } catch (error) {
    execSync('cd dist/manager && git remote add origin https://github.com/ruderr/manager.git', { stdio: 'inherit' });
  }

  // 10. Push a la rama gh-pages
  console.log('🚀 Haciendo push a la rama gh-pages...');
  execSync('cd dist/manager && git push origin HEAD:gh-pages --force', { stdio: 'inherit' });

  console.log('\n✅ ¡Deployment completado exitosamente!');
  console.log('🌐 Tu aplicación estará disponible en: https://ruderr.github.io/manager/');
  console.log('\n📝 Notas importantes:');
  console.log('   - GitHub Pages puede tardar unos minutos en actualizar');
  console.log('   - Asegúrate de que GitHub Pages esté habilitado en tu repositorio');
  console.log('   - La rama gh-pages debe estar configurada como fuente en GitHub Pages');

} catch (error) {
  console.error('\n❌ Error durante el deployment:', error.message);
  console.log('\n🔧 Solución manual:');
  console.log('   1. Ejecuta: npm run build:github');
  console.log('   2. Ve al directorio: dist/manager/browser');
  console.log('   3. Sube manualmente los archivos a la rama gh-pages');
  process.exit(1);
}
