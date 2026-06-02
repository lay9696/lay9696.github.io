const STORAGE_KEY = "ganlei-academic-profile-v1";
const PASSWORD_KEY = "ganlei-academic-admin-password-v1";

const defaultData = {
  profile: {
    name: "甘雷",
    title: "讲师 · 硕士生导师",
    org: "安徽理工大学人工智能学院",
    email: "ganlei9696@163.com",
    avatar: ""
  },
  about: [
    "甘雷，男，中共党员，合肥工业大学博士。现任安徽理工大学人工智能学院讲师、硕士生导师，兼任教育部重点实验室秘书、安徽省“科技副总”、中国煤炭工业协会创新团队成员。",
    "主要从事工业粉尘与火灾智能防控技术及装备开发、煤矿开采高端装备智能运维等方面的教学与科研工作。主持国家及省部级科研项目 9 项、企业横向项目 4 项，参与教育部 U40 人才项目、国家自然科学基金重点项目、优秀青年科学基金项目等多项研究。",
    "欢迎对大模型、无人系统、可靠性与健康管理、计算机视觉、智能监测传感、机械结构设计等在安全领域应用感兴趣的同学加入团队。"
  ],
  research: [
    "人工智能与安全应用",
    "工业粉尘智能监测与防控",
    "火灾智能防控技术与装备",
    "煤矿高端装备智能运维",
    "可靠性与健康管理",
    "计算机视觉与智能感知"
  ],
  news: [
    "持续招募对大模型、无人系统、可靠性与健康管理、计算机视觉、智能监测传感、机械结构设计感兴趣的同学加入团队。",
    "担任 IEEE 2026 Global Reliability and PHM Conference 分论坛召集人。",
    "担任 Frontiers in Mechanical Engineering 期刊客座编辑。"
  ],
  awards: [
    "中国职业安全健康协会科技进步一等奖（排名第 5）",
    "中国煤炭工业协会创新团队奖（排名第 10）",
    "指导学生获学科竞赛全国二等奖 2 项、全国三等奖 1 项",
    "指导学生获学科竞赛安徽赛区特等奖 3 项，一等奖、二等奖多项"
  ],
  projects: [
    "主持国家自然科学基金项目",
    "主持安徽省科技厅重点研发计划项目",
    "主持安徽省教育厅高校重点项目",
    "主持安徽省人社厅博士后科研项目",
    "主持国家及省部级科研项目共 9 项、企业横向项目 4 项",
    "主持教研项目 2 项，指导学生主持国家级创新创业项目 1 项",
    "参与教育部 U40 人才项目、国家自然科学基金重点项目、优秀青年科学基金项目等"
  ],
  papers: [
    "以第一作者或通讯作者在 ASME 汇刊、《机械工程学报》等期刊发表学术论文 10 余篇。",
    "论文详情待补充。可通过左侧“本地管理”入口逐条编辑。"
  ],
  patents: [
    "获授权或实审中国发明专利 20 余项。",
    "专利详情待补充。可通过左侧“本地管理”入口逐条编辑。"
  ],
  service: [
    "IEEE Transactions on Industrial Electronics",
    "IEEE Transactions on Industrial Informatics",
    "IEEE Transactions on Knowledge and Data Engineering",
    "Energy Conversion and Management"
  ],
  updatedAt: "2026-06-02"
};

const $ = (id) => document.getElementById(id);
const clone = (value) => JSON.parse(JSON.stringify(value));
const localEditingAllowed =
  location.protocol === "file:" ||
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1";

let pageData = loadData();

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...clone(defaultData), ...JSON.parse(stored) } : clone(defaultData);
  } catch {
    return clone(defaultData);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(targetId, items) {
  $(targetId).innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderNews(items) {
  $("newsContent").innerHTML = items
    .map((item) => `<li><time>最新动态</time><span>${escapeHtml(item)}</span></li>`)
    .join("");
}

function renderProfile() {
  const profile = pageData.profile;
  $("profileName").textContent = profile.name;
  $("profileTitle").textContent = profile.title;
  $("profileOrg").textContent = profile.org;
  $("profileEmail").href = `mailto:${profile.email}`;
  $("profileEmail").lastElementChild.textContent = profile.email;
  $("avatar").innerHTML = profile.avatar
    ? `<img src="${escapeHtml(profile.avatar)}" alt="${escapeHtml(profile.name)}的头像" />`
    : `<span>${escapeHtml(profile.name.slice(0, 1))}</span>`;
  document.title = `${profile.name} | 个人学术主页`;
}

function render() {
  renderProfile();
  $("aboutContent").innerHTML = pageData.about.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
  renderList("researchContent", pageData.research);
  renderNews(pageData.news);
  renderList("awardsContent", pageData.awards);
  renderList("projectsContent", pageData.projects);
  renderList("papersContent", pageData.papers);
  renderList("patentsContent", pageData.patents);
  renderList("serviceContent", pageData.service);
  $("currentYear").textContent = new Date().getFullYear();
  $("lastUpdated").textContent = pageData.updatedAt;
}

function splitLines(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function populateEditor() {
  const profile = pageData.profile;
  $("editName").value = profile.name;
  $("editTitle").value = profile.title;
  $("editOrg").value = profile.org;
  $("editEmail").value = profile.email;
  $("editAvatar").value = profile.avatar;
  $("editAbout").value = pageData.about.join("\n");
  $("editResearch").value = pageData.research.join("\n");
  $("editNews").value = pageData.news.join("\n");
  $("editAwards").value = pageData.awards.join("\n");
  $("editProjects").value = pageData.projects.join("\n");
  $("editPapers").value = pageData.papers.join("\n");
  $("editPatents").value = pageData.patents.join("\n");
  $("editService").value = pageData.service.join("\n");
}

function readEditor() {
  return {
    profile: {
      name: $("editName").value.trim() || "甘雷",
      title: $("editTitle").value.trim(),
      org: $("editOrg").value.trim(),
      email: $("editEmail").value.trim(),
      avatar: $("editAvatar").value.trim()
    },
    about: splitLines($("editAbout").value),
    research: splitLines($("editResearch").value),
    news: splitLines($("editNews").value),
    awards: splitLines($("editAwards").value),
    projects: splitLines($("editProjects").value),
    papers: splitLines($("editPapers").value),
    patents: splitLines($("editPatents").value),
    service: splitLines($("editService").value),
    updatedAt: new Date().toISOString().slice(0, 10)
  };
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function openEditor() {
  populateEditor();
  $("editorMessage").textContent = "";
  $("editorDrawer").hidden = false;
}

function closeModal(id) {
  $(id).hidden = true;
  $("passwordInput").value = "";
  $("loginMessage").textContent = "";
}

function configureAdminEntry() {
  if (!localEditingAllowed) {
    $("adminEntry").hidden = true;
    $("adminNote").textContent = "公开访问为只读模式";
    return;
  }
  $("adminNote").textContent = "仅本机可进入编辑";
  $("adminEntry").addEventListener("click", () => {
    $("loginHelp").textContent = localStorage.getItem(PASSWORD_KEY)
      ? "请输入本机管理密码后编辑主页内容。"
      : "首次使用请设置一个本机管理密码。";
    $("loginButton").textContent = localStorage.getItem(PASSWORD_KEY) ? "验证并进入" : "设置密码并进入";
    $("loginModal").hidden = false;
    $("passwordInput").focus();
  });
}

async function handleLogin() {
  const password = $("passwordInput").value;
  if (password.length < 6) {
    $("loginMessage").textContent = "密码至少需要 6 个字符。";
    return;
  }
  const hash = await digest(password);
  const existingHash = localStorage.getItem(PASSWORD_KEY);
  if (existingHash && existingHash !== hash) {
    $("loginMessage").textContent = "密码不正确。";
    return;
  }
  if (!existingHash) localStorage.setItem(PASSWORD_KEY, hash);
  closeModal("loginModal");
  openEditor();
}

function saveChanges() {
  pageData = readEditor();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  render();
  $("editorMessage").textContent = "已保存到当前浏览器。";
}

function exportData() {
  const blob = new Blob([JSON.stringify(readEditor(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ganlei-homepage-data.json";
  link.click();
  URL.revokeObjectURL(link.href);
  $("editorMessage").textContent = "已导出主页数据备份。";
}

function importData(event) {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      pageData = { ...clone(defaultData), ...imported };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
      populateEditor();
      render();
      $("editorMessage").textContent = "导入成功，页面内容已更新。";
    } catch {
      $("editorMessage").textContent = "导入失败：请选择有效的 JSON 数据文件。";
    }
  });
  reader.readAsText(file);
}

function resetData() {
  if (!window.confirm("确定恢复初始内容吗？当前浏览器中的修改会被覆盖。")) return;
  pageData = clone(defaultData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  populateEditor();
  render();
  $("editorMessage").textContent = "已恢复初始内容。";
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});
$("loginButton").addEventListener("click", handleLogin);
$("passwordInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleLogin();
});
$("closeEditor").addEventListener("click", () => {
  $("editorDrawer").hidden = true;
});
$("saveButton").addEventListener("click", saveChanges);
$("exportButton").addEventListener("click", exportData);
$("importInput").addEventListener("change", importData);
$("resetButton").addEventListener("click", resetData);

render();
configureAdminEntry();
