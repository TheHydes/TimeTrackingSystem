### Scroll down for the English version

# Időnyilvántartó Rendszer

Ez a projekt egy egyszerű időnyilvántartó alkalmazás, amely lehetővé teszi a felhasználók számára, hogy nyomon kövessék munkaidejüket, és címkék alapján kategorizálják őket. Az alkalmazás frontend technológiákat használ, és Vue.js keretrendszerben készült.

## Funkciók

- Munkaidő bejegyzések létrehozása, szerkesztése és törlése
- Munkaidő bejegyzések listázása napi, heti vagy havi nézetben
- Munkaidő bejegyzések címkézése (pl. projekt, ügyfél)
- Statisztikák megjelenítése címkék szerinti bontásban, diagrammal

## Technológiai követelmények

- Node.js (ajánlott verzió: 14 vagy újabb) Innen töltsd le a Node.js-t: https://nodejs.org/en
- npm
- Vue CLI (Vue Parancssori Felület): Ez a Vue.js projektek kezelésére szolgál.

### Ha még nem telepítetted a Vue CLI-t, ezt az alábbi parancs futtatásával megteheted:

```bash
npm install -g @vue/cli
```

## Telepítési és futtatási útmutató

Kövesd az alábbi lépéseket a projekt telepítéséhez és futtatásához.

### 1. Klónozd a projektet

```bash
git clone https://github.com/TheHydes/TimeTrackingSystem.git
cd TimeTrackingSystem
```

### 2. Függőségek telepítése

```bash
npm install
```

#### Ez a parancs letölti és telepíti az összes szükséges csomagot, amelyek a következő főbb csomagokat tartalmazzák:

- Vue.js: A fő frontend keretrendszer
- Bootstrap: A CSS keretrendszer a reszponzív felülethez
- Chart.js: A diagramok megjelenítéséhez használt könyvtár
- vue-chartjs: A Chart.js Vue integrációjához szükséges csomag

## A projekt megfelelő működése érdekében ügyelj arra, hogy a következő csomag verziókat telepítsd:

- chart.js@^3.7.1
- vue-chartjs@^4.0.1

## Ha már telepítetted a csomagokat, de a diagram nem jelenik meg megfelelően, futtasd az alábbi parancsot, hogy biztosítsd a megfelelő verziók telepítését:

```bash
npm install chart.js@^3.7.1 vue-chartjs@^4.0.1
```

## Miután minden szükséges csomagot telepítettél, elindíthatod a fejlesztői szervert a következő paranccsal:

```bash
npm run serve
```

## Ha minden rendben van, a terminálban a következő üzenetet kell látnod:
App running at:
- Local:   http://localhost:8080/
- Network: http://192.168.x.x:8080/

## Látogass el a http://localhost:8080 címre, hogy megnézhesd az alkalmazást


# Time Tracking System

This project is a simple time tracking application that allows users to monitor their work hours and categorize them by tags. The application uses frontend technologies and is built with the Vue.js framework.

## Funkciók

- Create, edit, and delete work time entries
- View work time entries in daily, weekly, or monthly formats
- Tag work time entries (e.g., project, client)
- Display statistics by tags, visualized with a chart

## Technical Requirements

- Node.js (recommended version: 14 or higher) Download Node.js here: https://nodejs.org/en
- npm
- Vue CLI (Vue Command Line Interface): This is used for managing Vue.js projects.

### If you don't have the Vue CLI installed, you can do so by running the following command:

```bash
npm install -g @vue/cli
```

## Installation and Setup Guide

Follow the steps below to install and run the project.

### 1. Clone the Project

```bash
git clone https://github.com/TheHydes/TimeTrackingSystem.git
cd TimeTrackingSystem
```

### 2. Install Dependencies

```bash
npm install
```

#### This command will download and install all necessary packages, which include the following major packages:

- Vue.js: The main frontend framework
- Bootstrap: The CSS framework for responsive design
- Chart.js: The library for displaying charts
- vue-chartjs: The package required for integrating Chart.js with Vue

## Ensure the Following Package Versions for Compatibility:

- chart.js@^3.7.1
- vue-chartjs@^4.0.1

## If you have already installed the packages but the chart does not display correctly, run the following command to ensure you have the correct versions installed:

```bash
npm install chart.js@^3.7.1 vue-chartjs@^4.0.1
```

## After installing all necessary packages, you can start the development server with the following command:

```bash
npm run serve
```

## If everything is set up correctly, you should see the following message in the terminal:
App running at:
- Local:   http://localhost:8080/
- Network: http://192.168.x.x:8080/

## Visit http://localhost:8080 in your browser to view the application.
