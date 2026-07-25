function escape(s) {
    if (!s) return "''";
    return "'" + s.replace(/'/g, "\\'").replace(/\n/g, "\\n") + "'";
}

const fs = require('fs');
const f1 = JSON.parse(fs.readFileSync('form1_parsed.json', 'utf8'));
const f2 = JSON.parse(fs.readFileSync('form2_parsed.json', 'utf8'));

function processForm(f, name) {
    let out =     '': {\n        fields: [\n;
    for(let q of f) {
        if (q.Type === 2 || q.Type === 3 || q.Type === 0 || q.Type === 5) {
            let typeStr = q.Type === 0 ? 'text' : (q.Type === 3 ? 'select' : 'radio');
            out +=             {\n;
            out +=                 id: '',\n;
            out +=                 type: '',\n;
            out +=                 label: { he: , en: , ar: , ru:  };
            if (q.Options) {
                out += ,\n                options: [\n;
                let opts = q.Options.split(' | ');
                for (let o of opts) {
                    out +=                     { val: , label: { he: , en: , ar: , ru:  } },\n;
                }
                out +=                 ]\n;
            } else {
                out += \n;
            }
            out +=             },\n;
        }
    }
    out +=         ]\n    },\n;
    return out;
}

console.log(processForm(f1, 'infections'));
console.log(processForm(f2, 'supportive_care'));
