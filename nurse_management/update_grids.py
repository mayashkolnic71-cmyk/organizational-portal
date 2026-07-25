import re

html_file1 = 'index.html'
html_file2 = 'app/index.html'

subjects = [
    ("פצעים", "bandage"),
    ("כאב", "activity"),
    ("הזנה והאכלה", "apple"),
    ("דמנציה", "brain"),
    ("טיפול תומך/פליאטיבי", "heart-pulse"),
    ("מניעת זיהומים", "shield-alert"),
    ("בטיחות הטיפול וניהול סיכונים", "shield-check"),
    ("התעמרות וחוק זכויות המטופל", "user-check"),
    ("סוכרת", "stethoscope"),
    ("אי ספיקת לב", "heart"),
    ("טראומה", "alert-triangle"),
    ("גריאטריה", "users"),
    ("חרום", "siren"),
    ("טיפול תרופתי", "pill"),
    ("החייאה", "zap"),
    ("חווית המטופל", "smile"),
    ("בריאות העובד ומערך החיסונים", "syringe")
]

def generate_work_plans_grid():
    html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">\n'
    for name, icon in subjects:
        html += f'                            <button class="btn btn-outline" style="justify-content: center; border-color: rgba(56,189,248,0.3);" onclick="openWorkPlan(\'{name}\')"><i data-lucide="file-text" style="width: 16px; margin-left: 8px;"></i> {name}</button>\n'
    html += '                        </div>'
    return html

def generate_trustee_cards():
    html = '<div class="trustees-poster-grid">\n'
    for idx, (name, icon) in enumerate(subjects):
        html += f'''                                <!-- Card {idx+1} -->
                                <div class="trustee-card">
                                    <div class="tc-header">
                                        <i data-lucide="{icon}"></i> {name}
                                    </div>
                                    <div class="tc-body">
                                        <div class="tc-field">
                                            <label>שם הנאמן/ת:</label>
                                            <div class="editable-text" contenteditable="true" data-placeholder="הקלד/י שם..."></div>
                                        </div>
                                        <div class="tc-field">
                                            <label>מחלקה:</label>
                                            <div class="editable-text" contenteditable="true" data-placeholder="הקלד/י מחלקה..."></div>
                                        </div>
                                        <div class="tc-action" style="margin-top: 5px;">
                                            <button class="btn btn-sm btn-outline" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; border-color: rgba(255,255,255,0.2); color: #cbd5e1; background: rgba(0,0,0,0.2); transition: all 0.2s;" onclick="alert('במערכת אמיתית, יפתח חלון לבחירת קובץ כתב מינוי')">
                                                <i data-lucide="upload" style="width: 14px; height: 14px;"></i> כתב מינוי
                                            </button>
                                        </div>
                                    </div>
                                </div>
'''
    html += '                            </div>'
    return html

for file_path in [html_file1, html_file2]:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Work Plans grid
    wp_pattern = re.compile(r'<div style="display: grid; grid-template-columns: repeat\(auto-fill, minmax\(200px, 1fr\)\); gap: 15px; margin-top: 20px;">.*?</div>', re.DOTALL)
    content = wp_pattern.sub(generate_work_plans_grid(), content)
    
    # Replace Trustee Cards grid
    tc_pattern = re.compile(r'<div class="trustees-poster-grid">.*?</div>\s*</div>\s*<div class="card glass" style="margin-bottom: 20px;">', re.DOTALL)
    content = tc_pattern.sub(generate_trustee_cards() + '\n                        </div>\n                    <div class="card glass" style="margin-bottom: 20px;">', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated successfully!")
