/* =========================
   عناصر الصفحة
========================= */
const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const chatHeader = document.getElementById("chatHeader");
const messageInput = document.getElementById("messageInput");
const loginBox = document.getElementById("loginBox");
const usernameInput = document.getElementById("usernameInput");

/* =========================
   بيانات المستخدم
========================= */
let currentUser = localStorage.getItem("username");
let activeUser = null;

// مستخدمون تجريبيون
const users = ["أحمد", "سارة", "علي", "نور"];

/* =========================
   تسجيل الاسم
========================= */
function saveUsername() {
  const name = usernameInput.value.trim();
  if (!name) return;

  localStorage.setItem("username", name);
  currentUser = name;
  loginBox.style.display = "none";
}

/* =========================
   التحقق من الدخول
========================= */
function checkLogin() {
  if (currentUser) {
    loginBox.style.display = "none";
  }
}

/* =========================
   تحميل المستخدمين
========================= */
function loadUsers() {
  usersDiv.innerHTML = "";

  users.forEach(user => {
    if (user === currentUser) return;

    const div = document.createElement("div");
    div.className = "user";
    div.textContent = user;
    div.onclick = () => selectUser(user);

    usersDiv.appendChild(div);
  });
}

/* =========================
   اختيار مستخدم
========================= */
function selectUser(user) {
  activeUser = user;
  chatHeader.textContent = "الدردشة مع " + user;
  messagesDiv.innerHTML = "";

  loadMessages(user);
}

/* =========================
   مفاتيح التخزين
========================= */
function getChatKey(user) {
  return `chat_${currentUser}_${user}`;
}

/* =========================
   تحميل الرسائل
========================= */
function loadMessages(user) {
  const key = getChatKey(user);
  const data = JSON.parse(localStorage.getItem(key)) || [];

  data.forEach(msg => {
    addMessage(msg.text, msg.type, false);
  });

  scrollDown();
}

/* =========================
   حفظ رسالة
========================= */
function saveMessage(text, type) {
  const key = getChatKey(activeUser);
  const data = JSON.parse(localStorage.getItem(key)) || [];

  data.push({ text, type });
  localStorage.setItem(key, JSON.stringify(data));
}

/* =========================
   إرسال رسالة
========================= */
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || !activeUser) return;

  addMessage(text, "me", true);
  messageInput.value = "";

  setTimeout(() => {
    const reply = "رد تلقائي من " + activeUser;
    addMessage(reply, "other", true);
  }, 800);
}

/* =========================
   إضافة رسالة
========================= */
function addMessage(text, type, save) {
  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;

  messagesDiv.appendChild(div);
  scrollDown();

  if (save) {
    saveMessage(text, type);
  }
}

/* =========================
   تمرير تلقائي
========================= */
function scrollDown() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* =========================
   إرسال بزر Enter
========================= */
messageInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

/* =========================
   تشغيل أولي
========================= */
checkLogin();
loadUsers();
