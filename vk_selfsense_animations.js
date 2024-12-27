// ==UserScript==
// @name         VK SelfSense Animations
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  VK SelfSense animations module
// @author       Your Name
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

     window.initAnimations = () => {
          const animation3Dsettings = document.getElementById('animation-3d-settings');
            animation3Dsettings.innerHTML =`
            <div class="selfsense-setting-row">
                <select id="animation-3d-select">
                   <option value="none">None</option>
                    <option value="cube">Cube</option>
                    <option value="sphere">Sphere</option>
                  <option value="helix">Helix</option>
                </select>
                <button id="animation-3d-apply">Apply</button>
            </div>
             <div class="selfsense-setting-row">
                <button id="animation-3d-disable">Disable</button>
            </div>
         `;
          const fallingAnimationSettings = document.getElementById('falling-animation-settings');
          fallingAnimationSettings.innerHTML =`
              <div class="selfsense-setting-row">
                <select id="falling-animation-select">
                    <option value="none">None</option>
                    <option value="snow">Snow</option>
                    <option value="rain">Rain</option>
                    <option value="leaf">Leaf</option>
                  <option value="matrix">Matrix</option>
                   <option value="bubble">Bubble</option>
                </select>
                  <button id="falling-animation-apply">Apply</button>
            </div>
              <div class="selfsense-setting-row">
                  <button id="falling-animation-disable">Disable</button>
              </div>
          `;

          // Функционал для 3D анимации
          const animation3DSelect = document.getElementById('animation-3d-select');
            const animation3DApply = document.getElementById('animation-3d-apply');
            const animation3DDisable = document.getElementById('animation-3d-disable');
           let current3DAnimation = null;

             const apply3DAnimation = (animationType) => {
                   if (current3DAnimation) {
                       current3DAnimation.remove();
                     current3DAnimation = null;
                   }
                if (animationType === 'none') return;
                 current3DAnimation = document.createElement('div');
                   current3DAnimation.id = 'selfsense-3d-animation';
                let animationContent = '';

                  if(animationType === 'cube'){
                    animationContent =  ` <div style="width: 100px; height: 100px; transform-style: preserve-3d; animation: rotateCube 10s linear infinite; position: absolute; top:50%; left:50%; transform:translate(-50%, -50%);">
                               <div style="width: 100px; height: 100px; background: rgba(255,0,0,0.5); position: absolute; transform: translateZ(50px);"></div>
                                <div style="width: 100px; height: 100px; background: rgba(0,255,0,0.5); position: absolute; transform: rotateY(90deg) translateZ(50px);"></div>
                                 <div style="width: 100px; height: 100px; background: rgba(0,0,255,0.5); position: absolute; transform: rotateY(180deg) translateZ(50px);"></div>
                                   <div style="width: 100px; height: 100px; background: rgba(255,255,0,0.5); position: absolute; transform: rotateY(-90deg) translateZ(50px);"></div>
                                     <div style="width: 100px; height: 100px; background: rgba(0,255,255,0.5); position: absolute; transform: rotateX(90deg) translateZ(50px);"></div>
                                       <div style="width: 100px; height: 100px; background: rgba(255,0,255,0.5); position: absolute; transform: rotateX(-90deg) translateZ(50px);"></div>
                        </div>
                  <style>
                    @keyframes rotateCube{
                      from{
                         transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg);
                      }
                      to{
                         transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg);
                     }
                    }
                  </style>
                    `;
                  }else if(animationType === 'sphere'){
                  animationContent =  `  <div style="width: 200px; height: 200px; position: absolute; top:50%; left:50%; transform:translate(-50%, -50%); transform-style: preserve-3d; animation: rotateSphere 10s linear infinite;">
                    <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.1); position: absolute; transform: translateZ(100px);"></div>
                  <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.2); position: absolute; transform: rotateY(30deg) translateZ(100px);"></div>
                       <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.3); position: absolute; transform: rotateY(60deg) translateZ(100px);"></div>
                     <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.4); position: absolute; transform: rotateY(90deg) translateZ(100px);"></div>
                     <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.5); position: absolute; transform: rotateY(120deg) translateZ(100px);"></div>
                       <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.6); position: absolute; transform: rotateY(150deg) translateZ(100px);"></div>
                    <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.7); position: absolute; transform: rotateY(180deg) translateZ(100px);"></div>
                       <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.8); position: absolute; transform: rotateY(210deg) translateZ(100px);"></div>
                        <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.9); position: absolute; transform: rotateY(240deg) translateZ(100px);"></div>
                    <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,1); position: absolute; transform: rotateY(270deg) translateZ(100px);"></div>
                      <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.9); position: absolute; transform: rotateY(300deg) translateZ(100px);"></div>
                   <div style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.8); position: absolute; transform: rotateY(330deg) translateZ(100px);"></div>
                  </div>
                  <style>
                     @keyframes rotateSphere{
                      from{
                           transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg);
                      }
                      to{
                          transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg);
                      }
                    }
                  </style>
                 `;
                }else if(animationType === 'helix'){
                    animationContent =  ` <div style="width: 200px; height: 200px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transform-style: preserve-3d; animation: rotateHelix 10s linear infinite;">
                              <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.6); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(0deg) translateZ(100px);"></div>
                              <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.7); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(30deg) translateZ(100px);"></div>
                                <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.8); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(60deg) translateZ(100px);"></div>
                               <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.9); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(90deg) translateZ(100px);"></div>
                                 <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,1); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(120deg) translateZ(100px);"></div>
                                 <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.9); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(150deg) translateZ(100px);"></div>
                                   <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.8); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(180deg) translateZ(100px);"></div>
                                 <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.7); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(210deg) translateZ(100px);"></div>
                                 <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.6); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(240deg) translateZ(100px);"></div>
                               <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.5); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(270deg) translateZ(100px);"></div>
                                <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.4); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(300deg) translateZ(100px);"></div>
                                 <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.3); position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%) rotateY(330deg) translateZ(100px);"></div>
                    </div>
                    <style>
                    @keyframes rotateHelix{
                      from{
                          transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg);
                      }
                      to{
                            transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg);
                     }
                    }
                    </style>
                  `;
                  }
                current3DAnimation.innerHTML = animationContent;
                document.body.appendChild(current3DAnimation);
            }

             const disable3DAnimation = () => {
                if(current3DAnimation) {
                  current3DAnimation.remove();
                  current3DAnimation = null;
                }
             }

             animation3DApply.addEventListener('click', () => {
                apply3DAnimation(animation3DSelect.value);
            });

            animation3DDisable.addEventListener('click', () => {
                 disable3DAnimation();
            });

          // Функции для падающих анимаций
            const fallingAnimationSelect = document.getElementById('falling-animation-select');
            const fallingAnimationApply = document.getElementById('falling-animation-apply');
           const fallingAnimationDisable = document.getElementById('falling-animation-disable');
             let currentFallingAnimation = null;

           const applyFallingAnimation = (animationType) => {
               if (currentFallingAnimation) {
                    currentFallingAnimation.remove();
                    currentFallingAnimation = null;
                }

                 if(animationType === 'none') return;
                  currentFallingAnimation = document.createElement('div');
                currentFallingAnimation.classList.add(`selfsense-${animationType}`);
              const count = 100;
                  for (let i = 0; i < count; i++) {
                        const span = document.createElement('span');
                      span.textContent = animationType === 'matrix' ? String.fromCharCode
 (Math.random() * 126 + 33) : '•';
                        span.style.left = `${Math.random() * 100}%`;
                        span.style.animationDelay = `${Math.random() * 10}s`;
                        span.style.fontSize = animationType === 'bubble' ? `${Math.random() * 20 + 10}px` : '';
                      span.style.width= animationType === 'bubble' ?  `${Math.random() * 20 + 10}px` : '';
                      span.style.height = animationType === 'bubble' ?  `${Math.random() * 20 + 10}px` : '';
                         if(animationType === 'snow'){
                           span.style.animationDuration = `${Math.random() * 5 + 5}s`;
                           span.style.opacity= `${Math.random() * 0.8 + 0.2}`;
                         }else if(animationType === 'rain'){
                           span.style.animationDuration = `${Math.random() * 3 + 2}s`;
                         } else if(animationType === 'leaf'){
                             span.style.animationDuration = `${Math.random() * 7 + 5}s`;
                              span.style.transform = `rotate(${Math.random() * 360}deg)`;
                           }else if(animationType === 'matrix'){
                            span.style.animationDuration = `${Math.random() * 3 + 2}s`;
                         } else if(animationType === 'bubble'){
                             span.style.animationDuration = `${Math.random() * 7 + 5}s`;
                            span.style.opacity = `${Math.random() * 0.5 + 0.3}`;
                            }
                       currentFallingAnimation.appendChild(span);
                    }
                 document.body.appendChild(currentFallingAnimation);
            };

          const disableFallingAnimation = () => {
             if(currentFallingAnimation){
               currentFallingAnimation.remove();
               currentFallingAnimation = null;
             }
           };

          fallingAnimationApply.addEventListener('click', () => {
              applyFallingAnimation(fallingAnimationSelect.value);
            });
           fallingAnimationDisable.addEventListener('click', () => {
                disableFallingAnimation();
           });
     }
})();