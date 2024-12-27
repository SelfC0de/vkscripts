// ==UserScript==
// @name         VK SelfSense Configs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  VK SelfSense configurations module
// @author       Your Name
// @match        https://vk.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     window.initConfigs = () => {
           const configSettings = document.getElementById('config-settings');
           configSettings.innerHTML = `
            <h3>Configurations</h3>
            <div class="selfsense-setting-row">
                <button id="generate-config-button">Generate Config Code</button>
                 <input type="text" id="config-code-display" readonly style="width: 100%; padding: 8px;" value="Click Generate config for code" >
            </div>
             <div class="selfsense-setting-row">
                <input type="text" id="load-config-code-input" placeholder="Enter Config Code" style="width: 100%; padding: 8px;">
             <button id="apply-config-button">Apply</button>
            </div>
                <h3>My Configurations</h3>
                  <div id="saved-configs-list"></div>
                 <div class="selfsense-setting-row">
                     <input type="text" id="new-config-name" placeholder="New Configuration Name" style="width: 100%; padding: 8px;">
                   <button id="save-config-button">Create New Config</button>
              </div>
           <div class="selfsense-setting-row">
                <button id="clear-configs-button">Clear All Configs</button>
            </div>
           `;

        // --- Система конфигурации ---
         const generateConfigButton = document.getElementById('generate-config-button');
            const configCodeDisplay = document.getElementById('config-code-display');
            const loadConfigCodeInput = document.getElementById('load-config-code-input');
            const applyConfigButton = document.getElementById('apply-config-button');
             const saveConfigButton = document.getElementById('save-config-button');
             const savedConfigsList = document.getElementById('saved-configs-list');
            const newConfigNameInput = document.getElementById('new-config-name');
             const clearConfigsButton = document.getElementById('clear-configs-button');

        const generateUniqueCode = (length = 12) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        const saveConfig = (configName, config) => {
            let savedConfigs = GM_getValue('selfsense_configs', {});
           const configId = generateUniqueCode(8);
             savedConfigs[configId] = {name: configName, config: config};
            GM_setValue('selfsense_configs', savedConfigs);
             updateConfigsList();
        }

       const loadConfig = (config) => {
              //Online Status
             if (typeof document.getElementById('online-status-enabled') !== 'undefined') {
                 document.getElementById('online-status-enabled').checked = config.onlineStatusEnabled;
                  document.getElementById('online-status-color').value = config.onlineStatusColor;
                  document.getElementById('online-status-absolute').checked = config.onlineStatusAbsolute;
                  document.getElementById('online-status-bottom').value = config.onlineStatusBottom;
                  document.getElementById('online-status-right').value = config.onlineStatusRight;
                  document.getElementById('online-status-transform-static').value = config.onlineStatusTransformStatic;
                   document.getElementById('online-status-transform-dynamic').value = config.onlineStatusTransformDynamic;
                   document.getElementById('online-status-transform-interval').value = config.onlineStatusTransformInterval;
                    document.getElementById('online-status-transform-color-left').value = config.onlineStatusTransformColorLeft;
                   document.getElementById('online-status-transform-color-right').value = config.onlineStatusTransformColorRight;

              if (typeof updateOnlineStatus === 'function') {
                 updateOnlineStatus();
             }
             }

           //3d animation
           if(typeof document.getElementById('animation-3d-select') !== 'undefined'){
               document.getElementById('animation-3d-select').value = config.animation3DSelect;
                if (typeof apply3DAnimation === 'function') {
                    apply3DAnimation(document.getElementById('animation-3d-select').value);
                   }
           }

           //falling animation
         if (typeof document.getElementById('falling-animation-select') !== 'undefined'){
             document.getElementById('falling-animation-select').value = config.fallingAnimationSelect;
             if(typeof applyFallingAnimation === 'function'){
               applyFallingAnimation(document.getElementById('falling-animation-select').value);
                }
         }
           //clock/date
        if(typeof document.getElementById('show-clock-date-select') !== 'undefined'){
           document.getElementById('show-clock-date-select').value = config.showClockDateSelect;
           document.getElementById('clock-date-size').value = config.clockDateSizeInput;
           document.getElementById('clock-date-color').value = config.clockDateColorInput;
             if(typeof updateClockDateDisplay === 'function'){
                updateClockDateDisplay();
             }
       }
        };

        const updateConfigsList = () => {
           let savedConfigs = GM_getValue('selfsense_configs', {});
           savedConfigsList.innerHTML = '';
            for (const configId in savedConfigs) {
                const config = savedConfigs[configId];
                 const listItem = document.createElement('div');
                listItem.style.display = 'flex';
                 listItem.style.alignItems = 'center';
                 listItem.style.marginBottom = '5px';
                 listItem.style.gap= '5px';

                const nameSpan = document.createElement('span');
                 nameSpan.textContent = config.name;
                   listItem.appendChild(nameSpan);

                  const editButton = document.createElement('button');
                  editButton.textContent= 'Edit';
                  editButton.addEventListener('click', () => {
                     newConfigNameInput.value = config.name;
                   loadConfig(config.config);
                  });
                 listItem.appendChild(editButton);

              const applyButton = document.createElement('button');
               applyButton.textContent = 'Apply';
                 applyButton.addEventListener('click', () => {
                   loadConfig(config.config);
                  });
                 listItem.appendChild(applyButton);
                 const deleteButton = document.createElement('button');
               deleteButton.textContent = 'Delete';
                 deleteButton.addEventListener('click', () => {
                    delete savedConfigs[configId];
                      GM_setValue('selfsense_configs', savedConfigs);
                      updateConfigsList();
                  })
                   listItem.appendChild(deleteButton);
              savedConfigsList.appendChild(listItem);
            }
        };
         updateConfigsList();

      generateConfigButton.addEventListener('click', () => {
        const config = {
               //Online Status
               onlineStatusEnabled:  typeof document.getElementById('online-status-enabled') !== 'undefined' ?  document.getElementById('online-status-enabled').checked : false,
               onlineStatusColor:  typeof document.getElementById('online-status-color') !== 'undefined' ?  document.getElementById('online-status-color').value : '#b3a34b',
               onlineStatusAbsolute:  typeof document.getElementById('online-status-absolute') !== 'undefined' ?  document.getElementById('online-status-absolute').checked : false,
               onlineStatusBottom: typeof document.getElementById('online-status-bottom') !== 'undefined' ?  document.getElementById('online-status-bottom').value : '14.64',
               onlineStatusRight: typeof document.getElementById('online-status-right') !== 'undefined' ?  document.getElementById('online-status-right').value : '14.64',
                 onlineStatusTransformStatic: typeof document.getElementById('online-status-transform-static') !== 'undefined' ? document.getElementById('online-status-transform-static').value : 'none',
                  onlineStatusTransformDynamic:  typeof document.getElementById('online-status-transform-dynamic') !== 'undefined' ?  document.getElementById('online-status-transform-dynamic').value : 'none',
                   onlineStatusTransformInterval:  typeof document.getElementById('online-status-transform-interval') !== 'undefined' ? document.getElementById('online-status-transform-interval').value : '1',
                   onlineStatusTransformColorLeft:  typeof document.getElementById('online-status-transform-color-left') !== 'undefined' ?  document.getElementById('online-status-transform-color-left').value : '#ff0000',
                  onlineStatusTransformColorRight:  typeof document.getElementById('online-status-transform-color-right') !== 'undefined' ? document.getElementById('online-status-transform-color-right').value : '#00ff00',
              //3d animation
            animation3DSelect: typeof document.getElementById('animation-3d-select') !== 'undefined' ? document.getElementById('animation-3d-select').value : 'none',
             //falling animation
              fallingAnimationSelect: typeof document.getElementById('falling-animation-select') !== 'undefined' ? document.getElementById('falling-animation-select').value : 'none',
          //clock/date
             showClockDateSelect: typeof document.getElementById('show-clock-date-select') !== 'undefined' ?  document.getElementById('show-clock-date-select').value : 'none',
              clockDateSizeInput: typeof document.getElementById('clock-date-size') !== 'undefined' ?  document.getElementById('clock-date-size').value : '1.2',
              clockDateColorInput: typeof document.getElementById('clock-date-color') !== 'undefined' ?  document.getElementById('clock-date-color').value : '#eee'
            };
            const configCode = JSON.stringify(config);
            configCodeDisplay.value = configCode;
        });

        applyConfigButton.addEventListener('click', () => {
             try {
                const configCode = loadConfigCodeInput.value;
                  if(!configCode) return;
                const config = JSON.parse(configCode);
               loadConfig(config);
            } catch (e) {
                alert('Invalid config code');
            }
        });

        saveConfigButton.addEventListener('click', () => {
            const configName = newConfigNameInput.value;
            if(!configName) {
              alert('Enter config name');
               return;
              }
         const config = {
               //Online Status
               onlineStatusEnabled:  typeof document.getElementById('online-status-enabled') !== 'undefined' ?  document.getElementById('online-status-enabled').checked : false,
               onlineStatusColor:  typeof document.getElementById('online-status-color') !== 'undefined' ?  document.getElementById('online-status-color').value : '#b3a34b',
               onlineStatusAbsolute:  typeof document.getElementById('online-status-absolute') !== 'undefined' ?  document.getElementById('online-status-absolute').checked : false,
               onlineStatusBottom: typeof document.getElementById('online-status-bottom') !== 'undefined' ?  document.getElementById('online-status-bottom').value : '14.64',
               onlineStatusRight: typeof document.getElementById('online-status-right') !== 'undefined' ?  document.getElementById('online-status-right').value : '14.64',
                 onlineStatusTransformStatic: typeof document.getElementById('online-status-transform-static') !== 'undefined' ? document.getElementById('online-status-transform-static').value : 'none',
                  onlineStatusTransformDynamic:  typeof document.getElementById('online-status-transform-dynamic') !== 'undefined' ?  document.getElementById('online-status-transform-dynamic').value : 'none',
                   onlineStatusTransformInterval:  typeof document.getElementById('online-status-transform-interval') !== 'undefined' ? document.getElementById('online-status-transform-interval').value : '1',
                   onlineStatusTransformColorLeft:  typeof document.getElementById('online-status-transform-color-left') !== 'undefined' ?  document.getElementById('online-status-transform-color-left').value : '#ff0000',
                  onlineStatusTransformColorRight:  typeof document.getElementById('online-status-transform-color-right') !== 'undefined' ? document.getElementById('online-status-transform-color-right').value : '#00ff00',
              //3d animation
            animation3DSelect: typeof document.getElementById('animation-3d-select') !== 'undefined' ? document.getElementById('animation-3d-select').value : 'none',
             //falling animation
              fallingAnimationSelect: typeof document.getElementById('falling-animation-select') !== 'undefined' ? document.getElementById('falling-animation-select').value : 'none',
          //clock/date
             showClockDateSelect: typeof document.getElementById('show-clock-date-select') !== 'undefined' ?  document.getElementById('show-clock-date-select').value : 'none',
              clockDateSizeInput: typeof document.getElementById('clock-date-size') !== 'undefined' ?  document.getElementById('clock-date-size').value : '1.2',
              clockDateColorInput: typeof document.getElementById('clock-date-color') !== 'undefined' ?  document.getElementById('clock-date-color').value : '#eee'
            };
           saveConfig(configName,config);
           newConfigNameInput.value = '';
         })

       clearConfigsButton.addEventListener('click', () => {
            if(confirm('Clear all saved configs?')){
              GM_setValue('selfsense_configs', {});
              updateConfigsList();
            }
        });
     }
})();