# Diócesis de Pereira - PWA

Aplicación web progresiva (PWA) para la guía de parroquias de la Diócesis de Pereira.

## Características

- 📱 **Progressive Web App**: Se puede instalar en dispositivos móviles y desktop
- 🌐 **Funcionalidad Offline**: Cache de recursos para uso sin conexión
- 📍 **Geolocalización**: Encuentra la parroquia más cercana
- 🕐 **Horarios en tiempo real**: Consulta horarios de eucaristías
- 🔍 **Búsqueda avanzada**: Por nombre, día o ubicación
- 🎨 **Diseño moderno**: Colores representativos de la Iglesia Católica

## Instalación

### En Dispositivos Móviles (Android/iOS)

1. Abre la aplicación en tu navegador
2. Verás un botón flotante "Instalar App" en la parte inferior derecha
3. Haz clic en el botón y confirma la instalación
4. La app se agregará a tu pantalla de inicio

**Alternativa:**
- **Chrome (Android)**: Menú → "Agregar a la pantalla de inicio"
- **Safari (iOS)**: Botón de compartir → "Agregar a pantalla de inicio"

### En Escritorio (Chrome/Edge)

1. Abre la aplicación en tu navegador
2. Haz clic en el icono de instalación en la barra de direcciones (o en el botón flotante)
3. Confirma la instalación
4. La app se abrirá en su propia ventana

## Uso Sin Conexión

La aplicación cachea automáticamente los recursos necesarios para funcionar offline:
- Interfaz de usuario
- Estilos y fuentes
- Última versión de datos consultados

**Nota**: Para actualizar los horarios se requiere conexión a internet.

## Desarrollo

### Estructura del Proyecto

```
diosesis-pereira/
├── index.html              # Aplicación principal
├── manifest.json           # Configuración PWA
├── service-worker.js       # Service Worker para cache
├── icon-192.png           # Icono app (192x192)
├── icon-512.png           # Icono app (512x512)
└── README.md              # Este archivo
```

### Tecnologías

- HTML5, CSS3, JavaScript vanilla
- Tailwind CSS
- Material Design Icons
- Google Apps Script (API backend)
- Service Workers API
- Web App Manifest

### API

Los datos se obtienen de una hoja de cálculo de Google Apps Script:
- Parroquias: ID, Nombre, Dirección, Ciudad, Teléfono, Coordenadas
- Horarios: Día, Hora, ID_Parroquia

## Licencia

Este proyecto es de uso exclusivo para la Diócesis de Pereira.

---

Desarrollado con ❤️ para la comunidad católica de Pereira
