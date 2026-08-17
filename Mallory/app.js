(function(){
  "use strict";
  const events=(window.MALLORY_EVENTS||[]).sort((a,b)=>a.sort.localeCompare(b.sort));
  const camps=window.MALLORY_CAMPS||[];
  const timeline=document.getElementById("timeline");
  const detail=document.getElementById("eventDetail");
  const campPins=document.getElementById("campPins");
  const campDetail=document.getElementById("campDetail");
  let filter="all", selected="odell";
  const labels={document:"Document",photo:"Photograph",testimony:"Eyewitness",artifact:"Recovered evidence",inference:"Reconstruction"};

  function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
  function visible(){return events.filter(e=>filter==="all"||e.type===filter||(filter==="document"&&e.type==="photo"));}
  function render(){
    const list=visible(); if(!list.some(e=>e.id===selected)) selected=list[0]?.id;
    timeline.innerHTML=list.map(e=>`<li><button class="event ${e.id===selected?'selected':''}" data-id="${e.id}"><span class="event-date">${esc(e.date)}<small>${esc(e.time)}</small></span><i class="dot ${e.type}"></i><span class="event-copy"><small>${esc(labels[e.type]||e.type)}</small><b>${esc(e.title)}</b><span>${esc(e.altitude)} · ${esc(e.camp)}</span></span></button></li>`).join("");
    const e=events.find(x=>x.id===selected); if(!e){detail.innerHTML="<p>No events in this view.</p>";return;}
    detail.innerHTML=`<p class="eyebrow">${esc(labels[e.type]||e.type)} · ${esc(e.certainty)}</p><h3>${esc(e.title)}</h3><div class="detail-meta"><span>${esc(e.date)}</span><span>${esc(e.time)}</span><span>${esc(e.altitude)}</span></div><p>${esc(e.summary)}</p><dl><div><dt>People</dt><dd>${esc(e.people)}</dd></div><div><dt>Location</dt><dd>${esc(e.camp)}</dd></div><div><dt>Source trail</dt><dd>${esc(e.source)}</dd></div></dl>`;
  }
  document.querySelector(".filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;filter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));render();});
  timeline.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(!b)return;selected=b.dataset.id;render();if(innerWidth<900)detail.scrollIntoView({behavior:"smooth",block:"center"});});
  campPins.innerHTML=camps.map(c=>`<g class="camp-pin" data-camp="${c.id}" tabindex="0" role="button" aria-label="${esc(c.label)}, ${c.altitude} metres" transform="translate(${c.x*10} ${c.y*5})"><circle r="10"/><circle r="3"/><text x="0" y="-17">${esc(c.label)}</text></g>`).join("");
  function showCamp(node){document.querySelectorAll(".camp-pin").forEach(x=>x.classList.toggle("active",x===node));const c=camps.find(x=>x.id===node.dataset.camp);campDetail.innerHTML=`<figure class="camp-photo"><img src="assets/everest-north-face.jpg" alt="Approximate view toward ${esc(c.label)} on Everest’s north face" style="object-position:${esc(c.focus)};transform-origin:${esc(c.focus)}"/><figcaption>${esc(c.label)} · route context</figcaption></figure><div class="camp-copy"><span>Approximate altitude</span><strong>${esc(c.label)}</strong><p class="camp-altitude">${c.altitude.toLocaleString()} metres</p><p>${esc(c.description)}</p></div>`;}
  campPins.addEventListener("click",e=>{const n=e.target.closest(".camp-pin");if(n)showCamp(n);});
  campPins.addEventListener("keydown",e=>{const n=e.target.closest(".camp-pin");if(n&&(e.key==="Enter"||e.key===" ")){e.preventDefault();showCamp(n);}});
  showCamp(campPins.querySelector('[data-camp="base"]'));
  render();
})();
