// ==UserScript==
// @name         VK SelfSense Online Status
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  VK SelfSense online status module
// @author       Your Name
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   window.initOnlineStatus = () => {
         const onlineStatusSettings = document.getElementById('online-status-settings');
        onlineStatusSettings.innerHTML = `
            <div class="selfsense-setting-row">
               <label>Enabled</label>
                <input type="checkbox" id="online-status-enabled">
            </div>
             <div class="selfsense-setting-row">
              <label>Color</label>
                <input type="color" id="online-status-color" value="#b3a34b">
             </div>
            <div class="selfsense-setting-row">
                <label>Position Absolute</label>
                <input type="checkbox" id="online-status-absolute">
            </div>
            <div class="selfsense-setting-row">
                <label>Bottom</label>
                <input type="number" id="online-status-bottom" value="14.64">
            </div>
            <div class="selfsense-setting-row">
                <label>Right</label>
                <input type="number" id="online-status-right" value="14.64">
            </div>
               <div class="selfsense-setting-row">
                  <label>Transform</label>
               </div>
             <div class="selfsense-setting-row">
                  <label>Left/Right Static</label>
                 <select id="online-status-transform-static">
                    <option value="none">None</option>
                   <option value="left">Left</option>
                    <option value="right">Right</option>
                 </select>
            </div>
               <div class="selfsense-setting-row">
                  <label>Left/Right Dynamic</label>
                   <select id="online-status-transform-dynamic">
                      <option value="none">None</option>
                    <option value="enabled">Enabled</option>
                    </select>
            </div>
           <div class="selfsense-setting-row">
                <label>Interval (sec)</label>
               <input type="number" id="online-status-transform-interval" value="1">
           </div>
           <div class="selfsense-setting-row">
                <label>Color Visible Left</label>
               <input type="color" id="online-status-transform-color-left" value="#ff0000">
           </div>
           <div class="selfsense-setting-row">
              <label>Color Visible Right</label>
              <input type="color" id="online-status-transform-color-right" value="#00ff00">
           </div>
        `;
          // Функции для Online Status
        const onlineStatusEnabled = document.getElementById('online-status-enabled');
     const onlineStatusColor = document.getElementById('online-status-color');
        const onlineStatusAbsolute = document.getElementById('online-status-absolute');
        const onlineStatusBottom = document.getElementById('online-status-bottom');
        const onlineStatusRight = document.getElementById('online-status-right');
        const onlineStatusTransformStatic = document.getElementById('online-status-transform-static');
        const onlineStatusTransformDynamic = document.getElementById('online-status-transform-dynamic');
        const onlineStatusTransformInterval = document.getElementById('online-status-transform-interval');
        const onlineStatusTransformColorLeft = document.getElementById('online-status-transform-color-left');
        const onlineStatusTransformColorRight = document.getElementById('online-status-transform-color-right');
        let transformIntervalId;

      const updateOnlineStatus = () => {
            const badge = document.querySelector('.ProfileIndicatorBadge__badge');
            const badgeOnline = document.querySelector('.ProfileIndicatorBadge__badgeOnline');

            if (badge && badgeOnline) {
              badgeOnline.style.backgroundColor = 'var(--vkui--color_background_content)';
                  badgeOnline.style.color= onlineStatusColor.value;

               if (onlineStatusEnabled.checked) {
                    badge.style.display = '';
                } else {
                    badge.style.display = 'none';
                }

                if (onlineStatusAbsolute.checked) {
                    badge.style.position = 'absolute';
                } else {
                    badge.style.position = '';
                }
                 badge.style.bottom = onlineStatusBottom.value + '%';
                badge.style.right = onlineStatusRight.value + '%';

                const staticTransform = onlineStatusTransformStatic.value;
                 const dynamicTransform = onlineStatusTransformDynamic.value;

            if (staticTransform === 'left') {
                badge.style.transform = 'translate(-50%, 50%)';
               badge.style.backgroundColor = onlineStatusTransformColorLeft.value;
            } else if (staticTransform === 'right') {
                badge.style.transform = 'translate(50%, 50%)';
              badge.style.backgroundColor = onlineStatusTransformColorRight.value;
            }  else{
                badge.style.transform = 'translate(50%, 50%)';
              }

            clearInterval(transformIntervalId);
            if(dynamicTransform === 'enabled'){
                  let isLeft = true;
                    transformIntervalId = setInterval(() => {
                        badge.style.transform = isLeft ? 'translate(-50%, 50%)' : 'translate(50%, 50%)';
                       badge.style.backgroundColor = isLeft ? onlineStatusTransformColorLeft.value: onlineStatusTransformColorRight.value;
                        isLeft = !isLeft;
                    }, onlineStatusTransformInterval.value * 1000);
                }
            }
        };

        onlineStatusEnabled.addEventListener('change', updateOnlineStatus);
        onlineStatusAbsolute.addEventListener('change', updateOnlineStatus);
        onlineStatusBottom.addEventListener('input', updateOnlineStatus);
        onlineStatusRight.addEventListener('input', updateOnlineStatus);
          onlineStatusColor.addEventListener('input', updateOnlineStatus);
        onlineStatusTransformStatic.addEventListener('change', updateOnlineStatus);
        onlineStatusTransformDynamic.addEventListener('change', updateOnlineStatus);
        onlineStatusTransformInterval.addEventListener('input', updateOnlineStatus);
        onlineStatusTransformColorLeft.addEventListener('input',updateOnlineStatus);
         onlineStatusTransformColorRight.addEventListener('input',updateOnlineStatus);
      updateOnlineStatus();
    };
})();