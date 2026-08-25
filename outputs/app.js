const neurons=[{name:'AI agents',leader:'Magnus Jonsson · Sr. Manager',position:[18,24],tone:'violet'},{name:'Copilot',leader:'Maciej Szafraniec · Sr. Manager',position:[78,24],tone:'violet'},{name:'Knowledge',leader:'Filipa Sousa · Sr. Manager',position:[78,72],tone:'cyan',clickable:true},{name:'QA',leader:'Pirje Tumm · Manager',position:[18,72],tone:'pink'}];
const teams=[{name:'Aster',description:'Knowledge search, user segments, and AI-powered answers across the Help Center.',em:'Bence A. Tóth',pm:'Daniel Pinho',designer:'Guntis Rusa',initiatives:[]},{name:'Athene',description:'Guide Article Service, Help Center APIs, and the core Knowledge Management platform.',em:'Steen Lehmann',pm:'Monika Vogel',designer:'Guntis Rusa',initiatives:[]},{name:'Maquina',description:'Knowledge Procedures and the workflows that help teams create reliable answers.',em:'Andreia Meireles',pm:'Umberto Pezzini',designer:'Justyna Janowska',initiatives:[]},{name:'Ohana',description:'Guide editor, media and domains services, and key parts of the Guide client.',em:'Andreia Meireles',pm:'Patrycja Walencik',designer:'Guntis Rusa',initiatives:[{name:'Lisbon - The new conversation theme',designer:'Guntis Rusa',deadline:'Q3 - Sep'}]},{name:'Piratos',description:'Guide data, reporting, instrumentation, and integrations that make Knowledge measurable.',em:'Philip Femø',pm:'Jake Bantz',designer:'João Guerra',initiatives:[]},{name:'Shelob',description:'External content indexing for the Knowledge Graph, with a focus on the Web Crawler.',em:'Casey Macaulay',pm:'Daniel Pinho',designer:'João Monteiro',initiatives:[]},{name:'Vikings',description:'Help Center themes, templating APIs, and the tools to build and customise themes.',em:'Philip Femø',pm:'Patrycja Walencik',designer:'João Monteiro',initiatives:[]},{name:'Ultra',description:'Community, content tagging, Follow email notifications in Help Center, Article Votes, Redirect Rules API, and Knowledge Connectors.',em:'Casey Macaulay',pm:'Tetiana Gron',designer:'Unassigned',initiatives:[]},{name:'Gordian',description:'Gordian engineering team and the systems they own within the Knowledge experience.',em:'Angelica Korsun',pm:'Daria Bogusz',designer:'No PD assigned',initiatives:[]},{name:'Ampersand',description:'Ampersand engineering team and the systems they own within the Knowledge experience.',em:'Eylon Tamir',pm:'Daria Bogusz',designer:'No PD assigned',initiatives:[]}];
const neuronPositions={Aster:[18,26],Athene:[36,11],Maquina:[64,11],Ohana:[82,27],Piratos:[82,66],Shelob:[62,82],Vikings:[31,82]};let mode='brain';const nodeLayer=document.querySelector('#nodes'),svg=document.querySelector('#connections'),wrap=document.querySelector('#graph-wrap'),inspector=document.querySelector('#inspector'),content=document.querySelector('#inspector-content');
function renderBrain(){mode='brain';nodeLayer.innerHTML=neurons.map(n=>{const[x,y]=n.position;return n.clickable?`<button class="neuron-node ${n.tone}" data-name="${n.name}" style="left:${x}%;top:${y}%"><span class="neuron-pulse"></span><strong>${n.name}</strong><small>${n.leader}</small></button>`:`<div class="neuron-node inactive ${n.tone}" data-name="${n.name}" style="left:${x}%;top:${y}%"><span class="neuron-pulse"></span><strong>${n.name}</strong><small>${n.leader}</small></div>`}).join('');document.querySelector('[data-name="Knowledge"]').onclick=openKnowledge;document.querySelector('#org-node').className='org-node brain-core';document.querySelector('#org-node').innerHTML='<span class="org-glow"></span><div class="org-symbol">✦</div><strong>Agentic AI</strong><em>Kevin Gauthier</em><em>PD Director</em>';document.querySelector('.workspace strong').textContent='Knowledge org';document.querySelector('.eyebrow').textContent='CONTEXT GRAPH / PRODUCT DESIGN';document.querySelector('h1').textContent='Agentic AI teams';document.querySelector('.page-heading p').textContent='Agentic AI is the shared context connecting agents, Knowledge, Copilot, and QA.';document.querySelector('#graph-message').textContent='Only Knowledge is clickable at this level';document.querySelectorAll('.team-node').forEach(n=>n.remove())}
function renderKnowledge(){mode='knowledge';nodeLayer.innerHTML=teams.map((t,i)=>{const[x,y]=neuronPositions[t.name];return `<button class="team-node" data-team="${t.name}" style="left:${x}%;top:${y}%"><strong>${t.name}</strong><small>team</small></button>`}).join('');document.querySelectorAll('.team-node').forEach(n=>n.addEventListener('click',()=>openTeam(n.dataset.team)));document.querySelector('#org-node').className='org-node knowledge-core';document.querySelector('#org-node').innerHTML='<span class="org-glow"></span><div class="org-symbol">✦</div><strong>Knowledge</strong><em>Spyros Livathinos · Eng</em><em>Kasia Karpinska · PM</em><em>Filipa Sousa · PD</em>';document.querySelector('.workspace strong').textContent='Knowledge org';document.querySelector('.eyebrow').textContent='Context Graph';document.querySelector('h1').textContent='Knowledge teams';document.querySelector('.page-heading p').textContent='Explore the seven teams connected to the Knowledge experience.';document.querySelector('#graph-message').textContent='Select a team to explore team and work';document.querySelectorAll('.neuron-node').forEach(n=>n.remove());drawConnections()}
function drawConnections(){const r=wrap.getBoundingClientRect(),o=document.querySelector('#org-node').getBoundingClientRect(),cx=o.left-r.left+o.width/2,cy=o.top-r.top+o.height/2;const items=mode==='brain'?neurons:teams;svg.innerHTML=items.map(item=>{const key=mode==='brain'?item.name:item.name,node=document.querySelector(`[data-name="${key}"]`)||document.querySelector(`[data-team="${key}"]`);if(!node)return '';const n=node.getBoundingClientRect(),x=n.left-r.left+n.width/2,y=n.top-r.top+n.height/2;return `<path class="connection ${mode==='brain'?'neuron-connection '+item.tone:''}" data-connection="${key}" d="M ${cx} ${cy} C ${(cx+x)/2} ${cy}, ${(cx+x)/2} ${y}, ${x} ${y}"/>`}).join('')}
function renderOverview(){const all=teams.flatMap(t=>t.initiatives.map(i=>({...i,team:t.name})));document.querySelector('#initiative-overview').innerHTML=all.length?all.map(i=>`<div class="overview-item"><div><strong>${i.name}</strong><small>${i.team}</small></div><span>${i.designer}<br><b>${i.deadline}</b></span></div>`).join(''):'<div class="overview-empty">No initiatives added yet.</div>'}
function openKnowledge(){renderKnowledge();document.querySelectorAll('.team-node').forEach(n=>n.classList.remove('selected'));inspector.classList.remove('open');closeInspector(false);drawConnections()}
function openTeam(name){const t=teams.find(x=>x.name===name);document.querySelectorAll('.team-node').forEach(n=>n.classList.toggle('selected',n.dataset.team===name));document.querySelectorAll('.connection').forEach(n=>n.classList.toggle('highlight',n.dataset.connection===name));inspector.classList.add('open');content.innerHTML=`<div class="inspector-header"><button class="close-inspector" id="close-inspector">×</button><span class="dialog-kicker">KNOWLEDGE TEAM</span><h2>${t.name}</h2><p>${t.description}</p><span class="context-badge">↗ Connected to Knowledge</span></div><div class="inspector-body"><div class="context-label">RELATED PEOPLE</div><div class="role-card"><span class="role-icon">◉</span><div><small>Manager</small><strong>${t.em}</strong></div></div><div class="role-card"><span class="role-icon">◇</span><div><small>Product manager</small><strong>${t.pm}</strong></div></div><div class="role-card"><span class="role-icon">✦</span><div><small>Product designer</small><strong>${t.designer}</strong></div></div><div class="info-section"><h3>Initiatives in motion</h3>${t.initiatives.length?t.initiatives.map(i=>`<div class="initiative-item"><strong>${i.name}</strong><span>${i.designer} · ${i.deadline}</span></div>`).join(''):'<div class="empty-initiative">No initiatives added yet.</div>'}</div></div>`;document.querySelector('#close-inspector').onclick=()=>closeInspector(true)}
function closeInspector(keepKnowledge=false){inspector.classList.remove('open');document.querySelectorAll('.team-node').forEach(n=>n.classList.remove('selected'));document.querySelectorAll('.connection').forEach(n=>n.classList.remove('highlight'));if(mode==='brain'){document.querySelector('#graph-message').textContent='Only Knowledge is clickable at this level'}else{document.querySelector('#graph-message').textContent='Select a team to explore team and work'}if(!keepKnowledge&&mode==='brain')renderOverview()}
renderBrain();renderOverview();requestAnimationFrame(drawConnections);window.addEventListener('resize',drawConnections);document.querySelector('#reset-view').onclick=()=>{closeInspector();renderBrain();drawConnections()}
const resizeHandle=document.querySelector('#resize-handle');let resizing=false,startX=0,startWidth=0;resizeHandle.addEventListener('pointerdown',e=>{resizing=true;startX=e.clientX;startWidth=inspector.getBoundingClientRect().width;resizeHandle.setPointerCapture(e.pointerId);document.body.classList.add('resizing')});resizeHandle.addEventListener('pointermove',e=>{if(resizing)inspector.style.width=`${Math.max(260,Math.min(520,startWidth+e.clientX-startX))}px`});resizeHandle.addEventListener('pointerup',()=>{resizing=false;document.body.classList.remove('resizing')});resizeHandle.addEventListener('pointercancel',()=>{resizing=false;document.body.classList.remove('resizing')});
function showKnowledgeDetails(){document.querySelector('#org-node').innerHTML='<span class="org-glow"></span><div class="org-symbol">✦</div><strong>Knowledge</strong><em>Spyros Livathinos · Eng</em><em>Kasia Karpinska · PM</em><em>Filipa Sousa · PD</em>';inspector.classList.add('open');content.innerHTML='<div class="inspector-header"><button class="close-inspector" id="close-inspector">×</button><span class="dialog-kicker">KNOWLEDGE / RELATED PEOPLE</span><h2>Knowledge</h2><p>The Knowledge group connects the people and teams shaping the Knowledge experience.</p><span class="context-badge">↗ Connected to Agentic AI</span></div><div class="inspector-body"><div class="context-label">STAKEHOLDERS</div><div class="role-card"><span class="role-icon">◉</span><div><small>Engineering</small><strong>Spyros Livathinos · Eng</strong></div></div><div class="role-card"><span class="role-icon">◇</span><div><small>Product management</small><strong>Kasia Karpinska · PM</strong></div></div><div class="role-card"><span class="role-icon">✦</span><div><small>Product design</small><strong>Filipa Sousa · PD</strong></div></div><div class="info-section"><h3>Connected teams</h3><div class="description-value">Aster · Athene · Maquina · Ohana · Piratos · Shelob · Vikings</div></div></div>';document.querySelector('#close-inspector').onclick=()=>closeInspector(true)}
function attachKnowledgeClick(){const knowledge=document.querySelector('[data-name="Knowledge"]');if(knowledge)knowledge.onclick=()=>{renderKnowledge();showKnowledgeDetails();drawConnections()}}attachKnowledgeClick();document.querySelector('#reset-view').onclick=()=>{closeInspector();renderBrain();attachKnowledgeClick();drawConnections()};
function styleBrainNodes(){const agents=document.querySelector('[data-name="AI agents"]'),copilot=document.querySelector('[data-name="Copilot"]'),knowledge=document.querySelector('[data-name="Knowledge"]');if(agents){agents.classList.remove('violet');agents.classList.add('blue')}if(copilot){copilot.classList.remove('cyan','blue');copilot.classList.add('violet')}if(knowledge){knowledge.classList.remove('blue','violet');knowledge.classList.add('cyan')}}styleBrainNodes();document.querySelector('h1').textContent='Agentic AI';document.querySelector('#reset-view').onclick=()=>{closeInspector();renderBrain();styleBrainNodes();document.querySelector('h1').textContent='Agentic AI';drawConnections()};
const extraPeople={};
openTeam=function(name){const t=teams.find(x=>x.name===name);if(!t)return;document.querySelectorAll('.team-node').forEach(n=>n.classList.toggle('selected',n.dataset.team===name));document.querySelectorAll('.connection').forEach(n=>n.classList.toggle('highlight',n.dataset.connection===name));inspector.classList.add('open');const added=extraPeople[name]||[];content.innerHTML=`<div class="inspector-header"><button class="close-inspector" id="close-inspector">×</button><span class="dialog-kicker">KNOWLEDGE TEAM</span><h2>${t.name}</h2><p>${t.description}</p><span class="context-badge">↗ Connected to Knowledge</span></div><div class="inspector-body"><div class="context-label">RELATED PEOPLE</div><div class="role-card"><span class="role-icon">◉</span><div><small>Engineering Manager</small><strong>${t.em}</strong></div></div><div class="role-card"><span class="role-icon">◇</span><div><small>Product manager</small><strong>${t.pm}</strong></div></div><div class="role-card"><span class="role-icon">✦</span><div><small>Product designer</small><strong>${t.designer}</strong></div></div>${added.map(p=>`<div class="role-card added-person"><span class="role-icon">＋</span><div><small>${p.role}</small><strong>${p.name}</strong></div></div>`).join('')}<button class="add-person-button" id="add-person">＋ Add related person</button><div class="person-form" id="person-form"><label for="person-name">Name</label><input id="person-name" placeholder="Write a name"><label for="person-role">Role</label><select id="person-role"><option>Engineering Manager</option><option>Product manager</option><option>Product designer</option><option>Product operations</option><option>Other stakeholder</option></select><div class="save-row"><button class="save-button" id="save-person">Save person</button><button class="cancel-button" id="cancel-person">Cancel</button></div></div><div class="info-section"><h3>Initiatives in motion</h3>${t.initiatives.length?t.initiatives.map(i=>`<div class="initiative-item"><strong>${i.name}</strong><span>${i.designer} · ${i.deadline}</span></div>`).join(''):'<div class="empty-initiative">No initiatives added yet.</div>'}</div></div>`;document.querySelector('#close-inspector').onclick=()=>closeInspector(true);const form=document.querySelector('#person-form');document.querySelector('#add-person').onclick=()=>form.classList.add('active');document.querySelector('#cancel-person').onclick=()=>form.classList.remove('active');document.querySelector('#save-person').onclick=()=>{const personName=document.querySelector('#person-name').value.trim(),role=document.querySelector('#person-role').value;if(!personName)return;(extraPeople[t.name]??=[]).push({name:personName,role});openTeam(t.name)}};
neuronPositions.Ultra=[50,87];
const renderKnowledgeBase=renderKnowledge;renderKnowledge=()=>{renderKnowledgeBase();document.querySelector('.page-heading p').textContent='Explore the ten teams connected to the Knowledge experience.'};const showKnowledgeDetailsBase=showKnowledgeDetails;showKnowledgeDetails=()=>{showKnowledgeDetailsBase();const connected=document.querySelector('.description-value');if(connected)connected.textContent='Aster · Athene · Maquina · Ohana · Piratos · Shelob · Vikings · Ultra · Gordian · Ampersand'};
Object.assign(neuronPositions,{Maquina:[50,19],Ohana:[71,22],Ampersand:[84,38],Piratos:[84,62],Shelob:[71,78],Vikings:[50,81],Ultra:[29,78],Aster:[16,62],Gordian:[16,38],Athene:[29,22]});

// Team people are editable in place, including their role labels.
openTeam=function(name){
  const t=teams.find(x=>x.name===name); if(!t)return;
  document.querySelectorAll('.team-node').forEach(n=>n.classList.toggle('selected',n.dataset.team===name));
  document.querySelectorAll('.connection').forEach(n=>n.classList.toggle('highlight',n.dataset.connection===name));
  inspector.classList.add('open');
  const basePeople=t.people??(t.people=[
    {name:t.em,role:'Engineering Manager'},
    {name:t.pm,role:'Product manager'},
    {name:t.designer,role:'Product designer'}
  ]);
  const added=extraPeople[name]||[];
  const people=[...basePeople.map((person,index)=>({person,store:basePeople,index})),...added.map((person,index)=>({person,store:added,index}))];
  const icons=['◉','◇','✦','＋'];
  const roleOptions=['Engineering Manager','Product manager','Product designer','Product operations','Other stakeholder'];
  content.innerHTML=`<div class="inspector-header"><button class="close-inspector" id="close-inspector">×</button><span class="dialog-kicker">KNOWLEDGE TEAM</span><h2>${t.name}</h2><p>${t.description}</p><span class="context-badge">↗ Connected to Knowledge</span></div><div class="inspector-body"><div class="context-label">RELATED PEOPLE</div>${people.map((item,index)=>`<div class="role-card" data-person-card="${index}"><span class="role-icon">${icons[index]||'＋'}</span><div class="role-copy"><small>${item.person.role}</small><strong>${item.person.name}</strong></div><button class="edit-button" data-edit-person="${index}">Edit</button></div>`).join('')}<button class="add-person-button" id="add-person">＋ Add related person</button><div class="person-form" id="person-form"><label for="person-name">Name</label><input id="person-name" placeholder="Write a name"><label for="person-role">Role</label><select id="person-role">${roleOptions.map(role=>`<option>${role}</option>`).join('')}</select><div class="save-row"><button class="save-button" id="save-person">Save person</button><button class="cancel-button" id="cancel-person">Cancel</button></div></div><div class="info-section"><h3>Initiatives in motion</h3>${t.initiatives.length?t.initiatives.map(i=>`<div class="initiative-item"><strong>${i.name}</strong><span>${i.designer} · ${i.deadline}</span></div>`).join(''):'<div class="empty-initiative">No initiatives added yet.</div>'}</div></div>`;
  document.querySelector('#close-inspector').onclick=()=>closeInspector(true);
  document.querySelectorAll('[data-edit-person]').forEach(button=>button.onclick=()=>{
    const index=Number(button.dataset.editPerson), item=people[index], card=document.querySelector(`[data-person-card="${index}"]`);
    card.classList.add('editing');
    card.innerHTML=`<span class="role-icon">${icons[index]||'＋'}</span><div class="role-copy"><input class="role-input" id="edit-person-name" value="${item.person.name}"><select class="role-input" id="edit-person-role">${roleOptions.map(role=>`<option ${role===item.person.role?'selected':''}>${role}</option>`).join('')}</select><div class="save-row"><button class="save-button" id="save-edit-person">Save</button><button class="cancel-button" id="cancel-edit-person">Cancel</button></div></div>`;
    document.querySelector('#cancel-edit-person').onclick=()=>openTeam(name);
    document.querySelector('#save-edit-person').onclick=()=>{const nextName=document.querySelector('#edit-person-name').value.trim();if(!nextName)return;item.person.name=nextName;item.person.role=document.querySelector('#edit-person-role').value;openTeam(name)};
  });
  const form=document.querySelector('#person-form');
  document.querySelector('#add-person').onclick=()=>form.classList.add('active');
  document.querySelector('#cancel-person').onclick=()=>form.classList.remove('active');
  document.querySelector('#save-person').onclick=()=>{const personName=document.querySelector('#person-name').value.trim(),role=document.querySelector('#person-role').value;if(!personName)return;(extraPeople[t.name]??=[]).push({name:personName,role});openTeam(t.name)};
};

const initiativeStorageKey='knowledgeGraphInitiatives';
const initiativeAssignmentsKey='knowledgeGraphInitiativeAssignments';
const pmTeamCandidates={
  'Patrycja Walencik':['Vikings'],
  'Tetiana Gron':['Ultra'],
  'Monika Vogel':['Athene'],'Umberto Pezzini':['Maquina'],
  'Daniel Pinho':['Aster','Shelob'],
  'Daria Bogusz':['Gordian','Ampersand'],
  'Jake Bantz':['Maquina']
};
const initialImportedInitiatives=[{"id":"PLAN-22147","name":"Lisbon - The new conversation theme","pm":"Patrycja Walencik","status":"EAP Rollout","dueDate":"Oct 5","ga":"","team":"Ohana","teamCandidates":["Ohana"],"designer":""},{"id":"PLAN-20771","name":"Conversational Help Center - Lisbon Theme | milestone 2","pm":"Patrycja Walencik","status":"Blocked","dueDate":"Dec 14","ga":"","team":"Ohana","teamCandidates":["Ohana"],"designer":""},{"id":"PLAN-22615","name":"Connectors: Salesforce connector","pm":"Tetiana Gron","status":"Development","dueDate":"Aug 28","ga":"GA: FY27-Q3","team":"Ultra","teamCandidates":["Ultra"],"designer":""},{"id":"PLAN-21903","name":"Connected Knowledge: Sources first","pm":"Tetiana Gron","status":"Development","dueDate":"Aug 31","ga":"GA: FY27-Q3","team":"Ultra","teamCandidates":["Ultra"],"designer":""},{"id":"PLAN-21811","name":"Connectors: Universal Connector","pm":"Daniel Pinho","status":"Development","dueDate":"Sep 1","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-18952","name":"Knowledge Document Uploader (.CSV)","pm":"Daniel Pinho","status":"Discovery","dueDate":"Dec 21","ga":"GA: FY27-Q4","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-21782","name":"Multimedia: PDF Ingestion","pm":"Daniel Pinho","status":"EAP Rollout","dueDate":"Sep 16","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-22200","name":"[Adoption] [Knowledge Source Gaps] Remove/Keep HTML Elements","pm":"Daniel Pinho","status":"Discovery","dueDate":"Sep 27","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-22198","name":"[Adoption] [Knowledge Source Gaps] Crawler Proxy Support","pm":"Daniel Pinho","status":"Validation","dueDate":"Sep 27","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-21815","name":"Customize Selection of HTML Elements","pm":"Daniel Pinho","status":"Discovery","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-22199","name":"[Adoption] [Knowledge Source Gaps] Click Elements + Wait","pm":"Daniel Pinho","status":"Development","dueDate":"Oct 18","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Aster","Shelob"],"designer":""},{"id":"PLAN-21864","name":"AI readability: Recommendation + insights","pm":"Monika Vogel","status":"Discovery","dueDate":"Sep 7","ga":"GA: FY27-Q3","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-22411","name":"Duplication risk warning when creating new article","pm":"Monika Vogel","status":"Discovery","dueDate":"Sep 15","ga":"GA: FY27-Q3","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-20746","name":"Recommendation mode in the Editor","pm":"Patrycja Walencik","status":"Validation","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":"Ohana","teamCandidates":["Ohana"],"designer":""},{"id":"PLAN-15078","name":"Core Knowledge: AI bulk translation for articles (milestone 1 - editor level)","pm":"Patrycja Walencik","status":"EAP Rollout","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":"Ohana","teamCandidates":["Ohana"],"designer":""},{"id":"PLAN-19033","name":"Knowledge management API","pm":"Monika Vogel","status":"EAP Rollout","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-16169","name":"Knowledge copilot EAP>GA","pm":"Monika Vogel","status":"EAP Rollout","dueDate":"Oct 1","ga":"GA: FY27-Q3","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-22585","name":"Bulk find and replace via conversational assistant","pm":"Monika Vogel","status":"Discovery","dueDate":"Oct 30","ga":"GA: FY27-Q3","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-22559","name":"Expired content recommendation","pm":"Monika Vogel","status":"Discovery","dueDate":"Nov 2","ga":"GA: FY27-Q4","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-22560","name":"Conflicting content recommendation","pm":"Monika Vogel","status":"Discovery","dueDate":"Nov 2","ga":"GA: FY27-Q4","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-21241","name":"Procedure Builder: Generate new procedure from Knowledge/Admin Copilot chat","pm":"Monika Vogel","status":"EAP Rollout","dueDate":"Sep 1","ga":"","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-20503","name":"AI procedure improvements as recommendations","pm":"Monika Vogel","status":"EAP Rollout","dueDate":"Oct 1","ga":"","team":"Athene","teamCandidates":["Athene"],"designer":""},{"id":"PLAN-15689","name":"Improving relevance - embeddings","pm":"Daria Bogusz","status":"In Progress","dueDate":"Jul 31","ga":"","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-22794","name":"Improving chunking strategies","pm":"Daria Bogusz","status":"In Progress","dueDate":"Oct 31","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-22795","name":"Reranker","pm":"Daria Bogusz","status":"In Progress","dueDate":"Oct 31","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-15491","name":"Retrieval Platform GA","pm":"Daria Bogusz","status":"In Progress","dueDate":"Dec 30","ga":"GA: FY27-Q4","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-21796","name":"Phase 1: Help Centers + External Sources","pm":"Daria Bogusz","status":"In Progress","dueDate":"Aug 1","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-21797","name":"Prerequisites","pm":"Daria Bogusz","status":"In Progress","dueDate":"Aug 1","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-22317","name":"Mapping Validation","pm":"Daria Bogusz","status":"In Progress","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-22316","name":"Phase 4: CSV","pm":"Daria Bogusz","status":"In Progress","dueDate":"Sep 30","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Gordian","Ampersand"],"designer":""},{"id":"PLAN-22829","name":"Auto-serve post-onboarding experience","pm":"Jake Bantz","status":"Discovery","dueDate":"Sep 15","ga":"GA: FY27-Q3","team":null,"teamCandidates":["Maquina","Piratos"],"designer":""},{"id":"PLAN-22190","name":"Auto-serve Onboarding for AI Agents","pm":"Jake Bantz","status":"EAP Rollout","dueDate":"Sep 30","ga":"","team":null,"teamCandidates":["Maquina","Piratos"],"designer":""},{"id":"PLAN-18074","name":"Insights: Automation Potential Post-GA Enhancements","pm":"Jake Bantz","status":"Development","dueDate":"Sep 30","ga":"","team":null,"teamCandidates":["Maquina","Piratos"],"designer":""}];
let importedInitiatives=JSON.parse(localStorage.getItem(initiativeStorageKey)||'null')||initialImportedInitiatives;
if(!localStorage.getItem(initiativeStorageKey))localStorage.setItem(initiativeStorageKey,JSON.stringify(importedInitiatives));
const initiativeAssignments=JSON.parse(localStorage.getItem(initiativeAssignmentsKey)||'{}');
const correctedPmTeams={'Patrycja Walencik':'Vikings','Jake Bantz':'Maquina','Umberto Pezzini':'Maquina'};
importedInitiatives.forEach(item=>{
  if(item.pm==='Jake Bantz')item.pm='Umberto Pezzini';
  const correctedTeam=correctedPmTeams[item.pm];
  if(correctedTeam&&item.team!==correctedTeam){item.team=correctedTeam;item.teamCandidates=[correctedTeam];if(item.ownerMode!=='manual')item.designer='';}
});

function applyImportedInitiatives(){
  teams.forEach(team=>{
    team.initiatives=importedInitiatives.filter(item=>item.team===team.name).map(item=>({
      name:item.name,designer:item.designer||'No PD assigned',deadline:item.dueDate||item.ga||'',status:item.status,id:item.id
    }));
  });
}

function parseInitiativePage(source){
  const doc=new DOMParser().parseFromString(source,'text/html');
  const heading=[...doc.querySelectorAll('h2,h3')].find(node=>node.textContent.trim()==='Customer-Facing Deliveries');
  const section=heading?.closest('div.rounded-lg');
  if(!section)return {items:[],ambiguous:[],error:'Could not find Customer-Facing Deliveries'};
  const items=[]; const seen=new Set();
  section.querySelectorAll('a[href*="/browse/"]').forEach(link=>{
    const card=link.closest('div.bg-white.rounded-lg'); if(!card)return;
    const id=link.textContent.trim(); if(seen.has(id))return; seen.add(id);
    const statusNode=[...card.querySelectorAll('span')].find(node=>node.classList.contains('rounded-full')&&node.textContent.trim());
    const status=statusNode?.textContent.trim()||'Unknown';
    if(status.toLowerCase()==='resolved')return;
    const title=card.querySelector('p')?.textContent.trim()||'Untitled initiative';
    const pmNode=[...card.querySelectorAll('span[title]')].find(node=>/^[A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+)+$/u.test(node.getAttribute('title').trim()));
    const pm=pmNode?.getAttribute('title')||'';
    const dueNode=card.querySelector('span.ml-auto');
    const dueDate=dueNode?.textContent.trim().replace(/^⚠\s*/,'')||'';
    const ga=[...card.querySelectorAll('span')].map(node=>node.textContent.trim()).find(value=>/^GA:\s/.test(value))||'';
    const candidates=pmTeamCandidates[pm]||[];
    items.push({id,title,name:title,pm,status,dueDate,ga,team:candidates.length===1?candidates[0]:null,teamCandidates:candidates,designer:initiativeAssignments[id]||''});
  });
  return {items,ambiguous:items.filter(item=>!item.team)};
}

function renderImportedInitiatives(name){
  const panel=content.querySelector('.info-section');
  const items=importedInitiatives.filter(item=>item.team===name);
  if(!panel||!items.length)return;
  panel.innerHTML=`<h3>Customer-facing deliveries</h3>${items.map(item=>`<div class="initiative-item" data-initiative-id="${item.id}"><strong>${item.name}</strong><span>${item.status}${item.designer?' · '+item.designer:' · No PD assigned'}${item.dueDate?' · '+item.dueDate:''}</span></div>`).join('')}`;
  panel.querySelectorAll('[data-edit-initiative]').forEach(button=>button.onclick=()=>{
    const item=importedInitiatives.find(candidate=>candidate.id===button.dataset.editInitiative); if(!item)return;
    const designer=window.prompt('Product Designer for this feature',item.designer||'');
    if(designer===null)return;
    item.designer=designer.trim()||'No PD assigned'; initiativeAssignments[item.id]=item.designer;
    localStorage.setItem(initiativeStorageKey,JSON.stringify(importedInitiatives)); localStorage.setItem(initiativeAssignmentsKey,JSON.stringify(initiativeAssignments));
    applyImportedInitiatives(); renderImportedInitiatives(name); renderOverview();
  });
}

const teamOpenWithPeople=openTeam;
openTeam=function(name){teamOpenWithPeople(name);renderImportedInitiatives(name)};
applyImportedInitiatives();
const originalRenderOverview=renderOverview;
renderOverview=function(){
  originalRenderOverview();
  const pending=importedInitiatives.filter(item=>!item.team);
  if(pending.length){
    const overview=document.querySelector('#initiative-overview');
    overview.insertAdjacentHTML('beforeend',`<div class="overview-empty">${pending.length} deliveries need team confirmation before assignment.<br><small>${[...new Set(pending.map(item=>item.pm))].join(' · ')}</small></div>`);
  }
};
renderOverview();

// Knowledge is the primary context. The organisation graph remains one click away.
function viewKnowledgeMain(){
  closeInspector();
  wrap.classList.remove('design-org-view');
  renderKnowledge();
  document.querySelector('#reset-view').textContent='View Design Org';
  drawConnections();
}

function viewDesignOrg(){
  closeInspector();
  wrap.classList.add('design-org-view');
  wrap.classList.remove('work-mode');
  renderBrain();
  styleBrainNodes();
  document.querySelector('#reset-view').textContent='View Knowledge org';
  drawConnections();
}

document.querySelector('#reset-view').onclick=()=>{
  if(mode==='knowledge')viewDesignOrg();
  else viewKnowledgeMain();
};

viewKnowledgeMain();

const initiativeTopics={
  'PLAN-20771':'Generative Search Adoption & Conversational HC','PLAN-22147':'Generative Search Adoption & Conversational HC',
  'PLAN-18952':'Connectors & Data Import','PLAN-21782':'Connectors & Data Import','PLAN-21811':'Connectors & Data Import','PLAN-21815':'Connectors & Data Import','PLAN-21903':'Connectors & Data Import','PLAN-22198':'Connectors & Data Import','PLAN-22199':'Connectors & Data Import','PLAN-22200':'Connectors & Data Import','PLAN-22615':'Connectors & Data Import',
  'PLAN-15078':'Knowledge Management & Generation','PLAN-16169':'Knowledge Management & Generation','PLAN-19033':'Knowledge Management & Generation','PLAN-20503':'Knowledge Management & Generation','PLAN-20746':'Knowledge Management & Generation','PLAN-21241':'Knowledge Management & Generation','PLAN-21864':'Knowledge Management & Generation','PLAN-22411':'Knowledge Management & Generation','PLAN-22559':'Knowledge Management & Generation','PLAN-22560':'Knowledge Management & Generation','PLAN-22585':'Knowledge Management & Generation',
  'PLAN-15491':'RAG','PLAN-15689':'RAG','PLAN-22794':'RAG','PLAN-22795':'RAG',
  'PLAN-21796':'ZOS Migration','PLAN-21797':'ZOS Migration','PLAN-22316':'ZOS Migration','PLAN-22317':'ZOS Migration',
  'PLAN-18074':'Auto-Serve','PLAN-22190':'Auto-Serve','PLAN-22829':'Auto-Serve'
};
const topicOrder=['Generative Search Adoption & Conversational HC','Connectors & Data Import','Knowledge Management & Generation','RAG','ZOS Migration','Auto-Serve','Other work'];
const initiativeSubtopics={
  'PLAN-18952':'Connectors','PLAN-21811':'Connectors','PLAN-21903':'Connectors','PLAN-22615':'Connectors',
  'PLAN-21782':'Multimodal Ingestion','PLAN-21815':'Web Crawler','PLAN-22198':'Web Crawler','PLAN-22199':'Web Crawler','PLAN-22200':'Web Crawler',
  'PLAN-15078':'Knowledge Copilot & Authoring','PLAN-16169':'Knowledge Copilot & Authoring','PLAN-19033':'Knowledge Copilot & Authoring','PLAN-20746':'Knowledge Copilot & Authoring','PLAN-21864':'Knowledge Copilot & Authoring','PLAN-22411':'Knowledge Copilot & Authoring','PLAN-22559':'Knowledge Copilot & Authoring','PLAN-22560':'Knowledge Copilot & Authoring','PLAN-22585':'Knowledge Copilot & Authoring',
  'PLAN-20503':'Procedures','PLAN-21241':'Procedures'
};
const topicHierarchy={'Connectors & Data Import':['Connectors','Multimodal Ingestion','Web Crawler'],'Knowledge Management & Generation':['Knowledge Copilot & Authoring','Procedures']};

function stageClass(status){return `stage-${String(status||'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}
function selectedWorkValues(name){return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input=>input.value)}
function multiFilter(name,label,values,selected){const summary=selected.length?`${selected.length} selected`:'All';return `<details class="multi-filter"><summary><span>${label}</span><b>${summary}</b></summary><div class="multi-filter-options">${values.map(value=>`<label><input type="checkbox" name="${name}" value="${value}" ${selected.includes(value)?'checked':''}><span>${value}</span></label>`).join('')}</div></details>`}
function renderTopicFilter(selectedTopics,selectedSubtopics){const summary=selectedTopics.length+selectedSubtopics.length?`${selectedTopics.length+selectedSubtopics.length} selected`:'All';return `<details class="multi-filter"><summary><span>Topics</span><b>${summary}</b></summary><div class="multi-filter-options">${topicOrder.map(topic=>`<div class="multi-filter-group"><label><input type="checkbox" name="work-topic" value="${topic}" ${selectedTopics.includes(topic)?'checked':''}><span>${topic}</span></label>${(topicHierarchy[topic]||[]).map(subtopic=>`<label class="multi-filter-child"><input type="checkbox" name="work-subtopic" value="${topic}::${subtopic}" ${selectedSubtopics.includes(`${topic}::${subtopic}`)?'checked':''}><span>${subtopic}</span></label>`).join('')}</div>`).join('')}</div></details>`}
function renderWork(){
  const workView=document.querySelector('#work-view');if(!workView)return;
  const trackFilter=selectedWorkValues('work-track'),topicFilter=selectedWorkValues('work-topic'),subtopicFilter=selectedWorkValues('work-subtopic'),teamFilter=selectedWorkValues('work-team'),pmFilter=selectedWorkValues('work-pm'),designerFilter=selectedWorkValues('work-designer');
  const trackOptions=['Customer-facing','Internal milestones','Future Pipeline'];
  const topicFor=item=>initiativeTopics[item.id]||'Other work',subtopicFor=item=>initiativeSubtopics[item.id]||'';
  const active=importedInitiatives.filter(item=>{const topic=topicFor(item),subtopic=subtopicFor(item);return (!trackFilter.length||trackFilter.includes('Customer-facing'))&&(!topicFilter.length&&!subtopicFilter.length||topicFilter.includes(topic)||subtopicFilter.includes(`${topic}::${subtopic}`))&&(!teamFilter.length||teamFilter.includes(item.team||'Needs team mapping'))&&(!pmFilter.length||pmFilter.includes(item.pm))&&(!designerFilter.length||designerFilter.includes(item.designer||'No PD assigned'))});
  const groupMarkup=topicOrder.map(topic=>{
    const items=active.filter(item=>(initiativeTopics[item.id]||'Other work')===topic);if(!items.length)return '';
    const card=item=>`<button class="work-card" data-work-initiative="${item.id}"><div class="work-card-top"><strong>${item.name}</strong><span class="work-stage ${stageClass(item.status)}">${item.status}</span></div><div class="work-card-meta"><span>${item.team||'Needs team mapping'}</span><span>${item.pm}</span><span>${item.designer||'No PD assigned'}</span>${item.dueDate?`<span>Due ${item.dueDate}</span>`:''}</div></button>`;
    const subtopics=topicHierarchy[topic];
    const content=subtopics?subtopics.map(subtopic=>{const subItems=items.filter(item=>subtopicFor(item)===subtopic);if(!subItems.length)return '';return `<div class="work-subtopic"><div class="work-subtopic-heading"><span>${subtopic}</span><b>${subItems.length}</b></div><div class="work-card-grid">${subItems.map(card).join('')}</div></div>`}).join(''): `<div class="work-card-grid">${items.map(card).join('')}</div>`;
    return `<section class="work-topic"><div class="work-topic-heading"><div><span>TOPIC</span><h3>${topic}</h3></div><b>${items.length}</b></div>${content}</section>`;
  }).join('')||'<div class="work-empty">No deliveries match these filters.</div>';
  workView.innerHTML=`<div class="work-view-heading"><div><span class="work-kicker">KNOWLEDGE DELIVERIES</span><h2>Work</h2><p>${active.length} active features across the selected tracks</p></div><button class="work-clear-filters" id="work-clear-filters">Clear filters</button></div><div class="work-filters">${multiFilter('work-track','Tracks',trackOptions,trackFilter)}${renderTopicFilter(topicFilter,subtopicFilter)}${multiFilter('work-team','Teams',[...new Set(importedInitiatives.map(item=>item.team||'Needs team mapping'))].sort(),teamFilter)}${multiFilter('work-pm','Product Managers',[...new Set(importedInitiatives.map(item=>item.pm).filter(Boolean))].sort(),pmFilter)}${multiFilter('work-designer','Product Designers',[...new Set(importedInitiatives.map(item=>item.designer||'No PD assigned'))].sort(),designerFilter)}</div><div class="work-topics">${groupMarkup}</div>`;
  workView.querySelectorAll('.multi-filter input').forEach(input=>input.onchange=renderWork);
  document.querySelector('#work-clear-filters').onclick=()=>{workView.querySelectorAll('.multi-filter input:checked').forEach(input=>input.checked=false);renderWork()};
  workView.querySelectorAll('[data-work-initiative]').forEach(card=>card.onclick=()=>openInitiativeEditor(card.dataset.workInitiative));
}

function setWorkspaceView(view){
  const graph=document.querySelector('#graph-wrap');const isWork=view==='work';
  graph.classList.toggle('work-mode',isWork);
  document.querySelector('#people-tab').classList.toggle('active',!isWork);document.querySelector('#people-tab').setAttribute('aria-selected',String(!isWork));
  document.querySelector('#work-tab').classList.toggle('active',isWork);document.querySelector('#work-tab').setAttribute('aria-selected',String(isWork));
  if(isWork){renderWork()}else{drawConnections()}
}

function initialiseWorkspaceTabs(){
  const graph=document.querySelector('#graph-wrap');
  graph.insertAdjacentHTML('afterbegin','<div class="workspace-tabs" role="tablist" aria-label="Knowledge workspace views"><button id="people-tab" class="workspace-tab active" role="tab" aria-selected="true">People</button><button id="work-tab" class="workspace-tab" role="tab" aria-selected="false">Work</button></div><section id="work-view" class="work-view" aria-label="Knowledge work"></section>');
  document.querySelector('#people-tab').onclick=()=>setWorkspaceView('people');document.querySelector('#work-tab').onclick=()=>setWorkspaceView('work');
  renderWork();
}

const persistInitiativesBase=persistInitiatives;
persistInitiatives=function(){persistInitiativesBase();renderWork()};
initialiseWorkspaceTabs();

function openInitiativeFilter(kind,value){
  const matches=importedInitiatives.filter(item=>{
    if(kind==='team')return (item.team||'Needs team mapping')===value;
    if(kind==='designer')return (item.designer||'No PD assigned')===value;
    return item.status===value;
  });
  inspector.classList.add('open');
  content.innerHTML=`<div class="inspector-header"><button class="close-inspector" id="close-filter">×</button><span class="dialog-kicker">KNOWLEDGE DELIVERIES</span><h2>${value}</h2><p>${matches.length} active customer-facing deliveries</p></div><div class="inspector-body"><div class="context-label">FILTERED DELIVERIES</div>${matches.map(item=>`<button class="filtered-delivery" data-filter-delivery="${item.id}" type="button"><div class="filtered-delivery-top"><strong>${item.name}</strong><span class="filtered-stage ${stageClass(item.status)}">${item.status}</span></div><div class="filtered-delivery-meta"><span><small>TEAM</small>${item.team||'Needs team mapping'}</span><span><small>PD</small>${item.designer||'No PD assigned'}</span><span><small>PM</small>${item.pm}</span></div></button>`).join('')}</div>`;
  document.querySelector('#close-filter').onclick=()=>{inspector.classList.remove('open');renderOverview()};
  content.querySelectorAll('[data-filter-delivery]').forEach(card=>{card.onclick=()=>openInitiativeEditor(card.dataset.filterDelivery);card.onkeydown=event=>{if(event.key==='Enter'||event.key===' ')openInitiativeEditor(card.dataset.filterDelivery)}});
}

renderOverview=function(){
  const overview=document.querySelector('#initiative-overview');
  const active=importedInitiatives;
  document.querySelector('#initiative-title').innerHTML=`Knowledge<br><small>${active.length} features in motion</small>`;
  document.querySelector('#initiative-subtitle').textContent='Click to drill-down';
  document.querySelector('#initiative-title').innerHTML=`Knowledge<br><small>${active.length} features in motion</small>`;
  document.querySelector('#initiative-subtitle').textContent='Click to drill-down';
  document.querySelector('#initiative-title').innerHTML=`Knowledge<br><small>${active.length} features in motion</small>`;
  document.querySelector('#initiative-subtitle').textContent='Click to drill-down';
  const countBy=(items,key)=>items.reduce((counts,item)=>{const value=key(item)||'Not specified';counts[value]=(counts[value]||0)+1;return counts},{});
  const section=(title,kind,counts)=>`<div class="counter-section"><div class="counter-section-title">${title}</div><div class="counter-grid">${Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`<button class="counter-card ${kind==='stage'?'stage-'+label.toLowerCase().replace(/[^a-z0-9]+/g,'-'):''}" data-filter-kind="${kind}" data-filter-value="${label}"><strong>${count}</strong><span>${label}</span></button>`).join('')}</div></div>`;
  overview.innerHTML=section('FILTER BY STAGE','stage',countBy(active,item=>item.status))+section('FILTER BY PRODUCT DESIGNER','designer',countBy(active,item=>item.designer||'No PD assigned'))+section('FILTER BY TEAM','team',countBy(active,item=>item.team||'Needs team mapping'));
  overview.querySelectorAll('[data-filter-kind]').forEach(card=>card.onclick=()=>openInitiativeFilter(card.dataset.filterKind,card.dataset.filterValue));
};
renderOverview();

renderOverview=function(){
  const overview=document.querySelector('#initiative-overview');
  const active=importedInitiatives;
  const countBy=(items,key)=>items.reduce((counts,item)=>{const value=key(item)||'Not specified';counts[value]=(counts[value]||0)+1;return counts},{});
  const section=(title,kind,counts)=>`<div class="counter-section"><div class="counter-section-title">${title}</div><div class="counter-grid">${Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`<button class="counter-card ${kind==='stage'?'stage-'+label.toLowerCase().replace(/[^a-z0-9]+/g,'-'):''}" data-filter-kind="${kind}" data-filter-value="${label}"><strong>${count}</strong><span>${label}</span></button>`).join('')}</div></div>`;
  overview.innerHTML=section('FILTER BY STAGE','stage',countBy(active,item=>item.status))+section('FILTER BY PRODUCT DESIGNER','designer',countBy(active,item=>item.designer||'No PD assigned'))+section('FILTER BY TEAM','team',countBy(active,item=>item.team||'Needs team mapping'));
  overview.querySelectorAll('[data-filter-kind]').forEach(card=>card.onclick=()=>openInitiativeFilter(card.dataset.filterKind,card.dataset.filterValue));
};
renderOverview();

const uploadButton=document.querySelector('#upload-initiatives');
if(uploadButton)uploadButton.onclick=()=>document.querySelector('#initiative-upload').click();
document.querySelector('#initiative-upload').onchange=async event=>{
  const file=event.target.files?.[0]; if(!file)return;
  const result=parseInitiativePage(await file.text());
  if(result.error){window.alert(result.error);return;}
  importedInitiatives=result.items;
  importedInitiatives.forEach(item=>{
    if(item.pm==='Jake Bantz')item.pm='Umberto Pezzini';
    const correctedTeam=correctedPmTeams[item.pm];
    if(correctedTeam){item.team=correctedTeam;item.teamCandidates=[correctedTeam];item.designer='';item.ownerMode='team-default';}
  });
  localStorage.setItem(initiativeStorageKey,JSON.stringify(importedInitiatives)); applyImportedInitiatives(); applyDefaultOwners(); renderOverview();
  const currentTeam=document.querySelector('.team-node.selected')?.dataset.team;
  if(currentTeam)openTeam(currentTeam);
  document.querySelector('#graph-message').textContent=`Imported ${result.items.length} active customer-facing deliveries · ${result.ambiguous.length} need team mapping`;
  window.alert(`Imported ${result.items.length} active customer-facing deliveries. ${result.ambiguous.length} need a team mapping before they can be shown on a team.`);
  event.target.value='';
};

function persistInitiatives(){localStorage.setItem(initiativeStorageKey,JSON.stringify(importedInitiatives));}
function teamOptions(selected=''){return `<option value="">Needs team mapping</option>${teams.map(team=>`<option value="${team.name}" ${team.name===selected?'selected':''}>${team.name}</option>`).join('')}`}
function applyDefaultOwners(){
  importedInitiatives.forEach(item=>{
    if(item.team){const team=teams.find(candidate=>candidate.name===item.team);if(team&&(!item.designer||item.ownerMode==='team-default')){item.designer=team.designer||'No PD assigned';item.ownerMode='team-default'}}
  });
  persistInitiatives();
}
applyDefaultOwners();

renderImportedInitiatives=function(name){
  const panel=content.querySelector('.info-section');
  const items=importedInitiatives.filter(item=>item.team===name);
  if(!panel||!items.length)return;
  panel.innerHTML=`<h3>Customer-facing deliveries</h3>${items.map(item=>`<div class="initiative-item" data-initiative-id="${item.id}"><strong>${item.name}</strong><span>${item.status} · ${item.designer||'No PD assigned'}${item.dueDate?' · '+item.dueDate:''}</span><select class="initiative-team-select" data-change-team="${item.id}" aria-label="Team for ${item.name}">${teamOptions(item.team)}</select></div>`).join('')}`;
  panel.querySelectorAll('[data-change-team]').forEach(select=>select.onchange=()=>{
    const item=importedInitiatives.find(candidate=>candidate.id===select.dataset.changeTeam);if(!item)return;
    const nextTeam=select.value||null;item.team=nextTeam;
    if(nextTeam&&item.ownerMode==='team-default'){const team=teams.find(candidate=>candidate.name===nextTeam);item.designer=team?.designer||'No PD assigned'}
    persistInitiatives();applyImportedInitiatives();renderOverview();openTeam(nextTeam||name);
  });
  panel.querySelectorAll('[data-edit-initiative]').forEach(button=>button.onclick=()=>{
    const item=importedInitiatives.find(candidate=>candidate.id===button.dataset.editInitiative);if(!item)return;
    const designer=window.prompt('Product Designer for this feature',item.designer||'');if(designer===null)return;
    item.designer=designer.trim()||'No PD assigned';item.ownerMode='manual';persistInitiatives();applyImportedInitiatives();renderOverview();renderImportedInitiatives(name);
  });
};

renderOverview=function(){
  const overview=document.querySelector('#initiative-overview');
  const grouped=[...teams.map(team=>({name:team.name,items:importedInitiatives.filter(item=>item.team===team.name)})),{name:'Needs team mapping',items:importedInitiatives.filter(item=>!item.team)}].filter(group=>group.items.length);
  overview.innerHTML=grouped.map(group=>`<div class="overview-team"><div class="overview-team-heading"><strong>${group.name}</strong><b>${group.items.length}</b></div>${group.items.map(item=>`<div class="overview-delivery"><div class="overview-delivery-title">${item.name}</div><span class="overview-status">${item.status}</span><small>${item.pm} · ${item.designer||'No PD assigned'}</small><select class="initiative-team-select" data-overview-team="${item.id}" aria-label="Team for ${item.name}">${teamOptions(item.team||'')}</select></div>`).join('')}</div>`).join('')||'<div class="overview-empty">No active customer-facing deliveries.</div>';
  overview.querySelectorAll('[data-overview-team]').forEach(select=>select.onchange=()=>{
    const item=importedInitiatives.find(candidate=>candidate.id===select.dataset.overviewTeam);if(!item)return;
    item.team=select.value||null;
    if(item.team&&(!item.designer||item.ownerMode==='team-default')){const team=teams.find(candidate=>candidate.name===item.team);item.designer=team?.designer||'No PD assigned';item.ownerMode='team-default'}
    persistInitiatives();applyImportedInitiatives();renderOverview();
  });
};
applyImportedInitiatives();renderOverview();

function openInitiativeEditor(id){
  const item=importedInitiatives.find(candidate=>candidate.id===id);if(!item)return;
  inspector.classList.add('open');
  const team=teams.find(candidate=>candidate.name===item.team);
  content.innerHTML=`<div class="inspector-header"><button class="close-inspector" id="close-initiative-editor">×</button><span class="dialog-kicker">CUSTOMER-FACING DELIVERY</span><h2>${item.name}</h2><p>${item.pm} · ${item.status}${item.dueDate?' · '+item.dueDate:''}</p><span class="context-badge">${item.id}</span></div><div class="inspector-body"><div class="context-label">DELIVERY OWNERSHIP</div><label class="editor-label" for="initiative-team">Team</label><select class="initiative-editor-input" id="initiative-team">${teamOptions(item.team||'')}</select><label class="editor-label" for="initiative-designer">Product Designer</label><input class="initiative-editor-input" id="initiative-designer" value="${item.designer||team?.designer||''}" placeholder="Assign a Product Designer"><div class="save-row"><button class="save-button" id="save-initiative">Save changes</button><button class="cancel-button" id="cancel-initiative">Cancel</button></div><button class="delete-initiative" id="delete-initiative">Delete delivery</button></div>`;
  document.querySelector('#close-initiative-editor').onclick=()=>{inspector.classList.remove('open');renderOverview()};
  document.querySelector('#cancel-initiative').onclick=()=>{inspector.classList.remove('open');renderOverview()};
  document.querySelector('#save-initiative').onclick=()=>{
    const nextTeam=document.querySelector('#initiative-team').value||null;
    const nextDesigner=document.querySelector('#initiative-designer').value.trim();
    item.team=nextTeam;item.designer=nextDesigner||teams.find(candidate=>candidate.name===nextTeam)?.designer||'No PD assigned';item.ownerMode=nextDesigner?'manual':'team-default';
    persistInitiatives();applyImportedInitiatives();renderOverview();inspector.classList.remove('open');
  };
  document.querySelector('#delete-initiative').onclick=()=>{
    if(!window.confirm('Delete this delivery from the Knowledge Graph?'))return;
    importedInitiatives=importedInitiatives.filter(candidate=>candidate.id!==id);persistInitiatives();applyImportedInitiatives();renderOverview();inspector.classList.remove('open');
  };
}

renderImportedInitiatives=function(name){
  const panel=content.querySelector('.info-section');const items=importedInitiatives.filter(item=>item.team===name);if(!panel||!items.length)return;
  panel.innerHTML=`<h3>Customer-facing deliveries</h3>${items.map(item=>`<div class="initiative-item" data-open-initiative="${item.id}" tabindex="0" role="button"><strong>${item.name}</strong><span>${item.status} · ${item.designer||'No PD assigned'}${item.dueDate?' · '+item.dueDate:''}</span></div>`).join('')}`;
  panel.querySelectorAll('[data-open-initiative]').forEach(card=>{card.onclick=()=>openInitiativeEditor(card.dataset.openInitiative);card.onkeydown=event=>{if(event.key==='Enter'||event.key===' ')openInitiativeEditor(card.dataset.openInitiative)}});
};

renderOverview=function(){
  const overview=document.querySelector('#initiative-overview');
  const grouped=[...teams.map(team=>({name:team.name,items:importedInitiatives.filter(item=>item.team===team.name)})),{name:'Needs team mapping',items:importedInitiatives.filter(item=>!item.team)}].filter(group=>group.items.length);
  overview.innerHTML=grouped.map(group=>`<div class="overview-team"><div class="overview-team-heading"><strong>${group.name}</strong><b>${group.items.length}</b></div>${group.items.map(item=>`<div class="overview-delivery" data-open-initiative="${item.id}" tabindex="0" role="button"><div class="overview-delivery-title">${item.name}</div><span class="overview-status">${item.status}</span><small>${item.pm} · ${item.designer||'No PD assigned'}</small></div>`).join('')}</div>`).join('')||'<div class="overview-empty">No active customer-facing deliveries.</div>';
  overview.querySelectorAll('[data-open-initiative]').forEach(card=>{card.onclick=()=>openInitiativeEditor(card.dataset.openInitiative);card.onkeydown=event=>{if(event.key==='Enter'||event.key===' ')openInitiativeEditor(card.dataset.openInitiative)}});
};
renderOverview();
renderOverview=function(){
  const overview=document.querySelector('#initiative-overview');
  const active=importedInitiatives;
  const countBy=(items,key)=>items.reduce((counts,item)=>{const value=key(item)||'Not specified';counts[value]=(counts[value]||0)+1;return counts},{});
  const section=(title,kind,counts)=>`<div class="counter-section"><div class="counter-section-title">${title}</div><div class="counter-grid">${Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([label,count])=>`<button class="counter-card ${kind==='stage'?'stage-'+label.toLowerCase().replace(/[^a-z0-9]+/g,'-'):''}" data-filter-kind="${kind}" data-filter-value="${label}"><strong>${count}</strong><span>${label}</span></button>`).join('')}</div></div>`;
  overview.innerHTML=section('FILTER BY STAGE','stage',countBy(active,item=>item.status))+section('FILTER BY PRODUCT DESIGNER','designer',countBy(active,item=>item.designer||'No PD assigned'))+section('FILTER BY TEAM','team',countBy(active,item=>item.team||'Needs team mapping'));
  overview.querySelectorAll('[data-filter-kind]').forEach(card=>card.onclick=()=>openInitiativeFilter(card.dataset.filterKind,card.dataset.filterValue));
};
renderOverview();
const renderKnowledgeWithOrgEyebrow=renderKnowledge;
renderKnowledge=()=>{
  renderKnowledgeWithOrgEyebrow();
  document.querySelector('.eyebrow').textContent='CONTEXT GRAPH / KNOWLEDGE ORG';
};
if(mode==='knowledge')renderKnowledge();

const renderBrainWithOrgEyebrow=renderBrain;
renderBrain=()=>{
  renderBrainWithOrgEyebrow();
  document.querySelector('.eyebrow').textContent='CONTEXT GRAPH / PRODUCT DESIGN ORG';
};
if(mode==='brain')renderBrain();

const renderWorkWithStickyControls=renderWork;
renderWork=()=>{
  renderWorkWithStickyControls();
  const heading=workView.querySelector('.work-view-heading');
  const filters=workView.querySelector('.work-filters');
  if(!heading||!filters)return;
  const controls=document.createElement('div');
  controls.className='work-sticky-controls';
  heading.before(controls);
  controls.append(heading,filters);
};
if(document.querySelector('#graph-wrap').classList.contains('work-mode'))renderWork();

// Restore the original Work scrolling behaviour.
renderWork=renderWorkWithStickyControls;
if(document.querySelector('#graph-wrap').classList.contains('work-mode'))renderWork();
