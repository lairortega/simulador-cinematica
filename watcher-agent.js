import { watch } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';

const WATCH_DIR = process.cwd();
const DOCKER_CONTAINER_NAME = 'simulador-cinematica';

let isRestarting = false;
let timeoutId = null;

console.log(`🔍 Observando cambios en el proyecto para reiniciar el contenedor '${DOCKER_CONTAINER_NAME}'...`);

function restartContainer() {
    if (isRestarting) return;
    isRestarting = true;

    console.log(`\n🔄 Cambio detectado. Reconstruyendo/reiniciando contenedor Docker...`);

    exec(`docker compose up -d --build`, (error, stdout, stderr) => {
        isRestarting = false;
        if (error) {
            console.error(`❌ Error al reiniciar contenedor: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`⚠️ Docker output: ${stderr}`);
        }
        console.log(`✅ Contenedor '${DOCKER_CONTAINER_NAME}' actualizado y listo en http://localhost:3000`);
    });
}

// Watcher con Debounce para evitar múltiples disparos seguidos
watch(WATCH_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) return;

    // Ignorar node_modules, git y archivos de log/temporales
    if (
        filename.includes('node_modules') ||
        filename.includes('.git') ||
        filename.startsWith('.') ||
        filename.endsWith('.tmp')
    ) {
        return;
    }

    console.log(`📁 Archivo modificado: ${filename}`);

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(restartContainer, 500);
});
