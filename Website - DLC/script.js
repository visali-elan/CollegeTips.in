// Font size adjustment
let fontSize = 100;

function adjustFontSize(amount) {
  fontSize += amount;
  document.body.style.fontSize = fontSize + '%';
}

// Language switch (dummy for now)
function translatePage(lang) {
  alert(`Language switched to: ${lang.toUpperCase()} (Feature coming soon!)`);
}

// Feedback form submission (basic local alert)
function handleFeedbackSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (name && message) {
    alert(`Thanks for your feedback, ${name}!`);
    e.target.reset();
  } else {
    alert("Please fill in all fields.");
  }
}

// Optional voice command support
function activateVoiceCommand() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    document.getElementById("userInput").value = transcript;
    sendMessage(); // If using chatbot
  };
}

const chatBody = document.getElementById("chat-body");

const faqs = {
  "how to create an email id": 
    "1. Go to gmail.com\n2. Click on 'Create Account'\n3. Fill in your details\n4. Choose a username & password\n5. Verify with mobile 📧✅",

  "how to make a resume": 
    "You can use tools like Canva or Microsoft Word.\n1. Add Name, Contact, Objective\n2. Include Education, Skills & Projects\n3. Save as PDF 💼📄",

  "how to apply for jobs online": 
    "1. Create accounts on platforms like Naukri, LinkedIn\n2. Upload your resume\n3. Search jobs by keyword\n4. Click 'Apply' 🔍📨",

  "what is digital payment": 
    "Digital payment means paying online without cash. UPI, GPay, PhonePe, Cards, etc. are used for safe transactions 💳📲",

  "how to use google meet": 
    "1. Visit meet.google.com\n2. Click 'New Meeting' or enter a code\n3. Turn on mic/camera & click 'Join' 🎥💬",

  "how to protect my data online": 
    "Use strong passwords, don’t share OTPs, avoid clicking unknown links, and keep antivirus updated 🔐🛡️",

  "how to scan a document": 
    "Use apps like Adobe Scan or Google Drive.\n1. Open app\n2. Click ‘Scan’ or camera icon\n3. Save as PDF 🧾📱"
};


function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim().toLowerCase();
  if (!userText) return;

  appendMessage(userText, "user-msg");

  let found = false;
  for (let question in faqs) {
    if (userText.includes(question)) {
      appendMessage(faqs[question], "bot-msg");
      found = true;
      break;
    }
  }

  if (!found) {
    appendMessage("Sorry, I couldn’t find an answer for that yet. Please contact our support team! 📩", "bot-msg");
  }

  input.value = "";
}


function appendMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
