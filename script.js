const $=s=>document.querySelector(s);
const search=$('#search'), address=$('#address'), chat=$('#chat'), chatInput=$('#chatInput');
function doSearch(q){q=(q||search.value).trim();if(!q)return; if(/^https?:\/\//i.test(q)){address.value=q; window.open(q,'_blank');}else{address.value='https://www.google.com/search?q='+encodeURIComponent(q);window.open(address.value,'_blank');}}
$('#searchBtn').onclick=()=>doSearch();
search.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch()});
document.querySelectorAll('.quick-links button').forEach(b=>b.onclick=()=>{search.value=b.dataset.query;doSearch(b.dataset.query)});
$('#go').onclick=()=>doSearch(address.value);
address.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch(address.value)});
$('#back').onclick=()=>history.back();
$('#forward').onclick=()=>history.forward();
$('#reload').onclick=()=>location.reload();
$('#aiOpen').onclick=()=>$('#aiPanel').classList.remove('closed');
$('#aiClose').onclick=()=>$('#aiPanel').classList.add('closed');
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('rmflow-theme',document.body.classList.contains('dark')?'dark':'light')};
if(localStorage.getItem('rmflow-theme')==='dark')document.body.classList.add('dark');
function addMessage(text,who='ai'){const d=document.createElement('div');d.className='message '+who;d.innerHTML=who==='ai'?'<b>RM AI</b><br>'+text:text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function reply(q){const l=q.toLowerCase();if(l.includes('react'))return'React is a JavaScript library for building user interfaces with reusable components. RM Flow can later use AI to explain React code and documentation.';if(l.includes('summar'))return'This demo cannot read arbitrary webpages yet. In the full RM Flow version, the AI can summarize supported page content.';if(l.includes('write'))return'Sure! Tell me what you want to write, such as an email, proposal, article or code.';return'I am the RM Flow demo assistant. Connect an AI API in the production version to get live answers, web research, summaries and more.'}
function send(){const q=chatInput.value.trim();if(!q)return;addMessage(q,'user');chatInput.value='';setTimeout(()=>addMessage(reply(q),'ai'),350)}
$('#send').onclick=send;chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()});
document.querySelectorAll('.suggestions button').forEach(b=>b.onclick=()=>{chatInput.value=b.textContent;send()});
$('#newTab').onclick=()=>{const t=document.createElement('button');t.className='tab';t.innerHTML='🏠 New Tab <span>×</span>';$('#tabs').insertBefore(t,$('#newTab'));t.onclick=()=>document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'))||t.classList.add('active')};
