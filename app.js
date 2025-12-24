// ===== عناصر الصفحة =====
const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const chatHeader = document.getElementById("chatHeader");
const messageInput = document.getElementById("messageInput");

// ===== بيانات تجريبية =====
const currentUser = "أنت";
const users = ["أحمد", "سارة", "علي", "نور"];
let activeUser = null;

// ===== إنشاء قائمة المستخدمين =====
function loadUsers() {
  usersDiv.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user";
    div.textContent = user;

    div.addEventListener("click", () => {
      selectUser(user);
    });

    usersDiv.appendChild(div);
  });
}

// ===== اختيار مستخدم =====
function selectUser(user) {
  activeUser = user;
  chatHeader.textContent = "الدردشة مع " + user;
  messagesDiv.innerHTML = "";

  addSystemMessage("بدأت الدردشة مع " + user);
}

// ===== إرسال رسالة =====
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || !activeUser) return;

  addMessage(text, "me");
  messageInput.value = "";

  // رد تلقائي (تجريبي)
  setTimeout(() => {
    addMessage("رد تلقائي من " + activeUser, "other");
  }, 900);
}

// ===== إضافة رسالة =====
function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;

  messagesDiv.appendChild(div);
  scrollDown();
}

// ===== رسالة نظام =====
function addSystemMessage(text) {
  const div = document.createElement("div");
  div.className = "message other";
  div.style.opacity = "0.7";
  div.textContent = text;

  messagesDiv.appendChild(div);
  scrollDown();
}

// ===== تمرير تلقائي =====
function scrollDown() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ===== إرسال عند الضغط Enter =====
messageInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ===== تشغيل أولي =====
loadUsers();
