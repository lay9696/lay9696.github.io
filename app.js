const defaultData = {
  profile: {
    name: "甘雷",
    title: "讲师 · 博士生导师/硕士生导师",
    org: "安徽理工大学人工智能学院",
    email: "ganlei9696@163.com",
    avatar: "./photo.jpg"
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
    "Lei Gan, Hongmeng Xu, Zhengchun Qian, Huanbo Cheng. Process maps of laser melt injection: coating property evolution with macro thermal damage of WC particles[J]. Materials & Design, 2026, 263, 115594.（中科院 2 区，中科协 T1，SCI，IF 7.9）",
    "甘雷, 王成军, 李磊, 徐鸿蒙, 吴军, 黄海鸿. 基于数据空间混合策略的冲压工艺能量图谱构建及成形质量监测[J]. 机械工程学报, 2026.（中科协 T1，EI）"
  ],
  patents: [
    "黄海鸿, 甘雷, 汪钊翼等. 面向冲压成形质量监测的工艺能量图谱的生成方法与系统[P]. ZL202310819873.4, 2026-02-05, 中国发明专利.（授权）"
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
let pageData = clone(defaultData);
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

render();
