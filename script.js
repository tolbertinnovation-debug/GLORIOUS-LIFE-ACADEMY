const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(returnFocus=false){if(!button||!nav)return;button.setAttribute('aria-expanded','false');nav.classList.remove('open');if(returnFocus)button.focus();}
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav?.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&button?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelector('#expand-leaders')?.addEventListener('click',()=>document.querySelectorAll('.leader:not([hidden]) details').forEach(d=>d.open=true));
document.querySelector('#collapse-leaders')?.addEventListener('click',()=>document.querySelectorAll('.leader details').forEach(d=>d.open=false));
const tabs=[...document.querySelectorAll('.pillar-tabs [role="tab"]')];
function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>{selectTab(tab);if(tab.dataset.hash)history.replaceState(null,'','#'+tab.dataset.hash);});tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});});
const progress=document.querySelector('.reading-progress');
let scheduled=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform='scaleX('+(max>0?Math.min(1,window.scrollY/max):0)+')';document.querySelector('header')?.classList.toggle('scrolled',window.scrollY>20);scheduled=false;}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
const leaderSearch=document.querySelector('#leader-search');
const filterButtons=[...document.querySelectorAll('.directory-filters [data-filter]')];
const leaderCards=[...document.querySelectorAll('.leader[data-group]')];
const leaderCount=document.querySelector('#leader-count');
const leaderEmpty=document.querySelector('#leader-empty');
let activeFilter='all';
const normalize=text=>text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function filterLeaders(){if(!leaderCards.length)return;const terms=normalize(leaderSearch?.value.trim()||'').split(/\s+/).filter(Boolean);let shown=0;leaderCards.forEach(card=>{const text=normalize(card.textContent);const visible=(activeFilter==='all'||card.dataset.group===activeFilter)&&terms.every(t=>text.includes(t));card.hidden=!visible;if(visible)shown++;});if(leaderCount)leaderCount.textContent=shown===leaderCards.length?'Showing all '+shown+' leaders':'Showing '+shown+' of '+leaderCards.length+' leaders';if(leaderEmpty)leaderEmpty.hidden=shown>0;}
filterButtons.forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;filterButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterLeaders();}));
leaderSearch?.addEventListener('input',filterLeaders);
document.querySelector('#leader-reset')?.addEventListener('click',()=>{if(leaderSearch)leaderSearch.value='';activeFilter='all';filterButtons.forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.filter==='all')));filterLeaders();leaderSearch?.focus();});
const linkedTab=tabs.find(t=>t.dataset.hash&&'#'+t.dataset.hash===location.hash);if(linkedTab){selectTab(linkedTab);document.querySelector('.stage-explorer')?.scrollIntoView();}
const revealTargets=document.querySelectorAll('.section-heading,.intro,.leader,.governance-grid article,.commitments li,.sponsor,.pillar-layout,.page-cta,.journey-stats,.journey-track,.grade-ladder,.banner-frame,.pillar-cards,.life-mosaic,.gallery-grid,.core-values,.photo-pair,.scripture blockquote,.sponsor-photo');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{rootMargin:'0px 0px -8% 0px'});revealTargets.forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
function countUp(el){const target=Number(el.dataset.count);const start=performance.now();const step=now=>{const t=Math.min(1,(now-start)/1200);el.textContent=Math.round(target*(1-Math.pow(1-t,3)));if(t<1)requestAnimationFrame(step);};el.textContent='0';requestAnimationFrame(step);}
const counters=document.querySelectorAll('[data-count]');
if(counters.length&&'IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){countUp(entry.target);counterObserver.unobserve(entry.target);}}),{threshold:.6});counters.forEach(el=>counterObserver.observe(el));}
const galleryButtons=[...document.querySelectorAll('[data-gallery-filter]')];
galleryButtons.forEach(b=>b.addEventListener('click',()=>{galleryButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.gallery-grid .gallery-item').forEach(item=>{item.hidden=b.dataset.galleryFilter!=='all'&&item.dataset.category!==b.dataset.galleryFilter;});}));
const lightboxLinks=[...document.querySelectorAll('a[data-lightbox]')];
if(lightboxLinks.length){
const box=document.createElement('div');box.className='lightbox';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Photo viewer');
box.innerHTML='<button type="button" class="lightbox-close" aria-label="Close photo viewer">×</button><button type="button" class="lightbox-prev" aria-label="Previous photo">‹</button><figure><img alt=""><figcaption><span class="lightbox-caption"></span><span class="lightbox-count"></span></figcaption></figure><button type="button" class="lightbox-next" aria-label="Next photo">›</button>';
document.body.appendChild(box);
const boxImg=box.querySelector('img'),boxCaption=box.querySelector('.lightbox-caption'),boxCount=box.querySelector('.lightbox-count');
let current=0,lastFocus=null,touchX=null;
const visibleLinks=()=>lightboxLinks.filter(a=>!a.closest('[hidden]'));
function show(i){const links=visibleLinks();current=(i+links.length)%links.length;const a=links[current];boxImg.classList.remove('loaded');boxImg.onload=()=>boxImg.classList.add('loaded');boxImg.src=a.href;boxImg.alt=a.querySelector('img')?.alt||'';boxCaption.textContent=a.dataset.caption||'';boxCount.textContent=links.length>1?(current+1)+' / '+links.length:'';box.querySelectorAll('.lightbox-prev,.lightbox-next').forEach(b=>b.hidden=links.length<2);}
function openBox(a){lastFocus=document.activeElement;box.hidden=false;document.body.classList.add('lightbox-open');show(visibleLinks().indexOf(a));box.querySelector('.lightbox-close').focus();}
function closeBox(){box.hidden=true;document.body.classList.remove('lightbox-open');lastFocus?.focus();}
lightboxLinks.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openBox(a);}));
box.querySelector('.lightbox-close').addEventListener('click',closeBox);
box.querySelector('.lightbox-prev').addEventListener('click',()=>show(current-1));
box.querySelector('.lightbox-next').addEventListener('click',()=>show(current+1));
box.addEventListener('click',e=>{if(e.target===box)closeBox();});
box.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
box.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>50)show(current+(dx<0?1:-1));touchX=null;});
document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')closeBox();if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);if(e.key==='Tab'){const f=[...box.querySelectorAll('button:not([hidden])')];const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();}}});
}
