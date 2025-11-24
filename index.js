import{a as f,S as p,i}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function d(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=d(t);fetch(t.href,r)}})();const m="53365329-1bc1d5d35bf6bdc5eb7b3c976",y="https://pixabay.com/api/";function h(o){return f.get(y,{params:{key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(e=>e.data)}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),g=new p(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){l.innerHTML=o.map(e=>`
      <li class="photo-card">
        <a class="link" href="${e.largeImageURL}">
          <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="text">Likes</br> ${e.likes}</p>
          <p class="text">Views</br> ${e.views}</p>
          <p class="text">Comments</br> ${e.comments}</p>
          <p class="text">Downloads</br> ${e.downloads}</p>
        </div>
      </li>
    `).join(""),g.refresh()}function L(){l.innerHTML=""}function v(){c.classList.remove("hidden")}function x(){c.classList.add("hidden")}const u=document.querySelector(".form"),a=u.querySelector('input[name="search-text"]');u.addEventListener("submit",o=>{if(o.preventDefault(),a.value.trim()===""){i.error({title:"Error",message:"Please enter a search query"});return}v(),L(),h(a.value).then(e=>{if(e.hits.length===0){i.error({title:"Error",message:"Sorry, there is not result"});return}b(e.hits),a.value=""}).finally(()=>{x()})});
//# sourceMappingURL=index.js.map
