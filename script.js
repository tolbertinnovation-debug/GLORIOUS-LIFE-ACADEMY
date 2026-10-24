// Academy WhatsApp number for enquiries, digits only with country code (e.g. '231771234567'). Leave empty to hide WhatsApp links.
const ACADEMY_WHATSAPP='231886421636';
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
const revealTargets=document.querySelectorAll('.section-heading,.intro,.leader,.governance-grid article,.commitments li,.sponsor,.pillar-layout,.page-cta,.journey-stats,.journey-track,.grade-ladder,.banner-frame,.pillar-cards,.life-mosaic,.gallery-grid,.core-values,.photo-pair,.scripture blockquote,.sponsor-photo,.admission-steps,.class-list,.admissions-band-inner,.enquire-layout');
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
const waDigits=ACADEMY_WHATSAPP.replace(/\D/g,'');
const waUrl=text=>'https://wa.me/'+waDigits+(text?'?text='+encodeURIComponent(text):'');
const waDisplay=waDigits.startsWith('231')?'+231 '+waDigits.slice(3).replace(/(\d{2})(\d{3})(\d+)/,'$1 $2 $3'):'+'+waDigits;
document.querySelectorAll('[data-whatsapp-link]').forEach(a=>{if(waDigits){a.href=waUrl('Hello Glorious Life Academy, I would like to make an enquiry.');a.target='_blank';a.rel='noopener noreferrer';a.textContent=waDisplay;}else a.closest('.contact-card')?.remove();});
const waIcon='<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.2z"/></svg>';
const store={get:k=>{try{return sessionStorage.getItem(k);}catch(e){return null;}},set:(k,v)=>{try{sessionStorage.setItem(k,v);}catch(e){}}};
const enquiryForm=document.querySelector('#enquiry-form');
if(enquiryForm){
const status=enquiryForm.querySelector('.form-status');
if(!waDigits){status.hidden=false;status.className='form-status warning';status.textContent='Online WhatsApp enquiries are coming soon. Please check back shortly.';enquiryForm.querySelector('button[type="submit"]').disabled=true;}
function setError(field,message){const input=enquiryForm.querySelector('#'+field);const error=enquiryForm.querySelector('#'+field+'-error');input.setAttribute('aria-invalid',String(!!message));error.textContent=message||'';error.hidden=!message;return !message;}
enquiryForm.querySelectorAll('input,select,textarea').forEach(el=>el.addEventListener('input',()=>{if(el.getAttribute('aria-invalid')==='true')setError(el.id,'');}));
enquiryForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(enquiryForm);const type=data.get('type');const parent=data.get('parent').trim();const phone=data.get('phone').trim();const child=data.get('child').trim();const cls=data.get('class');const message=data.get('message').trim();
const checks=[setError('parent-name',parent?'':'Please enter your name.'),setError('parent-phone',phone.replace(/\D/g,'').length>=7?'':'Please enter a phone number we can reach you on.'),setError('child-class',cls||type!=='Admissions'?'':'Please choose the class you are enquiring about.')];
if(checks.includes(false)){enquiryForm.querySelector('[aria-invalid="true"]')?.focus();return;}
const lines=['Hello Glorious Life Academy, I would like to make an enquiry.','','Enquiry: '+type,'Parent/guardian: '+parent,'Phone: '+phone];if(child)lines.push('Child: '+child);if(cls)lines.push('Class: '+cls);if(message)lines.push('','Message: '+message);const text=lines.join('\n');
status.hidden=false;
if(!waDigits){status.className='form-status warning';status.textContent='WhatsApp enquiries are not available yet. Please check back soon.';return;}
const url=waUrl(text);const opened=window.open(url,'_blank');if(opened)opened.opener=null;status.className='form-status success';status.innerHTML='Thank you, '+parent.replace(/[<>&"]/g,'')+'. WhatsApp is opening with your message ready. Just press send. <a href="'+url+'" target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>';if(!opened)location.href=url;});
}
