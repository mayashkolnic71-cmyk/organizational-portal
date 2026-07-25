// Initialize Lucide Icons
lucide.createIcons();

// Tab Navigation
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        navItems.forEach(nav => nav.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        item.classList.add('active');
        const tabId = item.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        if(tabId === 'training-calendar' && calendar) {
            setTimeout(() => { calendar.render(); }, 100);
        }
    });
});

// Editable table logic
document.querySelectorAll('.editable-cell').forEach(cell => {
    cell.addEventListener('blur', (e) => {
        console.log('Value updated to:', e.target.innerText);
        e.target.style.background = 'rgba(16, 185, 129, 0.2)'; 
        setTimeout(() => { e.target.style.background = 'rgba(59, 130, 246, 0.1)'; }, 1000);
    });
});

// --- Staff Mix Table Logic ---
const staffParameters = [
    { id: 'p1', name: 'אחוז האחים מוסמכים מכלל האחים במוסד ללא תואר', targetNat: '100%' },
    { id: 'p2', name: 'אחוז האחים מעשים מכלל האחים במוסד', targetNat: '0%' },
    { id: 'p3', name: 'אחוז האחים בוגרי על בסיסי', targetNat: '60%' },
    { id: 'p4', name: 'אחוז האחים בעלי הכשרה פורמלית של נאמני נושא קליני (מסך כל האחיות)', targetNat: '50%' },
    { id: 'p5', name: 'אחוז האחים בעלי תואר שני', targetNat: '-' },
    { id: 'p6', name: 'אחוז האחים בעלי מומחיות קלינית', targetNat: '6%' },
    { id: 'p7', name: 'אחוז אחים גברים', targetNat: '-' },
    { id: 'p8', name: 'אחים מוסמכים בעלי היתר זמני', targetNat: '-' },
    { id: 'p9', name: 'תמהיל אחוז האחים מוסמכים בוגרי על בסיסי בשיקום (מסה"כ בעלי הכשרה)', targetNat: '-' },
    { id: 'p10', name: 'תמהיל אחוז האחים מוסמכים בוגרי על בסיסי בטיפול נמרץ (מסה"כ בעלי הכשרה)', targetNat: '-' },
    { id: 'p11', name: 'תמהיל אחוז האחים מוסמכים בוגרי על בסיסי בגריאטריה (מסה"כ בעלי הכשרה)', targetNat: '-' },
    { id: 'p12', name: 'תמהיל אחוז האחים מוסמכים בוגרי על בסיסי הדרכה קלינית (מסה"כ בעלי הכשרה)', targetNat: '-' },
    { id: 'p13', name: 'תמהיל אחוז האחים מוסמכים בוגרי על בסיסי בסטומה ופצע, זיהומים (מסה"כ בעלי הכשרה)', targetNat: '-' },
    { id: 'p14', name: 'תמהיל אחוז כוח עזר בצוות האחיות', targetNat: '-' },
    { id: 'p15', name: 'הכשרה וכתב מינוי לאחריות משמרת', targetNat: '-' }
];

let tableData = JSON.parse(localStorage.getItem('staffTableData')) || {
    years: [2025, 2024],
    internalTargets: {}, 
    values: {} 
};

function saveTableData() {
    localStorage.setItem('staffTableData', JSON.stringify(tableData));
}

window.addYearColumn = function() {
    const input = document.getElementById('new-year-input');
    if(!input) return;
    const year = parseInt(input.value);
    if(year && !tableData.years.includes(year)) {
        tableData.years.unshift(year);
        tableData.years.sort((a,b) => b - a);
        saveTableData();
        input.value = '';
        renderStaffTable();
    }
}

window.removeYearColumn = function(year) {
    if(confirm(`להסיר את העמודה של שנת ${year}?`)) {
        tableData.years = tableData.years.filter(y => y !== year);
        saveTableData();
        renderStaffTable();
    }
}

window.updateInternalTarget = function(paramId, val) {
    tableData.internalTargets[paramId] = val;
    saveTableData();
}

window.saveCellInput = function(paramId, year, type, element) {
    const key = `${paramId}_${year}`;
    if(!tableData.values[key]) tableData.values[key] = { count: '', n: '' };
    tableData.values[key][type] = element.value;
    saveTableData();
    
    const cellData = tableData.values[key];
    const span = document.getElementById(`display_${key}`);
    if(span) {
        if (cellData.count !== '' && cellData.n !== '' && cellData.n > 0) {
            const perc = ((cellData.count / cellData.n) * 100).toFixed(1);
            span.innerText = `${perc}% (${cellData.count})`;
            span.style.color = '#10b981';
        } else if (cellData.count !== '') {
            span.innerText = cellData.count;
            span.style.color = '#fff';
        } else {
            span.innerText = '-';
            span.style.color = '#fff';
        }
    }
}

window.renderStaffTable = function() {
    const container = document.getElementById('mix-table-container');
    if(!container) return;

    let html = `<table class="staff-table" id="mix-table">
        <thead>
            <tr>
                <th style="min-width: 220px; font-size: 0.9rem;">פרמטר</th>
                <th style="min-width: 80px; text-align: center;">יעד ארצי</th>
                <th style="min-width: 100px; text-align: center;">יעד פנימי</th>`;
    
    tableData.years.forEach(year => {
        html += `<th style="text-align: center; min-width: 130px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 5px;">
                ${year}
                <button class="btn btn-sm btn-danger" style="padding: 2px 4px; display: flex; align-items: center; justify-content: center; border-radius: 4px;" onclick="removeYearColumn(${year})"><i data-lucide="x" style="width: 14px; height: 14px;"></i></button>
            </div>
        </th>`;
    });
    
    html += `</tr></thead><tbody>`;

    staffParameters.forEach(param => {
        let intTarget = tableData.internalTargets[param.id] || '';
        html += `<tr>
            <td style="font-size: 0.85rem; line-height: 1.3;">${param.name}</td>
            <td style="text-align: center; font-weight: bold; color: var(--primary-light);">${param.targetNat}</td>
            <td style="text-align: center;">
                <input type="text" value="${intTarget}" placeholder="הזן" onblur="updateInternalTarget('${param.id}', this.value)" style="width: 60px; text-align: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #fff; padding: 4px; font-size: 0.85rem;">
            </td>`;
        
        tableData.years.forEach(year => {
            const key = `${param.id}_${year}`;
            const cellData = tableData.values[key] || { count: '', n: '' };
            let display = '-';
            let color = '#fff';
            if (cellData.count !== '' && cellData.n !== '' && cellData.n > 0) {
                const perc = ((cellData.count / cellData.n) * 100).toFixed(1);
                display = `${perc}% (${cellData.count})`;
                color = '#10b981';
            } else if (cellData.count !== '') {
                display = cellData.count; 
            }

            html += `<td style="text-align: center; padding: 8px 4px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px; flex-direction: column;">
                    <span id="display_${key}" style="font-size: 0.9rem; font-weight: bold; color: ${color};">${display}</span>
                    <div style="display: flex; gap: 4px; align-items: center; justify-content: center;">
                        <input type="number" placeholder="כמות" value="${cellData.count}" onblur="saveCellInput('${param.id}', ${year}, 'count', this)" style="width: 48px; padding: 4px 2px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #fff; font-size: 0.75rem;">
                        <span style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">/</span>
                        <input type="number" placeholder="N" value="${cellData.n}" onblur="saveCellInput('${param.id}', ${year}, 'n', this)" style="width: 48px; padding: 4px 2px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #fff; font-size: 0.75rem;">
                    </div>
                </div>
            </td>`;
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
    if(window.lucide) lucide.createIcons();
}
// ------------------------------------

// --- Departments & Trustees Logic ---
const clinicalTopics = [
    { name: "פצעים", icon: "bandage" },
    { name: "כאב", icon: "activity" },
    { name: "הזנה והאכלה", icon: "apple" },
    { name: "דמנציה", icon: "brain" },
    { name: "טיפול תומך/פליאטיבי", icon: "heart-pulse" },
    { name: "מניעת זיהומים", icon: "shield-alert" },
    { name: "בטיחות הטיפול וניהול סיכונים", icon: "shield-check" },
    { name: "התעמרות וחוק זכויות המטופל", icon: "user-check" },
    { name: "סוכרת", icon: "stethoscope" },
    { name: "אי ספיקת לב", icon: "heart" },
    { name: "טראומה", icon: "alert-triangle" },
    { name: "גריאטריה", icon: "users" },
    { name: "חרום", icon: "siren" },
    { name: "טיפול תרופתי", icon: "pill" },
    { name: "החייאה", icon: "zap" },
    { name: "חווית המטופל", icon: "smile" },
    { name: "בריאות העובד ומערך החיסונים", icon: "syringe" }
];

let departments = JSON.parse(localStorage.getItem('departments')) || ["מחלקה א'", "מחלקה ב'"];
let trusteeData = JSON.parse(localStorage.getItem('trusteeData')) || {};

function saveDepartments() {
    localStorage.setItem('departments', JSON.stringify(departments));
}

function saveTrusteeData() {
    localStorage.setItem('trusteeData', JSON.stringify(trusteeData));
}

window.updateTrustee = function(dept, topic, value) {
    if(!trusteeData[dept]) trusteeData[dept] = {};
    trusteeData[dept][topic] = value;
    saveTrusteeData();
}

window.renderTrustees = function() {
    const list = document.getElementById('topic-trustees');
    const select = document.getElementById('trustee-dept-select');
    if (!list || !select) return;
    
    const currentVal = select.value;
    select.innerHTML = departments.map(d => `<option value="${d}">${d}</option>`).join('');
    if (departments.includes(currentVal)) {
        select.value = currentVal;
    } else if (departments.length > 0) {
        select.value = departments[0];
    }
    
    const selectedDept = select.value;
    if (!selectedDept) {
        list.innerHTML = '<div>יש להגדיר מחלקה קודם</div>';
        return;
    }
    
    if (!trusteeData[selectedDept]) trusteeData[selectedDept] = {};

    list.innerHTML = '';
    clinicalTopics.forEach(topicObj => {
        const topic = topicObj.name;
        const icon = topicObj.icon;
        const val = trusteeData[selectedDept][topic] || '';
        list.innerHTML += `
            <div class="trustee-card">
                <div class="tc-header">
                    <i data-lucide="${icon}"></i> ${topic}
                </div>
                <div class="tc-body">
                    <div class="tc-field">
                        <label>שם הנאמן/ת:</label>
                        <input type="text" placeholder="הקלד/י שם..." value="${val}" 
                               onblur="updateTrustee('${selectedDept}', '${topic}', this.value)"
                               style="width: 100%; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: rgba(15,23,42,0.4); color: #fff; font-family: inherit;">
                    </div>
                    <div class="tc-action" style="margin-top: 10px;">
                        <button class="btn btn-sm btn-outline" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; border-color: rgba(255,255,255,0.2); color: #cbd5e1; background: rgba(0,0,0,0.2); transition: all 0.2s;" onclick="alert('במערכת אמיתית, יפתח חלון לבחירת קובץ כתב מינוי')">
                            <i data-lucide="upload" style="width: 14px; height: 14px;"></i> כתב מינוי
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    if(window.lucide) lucide.createIcons();
}

window.removeDepartment = function(idx) {
    if(confirm('האם אתה בטוח שברצונך למחוק מחלקה זו?')) {
        const deptName = departments[idx];
        departments.splice(idx, 1);
        if (trusteeData[deptName]) {
            delete trusteeData[deptName];
        }
        saveDepartments();
        saveTrusteeData();
        renderShiftManagers();
        renderTrustees();
    }
}

window.currentSearchResults = [];
window.currentSearchIndex = -1;

window.searchCalendar = function(query) {
    if(!calendar || !window.allCalendarEvents) return;
    const q = query.toLowerCase();
    
    const infoDiv = document.getElementById('search-results-info');
    const textSpan = document.getElementById('search-count-text');

    if (!q) {
        calendar.removeAllEventSources();
        calendar.removeAllEvents();
        calendar.addEventSource(window.allCalendarEvents);
        if(infoDiv) infoDiv.style.display = 'none';
        window.currentSearchResults = [];
        window.currentSearchIndex = -1;
        return;
    }
    
    const filtered = window.allCalendarEvents.filter(ev => ev.title.toLowerCase().includes(q));
    window.currentSearchResults = filtered.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    calendar.removeAllEventSources();
    calendar.removeAllEvents();
    calendar.addEventSource(filtered);
    
    if(infoDiv && textSpan) {
        if (filtered.length > 0) {
            infoDiv.style.display = 'flex';
            window.currentSearchIndex = 0;
            updateSearchText();
            calendar.gotoDate(filtered[0].start);
        } else {
            infoDiv.style.display = 'flex';
            textSpan.innerText = `לא נמצאו אירועים`;
            window.currentSearchIndex = -1;
        }
    }
}

function updateSearchText() {
    const textSpan = document.getElementById('search-count-text');
    if(textSpan && window.currentSearchResults.length > 0) {
        textSpan.innerText = `אירוע ${window.currentSearchIndex + 1} מתוך ${window.currentSearchResults.length}`;
    }
}

window.jumpToSearchResult = function(direction) {
    if (window.currentSearchResults.length === 0) return;
    window.currentSearchIndex += direction;
    if (window.currentSearchIndex >= window.currentSearchResults.length) window.currentSearchIndex = 0;
    if (window.currentSearchIndex < 0) window.currentSearchIndex = window.currentSearchResults.length - 1;
    
    calendar.gotoDate(window.currentSearchResults[window.currentSearchIndex].start);
    updateSearchText();
}

window.addDepartment = function() {
    const input = document.getElementById('new-dept-input');
    if(!input) return;
    const val = input.value.trim();
    if(val && !departments.includes(val)) {
        departments.push(val);
        saveDepartments();
        input.value = '';
        renderShiftManagers();
        renderTrustees();
    } else if (departments.includes(val)) {
        alert('המחלקה כבר קיימת');
    }
}

window.renderShiftManagers = function() {
    const list = document.getElementById('shift-managers');
    if (!list) return;
    list.innerHTML = '';
    departments.forEach((dept, idx) => {
        list.innerHTML += `
            <li style="margin-bottom: 8px;">
                <span>אחראית משמרת: ${dept}</span>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-sm" onclick="alert('הדמיית העלאת קובץ...')"><i data-lucide="upload"></i> אישור/חידוש</button>
                    <button class="btn btn-sm btn-danger" onclick="removeDepartment(${idx})"><i data-lucide="trash-2"></i></button>
                </div>
            </li>
        `;
    });
    if(window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    renderOrgChart();
    renderStaffTable();
    renderTrustees();
    renderShiftManagers();
});
// ------------------------------------

// --- Org Chart Logic ---
const defaultOrgChart = {
    id: 'root',
    role: 'מנהלת שירותי האחיות',
    name: 'שם מנהלת',
    children: [
        {
            id: 'c1',
            role: 'סגנית אחות ראשית',
            name: 'שם סגנית',
            children: [
                {
                    id: 'c1_1',
                    role: 'אחראית שיקום א',
                    name: 'שם אחראית',
                    children: [
                        { id: 'c1_1_1', role: 'ס.א מחלקה (ניהול זיהומים)', name: 'שם ס.א', children: [] }
                    ]
                },
                {
                    id: 'c1_2',
                    role: 'אחראית שיקום ב',
                    name: 'שם אחראית',
                    children: [
                        { id: 'c1_2_1', role: 'ס.א מחלקה (דפוסי הפרשות)', name: 'שם ס.א', children: [] }
                    ]
                }
            ]
        },
        {
            id: 'c2',
            role: 'מפקחת קלינית - מונשמים',
            name: 'שם מפקחת',
            children: [
                { id: 'c2_1', role: 'אחראית מונשמים ב', name: 'שם', children: [] },
                { id: 'c2_2', role: 'אחראית מונשמים א', name: 'שם', children: [] },
                { id: 'c2_3', role: 'אחראית מונשמים ג', name: 'שם', children: [] }
            ]
        }
    ]
};

let orgChartData = JSON.parse(localStorage.getItem('orgChartData')) || defaultOrgChart;

function saveOrgChart() {
    localStorage.setItem('orgChartData', JSON.stringify(orgChartData));
}

window.resetOrgChart = function() {
    if(confirm('האם אתה בטוח שברצונך לאפס את כל תרשים המבנה הארגוני למצב ההתחלתי?')) {
        orgChartData = JSON.parse(JSON.stringify(defaultOrgChart));
        saveOrgChart();
        renderOrgChart();
    }
}

function generateId() {
    return 'node_' + Math.random().toString(36).substr(2, 9);
}

function findNodeAndDo(node, id, action) {
    if (node.id === id) {
        action(node, null, null);
        return true;
    }
    if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].id === id) {
                action(node.children[i], node, i);
                return true;
            }
            if (findNodeAndDo(node.children[i], id, action)) {
                return true;
            }
        }
    }
    return false;
}

window.addOrgNode = function(parentId) {
    findNodeAndDo(orgChartData, parentId, (node) => {
        if(!node.children) node.children = [];
        node.children.push({
            id: generateId(),
            role: 'תפקיד חדש',
            name: 'שם העובד',
            children: []
        });
        saveOrgChart();
        renderOrgChart();
    });
}

window.addOrgSibling = function(id) {
    if(id === 'root') {
        alert('לא ניתן להוסיף מקביל לקודקוד הראשי.');
        return;
    }
    findNodeAndDo(orgChartData, id, (node, parent) => {
        if(parent) {
            parent.children.push({
                id: generateId(),
                role: 'תפקיד רוחבי',
                name: 'שם העובד',
                children: []
            });
            saveOrgChart();
            renderOrgChart();
        }
    });
}

window.deleteOrgNode = function(id) {
    if(id === 'root') {
        alert('לא ניתן למחוק את קודקוד העץ הראשי.');
        return;
    }
    if(confirm('האם אתה בטוח שברצונך למחוק תפקיד זה ואת כל הכפופים אליו?')) {
        findNodeAndDo(orgChartData, id, (node, parent, index) => {
            if(parent) {
                parent.children.splice(index, 1);
                saveOrgChart();
                renderOrgChart();
            }
        });
    }
}

window.updateOrgNode = function(id, field, value) {
    findNodeAndDo(orgChartData, id, (node) => {
        node[field] = value;
        saveOrgChart();
    });
}

function buildTreeHTML(node) {
    let html = `<li>
        <div class="node-box">
            <div class="node-actions">
                <button class="node-btn add" onclick="addOrgNode('${node.id}')" title="הוסף כפוף"><i data-lucide="arrow-down-to-line" style="width:14px; height:14px;"></i></button>
                ${node.id !== 'root' ? `<button class="node-btn add-sibling" onclick="addOrgSibling('${node.id}')" title="הוסף רוחבי"><i data-lucide="arrow-right-left" style="width:14px; height:14px;"></i></button>` : ''}
                <button class="node-btn delete" onclick="deleteOrgNode('${node.id}')" title="מחק"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>
            </div>
            <span class="node-role" contenteditable="true" onblur="updateOrgNode('${node.id}', 'role', this.innerText)">${node.role}</span>
            <span class="node-name" contenteditable="true" onblur="updateOrgNode('${node.id}', 'name', this.innerText)">${node.name}</span>
        </div>`;
    
    if (node.children && node.children.length > 0) {
        html += `<ul>`;
        node.children.forEach(child => {
            html += buildTreeHTML(child);
        });
        html += `</ul>`;
    }
    
    html += `</li>`;
    return html;
}

window.renderOrgChart = function() {
    const container = document.getElementById('org-chart-root');
    if(!container) return;
    
    let html = `<ul>${buildTreeHTML(orgChartData)}</ul>`;
    container.innerHTML = html;
    if(window.lucide) lucide.createIcons();
}
// ------------------------------------

// FullCalendar Initialization
let calendar;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('fullcalendar-view');

    const baseEvents = [
        { title: 'פסח', start: '2026-04-02', end: '2026-04-09', display: 'background', classNames: ['holiday-event'] },
        { title: 'יום העצמאות', start: '2026-04-22', allDay: true, display: 'background', classNames: ['holiday-event'] },
        { title: 'שבועות', start: '2026-05-22', allDay: true, display: 'background', classNames: ['holiday-event'] },
        { title: 'ראש השנה', start: '2026-09-12', end: '2026-09-14', display: 'background', classNames: ['holiday-event'] },
        { title: 'יום כיפור', start: '2026-09-21', allDay: true, display: 'background', classNames: ['holiday-event'] },
        { title: 'סוכות', start: '2026-09-26', end: '2026-10-04', display: 'background', classNames: ['holiday-event'] },
        { title: 'יום השואה', start: '2026-04-21', allDay: true, display: 'background', classNames: ['holiday-event'] },
        
        // ימי מודעות והוקרה
        { title: 'יום האחות הבינלאומי', start: '2026-05-12', allDay: true, classNames: ['training-event'] },
        { title: 'יום הרופא', start: '2026-01-11', allDay: true, classNames: ['training-event'] },
        { title: 'יום העובד הסוציאלי הבינלאומי', start: '2026-03-17', allDay: true, classNames: ['training-event'] },
        { title: 'יום הריפוי בעיסוק', start: '2026-10-27', allDay: true, classNames: ['training-event'] },
        { title: 'יום הפיזיותרפיה', start: '2026-09-08', allDay: true, classNames: ['training-event'] },
        { title: 'יום המודעות בנושא התעמרות בזקנים', start: '2026-06-15', allDay: true, classNames: ['training-event'] },
        { title: 'יום המודעות לדמנציה (אלצהיימר)', start: '2026-09-21', allDay: true, classNames: ['training-event'] },
        { title: 'יום הזקן הבינלאומי', start: '2026-10-01', allDay: true, classNames: ['training-event'] },
        
        { title: 'אירועי הוקרה והערכה - חגי תשרי', start: '2026-09-10', allDay: true, classNames: ['training-event'] },
        { title: 'פורום רב תחומי - חווית המטופל/המטפל', start: '2026-07-15T10:00:00', end: '2026-07-15T14:00:00', classNames: ['training-event'] },
        
        // אירועים שבועיים קבועים
        { title: 'ג\'ורנל קלאב ודיונים קליניים לצוות רפואי ואחיות בכיר', daysOfWeek: [4], startTime: '13:00:00', endTime: '14:30:00', classNames: ['training-event'] }, // יום חמישי
        { title: 'פורום חטיבתי (מונשמים/שיקום/אשפוז כרוני)', daysOfWeek: [2], startTime: '09:00:00', endTime: '10:00:00', classNames: ['training-event'] }, // יום שלישי
        { title: 'ישיבות סקטוריאליות שוטפות', daysOfWeek: [3], startTime: '11:00:00', endTime: '12:00:00', classNames: ['training-event'] } // יום רביעי
    ];

    const dynamicEvents = [];
    for(let month = 1; month <= 12; month++) {
        let mStr = month.toString().padStart(2, '0');
        // אירועים חודשיים
        dynamicEvents.push({ title: 'ישיבת צוות אחיות אחראיות', start: `2026-${mStr}-05T10:00:00`, end: `2026-${mStr}-05T12:00:00`, classNames: ['training-event'] });
        dynamicEvents.push({ title: 'ישיבות מחלקתיות', start: `2026-${mStr}-15T13:00:00`, end: `2026-${mStr}-15T14:00:00`, classNames: ['training-event'] });
        dynamicEvents.push({ title: 'הדרכות מקוונות והדרכות פנים', start: `2026-${mStr}-20T12:00:00`, end: `2026-${mStr}-20T14:00:00`, classNames: ['training-event'] });

        // אירועים רבעוניים
        if(month % 3 === 0) {
            dynamicEvents.push({ title: 'מפגש סגנים רבעוני', start: `2026-${mStr}-10T10:00:00`, classNames: ['training-event'] });
            dynamicEvents.push({ title: 'וועדות מקצועיות: בטיחות, זיהומים, תרופות והתעמרות', start: `2026-${mStr}-12T12:00:00`, classNames: ['training-event'] });
            dynamicEvents.push({ title: 'וועדת טיפול פליאטיבי וטיפול תומך', start: `2026-${mStr}-13T12:00:00`, classNames: ['training-event'] });
            dynamicEvents.push({ title: 'פורום מקצועי נאמני נושא רבעוני', start: `2026-${mStr}-18T14:00:00`, classNames: ['training-event'] });
        }
        
        // אירועים חצי שנתיים
        if(month % 6 === 0) {
            dynamicEvents.push({ title: 'ישיבת צוות בכיר סקטוריאלי', start: `2026-${mStr}-25T09:00:00`, end: `2026-${mStr}-25T13:00:00`, classNames: ['training-event'] });
        }
    }
    
    // הכשרות מיוחדות בטווח תאריכים
    dynamicEvents.push({ title: 'סדנת האכלה והזנה (הכשרה שנתית)', start: '2026-05-01', end: '2026-05-02', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'סדנת החייאה (הכשרה שנתית)', start: '2026-06-01', end: '2026-06-02', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'סדנת בטיחות במעברים (הכשרה שנתית)', start: '2026-07-01', end: '2026-07-02', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'הכשרה פורמלית נאמני נושא (40 שעות)', start: '2026-02-15', end: '2026-02-28', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'מערך מסע מוסדר לקליטת אחות חדשה', start: '2026-08-01', end: '2026-08-14', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'תוכנית הכשרה מנהיגות לסגל בכיר', start: '2026-11-01', end: '2026-11-05', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'תוכנית לפיתוח מקצועי אחיות מוסמכות (השתלמות לאחמ"ש)', start: '2026-03-01', end: '2026-03-30', classNames: ['training-event'] });

    // נושאי חת"ש - 20 הדרכות שנתיות (מבוסס על התוכנית המומלצת) - משך כל מפגש שעה (13:00-14:00)
    const hatashTopics = [
        { title: 'חת"ש: בטיחות מעברים פיזיים (פיזיותרפיסט)', date: '2026-01-12' },
        { title: 'חת"ש: מניעת התעמרות - חובת דיווח (עו"ס)', date: '2026-01-26' },
        { title: 'חת"ש: ריפוי פצעים וגישה כוללנית (נאמנת פצעים)', date: '2026-02-09' },
        { title: 'חת"ש: חולים עם מחלות רקע וכאב (נאמנת כאב)', date: '2026-02-23' },
        { title: 'חת"ש: חוק החולה הנוטה למות (עו"ד)', date: '2026-03-09' },
        { title: 'חת"ש: טיפול אישי בדייר והיגיינה (אחות)', date: '2026-03-23' },
        { title: 'חת"ש: מרקמי מזון (תזונאית)', date: '2026-04-13' },
        { title: 'חת"ש: שימור שליטה בסוגרים (נאמנת עצירות)', date: '2026-04-27' },
        { title: 'חת"ש: שיטת התיקוף בעבודה (מרפאה בעיסוק)', date: '2026-05-11' },
        { title: 'חת"ש: התמודדות עם אלימות והתנהגות מאתגרת (עו"ס)', date: '2026-05-25' },
        { title: 'חת"ש: תזונה ותוספי מזון (תזונאית)', date: '2026-06-08' },
        { title: 'חת"ש: שימוש באביזרים מגבילי תנועה (פיזיותרפיסט)', date: '2026-06-22' },
        { title: 'חת"ש: טיפולים לא תרופתיים בדמנציה (אחות)', date: '2026-07-13' },
        { title: 'חת"ש: חשיבות תעסוקה ושימוש בסדים (מרפאה בעיסוק)', date: '2026-07-27' },
        { title: 'חת"ש: בטיחות בעבודה (אחות)', date: '2026-09-07' },
        { title: 'חת"ש: תקשורת עם משפחות דמנציה (נאמנת דמנציה)', date: '2026-09-21' },
        { title: 'חת"ש: שמיעה וראיה – שימוש באביזרים (אחות)', date: '2026-10-12' },
        { title: 'חת"ש: בטיחות הטיפול ואירועים חריגים (אחות)', date: '2026-10-26' },
        { title: 'חת"ש: אומדן שיטתי חולה פליאטיבי (נאמנת פליאטיבי)', date: '2026-11-09' },
        { title: 'חת"ש: שעת חירום ועבודה בשגרת מלחמה (אחות)', date: '2026-11-23' }
    ];

    hatashTopics.forEach(topic => {
        dynamicEvents.push({
            title: topic.title,
            start: `${topic.date}T13:00:00`,
            end: `${topic.date}T14:00:00`,
            classNames: ['training-event']
        });
    });

    // כנסים והשתלמויות לעדכוני ידע (24 שעות מצטברות)
    dynamicEvents.push({ title: 'כנס מיומנויות ניהוליות ותקשורת (עדכוני ידע אחיות)', start: '2026-05-20', end: '2026-05-21', classNames: ['training-event'] });
    dynamicEvents.push({ title: 'השתלמות סוגיות סוף החיים וטיפול פליאטיבי', start: '2026-11-15', end: '2026-11-16', classNames: ['training-event'] });

    const events = [...baseEvents, ...dynamicEvents];
    window.allCalendarEvents = events;

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'he', 
        direction: 'rtl',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: { today: 'היום', month: 'חודש', week: 'שבוע', day: 'יום' },
        editable: true, 
        droppable: true,
        events: events,
        initialDate: '2026-01-01', 
        eventClick: function(info) {
            const newTitle = prompt('ערוך את שם האירוע:', info.event.title);
            if (newTitle !== null && newTitle.trim() !== '') {
                info.event.setProp('title', newTitle);
            }
        },
        eventDrop: function(info) {
            const dateStr = info.event.start.toISOString();
            if(dateStr.includes('04-02') || dateStr.includes('09-12') || dateStr.includes('09-21')) {
                alert('שים לב: תזמנת הדרכה או ועדה על תאריך של חג/מועד!');
            }
        }
    });

    // Chart.js Dashboard Implementation
    Chart.defaults.color = '#e2e8f0';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    const ctxMix = document.getElementById('staffMixChart');
    if(ctxMix) {
        new Chart(ctxMix, {
            type: 'bar',
            data: {
                labels: ['אחים מעשיים', 'בוגרי על בסיסי', 'נאמני נושא', 'תואר שני'],
                datasets: [
                    {
                        label: 'יעד (%)',
                        data: [8, 60, 50, 12],
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1
                    },
                    {
                        label: 'בפועל 2025 (%)',
                        data: [12, 45.6, 36.8, 9.7],
                        backgroundColor: 'rgba(139, 92, 246, 0.5)',
                        borderColor: 'rgb(139, 92, 246)',
                        borderWidth: 1
                    }
                ]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
        });
    }

    const ctxProgress = document.getElementById('trainingProgressChart');
    if(ctxProgress) {
        new Chart(ctxProgress, {
            type: 'doughnut',
            data: {
                labels: ['הושלם (40 שעות)', 'בתהליך', 'טרם התחילו'],
                datasets: [{
                    data: [65, 20, 15],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(239, 68, 68, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: { responsive: true, cutout: '70%' }
        });
    }
});

function addSimpleRow(btn) {
    const tbody = btn.previousElementSibling.querySelector('tbody');
    const tr = document.createElement('tr');
    for(let i=0; i<2; i++) {
        tr.innerHTML += '<td contenteditable="true" style="padding: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); min-height: 30px;"></td>';
    }
    tbody.appendChild(tr);
}

function openFormModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('has-modal');
    if(window.lucide) {
        lucide.createIcons();
    }
}

// Meetings Logic
const meetingTopicsByMonth = {
    "1": [ { topic: "הצגת תוכנית עבודה מחלקתית (שנתי)", resp: "אחראית מחלקה" }, { topic: "התעמרות וחוק זכויות החולה", resp: "עו\"ס" } ],
    "2": [ { topic: "בטיחות הטיפול", resp: "פיזיו' + רכזת תחום + אחראי בטיחות" } ],
    "3": [ { topic: "מניעת זיהומים", resp: "נאמנת זיהומים" }, { topic: "לומדות ונהלים (בהתאם לשינויים)", resp: "אחראית מחלקה" } ],
    "4": [ { topic: "טיפול בפצעים", resp: "אחראית מחלקה" } ],
    "5": [ { topic: "דיון קליני: שימוש מושכל בתרופות", resp: "אחראית מחלקה" } ],
    "6": [ { topic: "הדרכת חרום", resp: "נאמן חרום" } ],
    "7": [ { topic: "מדדי איכות ונהלים", resp: "אחראית מחלקה" } ],
    "8": [ { topic: "מניעת כאב (הדרכה שנתית)", resp: "רכזת תחום כאב" } ],
    "9": [ { topic: "סדנת הזנה והאכלה", resp: "רכזת תחום הזנה והאכלה" } ],
    "10": [ { topic: "דפוסי הפרשות", resp: "רכזת תחום שליטה על סוגרים" }, { topic: "פעולות בסיעוד", resp: "רכזת תחום הכשרות והדרכה" } ],
    "11": [ { topic: "טיפול פליאטיבי", resp: "אחראית מחלקה" } ],
    "12": [ { topic: "החייאה", resp: "אחראית מחלקה" }, { topic: "הדרכה לפעולות ליבה (שנתי)", resp: "אחראית מחלקה" } ]
};

document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('meeting-month');
    if(monthSelect) {
        monthSelect.addEventListener('change', (e) => {
            const month = e.target.value;
            populateMeetingTable(month);
        });
    }

    const presentInput = document.getElementById('meeting-present');
    if(presentInput) {
        presentInput.addEventListener('input', (e) => updateCount(e.target.value, 'meeting-present-count'));
    }

    const absentInput = document.getElementById('meeting-absent');
    if(absentInput) {
        absentInput.addEventListener('input', (e) => updateCount(e.target.value, 'meeting-absent-count'));
    }
});

function updateCount(text, countElementId) {
    const count = text.split(',').map(s => s.trim()).filter(s => s.length > 0).length;
    document.getElementById(countElementId).innerText = count;
}

function getRowHtml(topic = '', resp = '') {
    return `
        <tr>
            <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);"><input type="text" value="${topic}" style="width: 100%; background: transparent; border: none; color: white;"></td>
            <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);"><textarea rows="2" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 4px; padding: 5px; resize: vertical;"></textarea></td>
            <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);"><input type="text" value="${resp}" style="width: 100%; background: transparent; border: none; color: white;"></td>
            <td style="padding: 10px; border: 1px solid rgba(255,255,255,0.1);">
                <select style="width: 100%; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 5px; border-radius: 4px;">
                    <option value="">בחר...</option>
                    <option value="טרם בוצע">טרם בוצע</option>
                    <option value="בטיפול">בטיפול</option>
                    <option value="בוצע">בוצע</option>
                </select>
            </td>
        </tr>
    `;
}

function populateMeetingTable(month) {
    const tbody = document.getElementById('meeting-topics-table');
    if(!tbody) return;
    let html = getRowHtml('שוטף', 'כלל הצוות');
    
    if(meetingTopicsByMonth[month]) {
        meetingTopicsByMonth[month].forEach(item => {
            html += getRowHtml(item.topic, item.resp);
        });
    }
    tbody.innerHTML = html;
}

window.addMeetingRow = function() {
    const tbody = document.getElementById('meeting-topics-table');
    if(tbody) {
        tbody.insertAdjacentHTML('beforeend', getRowHtml());
    }
};
