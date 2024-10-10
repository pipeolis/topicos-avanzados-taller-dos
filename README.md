# Proyecto de testing con playwright - pokémon showdown team builder

Este proyecto realiza pruebas automatizadas en la funcionalidad de creación de equipos en el sitio [Pokémon Showdown](https://play.pokemonshowdown.com) utilizando la herramienta de testing Playwright.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado [Node +18](https://nodejs.org/) en tu sistema.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```
npm install
```

## Ejecución de pruebas

Hay varias formas de ejecutar las pruebas:

### UI de playwright

Si deseas ver las pruebas a través de la interfaz gráfica de Playwright, puedes ejecutar el siguiente comando:

```
npx playwright test --ui
```

### Ejecución directa de pruebas

Si prefieres ejecutar los tests directamente desde la línea de comandos en modo "headed" (con navegador visible), usa:

```
npx playwright test tests/teambuilder.spec.ts --headed
```

## Resultados de las pruebas

Una vez ejecutadas las pruebas, Playwright generará un reporte detallado que puedes revisar en formato HTML.

Para acceder al reporte, abre el archivo `playwright-report/index.html` en tu navegador.

Además, las capturas de pantalla tomadas durante las pruebas serán anexadas automáticamente a la raíz del proyecto en la carpeta `screenshots`, permitiendo inspeccionar visualmente el estado de la aplicación en los momentos clave de las pruebas.