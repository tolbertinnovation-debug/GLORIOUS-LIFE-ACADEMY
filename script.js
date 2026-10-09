const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(returnFocus=false){if(!button||!nav)return;button.setAttribute('aria-expanded','false');nav.classList.remove('open');if(returnFocus)button.focus();}
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav?.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&button?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelector('#expand-leaders')?.addEventListener('click',()=>document.querySelectorAll('.leader details').forEach(d=>d.open=true));
document.querySelector('#collapse-leaders')?.addEventListener('click',()=>document.querySelectorAll('.leader details').forEach(d=>d.open=false));
const tabs=[...document.querySelectorAll('.pillar-tabs [role="tab"]')];
function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});});
const progress=document.querySelector('.reading-progress');
let scheduled=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform='scaleX('+(max>0?Math.min(1,window.scrollY/max):0)+')';document.querySelector('header')?.classList.toggle('scrolled',window.scrollY>20);scheduled=false;}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
