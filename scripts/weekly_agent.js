const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("No GEMINI_API_KEY found in environment!");
    process.exit(1);
}

const prompt = `
אתה סוכן חכם של פורטל איכות ובטיחות במערך הגריאטרי. 
תפקידך לייצר עדכון שבועי קצר ומקצועי לצוות הרפואי והסיעודי. 
אנא החזר פלט בפורמט JSON תקני בלבד, עם המפתחות הבאים:
"date": "תאריך של היום בעברית (למשל: 13 ביוני 2026)",
"protocols": "פסקה אחת על עדכון דמיוני או אמיתי של נהלי משרד הבריאות בגריאטריה",
"trivia": "שאלת טריוויה מקצועית אחת עם התשובה שלה",
"tip": "טיפ קצר ומעשי בנושא בטיחות הטיפול",
"research": "סיכום של 2-3 משפטים על מאמר מחקרי חדש בתחום הגריאטריה או בטיחות מטופלים"
הקפד שהתוכן יהיה ענייני, מעשיר ומקצועי.
החזר אך ורק את אובייקט ה-JSON, ללא פורמט Markdown (ללא \`\`\`json) וללא טקסט נוסף לפני ואחרי.
`;

const requestData = JSON.stringify({
    contents: [{
        parts: [{ text: prompt }]
    }],
    generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
    }
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.candidates && response.candidates.length > 0) {
                let text = response.candidates[0].content.parts[0].text;
                // Cleanup in case gemini returned markdown blocks anyway
                text = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
                
                const generatedContent = JSON.parse(text);
                
                const outputPath = path.join(__dirname, '..', 'weekly_content.json');
                fs.writeFileSync(outputPath, JSON.stringify(generatedContent, null, 2), 'utf8');
                console.log("Weekly content updated successfully!");
            } else {
                console.error("Unexpected API response structure:", JSON.stringify(response, null, 2));
                process.exit(1);
            }
        } catch (err) {
            console.error("Error parsing response or saving file:", err.message);
            console.error("Raw data:", data);
            process.exit(1);
        }
    });
});

req.on('error', (error) => {
    console.error("HTTP Request Error:", error.message);
    process.exit(1);
});

req.write(requestData);
req.end();
