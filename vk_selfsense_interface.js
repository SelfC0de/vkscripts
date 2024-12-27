// ==UserScript==
// @name         VK SelfSense Interface
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  VK SelfSense main interface
// @author       Your Name
// @match        https://vk.com/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-start
// @require      https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/vk_selfsense_online_status.js
// @require      https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/vk_selfsense_animations.js
// @require      https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/vk_selfsense_clock_date.js
// @require      https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/vk_selfsense_configs.js
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. Стилизация (интерфейс) ---
    const styles = `
        /* Общие стили */
        #selfsense-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #282828;
            border: 1px solid #444;
            border-radius: 10px;
            padding: 10px;
            z-index: 1000;
            font-family: sans-serif;
            color: #eee;
            width: 450px;
            height: 350px;
             overflow: hidden;
        }
        #selfsense-container.minimized {
            width: auto;
            height: auto;
            padding: 5px 10px;
            overflow: hidden;
            max-height: 30px;
            transition: all 0.3s ease;
        }
       #selfsense-container.minimized .selfsense-tabs,
       #selfsense-container.minimized .selfsense-panel{
            display:none !important;
       }
      #selfsense-container.minimized  #selfsense-minimize-button::before{
         content: "🔽";
        }
        #selfsense-container .selfsense-title {
            cursor: move;
             text-align: center;
            margin-bottom: 10px;
            font-size:1.2em;
            font-weight: 600;
             display: flex;
              justify-content: space-between;
            align-items: center;
        }
           #selfsense-container #selfsense-minimize-button{
               cursor: pointer;
             border:none;
            background: transparent;
             font-size: 1.1em;
              transition: all 0.3s ease;
            }
       #selfsense-container #selfsense-minimize-button:hover{
            opacity:0.5;
        }
      #selfsense-container #selfsense-minimize-button::before{
         content: "🔼";
        }

        .selfsense-tabs {
            display: flex;
            border-bottom: 1px solid #444;
        }
        .selfsense-tab {
            padding: 8px 15px;
            cursor: pointer;
            background-color: #333;
            color: #eee;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border: 1px solid #444;
            border-bottom: none;
            margin-right: 2px;
           transition: all 0.3s ease;
        }
          .selfsense-tab:hover {
            background-color: #444;
        }

        .selfsense-tab.active {
            background-color: #282828;
        }
          .selfsense-panel {
             padding: 10px;
             overflow: auto;
        }
         .selfsense-panel h3{
             margin: 0 0 10px 0;
         }
        .selfsense-panel.hidden {
           display: none;
        }
         .selfsense-setting-row {
           margin-bottom: 10px;
           display:flex;
           align-items: center;
             gap:10px;
        }
           .selfsense-setting-row > label {
                 flex: 1;
        }
        .selfsense-setting-row > input[type="checkbox"]{
             cursor: pointer;
        }
         .selfsense-setting-row > input[type="number"],
          .selfsense-setting-row > input[type="text"],
         .selfsense-setting-row > select
           {
           padding: 5px;
           background: #333;
           border: none;
           color: #eee;
            border-radius: 5px;
           }
         .selfsense-setting-row > button{
          padding: 8px;
          background: #333;
          color: #eee;
          border: none;
           border-radius: 5px;
           cursor: pointer;
         }
         .selfsense-setting-row > button:hover{
          opacity:0.5;
         }
        .selfsense-blur {
          position: fixed;
           top: 0;
            left: 0;
           width: 100%;
          height: 100%;
         backdrop-filter: blur(10px);
          display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2em;
              z-index: 999;
            color: white;
           font-family: sans-serif;
           transition: opacity 1s ease-in-out;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          opacity:1;

         }
        .selfsense-blur.hidden{
             opacity:0;
          pointer-events: none;
        }
         .selfsense-blur span:first-child{
             color:white;
         }
         .selfsense-blur span:last-child{
              color:#95b806;
         }
       `;
    GM_addStyle(styles);

    // --- 2. Создание HTML интерфейса ---
    const selfsenseContainer = document.createElement('div');
    selfsenseContainer.id = 'selfsense-container';
   selfsenseContainer.innerHTML = `
    <div class="selfsense-title">
        <span>Self<span style="color:#95b806;">Sense</span></span>
        <button id="selfsense-minimize-button"></button>
    </div>
        <div class="selfsense-tabs">
            <div class="selfsense-tab active" data-tab="visual">Visual</div>
            <div class="selfsense-tab" data-tab="misc">Misc</div>
            <div class="selfsense-tab" data-tab="settings">Settings</div>
            <div class="selfsense-tab" data-tab="configs">Configs</div>
        </div>

        <div class="selfsense-panel" data-panel="visual">
            <h3>Online Status</h3>
              <div id="online-status-settings"></div>
            <h3>3D Animations</h3>
              <div id="animation-3d-settings"></div>
        </div>

        <div class="selfsense-panel hidden" data-panel="misc">
            <h3>Falling Animations</h3>
             <div id="falling-animation-settings"></div>
        </div>

       <div class="selfsense-panel hidden" data-panel="settings">
           <h3>Show Clock/Date</h3>
          <div id="clock-date-settings"></div>
          <div class="selfsense-setting-row">
               <button id="reload-page-button">Reload Page</button>
         </div>
         </div>
        <div class="selfsense-panel hidden" data-panel="configs">
           <div id="config-settings"></div>
        </div>
    `;
    document.body.appendChild(selfsenseContainer);

    const selfsenseBlur = document.createElement('div');
    selfsenseBlur.classList.add('selfsense-blur');
     selfsenseBlur.innerHTML = `<span>Self</span><span>Sense</span> -Your owner VK`;
    document.body.appendChild(selfsenseBlur);

    let isMinimized = false;
    let isDragging = false;
    let offsetX, offsetY;

    // --- 3. Функционал ---
    // Анимационное приветствие
    setTimeout(() => {
        selfsenseBlur.classList.add('hidden');
    }, 5000);

    // Минимизация интерфейса
    const minimizeButton = document.getElementById('selfsense-minimize-button');
    minimizeButton.addEventListener('click', () => {
        isMinimized = !isMinimized;
        selfsenseContainer.classList.toggle('minimized', isMinimized);
    });

      // Перетаскивание интерфейса
   const selfsenseTitle = document.querySelector('#selfsense-container .selfsense-title');
    selfsenseTitle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - selfsenseContainer.offsetLeft;
        offsetY = e.clientY - selfsenseContainer.offsetTop;
         selfsenseContainer.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        selfsenseContainer.style.left = (e.clientX - offsetX) + 'px';
        selfsenseContainer.style.top = (e.clientY - offsetY) + 'px';
    });
     document.addEventListener('mouseup', () => {
        isDragging = false;
         selfsenseContainer.style.transition = 'all 0.3s ease';
    });

    // Переключение вкладок
    const tabs = document.querySelectorAll('.selfsense-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const panelId = tab.getAttribute('data-tab');
            const panels = document.querySelectorAll('.selfsense-panel');
            panels.forEach(p => p.classList.add('hidden'));
            document.querySelector(`.selfsense-panel[data-panel="${panelId}"]`).classList.remove('hidden');
              if(isMinimized){
              isMinimized = false;
              selfsenseContainer.classList.remove('minimized');
            }
        });
    });
     //Функция перезагрузки страницы
    const reloadPageButton = document.getElementById('reload-page-button');
    reloadPageButton.addEventListener('click', () => {
        location.reload();
    });

     //Init modules
       if (typeof initOnlineStatus === 'function') {
       initOnlineStatus();
    }
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    if (typeof initClockDate === 'function') {
        initClockDate();
    }
   if (typeof initConfigs === 'function') {
        initConfigs();
    }
})();