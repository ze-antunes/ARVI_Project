(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.getElementById("camera");document.getElementById("left-hand");let c=document.getElementById("right-hand");document.querySelector("a-scene");let a=document.querySelector("a-assets"),u=s=>new Promise((n,o)=>{document.addEventListener("DOMContentLoaded",function(){const r=document.getElementById(`${s}`);r.addEventListener("model-loaded",function(){const e=r.getObject3D("mesh");if(console.log(r),console.log(e),e&&e.children){const t=e.children[0].geometry.boundingBox,i=t.max.x-t.min.x,l=t.max.y-t.min.y,d=t.max.z-t.min.z;n({width:i,height:l,depth:d})}else o("Mesh or geometry not found.")})})});function m(s){const n=s.split("");for(let o=0;o<n.length;o++){let r=document.createElement("a-asset-item"),e=document.createElement("a-entity"),t;n[o]===n[o].toUpperCase()?(r.setAttribute("id",`${n[o]}`),r.setAttribute("src",`https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${n[o]}.glb`),t=`
                            <a-entity
                                id="id_${n[o]}_${o}"
                                color="white"
                                gltf-model="#${n[o]}"
                                rotation="0 90 0"
                            ></a-entity>
                            `):n[o]===n[o].toLowerCase()&&(r.setAttribute("id",`${n[o]}_`),r.setAttribute("src",`https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${n[o]}_.glb`),t=`
                            <a-entity
                                id="id_${n[o]}_${o}"
                                color="white"
                                gltf-model="#${n[o]}_"
                                rotation="0 90 0"
                            ></a-entity>
                            `),e.innerHTML=t,a.append(r),c.append(e)}f(s)}function f(s){const n=s.split("");let o=0,r=0;for(let e=0;e<n.length;e++){let t;n[e]===n[e].toUpperCase()?t=document.getElementById(`id_${n[e]}_${e}`):n[e]===n[e].toLowerCase()&&(t=document.getElementById(`id_${n[e]}_${e}`)),t&&u(t.id).then(i=>{r+=i.width/2+.1+o,t.setAttribute("position",`0 0 -${r}`),o=i.width/2}).catch(i=>{console.error(i)})}}let g="Hello";m(g);
