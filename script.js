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
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});});
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
const revealTargets=document.querySelectorAll('.section-heading,.intro,.leader,.governance-grid article,.commitments li,.sponsor,.pillar-layout,.page-cta');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{rootMargin:'0px 0px -8% 0px'});revealTargets.forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
