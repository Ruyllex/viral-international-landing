# Cómo levantar el servidor local

## Opción 1: Python (Recomendada)

Si tienes Python instalado:

```powershell
# Navega a la carpeta del proyecto
cd c:\Users\ruymo\programacion\positivus-landing-page-main

# Levanta el servidor (Python 3)
python -m http.server 8000

# O si tienes Python 2
python -m SimpleHTTPServer 8000
```

Luego abre en tu navegador: `http://localhost:8000`

## Opción 2: Node.js (http-server)

Si tienes Node.js instalado:

```powershell
# Instala http-server globalmente (solo una vez)
npm install -g http-server

# Navega a la carpeta del proyecto
cd c:\Users\ruymo\programacion\positivus-landing-page-main

# Levanta el servidor
http-server -p 8000
```

Luego abre en tu navegador: `http://localhost:8000`

## Opción 3: Live Server (VS Code)

Si usas Visual Studio Code:

1. Instala la extensión "Live Server"
2. Abre la carpeta del proyecto en VS Code
3. Click derecho en `index.html`
4. Selecciona "Open with Live Server"

## ¿Por qué necesitas un servidor?

Los navegadores modernos bloquean ciertos scripts cuando abres archivos HTML directamente (`file://`) por seguridad. Un servidor local (`http://localhost`) permite que:

- ✅ El JavaScript se ejecute correctamente
- ✅ Los botones de tema y idioma funcionen
- ✅ Las animaciones GSAP funcionen
- ✅ El smooth scroll funcione

## Verificar que funciona

Una vez levantado el servidor, deberías poder:

1. ✅ Ver el carrusel de logos moviéndose
2. ✅ Hacer click en ☀️ para cambiar a modo oscuro
3. ✅ Hacer click en EN para cambiar a inglés
4. ✅ Ver todas las animaciones al hacer scroll
