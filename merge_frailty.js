const fs = require('fs');

const oldHtml = fs.readFileSync('frailty.html', 'utf8');

let newHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מערך גריאטרי 2026: מדיניות אומדן שבריריות וסרקופניה</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Heebo', sans-serif;
            background-color: #f3f4f6;
            color: #111827;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 320px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 380px;
            }
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
    </style>
</head>
<body class="antialiased">

    <nav class="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div class="font-bold text-xl tracking-tight">משרד הבריאות 📊 מדיניות 2026</div>
            <div class="text-sm font-medium">אומדן שבריריות וסרקופניה</div>
        </div>
    </nav>

    <header class="bg-gray-900 text-white py-16 px-4 border-b-8 border-blue-500">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-green-400">מעבר לפרקטיקה: דיוק ואסטרטגיה במערך הגריאטרי</h1>
            <p class="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed">
                עדכון הנחיות לאומיות לאומדן שבריריות (Frailty) וסרקופניה. מיפוי קליני מדויק ואסטרטגיית הטמעה מבוססת נתונים (eFI) לקראת שנת 2026.
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                <span class="bg-blue-600 px-4 py-2 rounded-full">מניעה מוקדמת</span>
                <span class="bg-green-600 px-4 py-2 rounded-full">אבחון אובייקטיבי</span>
                <span class="bg-purple-600 px-4 py-2 rounded-full">רשומות ממוחשבות</span>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-12">
`;

// Extract old sections
const oldSectionRegex = /<section[\s\S]*?<\/section>/g;
const oldSections = [];
let match;
while ((match = oldSectionRegex.exec(oldHtml)) !== null) {
    oldSections.push(match[0]);
}

const newInput = \`        <section class="mb-16">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">הפנוטיפ של Fried: דיוק שלבי האבחון</h2>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                    המודל הקליני הנפוץ ביותר דורש דיוק בהגדרות הסף. תת-אבחון בשלבים המוקדמים מוביל לפספוס חלון ההזדמנויות המניעתי. להלן 5 הקריטריונים המרכזיים.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center glass-card p-8 border-r-4 border-blue-500">
                <div>
                    <h3 class="text-2xl font-bold mb-4 text-blue-700">דיוק ההגדרות (תיקון 2026)</h3>
                    <ul class="space-y-4 text-lg">
                        <li class="flex items-start">
                            <span class="text-green-500 text-2xl ml-3">✅</span>
                            <div>
                                <span class="font-bold">חזק (Robust):</span> 0 קריטריונים.
                            </div>
                        </li>
                        <li class="flex items-start">
                            <span class="text-yellow-500 text-2xl ml-3">⚠️</span>
                            <div>
                                <span class="font-bold">טרום-שבריריות (Pre-frailty):</span> 
                                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">1 או 2 קריטריונים</span>
                                <p class="text-sm text-gray-600 mt-1">תיקון קליני קריטי: דילוג על קריטריון יחיד יוביל לתת-אבחון מסוכן.</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                            <span class="text-red-500 text-2xl ml-3">🛑</span>
                            <div>
                                <span class="font-bold">שבריריות (Frailty):</span> 3 קריטריונים ומעלה.
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="chart-container">
                    <canvas id="friedChart"></canvas>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">סולם CFS (Clinical Frailty Scale)</h2>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                    כלי קליני מהיר שאינו דורש בדיקות אובייקטיביות, מבוסס ריאיון. הדיוק בנקודת החיתוך (Cut-off) הוא הליבה של קבלת החלטות טיפוליות באשפוז.
                </p>
            </div>

            <div class="glass-card p-8 border-r-4 border-red-500">
                <div class="mb-8 text-center text-lg">
                    <span class="font-bold text-red-600 text-xl">תיקון הגדרה קלינית:</span> 
                    מטופלים נחשבים לשבריריים החל מ- <span class="font-extrabold bg-red-100 px-2 py-1 rounded">ציון 5 ומעלה</span> (ולא "מעל 5"). 
                    ציון 4 מסווג כ"פגיע/בסיכון" (Vulnerable).
                </div>
                <div class="chart-container md:max-w-4xl mx-auto">
                    <canvas id="cfsChart"></canvas>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div class="glass-card p-8 border-r-4 border-purple-500 flex flex-col justify-between">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-4">SARC-F: סקר סרקופניה</h2>
                        <p class="text-lg text-gray-600 mb-6">
                            כלי הסקר המהיר משמש כשלב הראשון באלגוריתם הטיפול האירופאי (EWGSOP2). ציון של 4 נקודות ומעלה מצריך מעבר משלב ה-Find לשלבי ה-Assess וה-Confirm.
                        </p>
                        <div class="bg-purple-50 p-4 rounded-lg mb-6">
                            <h4 class="font-bold text-purple-800 mb-2">אלגוריתם F-A-C-S</h4>
                            <div class="flex justify-between items-center text-sm font-semibold text-center">
                                <div class="flex-1 bg-white p-2 rounded shadow mx-1 border-t-2 border-purple-400">Find<br>(SARC-F)</div>
                                <div>➡</div>
                                <div class="flex-1 bg-white p-2 rounded shadow mx-1 border-t-2 border-blue-400">Assess<br>(כוח לחיצה)</div>
                                <div>➡</div>
                                <div class="flex-1 bg-white p-2 rounded shadow mx-1 border-t-2 border-green-400">Confirm<br>(DXA/BIA)</div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="sarcChart"></canvas>
                    </div>
                </div>

                <div class="glass-card p-8 border-r-4 border-green-500">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Electronic Frailty Index (eFI)</h2>
                    <p class="text-lg text-gray-600 mb-6">
                        שינוי התפיסה המערכתי: מודל Rockwood אינו רק כלי מחקרי. הגרסה האלקטרונית (eFI) היא כיום הכלי הקל והיעיל ביותר ליישום ברמת הקהילה (קופות החולים).
                    </p>
                    
                    <div class="space-y-6 mt-8">
                        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-4xl text-blue-500 ml-4">🗄️</div>
                            <div>
                                <h4 class="font-bold text-lg">1. איסוף נתונים אוטומטי</h4>
                                <p class="text-gray-600 text-sm">שליפת נתוני אבחנות (ICD), תרופות ומעבדה מתיק ה-EMR ללא זמן צוות.</p>
                            </div>
                        </div>
                        <div class="flex justify-center text-2xl text-gray-400">⬇</div>
                        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-4xl text-purple-500 ml-4">⚙️</div>
                            <div>
                                <h4 class="font-bold text-lg">2. עיבוד אלגוריתמי (mFI)</h4>
                                <p class="text-gray-600 text-sm">חישוב מודל חוסרים מקוצר (למשל mFI-11) ברקע המערכת.</p>
                            </div>
                        </div>
                        <div class="flex justify-center text-2xl text-gray-400">⬇</div>
                        <div class="flex items-center bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
                            <div class="text-4xl text-green-500 ml-4">🚩</div>
                            <div>
                                <h4 class="font-bold text-lg text-green-800">3. התראה פרואקטיבית (Flagging)</h4>
                                <p class="text-green-700 text-sm">הקפצת התראה לרופא משפחה או אחות קהילה לזימון יזום לתוכנית התערבות.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <section class="glass-card p-10 mb-8 border-t-8 border-gray-800">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">אסטרטגיית יישום ותעדוף ארגוני</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div class="p-6 bg-white rounded-xl shadow-md border-b-4 border-blue-400 hover:-translate-y-1 transition duration-300">
                    <div class="text-4xl mb-4">🏥</div>
                    <h3 class="font-bold text-xl mb-2">אשפוז אקוטי (מיון/מחלקות)</h3>
                    <p class="text-gray-600">יישום סולם <strong>CFS</strong> תוך 24 שעות מקבלה. כלי טריאז' מהיר לקביעת מסלול טיפול במערכות "הנמ"ר".</p>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-md border-b-4 border-green-400 hover:-translate-y-1 transition duration-300">
                    <div class="text-4xl mb-4">🏘️</div>
                    <h3 class="font-bold text-xl mb-2">רפואת קהילה (קופ"ח)</h3>
                    <p class="text-gray-600">פיתוח והטמעת <strong>eFI</strong> כסמן פרואקטיבי ארצי לזיהוי טרום-שבריריות במערכות התיק הרפואי.</p>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-md border-b-4 border-purple-400 hover:-translate-y-1 transition duration-300">
                    <div class="text-4xl mb-4">🩺</div>
                    <h3 class="font-bold text-xl mb-2">קליניקות ראשוניות</h3>
                    <p class="text-gray-600">שילוב שאלון <strong>SARC-F</strong> על ידי אחיות או רופאים כדי לאתר ירידה תפקודית ודלדול שריר מוקדם.</p>
                </div>
            </div>
        </section>\`;

const newSections = [];
while ((match = oldSectionRegex.exec(newInput)) !== null) {
    newSections.push(match[0]);
}

const orderedSections = [
    oldSections[0],
    newSections[0],
    newSections[1],
    oldSections[1],
    newSections[2],
    oldSections[2],
    newSections[3],
    oldSections[3]
];

newHtml += orderedSections.join('\\n\\n');

newHtml += \`
    </main>

    <footer class="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <div class="max-w-4xl mx-auto px-4">
            <p>מבוסס על הנחיות ארגון EWGSOP2, מודל Fried (2001), מודל Rockwood, וספרות עכשווית בתחום הגריאטריה.</p>
        </div>
    </footer>
\`;

const newScriptInput = \`
        const wrapLabel = (text) => {
            if (typeof text !== 'string' || text.length <= 16) return text;
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';
            words.forEach(word => {
                if ((currentLine + word).length > 16) {
                    if (currentLine) lines.push(currentLine.trim());
                    currentLine = word + ' ';
                } else {
                    currentLine += word + ' ';
                }
            });
            if (currentLine) lines.push(currentLine.trim());
            return lines;
        };

        const globalTooltipConfig = {
            plugins: {
                tooltip: {
                    titleFont: { family: 'Heebo', size: 14 },
                    bodyFont: { family: 'Heebo', size: 14 },
                    padding: 12,
                    callbacks: {
                        title: function(tooltipItems) {
                            const item = tooltipItems[0];
                            let label = item.chart.data.labels[item.dataIndex];
                            if (Array.isArray(label)) {
                                return label.join(' ');
                            } else {
                                return label;
                            }
                        }
                    },
                    textDirection: 'rtl'
                },
                legend: {
                    labels: {
                        font: { family: 'Heebo', size: 14 }
                    },
                    rtl: true
                }
            }
        };

        Chart.defaults.font.family = "'Heebo', sans-serif";
        Chart.defaults.color = '#475569';

        const ctxFried = document.getElementById('friedChart').getContext('2d');
        new Chart(ctxFried, {
            type: 'doughnut',
            data: {
                labels: [
                    wrapLabel('ירידה לא מכוונת במשקל'),
                    wrapLabel('חולשת שרירים (לחיצת יד)'),
                    wrapLabel('איטיות בהליכה'),
                    wrapLabel('ירידה בביצוע פעילות גופנית'),
                    wrapLabel('תשישות סובייקטיבית או חוסר סבילות')
                ],
                datasets: [{
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        '#3b82f6', 
                        '#10b981', 
                        '#f59e0b', 
                        '#ef4444', 
                        '#8b5cf6'  
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: globalTooltipConfig.plugins
            }
        });

        const ctxCfs = document.getElementById('cfsChart').getContext('2d');
        new Chart(ctxCfs, {
            type: 'bar',
            data: {
                labels: [
                    wrapLabel('1 כושר מצוין'),
                    wrapLabel('2 בריא'),
                    wrapLabel('3 מתמודד היטב'),
                    wrapLabel('4 פגיע (Vulnerable)'),
                    wrapLabel('5 שבריריות קלה'),
                    wrapLabel('6 שבריריות מתונה'),
                    wrapLabel('7 שבריריות קשה'),
                    wrapLabel('8 שבריריות קשה מאוד'),
                    wrapLabel('9 מחלה סופנית')
                ],
                datasets: [{
                    label: 'חומרת מצב (המחשה ויזואלית)',
                    data: [10, 20, 30, 45, 60, 75, 85, 95, 100],
                    backgroundColor: [
                        '#10b981', 
                        '#34d399', 
                        '#6ee7b7', 
                        '#fbbf24', 
                        '#ef4444', 
                        '#dc2626', 
                        '#b91c1c', 
                        '#991b1b', 
                        '#7f1d1d'  
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: Object.assign({}, globalTooltipConfig.plugins, {
                    legend: { display: false }
                }),
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            font: { family: 'Heebo', size: 11 },
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: { display: false }
                    }
                }
            }
        });

        const ctxSarc = document.getElementById('sarcChart').getContext('2d');
        new Chart(ctxSarc, {
            type: 'radar',
            data: {
                labels: [
                    wrapLabel('כוח שריר (נשיאת משא)'),
                    wrapLabel('קושי בהליכה בתוך הבית'),
                    wrapLabel('עזרה בקימה מכיסא או מיטה'),
                    wrapLabel('קושי בעליית מדרגות'),
                    wrapLabel('מספר הנפילות בשנה האחרונה')
                ],
                datasets: [{
                    label: 'המחשת סף חריג (ציון מעל 4)',
                    data: [2, 1, 2, 1, 2],
                    backgroundColor: 'rgba(139, 92, 246, 0.3)',
                    borderColor: '#8b5cf6',
                    pointBackgroundColor: '#8b5cf6',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#8b5cf6',
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: globalTooltipConfig.plugins,
                scales: {
                    r: {
                        min: 0,
                        max: 2,
                        ticks: {
                            stepSize: 1,
                            display: false 
                        },
                        pointLabels: {
                            font: { family: 'Heebo', size: 12, weight: 'bold' }
                        }
                    }
                }
            }
        });
\`;

const scriptMatch = oldHtml.match(/<script>([\s\S]*)<\/script>/);
const oldScript = scriptMatch ? scriptMatch[1] : '';

const chartInstantiations = [];
['ctxTrajectory', 'ctxSystemShift', 'ctxCGA', 'ctxLessIsMore'].forEach(varName => {
    const regex = new RegExp(\`const \${varName} = document.getElementById[\\\\s\\\\S]*?new Chart\\\\([^;]+;\\n\`, 'g');
    const match = regex.exec(oldScript);
    if (match) {
        chartInstantiations.push(match[0]);
    }
});

newHtml += \`\\n    <script>\\n        document.addEventListener("DOMContentLoaded", function() {\\n\`;
newHtml += newScriptInput;
newHtml += \`\\n\` + chartInstantiations.join('\\n\\n');
newHtml += \`\\n        });\\n    </script>\\n</body>\\n</html>\`;

fs.writeFileSync('frailty.html', newHtml, 'utf8');
console.log("Merged successfully.");
