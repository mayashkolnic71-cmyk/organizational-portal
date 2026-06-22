let currentUser = null;
let formsSchema = null;
let usersDb = [];
let filledFormsDb = [];
let departmentsDb = [];
let proceduresDb = [];
let trainingsDb = [];

function initTrainingsDb() {
    let stored = localStorage.getItem('clinic_trainings');
    if (stored) {
        trainingsDb = JSON.parse(stored);
    } else {
        trainingsDb = [
            { id: Date.now(), title: '×™×™×©×•× ×—×•×§ ×”×—×•×œ×” ×”× ×•×˜×” ×œ×ž×•×ª', url: 'dying_patient_law.html', icon: 'ðŸ“œ', external: true },
            { id: 1, title: '×ž××¨×– ×ž× ×™×¢×ª ×–×™×”×•×ž×™×', url: 'native_infections', icon: 'ðŸ¦ ', external: false },
            { id: 2, title: '×ž××¨×– ×œ×˜×™×¤×•×œ ×ª×•×ž×š', url: 'native_supportive_care', icon: 'ðŸ¤', external: false }
        ];
    }
    let changed = false;
    trainingsDb.forEach(t => {
        if (t.url && (t.url.includes('docs.google.com') || t.url.includes('forms/d/e/'))) {
            changed = true;
            if (t.title.includes('×˜×™×¤×•×œ ×ª×•×ž×š') || t.url.includes('1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q')) {
                t.url = 'native_supportive_care'; 
                t.external = false;
            } else if (t.title.includes('×ž× ×™×¢×ª ×–×™×”×•×ž×™×') || t.url.includes('1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A')) {
                t.url = 'native_infections'; 
                t.external = false;
            } else {
                t.url = 'native_infections';
                t.external = false;
            }
        } else if (t.url === '1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q' || t.url === 'native_supportive_care') {
             t.url = 'native_supportive_care';
             t.external = false;
             changed = true;
        } else if (t.url === '1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A' || t.url === 'native_infections') {
             t.url = 'native_infections';
             t.external = false;
             changed = true;
        }
    });
    if (changed || !stored) {
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
    }
}
initTrainingsDb();

let protocolsDb = [];
let introFeedbackDb = [];
let trainingsAnswersDb = [];

function initProtocolsDb() {
    const stored = localStorage.getItem('clinic_protocols');
    if (stored) {
        protocolsDb = JSON.parse(stored);
        if (!protocolsDb.find(p => p.link === 'frailty.html')) {
            protocolsDb.unshift({ id: Date.now() + 1, title: '×”×ª×ž×•×“×“×•×ª ×¢× ×©×‘×¨×™×¨×™×•×ª (Frailty)', link: 'frailty.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration.html')) {
            protocolsDb.unshift({ id: Date.now(), title: '××¡×¤×™×¨×¦×™×” ×•×—× ×§ ×‘×’×¨×™××˜×¨×™×”', link: 'aspiration.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration_training.html')) {
            protocolsDb.unshift({ id: Date.now() + 2, title: '×”×©×ª×œ×ž×•×ª ×ž×§×¦×•×¢×™×ª: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×” ×•×—× ×§', link: 'aspiration_training.html' });
        }
        if (!protocolsDb.find(p => p.link === 'aspiration-infographic.png')) {
            protocolsDb.unshift({ id: Date.now() + 3, title: '××™× ×¤×•×’×¨×¤×™×§×”: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×” ×•×—× ×§ ×‘×ž×¢×¨×š ×”×’×¨×™××˜×¨×™', link: 'aspiration-infographic.png' });
        }
        if (!protocolsDb.find(p => p.link === 'Claymation Explainer-saved.mp4')) {
            protocolsDb.unshift({ id: Date.now() + 4, title: '×¡×¨×˜×•×Ÿ ×”×“×¨×›×”: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×”', link: 'Claymation Explainer-saved.mp4' });
        }
        if (!protocolsDb.find(p => p.link === 'pharmacological_risk.html')) {
            protocolsDb.unshift({ id: Date.now() + 5, title: '× ×™×”×•×œ ×¡×™×›×•× ×™× ×¤×¨×ž×§×•×œ×•×’×™×™× ×‘××©×¤×•×– ×’×¨×™××˜×¨×™', link: 'pharmacological_risk.html' });
        }
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    } else {
        protocolsDb = [
            { id: Date.now() + 5, title: '× ×™×”×•×œ ×¡×™×›×•× ×™× ×¤×¨×ž×§×•×œ×•×’×™×™× ×‘××©×¤×•×– ×’×¨×™××˜×¨×™', link: 'pharmacological_risk.html' },
            { id: Date.now() + 4, title: '×¡×¨×˜×•×Ÿ ×”×“×¨×›×”: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×”', link: 'Claymation Explainer-saved.mp4' },
            { id: Date.now() + 3, title: '××™× ×¤×•×’×¨×¤×™×§×”: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×” ×•×—× ×§ ×‘×ž×¢×¨×š ×”×’×¨×™××˜×¨×™', link: 'aspiration-infographic.png' },
            { id: Date.now() + 2, title: '×”×©×ª×œ×ž×•×ª ×ž×§×¦×•×¢×™×ª: ×ž× ×™×¢×ª ××¡×¤×™×¨×¦×™×” ×•×—× ×§', link: 'aspiration_training.html' },
            { id: Date.now(), title: '××¡×¤×™×¨×¦×™×” ×•×—× ×§ ×‘×’×¨×™××˜×¨×™×”', link: 'aspiration.html' },
            { id: Date.now() + 1, title: '×”×ª×ž×•×“×“×•×ª ×¢× ×©×‘×¨×™×¨×™×•×ª (Frailty)', link: 'frailty.html' }
        ];
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
    }
}
initProtocolsDb();

(function() {
    let t = null; // Disabled to prevent overwrite
    if (t) {
        let arr = JSON.parse(t);
        arr = arr.filter(item => item && item.title);
        if (!arr.find(x => x.title === '×ž××¨×– ×ž× ×™×¢×ª ×–×™×”×•×ž×™×')) {
            arr.push({ id: 1, title: '×ž××¨×– ×ž× ×™×¢×ª ×–×™×”×•×ž×™×', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?usp=pp_url', icon: 'ðŸ¦ ', external: true });
        } else {
            let tItem = arr.find(x => x.title === '×ž××¨×– ×ž× ×™×¢×ª ×–×™×”×•×ž×™×');
            { tItem.url = 'https://docs.google.com/forms/d/e/1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q/viewform?usp=pp_url'; tItem.icon = 'ðŸ¦ '; tItem.external = true; }
        }
        if (!arr.find(x => x.title === '×ž××¨×– ×œ×˜×™×¤×•×œ ×ª×•×ž×š')) {
            arr.push({ id: 2, title: '×ž××¨×– ×œ×˜×™×¤×•×œ ×ª×•×ž×š', url: 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?usp=pp_url', icon: 'ðŸ«‚', external: true });
        } else {
            let tItem = arr.find(x => x.title === '×ž××¨×– ×œ×˜×™×¤×•×œ ×ª×•×ž×š');
            { tItem.url = 'https://docs.google.com/forms/d/e/1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A/viewform?usp=pp_url'; tItem.icon = 'ðŸ«‚'; tItem.external = true; }
        }
        localStorage.setItem('clinic_trainings', JSON.stringify(arr));
        trainingsDb = arr;
    }
    let p = localStorage.getItem('clinic_protocols');
    if (p) {
        let pArr = JSON.parse(p);
        if (!pArr.find(x => x.link === 'pharmacological_risk.html')) {
            pArr.unshift({ id: Date.now() + 5, title: '× ×™×”×•×œ ×¡×™×›×•× ×™× ×¤×¨×ž×§×•×œ×•×’×™×™× ×‘××©×¤×•×– ×’×¨×™××˜×¨×™', link: 'pharmacological_risk.html' });
            localStorage.setItem('clinic_protocols', JSON.stringify(pArr));
            protocolsDb = pArr;
        }
    }
})();

function initIntroFeedbackDb() {
    const stored = localStorage.getItem('clinic_intro_feedback');
    if (stored) introFeedbackDb = JSON.parse(stored);
}
initIntroFeedbackDb();

function initTrainingsAnswersDb() {
    const stored = localStorage.getItem('clinic_trainings_answers');
    if (stored) trainingsAnswersDb = JSON.parse(stored);
}
initTrainingsAnswersDb();

function initProceduresDb() {
    const stored = localStorage.getItem('clinic_procedures');
    if (stored) {
        proceduresDb = JSON.parse(stored);
    } else {
        proceduresDb = [
            { id: 1, title: '× ×•×”×œ 1.10.5 - × ×™×§×™×•×Ÿ ×¡×‘×™×‘×ª×™', link: 'https://www.gov.il/he/departments/policies/m-hozer-04-2011', readBy: [] }
        ];
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
    }
}
initProceduresDb();

function initDepartmentsDb() {
    const stored = localStorage.getItem('clinic_departments');
    if (stored) {
        departmentsDb = JSON.parse(stored);
    } else {
        departmentsDb = ["×ž×•× ×©×ž×™× ×", "×ž×•× ×©×ž×™× ×‘", "×ž×•× ×©×ž×™× ×’", "×©×™×§×•× ×", "×©×™×§×•× ×‘", "×¡×™×¢×•×“ ×ž×•×¨×›×‘", "×¡×™×¢×•×“×™×ª", "×ª×©×•×©×™ × ×¤×©"];
        localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
    }
}
initDepartmentsDb();

function initFilledFormsDb() {
    const stored = localStorage.getItem('clinic_filled_forms');
    if (stored) {
        filledFormsDb = JSON.parse(stored);
    }
}
initFilledFormsDb();

// Initialize Users DB from Local Storage
function initUsersDb() {
    const storedUsers = localStorage.getItem('clinic_users');
    if (storedUsers) {
        usersDb = JSON.parse(storedUsers);
    } else {
        // Default seed users
        usersDb = [
            { username: 'admin', password: 'admin', name: '×“"×¨ ×™×©×¨××œ×™', role: '×ž× ×”×œ ×¨××©×™', team: 'all', isAdmin: true },
            { username: 'team', password: 'team', name: '×¦×•×•×ª ×ž×—×œ×§×”', role: '××™×© ×¦×•×•×ª', team: 'surgical', isAdmin: false }
        ];
        localStorage.setItem('clinic_users', JSON.stringify(usersDb));
    }
}
initUsersDb();

// Mock Data Load (using forms.js to bypass CORS on file://)
function loadForms() {
    return new Promise((resolve) => {
        const storedSchema = localStorage.getItem('clinic_forms_schema');
        if (storedSchema) {
            formsSchema = JSON.parse(storedSchema);
        } else if (typeof formsSchemaData !== 'undefined') {
            formsSchema = formsSchemaData;
        } else {
            console.error("Failed to load formsSchemaData. Using fallback mock.");
            formsSchema = {
                forms: [
                    { id: "form_1", title: "×‘×§×¨×ª ×‘×˜×™×—×•×ª ×”×ž×˜×•×¤×œ - ×—×“×¨ × ×™×ª×•×—", instructions: "×™×© ×œ×ž×œ× ×˜×•×¤×¡ ×–×” ××—×ª ×œ×—×•×“×©.", team: "surgical", fields: [{ id: "q1", type: "select", label: "×”×× ×‘×•×¦×¢ ×—×™×˜×•×™ ×™×“×™×™× ×¢×œ ×¤×™ ×”× ×•×”×œ?", options: ["×›×Ÿ", "×œ×"], is_critical: true }] }
                ]
            };
        }
        resolve();
    });
}

// User Authentication
function toggleAuthView(view) {
    if (view === 'register') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('login-box').style.display = 'block';
        document.getElementById('register-box').style.display = 'none';
    }
}

function register() {
    const user = document.getElementById('reg-username').value;
    const name = document.getElementById('reg-fullname').value;
    const pass = document.getElementById('reg-pass').value;
    const roleType = document.getElementById('reg-role').value;

    if (!user || !name || !pass) {
        showToast('× × ×œ×ž×œ× ××ª ×›×œ ×”×©×“×•×ª', 'warning');
        return;
    }

    if (usersDb.find(u => u.username === user)) {
        showToast('×©× ×ž×©×ª×ž×© ×›×‘×¨ ×§×™×™× ×‘×ž×¢×¨×›×ª', 'danger');
        return;
    }

    let roleName = '××™×© ×¦×•×•×ª';
    if (roleType === 'admin') roleName = '×ž× ×”×œ ××™×›×•×ª ×¨××©×™';
    else if (roleType === 'charge_nurse') roleName = '××—×•×ª ××—×¨××™×ª';
    else if (roleType === 'management') roleName = '×”× ×”×œ×”';

    const newUser = {
        username: user,
        password: pass,
        name: name,
        role: roleName,
        team: roleType === 'admin' || roleType === 'management' ? 'all' : 'internal', // Defaulting to internal for demo
        isAdmin: roleType === 'admin'
    };

    usersDb.push(newUser);
    localStorage.setItem('clinic_users', JSON.stringify(usersDb));

    showToast('× ×¨×©×ž×ª ×‘×”×¦×œ×—×”! ×›×¢×ª × ×™×ª×Ÿ ×œ×”×ª×—×‘×¨', 'success');
    toggleAuthView('login');
}

function login() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    const matchedUser = usersDb.find(u => u.username === user && u.password === pass);

    if (matchedUser) {
        currentUser = matchedUser;
    } else {
        showToast('×©× ×ž×©×ª×ž×© ××• ×¡×™×¡×ž×” ×©×’×•×™×™×', 'warning');
        return;
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    
    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('user-role').innerText = currentUser.role;

    if (!currentUser.isAdmin) {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    } else {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
    }

    if (currentUser.isAdmin || currentUser.role === '××—×•×ª ××—×¨××™×ª' || currentUser.role === '×”× ×”×œ×”' || currentUser.username === '×”× ×”×œ×”' || currentUser.username === '××—×•×ª ××—×¨××™×ª') {
        document.querySelectorAll('.manage-only').forEach(el => el.style.display = 'flex');
    } else {
        document.querySelectorAll('.manage-only').forEach(el => el.style.display = 'none');
    }

    loadForms().then(() => {
        navigate('dashboard');
        showToast(`×‘×¨×•×š ×”×‘×, ${currentUser.name}`, 'success');
    });
}

function logout() {
    currentUser = null;
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

// Views Templates
function renderDashboard() {
    let recentForms = filledFormsDb.slice().reverse().slice(0, 5);
    let recentFormsHtml = recentForms.length === 0 ? '<p>××™×Ÿ ×‘×§×¨×•×ª ×©×”×•×’×©×• ×¢×“×™×™×Ÿ.</p>' : 
        `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
            <tr style="border-bottom: 1px solid var(--border-color); text-align: right;">
                <th style="padding: 10px;">×˜×•×¤×¡</th><th style="padding: 10px;">×ž×—×œ×§×”</th><th style="padding: 10px;">×ª××¨×™×š</th><th style="padding: 10px;">×ž×’×™×©</th><th style="padding: 10px;">×¦×™×•×Ÿ</th>
            </tr>
            ${recentForms.map(f => {
                let color = f.score >= 80 ? 'var(--success)' : f.score >= 60 ? 'orange' : 'var(--danger)';
                let deptKey = Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department'));
                let dept = deptKey ? f.data[deptKey] : '×œ× ×¦×•×™×Ÿ';
                return `<tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 10px;">${f.formTitle}</td>
                    <td style="padding: 10px;">${dept}</td>
                    <td style="padding: 10px;">${f.dateFilled}</td>
                    <td style="padding: 10px;">${f.user}</td>
                    <td style="padding: 10px; font-weight: bold; color: ${color}">${f.score}%</td>
                </tr>`;
            }).join('')}
        </table>`;

    let html = `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">×“×©×‘×•×¨×“ ×¨××©×™ - ${currentUser.isAdmin ? '×›×œ×œ ×”×ž×—×œ×§×•×ª' : '×¦×•×•×ª ×ž×—×œ×§×”'}</h2>
            ${(function() {
                let userStats = {};
                filledFormsDb.forEach(f => {
                    let u = f.user || '×œ× ×™×“×•×¢';
                    userStats[u] = (userStats[u] || 0) + 1;
                });
                
                if (currentUser.isAdmin) {
                    return `
                    <div class="card" style="margin-bottom: 20px; border-right: 4px solid var(--primary-color);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h3 style="margin: 0;">×ž×¢×§×‘ ×‘×™×¦×•×¢×™× (×ž×‘×˜ ×ž× ×”×œ)</h3>
                            <button class="btn" style="padding: 5px 10px; font-size: 12px; background: var(--success);" onclick="exportDashboardExcel()">×”×•×¨×“ × ×ª×•× ×™× ×œ××§×¡×œ ðŸ“¥</button>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr style="border-bottom: 1px solid var(--border-color); text-align: right;">
                                <th style="padding: 10px;">×©× ×¢×•×‘×“</th>
                                <th style="padding: 10px;">×¡×”"×› ×‘×§×¨×•×ª ×©×”×•×’×©×•</th>
                            </tr>
                            ${Object.entries(userStats).sort((a,b) => b[1]-a[1]).map(([u, count]) => `
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 10px; font-weight: bold;">${u}</td>
                                    <td style="padding: 10px;">${count}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>`;
                } else {
                    let myCount = userStats[currentUser.name] || 0;
                    let unreadProcedures = proceduresDb.filter(p => {
                        let oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
                        let record = p.readBy.find(r => r.name === currentUser.name);
                        return !record || record.date < oneYearAgo;
                    }).length;
                    
                    return `
                    <div class="card" style="margin-bottom: 20px; border-right: 4px solid var(--primary-color);">
                        <h3 style="margin-bottom: 15px;">×”× ×ª×•× ×™× ×©×œ×™</h3>
                        <p>×”×’×©×ª ×¢×“ ×›×” <strong>${myCount}</strong> ×‘×§×¨×•×ª ×œ×ž×¢×¨×›×ª.</p>
                        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 15px 0;">
                        <h4 style="margin-bottom: 10px;">×ž×©×™×ž×•×ª ×œ×”×ž×©×š:</h4>
                        <ul style="margin-right: 20px; line-height: 1.6;">
                            <li>×™×¢×“ ××™×©×™: × ×“×¨×© ×œ×‘×¦×¢ ×œ×¤×—×•×ª 5 ×‘×§×¨×•×ª ×‘×—×•×“×© (× ×•×ª×¨×• ×¢×•×“ ${Math.max(0, 5 - myCount)}).</li>
                            ${unreadProcedures > 0 ? `<li style="color: var(--danger); font-weight: bold;">×™×©× × ${unreadProcedures} × ×”×œ×™ ×¢×‘×•×“×” ×©×¢×œ×™×š ×œ×§×¨×•× ×•×œ××©×¨ ×‘×ž×¢×¨×›×ª! <a href="#" onclick="navigate('procedures')" style="color: var(--primary-color);">×ž×¢×‘×¨ ×œ× ×”×œ×™×</a></li>` : `<li style="color: var(--success);">×›×œ ×”× ×”×œ×™× × ×§×¨××• ×•××•×©×¨×•. ×ª×•×§×£ ×”××™×©×•×¨ ×©×œ×š ×”×™× ×• ×œ×©× ×”.</li>`}
                        </ul>
                    </div>`;
                }
            })()}
            
            <div class="dashboard-grid">
                ${currentUser.isAdmin && introFeedbackDb.length > 0 ? `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">×ž×ž×¦××™ ×ž×©×•×‘ ×”×¤×•×¨×˜×œ</h3>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1; text-align: center; padding: 20px; background: var(--bg-color); border-radius: 8px;">
                            <h4>×ž×ž×•×¦×¢ ×©×‘×™×¢×•×ª ×¨×¦×•×Ÿ</h4>
                            <div style="font-size: 32px; color: var(--primary-color); font-weight: bold;">
                                ${(introFeedbackDb.reduce((acc, curr) => acc + curr.score, 0) / introFeedbackDb.length).toFixed(1)} / 5
                            </div>
                            <p style="font-size: 14px; color: var(--text-secondary);">×ž×ª×•×š ${introFeedbackDb.length} ×ž×©×™×‘×™×</p>
                        </div>
                    </div>
                </div>` : ''}

            <div class="dashboard-grid">
                <div class="card">
                    <h3>×¡×”"×› ×‘×§×¨×•×ª ×©×‘×•×¦×¢×•</h3>
                    <div class="stat-value">${filledFormsDb.length}</div>
                </div>
                <div class="card">
                    <h3>×ž×ž×•×¦×¢ ×¦×™×•× ×™× ×›×•×œ×œ</h3>
                    <div class="stat-value" style="color: var(--primary-color)">${
                        filledFormsDb.length > 0 ? 
                        Math.round(filledFormsDb.reduce((acc, curr) => acc + curr.score, 0) / filledFormsDb.length) + '%' 
                        : 'N/A'
                    }</div>
                </div>
            </div>
            ${(function() {
                let deptStats = {};
                filledFormsDb.forEach(f => {
                    let deptKey = Object.keys(f.data).find(k => k.toLowerCase().includes('dept') || k.toLowerCase().includes('department'));
                    let dept = deptKey ? f.data[deptKey] : '×œ× ×¦×•×™×Ÿ';
                    deptStats[dept] = (deptStats[dept] || 0) + 1;
                });
                if (Object.keys(deptStats).length === 0) return '';
                let maxCount = Math.max(...Object.values(deptStats));
                return `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">×¤×™×œ×•×— ×‘×§×¨×•×ª ×œ×¤×™ ×ž×—×œ×§×” (×’×¨×¤×™ ×•×ž×¡×¤×¨×™)</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${Object.entries(deptStats).sort((a,b) => b[1]-a[1]).map(([d, count]) => `
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>${d}</span>
                                    <span style="font-weight: bold; color: var(--primary-color);">${count} ×‘×§×¨×•×ª</span>
                                </div>
                                <div style="width: 100%; background: var(--bg-color); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color); height: 12px;">
                                    <div style="height: 100%; background: var(--primary-color); width: ${(count/maxCount)*100}%; border-radius: 4px; transition: width 1s ease-in-out;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            })()}
            ${(function() {
                if (!currentUser.isAdmin) return '';
                if (trainingsAnswersDb.length === 0) {
                    return `
                    <div class="card" style="margin-top: 20px;">
                        <h3 style="margin-bottom: 15px;">×¤×™×œ×•×— ×‘×™×¦×•×¢ ×œ×•×ž×“×•×ª ×œ×¤×™ ×ž×—×œ×§×”</h3>
                        <p style="color: var(--text-secondary);">×˜×¨× ×‘×•×¦×¢×• ×œ×•×ž×“×•×ª ×‘×ž×¢×¨×›×ª.</p>
                    </div>`;
                }
                let trainingStats = {};
                trainingsAnswersDb.forEach(ans => {
                    let userObj = usersDb.find(u => u.name === ans.user);
                    let dept = userObj && userObj.team !== 'all' ? userObj.team : '×œ× ×™×“×•×¢';
                    trainingStats[dept] = (trainingStats[dept] || 0) + 1;
                });
                if (Object.keys(trainingStats).length === 0) return '';
                let maxCount = Math.max(...Object.values(trainingStats));
                return `
                <div class="card" style="margin-top: 20px;">
                    <h3 style="margin-bottom: 15px;">×¤×™×œ×•×— ×‘×™×¦×•×¢ ×œ×•×ž×“×•×ª ×œ×¤×™ ×ž×—×œ×§×”</h3>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${Object.entries(trainingStats).sort((a,b) => b[1]-a[1]).map(([d, count]) => `
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                                    <span>${d}</span>
                                    <span style="font-weight: bold; color: var(--success);">${count} ×‘×™×¦×•×¢×™×</span>
                                </div>
                                <div style="width: 100%; background: var(--bg-color); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-color); height: 12px;">
                                    <div style="height: 100%; background: var(--success); width: ${(count/maxCount)*100}%; border-radius: 4px; transition: width 1s ease-in-out;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            })()}
            <div class="card" style="margin-top: 20px; overflow-x: auto;">
                <h3 style="margin-bottom: 10px;">×‘×§×¨×•×ª ××—×¨×•× ×•×ª ×©×‘×•×¦×¢×•</h3>
                ${recentFormsHtml}
            </div>
        </div>
    `;
    return html;
}

function renderForms() {
    let availableForms = formsSchema.forms;

    let html = `
        <div class="fade-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>×›×œ×™ ×‘×§×¨×” ×•×˜×¤×¡×™×</h2>
            </div>
            <div class="forms-list">
                ${availableForms.map(form => `
                    <div class="form-card">
                        <h4>${form.title}</h4>
                        <div class="form-meta">×ª×“×™×¨×•×ª × ×“×¨×©×ª: ××—×ª ×œ-${form.frequency_days} ×™×ž×™×</div>
                        <button class="btn" onclick="openForm('${form.id}')" style="margin-top:auto;">×ž×œ× ×˜×•×¤×¡</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return html;
}

function openForm(id) {
    const form = formsSchema.forms.find(f => f.id === id);
    const contentArea = document.getElementById('content-area');
    
    let fieldsHtml = form.fields.map(field => {
        if (field.type === 'select') {
            let optionsHtml = '';
            if (field.label.includes('×ž×—×œ×§×”') || field.label.includes('×ž×—×œ×§×ª')) {
                optionsHtml = departmentsDb.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            } else {
                optionsHtml = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            }
            return `
                <div class="form-group">
                    <label>${field.label} ${field.is_critical ? '<span style="color:red">*</span>' : ''}</label>
                    <select name="${field.id}" ${field.is_critical ? 'required' : ''}>
                        <option value="">×‘×—×¨...</option>
                        ${optionsHtml}
                    </select>
                </div>
            `;
        } else if (field.type === 'date') {
            return `
                <div class="form-group">
                    <label>${field.label} ${field.is_critical ? '<span style="color:red">*</span>' : ''}</label>
                    <input type="date" name="${field.id}" ${field.is_critical ? 'required' : ''} style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; font-family: inherit; font-size: 14px; background: var(--bg-color); color: var(--text-primary);">
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <label>${field.label}</label>
                    <textarea name="${field.id}" rows="3"></textarea>
                </div>
            `;
        }
    }).join('');

    contentArea.innerHTML = `
        <div class="fade-in">
            <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); margin-bottom: 20px;" onclick="navigate('forms')">×—×–×•×¨ ×œ×¨×©×™×ž×”</button>
            <div class="card">
                <h2 style="margin-bottom: 10px;">${form.title}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">${form.instructions}</p>
                <form onsubmit="submitForm(event, '${form.id}')">
                    ${fieldsHtml}
                    <button type="submit" class="btn">×©×ž×•×¨ ×•×”×’×© ×“×•×—</button>
                </form>
            </div>
        </div>
    `;
}

function submitForm(e, formId) {
    e.preventDefault();
    const form = formsSchema.forms.find(f => f.id === formId);
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    
    // Calculate Score
    let totalScoreable = 0;
    let earned = 0;
    
    for (let key in formObj) {
        let val = formObj[key];
        if (val === '×œ× ×¨×œ×•×•× ×˜×™') continue;
        
        let fieldSchema = form.fields.find(f => f.id === key);
        if (fieldSchema && fieldSchema.type === 'select') {
            totalScoreable++;
            if (val === '×›×Ÿ' || val === '×ª×•×× ×œ×—×œ×•×˜×™×Ÿ') {
                earned++;
            } else if (val === '×—×œ×§×™' || val === '×ª×•×× ×—×œ×§×™×ª') {
                earned += 0.5;
            }
        }
    }
    
    let finalScore = totalScoreable > 0 ? Math.round((earned / totalScoreable) * 100) : 100;
    let today = new Date().toISOString().split('T')[0];
    let submitDate = formObj.w_date || formObj.date_field || today;
    
    filledFormsDb.push({
        id: Date.now(),
        formId: formId,
        formTitle: form.title,
        dateFilled: submitDate,
        score: finalScore,
        user: currentUser.name,
        data: formObj
    });
    
    localStorage.setItem('clinic_filled_forms', JSON.stringify(filledFormsDb));
    
    showToast('×”×˜×•×¤×¡ ×”×•×’×© ×‘×”×¦×œ×—×” ×¢× ×¦×™×•×Ÿ ' + finalScore + '%', 'success');
    navigate('dashboard');
}

function navigate(viewName) {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`nav-${viewName}`)) {
        document.getElementById(`nav-${viewName}`).classList.add('active');
    }
    
    const contentArea = document.getElementById('content-area');
    if (viewName === 'intro') contentArea.innerHTML = renderIntro();
    else if (viewName === 'tip') contentArea.innerHTML = renderTip();
    else if (viewName === 'dashboard') contentArea.innerHTML = renderDashboard();
    else if (viewName === 'forms') contentArea.innerHTML = renderForms();
    else if (viewName === 'trainings') contentArea.innerHTML = renderTrainings();
    else if (viewName === 'procedures') contentArea.innerHTML = renderProcedures();
    else if (viewName === 'protocols') contentArea.innerHTML = renderProtocols();
    else if (viewName === 'agent') contentArea.innerHTML = renderAgent();
    else if (viewName === 'settings') contentArea.innerHTML = renderSettings();
    else contentArea.innerHTML = `<h2>${viewName}</h2>`;
}

function renderTip() {
    // Local database of weekly tips (acts as our local agent database)
    const localAgentDatabase = [
        {
            "protocols": "×¤×•×¨×¡×ž×• ×“×’×©×™× ×—×“×©×™× ×œ×ž× ×™×¢×ª ×¤×¦×¢×™ ×œ×—×¥. ×™×© ×œ×‘×¦×¢ ××•×ž×“×Ÿ ×ž×§×™×£ (×›×’×•×Ÿ ×¡×•×œ× × ×•×¨×˜×•×Ÿ) ×ª×•×š 24 ×©×¢×•×ª ×ž×ž×•×¢×“ ×”×§×‘×œ×”.",
            "trivia": "×ž×”×™ ×”×©×¢×” ×‘×™×•× ×‘×” ×ž×ª×¨×—×©×•×ª ×¨×•×‘ ×”× ×¤×™×œ×•×ª ×‘×ž×—×œ×§×•×ª ×’×¨×™××˜×¨×™×•×ª?\n×ª×©×•×‘×”: ×œ×¨×•×‘ ×‘×©×¢×•×ª ×”×‘×•×§×¨ ×”×ž×•×§×“×ž×•×ª, ×›××©×¨ ×ž×˜×•×¤×œ×™× ×§×ž×™× ×œ×©×™×¨×•×ª×™× ×œ××—×¨ ×©× ×ª ×”×œ×™×œ×”.",
            "tip": "×”×©×ª×ž×©×• ×‘×ª××•×¨×ª ×œ×™×œ×” ×‘×ž×¡×œ×•×œ ×”×”×œ×™×›×” ×œ×©×™×¨×•×ª×™× - ×–×”×• ××ž×¦×¢×™ ×¤×©×•×˜ ×”×ž×¤×—×™×ª ×ž×©×ž×¢×•×ª×™×ª ×¡×™×›×•×Ÿ ×œ× ×¤×™×œ×•×ª.",
            "research": "×ž××ž×¨ ×‘-JAGS ×”×“×’×™× ×›×™ ×©×™×ž×•×© ×§×‘×•×¢ ×‘×›×œ×‘×™ ×˜×™×¤×•×œ ×ž×¡×™×™×¢ ×‘×”×¤×—×ª×ª ×ª×¡×ž×™× ×™ ×“×™×›××•×Ÿ ×‘×§×¨×‘ ×“×™×™×¨×™ ×“×™×•×¨ ×ž×•×’×Ÿ ×‘×©×™×¢×•×¨ ×©×œ 15%."
        },
        {
            "protocols": "×¢×•×“×›× ×• ×”× ×—×™×•×ª ×”×˜×™×¤×•×œ ×‘×—×•×œ×” × ×•×˜×” ×œ×ž×•×ª: ×™×© ×œ×”×§×¤×™×“ ×¢×œ ×ª×™×¢×•×“ ×¨×¦×•×Ÿ ×”×ž×˜×•×¤×œ ×•×ž×©×¤×—×ª×• ×‘×’×™×œ×™×•×Ÿ ×”×¡×™×¢×•×“×™ ×‘××•×¤×Ÿ ×¡×“×™×¨ ×•×©×§×•×£.",
            "trivia": "××™×–×” ×•×™×˜×ž×™×Ÿ × ×—×©×‘ ×œ×§×¨×™×˜×™ ×‘×ž×™×•×—×“ ×‘×©×ž×™×¨×” ×¢×œ ×ž×¡×ª ×©×¨×™×¨ ×•×ž× ×™×¢×ª ×¡×¨×§×•×¤× ×™×” ×‘×’×™×œ ×”×ž×‘×•×’×¨?\n×ª×©×•×‘×”: ×•×™×˜×ž×™×Ÿ D, ×‘×©×™×œ×•×‘ ×¦×¨×™×›×ª ×—×œ×‘×•×Ÿ × ××•×ª×”.",
            "tip": "×•×•×“××• ×–×™×”×•×™ ×›×¤×•×œ ×©×œ ×ž×˜×•×¤×œ ×œ×¤× ×™ ×ž×ª×Ÿ ×ª×¨×•×¤×” - ×œ× ×ž×¡×¤×™×§ ×œ×©××•×œ ×œ×©×ž×•, ×™×© ×œ×‘×“×•×§ ××ª ×”×¦×ž×™×“ ×•×”×ª××ž×ª×• ×œ×’×™×œ×™×•×Ÿ.",
            "research": "×ž×—×§×¨ ×—×“×© ×ž×¦× ×©×©×™×œ×•×‘ ×©×œ ××™×ž×•×Ÿ ×”×ª× ×’×“×•×ª ×¢× ×ª×•×¡×¤×ª ×—×œ×‘×•×Ÿ ×ž×©×¤×¨ ×ž×©×ž×¢×•×ª×™×ª ××ª ×”×ž×“×“×™× ×”×¤×™×–×™×™× ×‘×—×•×œ×™ ×©×‘×¨×™×¨×™×•×ª (Frailty)."
        },
        {
            "protocols": "×”× ×—×™×•×ª ×ª×–×•× ×” ×—×“×©×•×ª: ×™×© ×œ×”×§×¤×™×“ ×¢×œ ×ž×ª×Ÿ ×ª×•×¡×¤×™ ×ª×–×•× ×” ×¢×©×™×¨×™ ×—×œ×‘×•×Ÿ ×ª×•×š 48 ×©×¢×•×ª ×ž×§×‘×œ×” ×œ×ž×˜×•×¤×œ×™× ×‘×¡×™×›×•×Ÿ ×ª×–×•× ×ª×™.",
            "trivia": "×ž×”×• ×”×’×™×œ ×”×ž×ž×•×¦×¢ ×©×œ ×ª×—×™×œ×ª ×”×•×¤×¢×ª ×¡×¨×§×•×¤× ×™×” (×“×œ×“×•×œ ×©×¨×™×¨) ×‘××•×›×œ×•×¡×™×™×”?\n×ª×©×•×‘×”: ×”×ª×”×œ×™×š ×ž×ª×—×™×œ ×›×‘×¨ ×¡×‘×™×‘ ×’×™×œ 40-50 ×•×ž×•××¥ ×œ××—×¨ ×’×™×œ 65.",
            "tip": "×‘×‘×™×¦×•×¢ ×”×“×¨×›×” ×œ×ž×˜×•×¤×œ, ×‘×§×©×• ×ž×ž× ×• ×œ×—×–×•×¨ ×¢×œ ×”×”×¡×‘×¨ (Teach-Back) ×›×“×™ ×œ×•×•×“× ×”×‘× ×” ×ž×œ××” ×©×œ ×”×”× ×—×™×•×ª.",
            "research": "×¡×§×™×¨×ª ×§×•×§×¨×Ÿ ×¢×“×›× ×™×ª ×ž×ž×œ×™×¦×” ×¢×œ ×‘×™×¦×•×¢ ×”×¢×¨×›×” ×’×¨×™××˜×¨×™×ª ×›×•×œ×œ× ×™×ª (CGA) ×œ×›×œ ×ž×˜×•×¤×œ ×ž×¢×œ ×’×™×œ 65 ×”×ž××•×©×¤×– ×‘××©×¤×•×– ×—×¨×™×£."
        }
    ];

    // Simulate an agent processing local data based on the current week
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeek = Math.floor(diff / (oneDay * 7));
    
    // Select a tip cyclically based on the current week number
    const selectedData = localAgentDatabase[currentWeek % localAgentDatabase.length];
    
    // Format today's date in Hebrew
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('he-IL', options);

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">âœ¨ ×˜×™×¤ ×”×©×‘×•×¢ ×ž×”×¡×•×›×Ÿ ×”×ž×§×•×ž×™</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">×ª×•×›×Ÿ ×–×” × ×‘×—×¨ ××—×ª ×œ×©×‘×•×¢ ×‘××•×¤×Ÿ ××•×˜×•×ž×˜×™ ×ž×ª×•×š ×ž××’×¨ ×”× ×ª×•× ×™× ×”×ž×§×•×ž×™ ×©×œ ×”×ž×¢×¨×›×ª (×œ×œ× ×¦×•×¨×š ×‘×—×™×‘×•×¨ ×—×™×¦×•× ×™).</p>
            <div id="tip-container">
                <div class="card" style="margin-bottom: 20px; border-left: 4px solid var(--primary-color);">
                    <h3 style="color: var(--primary-color);">ðŸ“… ×¢×“×›×•×Ÿ ××—×¨×•×Ÿ: ${dateStr}</h3>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #10b981;">
                    <h3>ðŸ“‹ × ×”×œ×™ ×ž×©×¨×“ ×”×‘×¨×™××•×ª</h3>
                    <p style="white-space: pre-wrap;">${selectedData.protocols}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #f59e0b;">
                    <h3>ðŸŽ¯ ×©××œ×ª ×˜×¨×™×•×•×™×”</h3>
                    <p style="white-space: pre-wrap;">${selectedData.trivia}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #3b82f6;">
                    <h3>ðŸ’¡ ×˜×™×¤ ×©×‘×•×¢×™ (×‘×˜×™×—×•×ª ×”×˜×™×¤×•×œ)</h3>
                    <p style="white-space: pre-wrap;">${selectedData.tip}</p>
                </div>
                <div class="card" style="margin-bottom: 20px; border-right: 4px solid #8b5cf6;">
                    <h3>ðŸ“š ×ž××ž×¨ ×ž×—×§×¨×™ ×—×“×©</h3>
                    <p style="white-space: pre-wrap;">${selectedData.research}</p>
                </div>
            </div>
        </div>
    `;
}


function renderTrainings() {

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">×œ×•×ž×“×•×ª ×œ×§×œ×™×˜×ª ×¢×•×‘×“ ×—×“×©</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">×ž××’×¨ ×”×œ×•×ž×“×•×ª ×•×”×”×“×¨×›×•×ª ×”×§×œ×™× ×™×•×ª ×¢×‘×•×¨ ×× ×©×™ ×¦×•×•×ª ×•×§×œ×™×˜×ª ×¢×•×‘×“×™×.</p>
            ${currentUser.isAdmin ? '<div style="margin-bottom: 20px;"><button class="btn" onclick="exportTrainingsExcel()" style="background: var(--success);">×™×™×¦× ×“×•×— ×‘×™×¦×•×¢ ×”×“×¨×›×•×ª ×œ××§×¡×œ ðŸ“¥</button></div>' : ''}
            
            <div class="forms-list">
                ${trainingsDb.map(t => `
                    <div class="form-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 150px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">${t.icon}</div>
                        <h4 style="margin-bottom: 15px;">${t.title}</h4>
                        <button class="btn" onclick="openTraining('${t.url}', '${t.title}', ${t.external ? 'true' : 'false'})" style="margin-top:auto;">×¤×ª×— ×œ×•×ž×“×”</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openTraining(url, title, isExternal = false) {
    // Intercept based on title to guarantee native quiz routing
    if (title.includes('×˜×™×¤×•×œ ×ª×•×ž×š') || (url && url.includes('1FAIpQLSdfndGfTLOLGo_yU8ZBlJeOt6MrTTA39LE-OyeBKmI3_2FJ6Q'))) {
        url = 'native_supportive_care';
        isExternal = false;
    } else if (title.includes('×ž× ×™×¢×ª ×–×™×”×•×ž×™×') || (url && url.includes('1FAIpQLSebxYF_VF5fhT32MHFWrXPOS2d2nAdU2QxwFcU851Y9Zgb7_A'))) {
        url = 'native_infections';
        isExternal = false;
    }

    if (!url.startsWith('internal_quiz') && !url.startsWith('native_')) {
        trainingsAnswersDb.push({
            title: title,
            user: currentUser.name,
            date: new Date().toLocaleString('he-IL')
        });
        localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
        showToast('×”×œ×•×ž×“×” ×¡×•×ž× ×” ×›×”×•×©×œ×ž×” ×•× ×¨×©×ž×” ×‘×ž×¢×¨×›×ª.', 'info');
    }

    if (isExternal) {
        window.open(url, '_blank');
        return;
    }

    const contentArea = document.getElementById('content-area');
    
    if (url.startsWith('native_')) {
        let quizId = url.replace('native_', '');
        if (window.renderNativeQuiz) {
            window.closeTraining = function() {
                navigate('trainings');
            };
            contentArea.innerHTML = `
                <div class="fade-in">
                    <div style="text-align: center; margin-bottom: 20px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <h3 style="margin-bottom: 15px;">×‘×—×¨ ×©×¤×” / Choose Language / Ø§Ø®ØªØ± Ø§Ù„Ù„ØºØ© / Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÐ·Ñ‹Ðº</h3>
                        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'he', 'quizContainer')" style="min-width: 100px;">×¢×‘×¨×™×ª</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'en', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">English</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'ar', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©</button>
                            <button class="btn" onclick="window.renderNativeQuiz('${quizId}', 'ru', 'quizContainer')" style="min-width: 100px; font-family: sans-serif;">Ð ÑƒÑÑÐºÐ¸Ð¹</button>
                        </div>
                    </div>
                    <div id="quizContainer"></div>
                </div>
            `;
            // Default load hebrew
            window.renderNativeQuiz(quizId, 'he', 'quizContainer');
        } else {
            contentArea.innerHTML = '<div class="card">×©×’×™××” ×‘×˜×¢×™× ×ª ×œ×•×ž×“×” (quizzes.js ×œ× × ×˜×¢×Ÿ)</div>';
        }
        return;
    }

    if (url.startsWith('internal_quiz')) {
        contentArea.innerHTML = `
            <div class="fade-in">
                <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); margin-bottom: 20px;" onclick="navigate('trainings')">×—×–×•×¨ ×œ×¨×©×™×ž×ª ×”×œ×•×ž×“×•×ª</button>
                <div class="card">
                    <h2 style="margin-bottom: 20px;">${title} (×ž×‘×“×§ ×¤× ×™×ž×™)</h2>
                    <form onsubmit="submitInternalQuiz(event, '${title}')">
                        <div class="form-group">
                            <label>×× × ××©×¨ ×©×§×¨××ª ×•×”×‘× ×ª ××ª ×—×•×ž×¨×™ ×”×”×“×¨×›×” ×‘× ×•×©× ×–×”.</label>
                            <select required><option value="">×‘×—×¨...</option><option value="yes">×ž××©×¨</option></select>
                        </div>
                        <button type="submit" class="btn">×¡×™×•× ×•×©×œ×™×—×”</button>
                    </form>
                </div>
            </div>
        `;
        return;
    }
    
    contentArea.innerHTML = `
        <div class="fade-in" style="height: 100%; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">${title}</h2>
                <button class="btn" style="background-color: transparent; color: var(--primary-color); border: 1px solid var(--primary-color);" onclick="navigate('trainings')">×—×–×•×¨ ×œ×¨×©×™×ž×ª ×”×œ×•×ž×“×•×ª</button>
            </div>
            <div style="flex: 1; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: #fff;">
                <iframe src="${url}" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" style="min-height: 800px;">×˜×•×¢×Ÿâ€¦</iframe>
            </div>
        </div>
    `;
}

function renderProcedures() {
    let adminNewBtn = currentUser.isAdmin ? '<button class="btn" onclick="document.getElementById(\'new-procedure-box\').style.display=\'block\'">+ ×”×•×¡×£ × ×•×”×œ ×—×“×©</button>' : '';
    let adminNewBox = currentUser.isAdmin ? 
    '<div id="new-procedure-box" class="card" style="display: none; margin-bottom: 20px; background: var(--bg-color); border: 2px dashed var(--primary-color);">' +
    '<h3 style="margin-bottom: 15px;">× ×•×”×œ ×—×“×©</h3>' +
    '<div class="form-group"><label>×›×•×ª×¨×ª ×”× ×•×”×œ</label><input type="text" id="proc-title" placeholder="×œ×ž×©×œ: × ×•×”×œ ×˜×™×¤×•×œ ×‘×ª×¨×•×¤×•×ª ×ž×¡×•×›× ×•×ª"></div>' +
    '<div class="form-group"><label>×§×™×©×•×¨ (URL) ×œ×ž×¡×ž×š / ×œ×•×ž×“×”</label><input type="text" id="proc-link" placeholder="https://..."></div>' +
    '<div style="display: flex; gap: 10px;"><button class="btn" style="background: var(--success);" onclick="addProcedure()">×©×ž×•×¨ × ×•×”×œ</button><button class="btn" style="background: var(--danger);" onclick="document.getElementById(\'new-procedure-box\').style.display=\'none\'">×‘×™×˜×•×œ</button></div>' +
    '</div>' : '';

    let html = `
        <div class="fade-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">× ×”×œ×™ ×¢×‘×•×“×” ×¤× ×™×ž×™×™×</h2>
                ${adminNewBtn}
            </div>
            
            ${adminNewBox}

            <p style="color: var(--text-secondary); margin-bottom: 20px;">×¢×œ ×›×œ ××™×© ×¦×•×•×ª ×œ×§×¨×•× ×•×œ××©×¨ ××ª × ×”×œ×™ ×”×¢×‘×•×“×” ××—×ª ×œ×©× ×” ×œ×¤×—×•×ª.</p>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="proc-search" placeholder="×—×™×¤×•×© × ×•×”×œ..." style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;" oninput="filterProcedures()">
                ${currentUser.isAdmin ? '<button class="btn" onclick="exportProceduresExcel()" style="background: var(--success);">×™×™×¦× ×“×•×— ×§×¨×™××” ×œ××§×¡×œ ðŸ“¥</button>' : ''}
            </div>

            <div class="forms-list">
                ${proceduresDb.map(p => {
                    let oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
                    let userReadRecord = p.readBy.find(r => r.name === currentUser.name);
                    let hasReadRecently = userReadRecord && userReadRecord.date > oneYearAgo;
                    
                    let linkHtml = p.link.startsWith('http') ? 
                        '<a href="' + p.link + '" target="_blank" style="color: var(--primary-color); display: inline-block; margin-bottom: 15px;">×¦×¤×” ×‘×ž×¡×ž×š / ×‘× ×•×”×œ ×”×ž×œ× â†—</a>' : 
                        '<p style="margin-bottom: 15px;">' + p.link + '</p>';

                    let readHtml = hasReadRecently ? 
                        '<span style="color: var(--success); font-weight: bold;">âœ… ×§×¨××ª×™ ×•××™×©×¨×ª×™ (×‘×ª×•×§×£ ×œ×©× ×”)</span>' : 
                        '<button class="btn" style="background: var(--danger);" onclick="confirmProcedureRead(' + p.id + ')">××©×¨ ×§×¨×™××ª × ×•×”×œ</button>';

                    let adminHtml = currentUser.isAdmin ? 
                        '<div style="font-size: 13px; color: var(--text-secondary); text-align: left;"><strong>×§×¨××• ×•××™×©×¨×• ×œ××—×¨×•× ×”:</strong><br>' +
                        (p.readBy.filter(r => r.date > oneYearAgo).length === 0 ? '××£ ××—×“' : p.readBy.filter(r => r.date > oneYearAgo).map(r => r.name).join(', ')) +
                        '</div>' : '';

                    return `
                    <div class="card procedure-item" style="margin-bottom: 15px; border-right: 4px solid ${hasReadRecently ? 'var(--success)' : 'var(--danger)'};">
                        <h3 style="margin-bottom: 10px;">${p.title}</h3>
                        ${linkHtml}
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 15px;">
                            ${readHtml}
                            ${adminHtml}
                        </div>
                    </div>`;
                }).join('')}
                ${proceduresDb.length === 0 ? '<p>×œ× ×”×•×’×“×¨×• × ×”×œ×™× ×‘×ž×¢×¨×›×ª.</p>' : ''}
            </div>
        </div>
    `;
    return html;
}

function addProcedure() {
    const title = document.getElementById('proc-title').value;
    const link = document.getElementById('proc-link').value;
    if (title && link) {
        proceduresDb.push({
            id: Date.now(),
            title: title,
            link: link,
            readBy: []
        });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('× ×•×”×œ × ×•×¡×£ ×‘×”×¦×œ×—×”', 'success');
        navigate('procedures');
    }
}

function confirmProcedureRead(id) {
    const proc = proceduresDb.find(p => p.id === id);
    if (proc) {
        proc.readBy = proc.readBy.filter(r => r.name !== currentUser.name);
        proc.readBy.push({ name: currentUser.name, date: Date.now() });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('××™×©×•×¨ ×”×§×¨×™××” × ×¨×©× ×‘×”×¦×œ×—×”', 'success');
        navigate('procedures');
    }
}

function parseHeILDate(dateStr) {
    if (!dateStr) return 0;
    let parts = dateStr.split(',')[0].split('.');
    if(parts.length === 3) {
        return new Date(parts[2], parts[1]-1, parts[0]).getTime();
    }
    return Date.now(); // Fallback
}

function isOverdue(lastTimestamp, freq) {
    if (!lastTimestamp) return true; // Never done
    if (freq === 'once') return false; // Done at least once
    let now = Date.now();
    if (freq === 'half-yearly') return (now - lastTimestamp) > (182 * 24 * 60 * 60 * 1000);
    return (now - lastTimestamp) > (365 * 24 * 60 * 60 * 1000); // Default yearly
}

function renderAgent() {
    let overdueProcedures = [];
    let overdueTrainings = [];
    let staff = usersDb.filter(u => !u.isAdmin);
    
    staff.forEach(user => {
        proceduresDb.forEach(proc => {
            let freq = proc.frequency || 'yearly';
            let record = proc.readBy.find(r => r.name === user.name);
            let ts = record ? record.date : 0;
            if (isOverdue(ts, freq)) {
                overdueProcedures.push({ user: user.name, team: user.team, task: proc.title, freq: freq });
            }
        });
        
        trainingsDb.forEach(train => {
            let freq = train.frequency || 'yearly';
            let records = trainingsAnswersDb.filter(a => a.user === user.name && a.title === train.title);
            let ts = 0;
            if (records.length > 0) {
                records.sort((a,b) => parseHeILDate(b.date) - parseHeILDate(a.date));
                ts = parseHeILDate(records[0].date);
            }
            if (isOverdue(ts, freq)) {
                overdueTrainings.push({ user: user.name, team: user.team, task: train.title, freq: freq });
            }
        });
    });

    let translateFreq = (f) => {
        if(f==='once') return '×—×“ ×¤×¢×ž×™';
        if(f==='half-yearly') return '×—×¦×™-×©× ×ª×™×ª';
        return '×©× ×ª×™×ª';
    };

    let renderTable = (list, type) => {
        if(list.length === 0) return `<div class="card" style="border-right: 4px solid var(--success);"><p style="color:var(--success); font-weight: bold; margin: 0;">âœ… ××™×Ÿ ×—×¨×™×’×•×ª! ×›×œ ×× ×©×™ ×”×¦×•×•×ª ×¢×ž×“×• ×‘×™×¢×“×™×.</p></div>`;
        return `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color); text-align: right;">
                <th style="padding: 12px;">×©× ×¢×•×‘×“</th>
                <th style="padding: 12px;">×ž×—×œ×§×”</th>
                <th style="padding: 12px;">×ž×©×™×ž×” ×—×¡×¨×”</th>
                <th style="padding: 12px;">×ª×“×™×¨×•×ª × ×“×¨×©×ª</th>
                <th style="padding: 12px; text-align: left;">×¤×¢×•×œ×”</th>
            </tr>
            ${list.map(item => `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold;">${item.user}</td>
                <td style="padding: 12px;">${item.team}</td>
                <td style="padding: 12px;">${item.task}</td>
                <td style="padding: 12px;">${translateFreq(item.freq)}</td>
                <td style="padding: 12px; text-align: left;">
                    <button class="btn" style="padding: 5px 10px; font-size: 12px; background: var(--primary-color);" onclick="sendReminder('${item.user}', '${item.task}')">×©×œ×— ×ª×–×›×•×¨×ª ðŸ””</button>
                </td>
            </tr>
            `).join('')}
        </table>`;
    };

    return `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">×¡×•×›×Ÿ AI ×ž×•×¨×—×‘ (AI Agent)</h2>
            
            <div style="background: var(--bg-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 30px;">
                <h3 style="margin-bottom: 10px;">ðŸ§  ×¡×•×›×Ÿ ×ž×—×§×¨ ×•×¢×“×›×•×Ÿ × ×”×œ×™×</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">×”×¡×•×›×Ÿ ×¡×•×¨×§ ××•×˜×•×ž×˜×™×ª ××ª ×¦×™×•× ×™ ×”×‘×§×¨×•×ª, ×ž×¦×œ×™×‘ ××•×ª× ×¢× × ×”×œ×™ ×ž×©×¨×“ ×”×‘×¨×™××•×ª ×•×ž×¤×™×§ ×”×ž×œ×¦×•×ª ×¢×“×›×•×Ÿ.</p>
                <div class="card" style="text-align: center; padding: 30px;">
                    <div style="font-size: 30px; margin-bottom: 15px;">ðŸ¤–</div>
                    <button class="btn" onclick="runAgentAnalysis()" id="btn-run-agent" style="font-size: 14px; padding: 10px 20px;">×”×¤×¢×œ ×¡×¨×™×§×” ×•× ×™×ª×•×— ×¤×¢×¨×™×</button>
                </div>
                <div id="agent-results" style="margin-top: 20px; display: none;"></div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                <h3 style="margin-bottom: 10px;">ðŸ“… ×¡×•×›×Ÿ ×ž×¢×§×‘ ×•×ª×–×›×•×¨×•×ª ××•×˜×•×ž×˜×™</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">×¡×•×¨×§ ×‘××•×¤×Ÿ ××•×˜×•×ž×˜×™ ××ª ×‘×™×¦×•×¢×™ ×”×¢×•×‘×“×™× ×ž×•×œ ×“×¨×™×©×•×ª ×”×ª×“×™×¨×•×ª ×©×œ × ×”×œ×™× ×•×œ×•×ž×“×•×ª ×•×ž×ª×¨×™×¢ ×¢×œ ×—×¨×™×’×•×ª.</p>
                
                <h4 style="margin-bottom: 15px; color: var(--danger);">âš ï¸ ×—×¨×™×’×•×ª ×‘×§×¨×™××ª × ×”×œ×™×</h4>
                ${renderTable(overdueProcedures, 'procedure')}
                
                <h4 style="margin-top: 30px; margin-bottom: 15px; color: var(--danger);">âš ï¸ ×—×¨×™×’×•×ª ×‘×‘×™×¦×•×¢ ×œ×•×ž×“×•×ª</h4>
                ${renderTable(overdueTrainings, 'training')}
            </div>
        </div>
    `;
}

function runAgentAnalysis() {
    const btn = document.getElementById('btn-run-agent');
    const results = document.getElementById('agent-results');
    
    btn.disabled = true;
    btn.innerText = '×¡×•×¨×§ ×ž××’×¨×™× ×•×ž× ×ª×— × ×ª×•× ×™×...';
    btn.style.opacity = '0.7';
    results.style.display = 'none';

    setTimeout(() => {
        btn.innerText = '×”×¡×¨×™×§×” ×”×•×©×œ×ž×”';
        results.style.display = 'block';
        
        let formAverages = {};
        filledFormsDb.forEach(f => {
            if(!formAverages[f.formId]) formAverages[f.formId] = { sum: 0, count: 0, title: f.formTitle };
            formAverages[f.formId].sum += f.score;
            formAverages[f.formId].count += 1;
        });

        let lowestForm = null;
        let lowestAvg = 100;
        
        for (const [id, data] of Object.entries(formAverages)) {
            let avg = data.sum / data.count;
            if (avg < lowestAvg) {
                lowestAvg = avg;
                lowestForm = { id, title: data.title, avg };
            }
        }

        let recommendationHtml = '';
        if (!lowestForm) {
            recommendationHtml = `
                <div class="card" style="border-right: 4px solid var(--success);">
                    <h3 style="color: var(--success); margin-bottom: 10px;">×œ× × ×ž×¦××• ×¤×¢×¨×™× ×—×¨×™×’×™×</h3>
                    <p>×œ× × ×ž×¦××• ×˜×¤×¡×™× ×¢× ×ž×ž×•×¦×¢ ×¦×™×•× ×™× × ×ž×•×š ×”×“×•×¨×©×™× ×”×ª×¢×¨×‘×•×ª ×ž×™×™×“×™×ª.</p>
                </div>
            `;
        } else {
            recommendationHtml = `
                <div class="card" style="border-right: 4px solid var(--danger); margin-bottom: 15px;">
                    <h4 style="color: var(--danger); margin-bottom: 10px;">âš ï¸ ×¤×¢×¨ ×©×–×•×”×”: ${lowestForm.title}</h4>
                    <p style="margin-bottom: 10px;">×¦×™×•×Ÿ ×ž×ž×•×¦×¢ ×‘×ž×¢×¨×›×ª: <strong>${Math.round(lowestForm.avg)}%</strong></p>
                    <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color);">
                        <strong>ðŸ“š ×¡×§×™×¨×ª ×¡×¤×¨×•×ª, × ×”×œ×™× ×•×ž××ž×¨×™× ×‘×™× ×œ××•×ž×™×™× (2020-2024):</strong><br>
                        ×¢×œ ×¤×™ ×”×¦×œ×‘×ª ×”× ×ª×•× ×™× ×¢× ×—×•×–×¨×™ ×ž×©×¨×“ ×”×‘×¨×™××•×ª ×”×ž×¢×•×“×›× ×™×, ×¤×¨×•×˜×•×§×•×œ×™× ×‘×™× ×œ××•×ž×™×™× ×©×œ ××¨×’×•×Ÿ ×”×‘×¨×™××•×ª ×”×¢×•×œ×ž×™ (WHO) ×•×ž××ž×¨×™× ×¢×“×›× ×™×™× ×ž-PubMed ×œ×ž× ×™×¢×ª ×–×™×”×•×ž×™× - ×›××©×¨ × ×¦×¤×™×ª ×™×¨×™×“×” ×‘×¦×™×•×ª ×œ× ×”×œ×™× ×‘××©×¤×•×–, ×™×© ×¦×•×¨×š ×œ× ×¨×§ ×‘×”×’×‘×¨×ª ×ª×“×™×¨×•×ª ×”×‘×§×¨×•×ª ××œ× ×’× ×‘×¨×¢× ×•×Ÿ ×ž×¢×¨×›×™ ×”×”×“×¨×›×” (×œ×•×ž×“×•×ª) ×•×”×ª××ž×ª× ×œ×ª×§×Ÿ ×”×‘×™× ×œ××•×ž×™ ×”×—×“×©.
                    </div>
                    <strong>ðŸ’¡ ×”×ž×œ×¦×ª ×”×¡×•×›×Ÿ (×¤×¢×•×œ×•×ª ×ž×•×¦×¢×•×ª):</strong>
                    <ul style="margin-top: 10px; margin-bottom: 15px; line-height: 1.6;">
                        <li>×”×’×‘×¨×ª ×ª×“×™×¨×•×ª ×”×‘×§×¨×” ×©×œ ×˜×•×¤×¡ ×–×” ×œ×›×œ <strong>14 ×™×ž×™×</strong> (×‘×ž×§×•× 30).</li>
                        <li><strong>×”×¦×œ×‘×” ×¢× ×œ×•×ž×“×•×ª:</strong> ×”×•×¡×¤×ª ×¤×¨×§ ×”×“×¨×›×” ×§×¦×¨ ×‘×œ×•×ž×“×ª ×”×§×œ×™×˜×” ×©×™×“×’×™×© ××ª ×”×¤×¨×•×˜×•×§×•×œ ×”×‘×™× ×œ××•×ž×™ ×”×ž×¢×•×“×›×Ÿ ×œ×—×™×˜×•×™ ×™×“×™×™×.</li>
                        <li>×¢×“×›×•×Ÿ ×©××œ×ª ×”×—×•×‘×” ×‘×›×œ×™ ×”×‘×§×¨×”: ×•×™×“×•× ×—×ª×™×ž×” ××œ×§×˜×¨×•× ×™×ª ×•×ž×•×“×¢×•×ª ×œ× ×”×œ×™× ×”×‘×™× ×œ××•×ž×™×™× ×‘×”×“×¨×›×ª ×”×‘×•×§×¨.</li>
                    </ul>
                    <button class="btn" style="background-color: var(--success);" onclick="applyRecommendation('${lowestForm.id}')">××©×¨ ×•×™×™×©× ×¢×“×›×•×Ÿ ×‘×›×œ×™× ×•×‘×œ×•×ž×“×•×ª</button>
                </div>
            `;
        }
        
        results.innerHTML = `<div class="fade-in">${recommendationHtml}</div>`;
    }, 2500);
}

function applyRecommendation(formId) {
    const form = formsSchema.forms.find(f => f.id === formId);
    if (form) {
        form.frequency_days = 14;
        if (!form.fields.find(f => f.id === 'ai_update_1')) {
            form.fields.push({
                id: "ai_update_1", 
                type: "select", 
                label: "×”×× ×‘×•×¦×¢ ×•×™×“×•× ×—×ª×™×ž×” ××œ×§×˜×¨×•× ×™×ª ×•×ž×•×“×¢×•×ª ×œ× ×”×œ×™× ×”×‘×™× ×œ××•×ž×™×™× (WHO)?", 
                options: ["×›×Ÿ", "×œ×"], 
                is_critical: true
            });
        }
    }
    localStorage.setItem('clinic_forms_schema', JSON.stringify(formsSchema));
    
    if (!trainingsDb.find(t => t.title === '×¢×“×›×•×Ÿ: ×ž× ×™×¢×ª ×–×™×”×•×ž×™× - ×¤×¨×•×˜×•×§×•×œ WHO')) {
        trainingsDb.push({
            id: Date.now(),
            title: '×¢×“×›×•×Ÿ: ×ž× ×™×¢×ª ×–×™×”×•×ž×™× - ×¤×¨×•×˜×•×§×•×œ WHO',
            url: 'https://www.who.int/campaigns/world-hand-hygiene-day',
            icon: 'ðŸŒ',
            external: true,
            frequency: 'once'
        });
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
    }

    showToast('×”×ž×œ×¦×•×ª ×”×¡×•×›×Ÿ ×™×•×©×ž×• ×‘×”×¦×œ×—×”. ×›×œ×™ ×”×‘×§×¨×” ×•×”×œ×•×ž×“×•×ª ×¢×•×“×›× ×• ×‘×”×ª××!', 'success');
    navigate('dashboard');
}

function sendReminder(user, task) {
    showToast(`×©×•×œ×— ×ª×–×›×•×¨×ª ×œ×¢×•×‘×“ ${user}...`, 'primary');
    setTimeout(() => {
        showToast(`âœ‰ï¸ ×ª×–×›×•×¨×ª × ×©×œ×—×” ×‘×”×¦×œ×—×” (Email/SMS) ×œ-${user} ×¢×‘×•×¨ ×”×ž×©×™×ž×”: ${task}`, 'success');
    }, 1500);
}

function renderSettings() {
    let html = `
        <div class="fade-in">
            <h2>×”×’×“×¨×•×ª ×ž×¢×¨×›×ª</h2>
            <div class="card" style="margin-top: 20px;">
                <h3>× ×™×”×•×œ ×ž×—×œ×§×•×ª</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">×›××Ÿ ×ª×•×›×œ ×œ×¢×¨×•×š ××ª ×¨×©×™×ž×ª ×”×ž×—×œ×§×•×ª ×©×™×•×¤×™×¢×• ×‘×˜×¤×¡×™ ×”×‘×§×¨×”.</p>
                
                <ul id="departments-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${departmentsDb.map((dept, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color);">
                            <span>${dept}</span>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeDepartment(${index})">×ž×—×§</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="new-dept-name" placeholder="×©× ×ž×—×œ×§×” ×—×“×©×”" style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    <button class="btn" onclick="addDepartment()">×”×•×¡×£ ×ž×—×œ×§×”</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>× ×™×”×•×œ × ×”×œ×™× ×•×”×“×¨×›×•×ª</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">×”×¢×œ××ª × ×”×œ×™× ×¤× ×™×ž×™×™× ×•××¨×’×•× ×™×™× ×œ×ž×¢×¨×›×ª ×¢×‘×•×¨ ×§×¨×™××ª ×× ×©×™ ×¦×•×•×ª.</p>
                
                <ul id="procedures-manage-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${proceduresDb.map((p, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div>
                                <strong>${p.title}</strong><br>
                                <a href="${p.link}" target="_blank" style="font-size: 12px; color: var(--primary-color);">×¦×¤×” ×‘×ž×¡×ž×š</a>
                            </div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeProcedure(${p.id})">×ž×—×§</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">×”×•×¡×¤×ª × ×•×”×œ ×—×“×©</h4>
                    <div class="form-group">
                        <label>×›×•×ª×¨×ª ×”× ×•×”×œ</label>
                        <input type="text" id="settings-proc-title" placeholder="×œ×ž×©×œ: × ×•×”×œ ×˜×™×¤×•×œ ×‘×ª×¨×•×¤×•×ª ×ž×¡×•×›× ×•×ª">
                    </div>
                    <div class="form-group">
                        <label>×§×™×©×•×¨ (URL) ×œ×ž×¡×ž×š / ×œ×•×ž×“×”</label>
                        <input type="text" id="settings-proc-link" placeholder="https://...">
                    </div>
                    <div class="form-group">
                        <label>×ª×“×™×¨×•×ª ×¨×¢× ×•×Ÿ × ×•×”×œ</label>
                        <select id="settings-proc-freq">
                            <option value="once">×—×“ ×¤×¢×ž×™ (×‘×¢×ª ×§×œ×™×˜×”/×¤×¨×¡×•×)</option>
                            <option value="half-yearly">××—×ª ×œ×—×¦×™ ×©× ×”</option>
                            <option value="yearly" selected>××—×ª ×œ×©× ×”</option>
                        </select>
                    </div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addProcedureFromSettings()">×©×ž×•×¨ × ×•×”×œ ×œ×ž×¢×¨×›×ª</button>
                </div>
            </div>
        </div>

            <div class="card" style="margin-top: 20px;">
                <h3>× ×™×”×•×œ ×˜×¤×¡×™× ×•×¤×¨×•×˜×•×§×•×œ×™× ×˜×™×¤×•×œ×™×™×</h3>
                <ul id="protocols-manage-list" style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${protocolsDb.map((p, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div><strong>${p.title}</strong></div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeProtocol(${p.id})">×ž×—×§</button>
                        </li>
                    `).join('')}
                </ul>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">×”×•×¡×¤×ª ×¤×¨×•×˜×•×§×•×œ ×—×“×©</h4>
                    <div class="form-group"><input type="text" id="settings-prot-title" placeholder="×›×•×ª×¨×ª ×”×¤×¨×•×˜×•×§×•×œ"></div>
                    <div class="form-group"><input type="text" id="settings-prot-link" placeholder="×§×™×©×•×¨"></div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addProtocolFromSettings()">×©×ž×•×¨ ×¤×¨×•×˜×•×§×•×œ</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>× ×™×”×•×œ ×ž××¨×–×™ ×”×“×¨×›×•×ª ×•×œ×•×ž×“×•×ª</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">×›××Ÿ × ×™×ª×Ÿ ×œ×”×•×¡×™×£ ×œ×•×ž×“×•×ª ×©×™×•×¦×’×• ×‘×›×¨×˜×™×¡×™×™×ª "×œ×•×ž×“×•×ª ×•×”×“×¨×›×•×ª".</p>
                
                <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
                    ${trainingsDb.map((t, index) => `
                        <li style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color); align-items: center;">
                            <div>
                                <strong>${t.icon} ${t.title}</strong>
                            </div>
                            <button class="btn" style="background-color: var(--danger); padding: 5px 10px; font-size: 12px;" onclick="removeTraining(${t.id})">×ž×—×§</button>
                        </li>
                    `).join('')}
                </ul>
                
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 2px dashed var(--primary-color);">
                    <h4 style="margin-bottom: 15px;">×”×•×¡×¤×ª ×œ×•×ž×“×” ×—×“×©×”</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <input type="text" id="settings-train-title" placeholder="×›×•×ª×¨×ª ×”×œ×•×ž×“×”" style="flex: 2; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                        <input type="text" id="settings-train-icon" placeholder="××ž×•×’'×™ ðŸ’‰" style="flex: 1; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 10px;">
                        <input type="text" id="settings-train-link" placeholder="×§×™×©×•×¨ Google Forms ××• ××ª×¨ ×—×™×¦×•× ×™" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;">
                    </div>
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <input type="checkbox" id="settings-train-external">
                        ×¤×ª×— ×›×§×™×©×•×¨ ×—×™×¦×•× ×™ (×× ×”×œ×•×ž×“×” ×œ× ×ª×•×ž×›×ª ×‘×”×˜×ž×¢×”)
                    </label>
                    <div class="form-group">
                        <label>×ª×“×™×¨×•×ª ×‘×™×¦×•×¢ ×œ×•×ž×“×”</label>
                        <select id="settings-train-freq">
                            <option value="once">×—×“ ×¤×¢×ž×™ (×‘×¢×ª ×§×œ×™×˜×”/×¤×¨×¡×•×)</option>
                            <option value="half-yearly">××—×ª ×œ×—×¦×™ ×©× ×”</option>
                            <option value="yearly" selected>××—×ª ×œ×©× ×”</option>
                        </select>
                    </div>
                    <button class="btn" style="background: var(--success); width: 100%;" onclick="addTrainingFromSettings()">×©×ž×•×¨ ×œ×•×ž×“×” ×œ×ž×¢×¨×›×ª</button>
                </div>
            </div>

        </div>
    `;
    return html;
}

function addProcedureFromSettings() {
    const title = document.getElementById('settings-proc-title').value;
    const link = document.getElementById('settings-proc-link').value;
    const freq = document.getElementById('settings-proc-freq').value;
    if (title && link) {
        proceduresDb.push({
            id: Date.now(),
            title: title,
            link: link,
            frequency: freq,
            readBy: []
        });
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('× ×•×”×œ × ×•×¡×£ ×‘×”×¦×œ×—×”', 'success');
        navigate('settings');
    } else {
        showToast('× × ×œ×ž×œ× ×›×•×ª×¨×ª ×•×§×™×©×•×¨', 'warning');
    }
}

function removeProcedure(id) {
    if (confirm('×”×× ×œ×ž×—×•×§ × ×•×”×œ ×–×” ×œ×¦×ž×™×ª×•×ª?')) {
        proceduresDb = proceduresDb.filter(p => p.id !== id);
        localStorage.setItem('clinic_procedures', JSON.stringify(proceduresDb));
        showToast('× ×•×”×œ × ×ž×—×§ ×‘×”×¦×œ×—×”', 'success');
        navigate('settings');
    }
}

function addTrainingFromSettings() {
    const title = document.getElementById('settings-train-title').value;
    const link = document.getElementById('settings-train-link').value;
    const icon = document.getElementById('settings-train-icon').value || 'ðŸ“š';
    const isExternal = document.getElementById('settings-train-external').checked;

    if (title && link) {
        trainingsDb.push({
            id: Date.now(),
            title: title,
            url: link,
            icon: icon,
            external: isExternal
        });
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
        showToast('×”×œ×•×ž×“×” × ×•×¡×¤×” ×‘×”×¦×œ×—×”', 'success');
        navigate('settings');
    } else {
        showToast('× × ×œ×ž×œ× ×›×•×ª×¨×ª ×•×§×™×©×•×¨', 'warning');
    }
}

function removeTraining(id) {
    if (confirm('×”×× ×œ×ž×—×•×§ ×œ×•×ž×“×” ×–×• ×œ×¦×ž×™×ª×•×ª?')) {
        trainingsDb = trainingsDb.filter(t => t.id !== id);
        localStorage.setItem('clinic_trainings', JSON.stringify(trainingsDb));
        showToast('×”×œ×•×ž×“×” × ×ž×—×§×” ×‘×”×¦×œ×—×”', 'success');
        navigate('settings');
    }
}

function addDepartment() {
    const input = document.getElementById('new-dept-name');
    const name = input.value.trim();
    if (name) {
        if (!departmentsDb.includes(name)) {
            departmentsDb.push(name);
            localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
            showToast('×”×ž×—×œ×§×” ×”×ª×•×•×¡×¤×” ×‘×”×¦×œ×—×”', 'success');
            navigate('settings');
        } else {
            showToast('×”×ž×—×œ×§×” ×›×‘×¨ ×§×™×™×ž×ª', 'warning');
        }
    }
}

function removeDepartment(index) {
    if (confirm('×”×× ××ª×” ×‘×˜×•×— ×©×‘×¨×¦×•× ×š ×œ×ž×—×•×§ ×ž×—×œ×§×” ×–×•?')) {
        departmentsDb.splice(index, 1);
        localStorage.setItem('clinic_departments', JSON.stringify(departmentsDb));
        showToast('×”×ž×—×œ×§×” × ×ž×—×§×”', 'success');
        navigate('settings');
    }
}

// Notifications System
function showToast(message, type = 'primary') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? 'âœ…' : type === 'warning' ? 'âš ï¸' : 'â„¹ï¸'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

function simulateNotifications() {
    showToast('×ž×“×ž×” ×©×œ×™×—×ª SMS ×œ×× ×©×™ ×”×¦×•×•×ª...', 'primary');
    setTimeout(() => {
        showToast('âœ‰ï¸ ××™×ž×™×™×œ × ×©×œ×— ×œ×ž× ×”×œ ×”×ž×—×œ×§×”!', 'success');
    }, 1500);
}

function toggleTheme() {
    const body = document.body;
    body.getAttribute('data-theme') === 'dark' ? body.removeAttribute('data-theme') : body.setAttribute('data-theme', 'dark');
}

function renderIntro() {
    let hasAnswered = introFeedbackDb.find(f => f.user === currentUser.name);
    let feedbackForm = hasAnswered ? `<div class="card" style="margin-top: 20px; background: var(--success); color: white;">×ª×•×“×” ×©×¢× ×™×ª ×¢×œ ×”×ž×©×•×‘!</div>` : `
    <div class="card" style="margin-top: 30px; border-top: 4px solid var(--primary-color);">
        <h3 style="margin-bottom: 15px;">×ž×©×•×‘ ×¢×œ ×”×¤×•×¨×˜×œ ×”××¨×’×•× ×™</h3>
        <p style="margin-bottom: 15px;">× ×©×ž×— ×œ×©×ž×•×¢ ××ª ×“×¢×ª×š ×¢×œ ×ž× ×ª ×œ×©×¤×¨ ××ª ×”×¤×•×¨×˜×œ (1 = ×›×œ×œ ×œ×, 5 = ×‘×ž×™×“×” ×¨×‘×” ×ž××•×“).</p>
        <form onsubmit="submitIntroFeedback(event)">
            <div class="form-group">
                <label>1. ×¢×“ ×›×ž×” ×”×¤×•×¨×˜×œ ×™×“×™×“×•×ª×™ ×•×§×œ ×œ×©×™×ž×•×©?</label>
                <select name="q1" required><option value="">×‘×—×¨...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>2. ×”×× ×”×¤×•×¨×˜×œ ×ž×¡×™×™×¢ ×œ×š ×‘×¢×‘×•×“×ª×š ×”×™×•×ž×™×•×ž×™×ª?</label>
                <select name="q2" required><option value="">×‘×—×¨...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>3. ×”×× ×ª×”×œ×™×š ×—×™×¤×•×© ×”× ×”×œ×™× × ×•×—?</label>
                <select name="q3" required><option value="">×‘×—×¨...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>4. ×”×× ×”×¦×’×ª ×”×œ×•×ž×“×•×ª ×•×”×”×“×¨×›×•×ª ×‘×¨×•×¨×”?</label>
                <select name="q4" required><option value="">×‘×—×¨...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <div class="form-group">
                <label>5. ×©×‘×™×¢×•×ª ×¨×¦×•×Ÿ ×›×œ×œ×™×ª ×ž×”×¤×•×¨×˜×œ:</label>
                <select name="q5" required><option value="">×‘×—×¨...</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>
            </div>
            <button type="submit" class="btn">×©×œ×— ×ž×©×•×‘</button>
        </form>
    </div>`;

    return `
        <div class="fade-in">
            <div class="card" style="border-right: 4px solid var(--primary-color); padding: 30px;">
                <h2 style="margin-bottom: 20px;">×”×“×¨×›×ª ×ž×‘×•×: ×ž×©×ž×¢×•×ª ×”×¤×•×¨×˜×œ ×”××¨×’×•× ×™</h2>
                <h3 style="margin-bottom: 20px; color: var(--primary-color);">×—×©×™×‘×•×ª ×”××ª×¨ ×œ××¨×’×•× ×™× ×‘×ž×¢×¨×›×ª ×”×‘×¨×™××•×ª ×”×’×¨×™××˜×¨×™×ª</h3>
                <p style="margin-bottom: 15px; line-height: 1.8; font-size: 16px;">
                    × ×™×”×•×œ ×¡×™×›×•× ×™× ×•×‘×§×¨×ª ××™×›×•×ª ×”× × ×“×‘×›×™× ×ž×¨×›×–×™×™× ×‘×˜×™×¤×•×œ ×‘××•×›×œ×•×¡×™×™×” ×”×’×¨×™××˜×¨×™×ª. ××•×›×œ×•×¡×™×™×” ×–×• ×ž××•×¤×™×™× ×ª ×‘×¨×’×™×©×•×ª ×’×‘×•×”×”, ×¨×™×‘×•×™ ×ž×—×œ×•×ª ×¨×§×¢ (×ž×•×œ×˜×™-×ž×•×¨×‘×™×“×™×•×ª), ×•×¤×’×™×¢×•×ª ×™×ª×¨ ×œ×–×™×”×•×ž×™× ×•×œ×˜×¢×•×™×•×ª ×‘×˜×™×¤×•×œ ×”×ª×¨×•×¤×ª×™.
                    <br><br>
                    <strong>×ž×¢×¨×›×ª "×¤×•×¨×˜×œ ××¨×’×•× ×™" ×–×• ×¤×•×ª×—×” ×‘×ž×˜×¨×” ×œ×ª×ª ×ž×¢× ×” ×”×•×œ×™×¡×˜×™ ×œ×¦×¨×›×™× ××œ×•:</strong>
                </p>
                <ul style="margin-right: 20px; margin-bottom: 25px; line-height: 1.8; font-size: 16px;">
                    <li style="margin-bottom: 10px;"><strong>×ª×™×¢×•×“ ×•×‘×§×¨×” ×‘×–×ž×Ÿ ××ž×ª:</strong> ×›×œ×™ ×‘×§×¨×ª ×”××™×›×•×ª ×”×“×™×’×™×˜×œ×™×™× ×ž××¤×©×¨×™× ×œ××ª×¨ ×›×©×œ×™× ×‘××•×¤×Ÿ ×ž×™×™×“×™ ×‘×ž×—×œ×§×•×ª ×”××©×¤×•×– ×•×œ×ª×§× ×, ×ž×‘×œ×™ ×œ×”×ž×ª×™×Ÿ ×œ×“×•×—×•×ª ×—×•×“×©×™×™×.</li>
                    <li style="margin-bottom: 10px;"><strong>×”×˜×ž×¢×ª × ×”×œ×™× ×•×ž×¢×§×‘ ×§×¨×™××”:</strong> ×ž× ×’× ×•×Ÿ × ×”×œ×™ ×”×¢×‘×•×“×” ×ž×‘×˜×™×— ×©×›×œ ××™×© ×¦×•×•×ª ×ž×•×“×¢ ×œ× ×”×œ×™× ×”×ž×¢×•×“×›× ×™× ×©×œ ×ž×©×¨×“ ×”×‘×¨×™××•×ª, ×ª×•×š ×—×™×•×‘ ×§×¨×™××” ×•×¨×™×¢× ×•×Ÿ ××—×ª ×œ×©× ×”. ×”×“×‘×¨ ×ž×§×˜×™×Ÿ ×ž×©×ž×¢×•×ª×™×ª ×—×©×™×¤×” ×ž×©×¤×˜×™×ª ×•×ž×§×¦×•×¢×™×ª ×©×œ ×”×ž×•×¡×“.</li>
                    <li style="margin-bottom: 10px;"><strong>×¨×¦×£ ×œ×ž×™×“×” ×•×”×“×¨×›×”:</strong> ×©×™×œ×•×‘ ×”×œ×•×ž×“×•×ª ×‘×ª×•×š ×¤×œ×˜×¤×•×¨×ž×” ××—×ª ×ž×¡×¤×§ ×›×œ×™ Onboarding ×—×–×§ ×œ×¢×•×‘×“×™× ×—×“×©×™×, ×•×›×Ÿ ×ž×¨×—×‘ ×¨×™×¢× ×•×Ÿ × ×’×™×© ×œ×¦×•×•×ª×™× ×”×§×™×™×ž×™×, ×›× ×“×¨×© ×‘×‘×§×¨×•×ª ×ž×©×¨×“ ×”×‘×¨×™××•×ª.</li>
                    <li style="margin-bottom: 10px;"><strong>× ×™×”×•×œ ×ž×‘×•×¡×¡ × ×ª×•× ×™× (Data-Driven):</strong> ×”×“×©×‘×•×¨×“ ×•×¡×•×›×Ÿ ×”×ž×—×§×¨ ×”×—×›× ×ž××¤×©×¨×™× ×œ×”× ×”×œ×” ×œ×–×”×•×ª ×ž×’×ž×•×ª, ×œ× ×ª×— ×”×ª×¤×œ×’×•×™×•×ª ×‘×™×Ÿ ×ž×—×œ×§×•×ª, ×•×œ×§×‘×œ ×”×—×œ×˜×•×ª ×ž×‘×•×¡×¡×•×ª × ×ª×•× ×™× ××•×‘×™×™×§×˜×™×‘×™×™×.</li>
                </ul>
                <div style="background: var(--bg-color); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); text-align: center;">
                    <h4 style="margin-bottom: 10px; color: var(--primary-color);">×¡×™×›×•×</h4>
                    <p style="font-size: 16px;">×”×¤×•×¨×˜×œ ×ž×¢×‘×™×¨ ××ª ×”×ž×•×¡×“ ×ž× ×™×”×•×œ ×ª×’×•×‘×ª×™ ×œ× ×™×”×•×œ ×¤×¨×•××§×˜×™×‘×™, ×ž×©×¤×¨ ××ª ××™×›×•×ª ×—×™×™ ×”×ž×˜×•×¤×œ ×”×§×©×™×©, ×•×ž×‘×˜×™×— ×¡×‘×™×‘×ª ×˜×™×¤×•×œ ×‘×˜×•×—×” ×•×ž×§×¦×•×¢×™×ª ×™×•×ª×¨.</p>
                </div>
            </div>
            ${feedbackForm}
        </div>
    `;
}

function submitIntroFeedback(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    let sum = parseInt(formObj.q1) + parseInt(formObj.q2) + parseInt(formObj.q3) + parseInt(formObj.q4) + parseInt(formObj.q5);
    let avg = sum / 5;
    introFeedbackDb.push({
        user: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        answers: formObj,
        score: avg
    });
    localStorage.setItem('clinic_intro_feedback', JSON.stringify(introFeedbackDb));
    showToast('×ª×•×“×”! ×”×ž×©×•×‘ ×”×ª×§×‘×œ ×‘×”×¦×œ×—×”.', 'success');
    navigate('intro');
}

function renderProtocols() {
    let html = `
        <div class="fade-in">
            <h2 style="margin-bottom: 20px;">×˜×¤×¡×™× ×•×¤×¨×•×˜×•×§×•×œ×™× ×˜×™×¤×•×œ×™×™×</h2>
            <div class="forms-list">
                ${protocolsDb.map(p => `
                    <div class="card" style="margin-bottom: 15px;">
                        <h3 style="margin-bottom: 10px;">${p.title}</h3>
                        ${p.link.startsWith('http') || p.link.match(/\.(html|png|jpg|jpeg|mp4)$/i) ? `<a href="${p.link}" target="_blank" style="color: var(--primary-color);">×¦×¤×” ×‘×ž×¡×ž×š / ×ª×ž×•× ×” / ×¡×¨×˜×•×Ÿ â†—</a>` : `<p>${p.link}</p>`}
                    </div>
                `).join('')}
                ${protocolsDb.length === 0 ? '<p>×œ× ×”×•×’×“×¨×• ×¤×¨×•×˜×•×§×•×œ×™× ×‘×ž×¢×¨×›×ª.</p>' : ''}
            </div>
        </div>
    `;
    return html;
}

function filterProcedures() {
    let q = document.getElementById('proc-search').value.toLowerCase();
    document.querySelectorAll('.procedure-item').forEach(el => {
        if (el.innerText.toLowerCase().includes(q)) el.style.display = 'block';
        else el.style.display = 'none';
    });
}

function exportProceduresExcel() {
    let csvContent = "\uFEFF×©× ×”×¢×•×‘×“,×ž×—×œ×§×”,×ª××¨×™×š ×‘×™×¦×•×¢,×©× ×”× ×•×”×œ\n";
    proceduresDb.forEach(p => {
        p.readBy.forEach(r => {
            let user = usersDb.find(u => u.name === r.name) || { team: '×œ× ×™×“×•×¢' };
            let dateStr = new Date(r.date).toLocaleDateString('he-IL');
            csvContent += `"${r.name}","${user.team}","${dateStr}","${p.title}"\n`;
        });
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "×“×•×—_×§×¨×™××ª_× ×”×œ×™×.csv");
    link.click();
}

function exportTrainingsExcel() {
    let csvContent = "\uFEFF×©× ×”×œ×•×ž×“×” / ×”×“×¨×›×”,×©× ×”×ž×‘×¦×¢,×ž×—×œ×§×”,×ª××¨×™×š ×‘×™×¦×•×¢\n";
    trainingsAnswersDb.forEach(ans => {
        let user = usersDb.find(u => u.name === ans.user) || { team: '×œ× ×™×“×•×¢' };
        csvContent += `"${ans.title}","${ans.user}","${user.team}","${ans.date}"\n`;
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "×“×•×—_×‘×™×¦×•×¢_×œ×•×ž×“×•×ª.csv");
    link.click();
}

function exportDashboardExcel() {
    let csvContent = "\uFEFF×©× ×¢×•×‘×“ (×ž×’×™×© ×”×‘×§×¨×”),×ª××¨×™×š ×”×’×©×”,×©× ×˜×•×¤×¡ ×”×‘×§×¨×”,×¦×™×•×Ÿ\n";
    filledFormsDb.forEach(f => {
        csvContent += `"${f.user}","${f.dateFilled}","${f.formTitle}","${f.score}%"\n`;
    });
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "×“×•×—_×ž×¢×§×‘_×‘×™×¦×•×¢×™×_×‘×§×¨×•×ª.csv");
    link.click();
}

function submitInternalQuiz(e, title) {
    e.preventDefault();
    trainingsAnswersDb.push({
        title: title,
        user: currentUser.name,
        date: new Date().toLocaleString('he-IL')
    });
    localStorage.setItem('clinic_trainings_answers', JSON.stringify(trainingsAnswersDb));
    showToast('×”×œ×•×ž×“×” ×”×•×©×œ×ž×” ×‘×”×¦×œ×—×”!', 'success');
    navigate('trainings');
}

function addProtocolFromSettings() {
    const title = document.getElementById('settings-prot-title').value;
    const link = document.getElementById('settings-prot-link').value;
    if (title && link) {
        protocolsDb.push({ id: Date.now(), title, link });
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
        showToast('×¤×¨×•×˜×•×§×•×œ × ×•×¡×£ ×‘×”×¦×œ×—×”', 'success');
        navigate('settings');
    }
}
function removeProtocol(id) {
    if (confirm('×ž×—×§ ×¤×¨×•×˜×•×§×•×œ?')) {
        protocolsDb = protocolsDb.filter(p => p.id !== id);
        localStorage.setItem('clinic_protocols', JSON.stringify(protocolsDb));
        navigate('settings');
    }
}








/ /   F o r c e   u p d a t e   f o r   d e p l o y m e n t  
 