// ==UserScript==
// @name         VK SelfSense Clock Date
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  VK SelfSense clock and date module
// @author       Your Name
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     window.initClockDate = () => {
         const selfsenseClockDate = document.createElement('div');
         selfsenseClockDate.classList.add('selfsense-clock-date');
        document.body.appendChild(selfsenseClockDate);

        const clockDateSettings = document.getElementById('clock-date-settings');
        clockDateSettings.innerHTML = `
            <div class="selfsense-setting-row">
                <select id="show-clock-date-select">
                    <option value="none">None</option>
                    <option value="show-both">Show Both</option>
                   <option value="show-clock">Show Clock</option>
                   <option value="show-date">Show Date</option>
                  <option value="hide-all">Hide All</option>
                </select>
             </div>
            <div class="selfsense-setting-row">
                <label>Size</label>
                <input type="number" id="clock-date-size" value="1.2">
            </div>
           <div class="selfsense-setting-row">
                <label>Color</label>
                 <input type="color" id="clock-date-color" value="#eee">
           </div>
        `;

        // Функции для Clock/Date
        const showClockDateSelect = document.getElementById('show-clock-date-select');
        const clockDateSizeInput = document.getElementById('clock-date-size');
        const clockDateColorInput = document.getElementById('clock-date-color');

      const updateClockDateDisplay = () => {
             const selectedOption = showClockDateSelect.value;
              selfsenseClockDate.innerHTML = '';
            selfsenseClockDate.style.fontSize = clockDateSizeInput.value + 'em';
            selfsenseClockDate.style.color = clockDateColorInput.value;

             if(selectedOption === 'none') return;

          const updateTime = () => {
                const now = new Date();
                const time = now.toLocaleTimeString();
                const date = now.toLocaleDateString();

                if (selectedOption === 'show-both') {
                     selfsenseClockDate.innerHTML = `<span>${time}</span><span>${date}</span>`;
                } else if (selectedOption === 'show-clock') {
                   selfsenseClockDate.innerHTML = `<span>${time}</span>`;
                } else if(selectedOption === 'show-date'){
                     selfsenseClockDate.innerHTML = `<span>${date}</span>`;
                 }
            };
          updateTime();
            if (selectedOption !== 'hide-all') {
                 setInterval(updateTime, 1000);
            }
        };
       showClockDateSelect.addEventListener('change', updateClockDateDisplay);
         clockDateSizeInput.addEventListener('input', updateClockDateDisplay);
         clockDateColorInput.addEventListener('input', updateClockDateDisplay);
        updateClockDateDisplay();
     }

})();