<script setup>
import { ref, computed } from 'vue'

// 模拟数据库中的两张表（对应第 20、21 篇的 books 与 reading_events）
const dbBooks = ref([
  { id: 1, title: '计算机基础', total_pages: 200, read_pages: 48 },
  { id: 2, title: '软件开发入门', total_pages: 160, read_pages: 0 }
])
const dbEvents = ref([])

// 模拟浏览器前端状态（对应第 18、23 篇）
const selectedBookId = ref(1)
const inputPages = ref('60')
const currentUser = ref('owner') // 'owner' | 'guest' | 'anonymous'
const simulateMode = ref('normal') // 'normal' | 'cors' | '500' | 'timeout' | 'optimistic'

// UI 显示状态
const uiDisplayedPages = ref(48)
const uiBanner = ref({ type: 'info', text: '当前显示：已从服务端读取初始数据（48 / 200 页，24%）。' })

// 模拟 F12 Network 与后端日志
const networkLogs = ref([])
const serverLogs = ref([])
const processedIdempotencyKeys = ref(new Set())
const customIdempotencyKey = ref('')

const currentBook = computed(() =>
  dbBooks.value.find(b => b.id === selectedBookId.value) || dbBooks.value[0]
)

const progressPercent = computed(() => {
  const total = currentBook.value.total_pages
  return total > 0 ? Math.round((uiDisplayedPages.value / total) * 100) : 0
})

function switchBook(id) {
  selectedBookId.value = id
  const book = dbBooks.value.find(b => b.id === id)
  if (book) {
    uiDisplayedPages.value = book.read_pages
    inputPages.value = String(book.read_pages)
    uiBanner.value = {
      type: 'info',
      text: `已切换到《${book.title}》，浏览器状态同步为数据库当前值 ${book.read_pages} 页。`
    }
  }
}

// 模拟点击“刷新浏览器页面”：丢弃前端未保存的内存状态，重新从数据库拉取（GET）
function refreshBrowserPage() {
  const book = currentBook.value
  uiDisplayedPages.value = book.read_pages
  inputPages.value = String(book.read_pages)
  networkLogs.value.unshift({
    id: Date.now(),
    method: 'GET',
    url: `/api/books/${book.id}`,
    status: '200 OK',
    statusClass: 'ok',
    reqBody: '（无消息体）',
    resBody: JSON.stringify(book),
    note: '页面刷新：重新从后端数据库读取权威数据'
  })
  uiBanner.value = {
    type: 'info',
    text: `页面已刷新：前端内存状态重置，从数据库读回《${book.title}》进度为 ${book.read_pages} 页。`
  }
}

function resetDemo() {
  dbBooks.value = [
    { id: 1, title: '计算机基础', total_pages: 200, read_pages: 48 },
    { id: 2, title: '软件开发入门', total_pages: 160, read_pages: 0 }
  ]
  dbEvents.value = []
  selectedBookId.value = 1
  uiDisplayedPages.value = 48
  inputPages.value = '60'
  currentUser.value = 'owner'
  simulateMode.value = 'normal'
  networkLogs.value = []
  serverLogs.value = []
  processedIdempotencyKeys.value = new Set()
  customIdempotencyKey.value = ''
  uiBanner.value = { type: 'info', text: '演示环境已重置为初始状态（第 1 本书已读 48 页，日志为空）。' }
}

function saveProgress() {
  const book = currentBook.value
  const raw = String(inputPages.value).trim()
  const reqId = Date.now()
  const idemKey = customIdempotencyKey.value.trim()

  // 乐观更新模式：还没等服务器响应，前端先把界面改成输入值
  if (simulateMode.value === 'optimistic') {
    const parsedPreview = Number(raw)
    if (!Number.isNaN(parsedPreview)) {
      uiDisplayedPages.value = parsedPreview
    }
    uiBanner.value = {
      type: 'warn',
      text: '【乐观更新】前端已先把界面改成了新数字，但后端实际上报错未保存！请点“刷新浏览器”观察数据变回原样。'
    }
  }

  // 1. 模拟 CORS 拦截
  if (simulateMode.value === 'cors') {
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `http://localhost:8000/api/books/${book.id}`,
      status: 'CORS Error',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: raw }),
      resBody: 'Blocked by CORS policy: No Access-Control-Allow-Origin header',
      note: '前端 (5173) 与后端 (8000) 跨源，浏览器拦截响应（详见第 17 篇）'
    })
    if (simulateMode.value !== 'optimistic') {
      uiBanner.value = {
        type: 'err',
        text: '保存失败：浏览器控制台报 CORS 跨域拦截错误（请看下方 F12 Network 面板）。'
      }
    }
    return
  }

  // 2. 模拟身份认证（401）与权限授权（403 IDOR）检查（对应第 19、22 篇）
  if (currentUser.value === 'anonymous') {
    serverLogs.value.unshift(`[AuthN] 拒绝请求：未携带有效 Cookie / Token -> 返回 401`)
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '401 Unauthorized',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: raw }),
      resBody: JSON.stringify({ error: '请先登录（未认证）' }),
      note: '缺少有效身份凭据，在进入业务逻辑前被拦截（详见第 22 篇）'
    })
    uiBanner.value = { type: 'err', text: '保存被拒（401）：当前处于“未登录”状态，服务端拒绝处理。' }
    return
  }

  if (currentUser.value === 'guest') {
    serverLogs.value.unshift(`[AuthZ] 越权拦截：用户 guest 试图修改属于 owner 的 book_id=${book.id} -> 返回 403`)
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '403 Forbidden',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: raw }),
      resBody: JSON.stringify({ error: '无权修改他人的读书记录（防范越权 IDOR）' }),
      note: '已登录但记录不属于当前用户（区分 401 认证与 403 授权，详见第 19、22 篇）'
    })
    uiBanner.value = { type: 'err', text: '保存被拒（403）：虽然已登录，但该记录不属于当前账号。' }
    return
  }

  // 3. 模拟后端输入校验（对应第 08、19、20 篇）
  const parsed = Number(raw)
  if (raw === '' || !Number.isInteger(parsed)) {
    serverLogs.value.unshift(`[Validation] 输入 "${raw}" 不是有效整数 -> 返回 422`)
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '422 Unprocessable',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: raw }),
      resBody: JSON.stringify({ error: 'read_pages 必须是整数' }),
      note: '后端类型校验拦截：不能相信前端传来的字符串一定是整数（详见第 08、19 篇）'
    })
    if (simulateMode.value !== 'optimistic') {
      uiBanner.value = { type: 'err', text: `校验失败（422）："${raw}" 不是有效整数，数据库未修改。` }
    }
    return
  }

  if (parsed < 0 || parsed > book.total_pages) {
    serverLogs.value.unshift(
      `[DB Constraint] BEGIN -> CHECK (read_pages >= 0 AND read_pages <= ${book.total_pages}) 失败 -> ROLLBACK!`
    )
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '422 Unprocessable',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: parsed }),
      resBody: JSON.stringify({
        error: `页数超出范围（允许 0 ~ ${book.total_pages}），事务已 ROLLBACK`
      }),
      note: '范围校验与数据库 CHECK 约束保护，事务回滚（详见第 20、21 篇）'
    })
    if (simulateMode.value !== 'optimistic') {
      uiBanner.value = {
        type: 'err',
        text: `校验失败（422）：页数必须在 0 ～ ${book.total_pages} 之间，数据库保持原值 ${book.read_pages}。`
      }
    }
    return
  }

  // 4. 模拟服务端 500 故障或乐观更新失败场景
  if (simulateMode.value === '500' || simulateMode.value === 'optimistic') {
    serverLogs.value.unshift(
      `[Transaction] BEGIN -> UPDATE books SET read_pages=${parsed} -> 插入日志时发生异常 -> 执行 ROLLBACK（恢复为 ${book.read_pages}）`
    )
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '500 Server Error',
      statusClass: 'err',
      reqBody: JSON.stringify({ read_pages: parsed }),
      resBody: JSON.stringify({ error: '服务端内部异常，数据库事务已显式 ROLLBACK' }),
      note: '事务原子性：中途出错显式回滚，避免只改了书表却漏了日志表（详见第 21 篇）'
    })
    if (simulateMode.value === '500') {
      uiBanner.value = {
        type: 'err',
        text: `服务端报错（500）：后端事务已执行 ROLLBACK，数据库中仍是 ${book.read_pages} 页。`
      }
    }
    return
  }

  // 5. 检查幂等键（Idempotency-Key，对应第 23 篇重试规则）
  if (idemKey && processedIdempotencyKeys.value.has(idemKey)) {
    serverLogs.value.unshift(
      `[Idempotency] 检测到已处理过的 Idempotency-Key="${idemKey}"，跳过重复写库，直接返回上次成功结果`
    )
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '200 OK (Idempotent)',
      statusClass: 'ok',
      reqBody: JSON.stringify({ read_pages: parsed, idempotency_key: idemKey }),
      resBody: JSON.stringify({ ...book, deduplicated: true }),
      note: '幂等保护生效：重试请求不会在 reading_events 表中多插一条重复日志（详见第 23 篇）'
    })
    uiDisplayedPages.value = book.read_pages
    uiBanner.value = {
      type: 'ok',
      text: `幂等重试成功：服务端识别出重复的请求标识 "${idemKey}"，未重复插入阅读日志。`
    }
    return
  }

  // 6. 正常执行数据库事务：UPDATE books + INSERT INTO reading_events
  book.read_pages = parsed
  dbEvents.value.unshift({
    event_id: dbEvents.value.length + 1,
    book_id: book.id,
    page: parsed
  })
  if (idemKey) {
    processedIdempotencyKeys.value.add(idemKey)
  }

  serverLogs.value.unshift(
    `[Transaction] BEGIN; UPDATE books SET read_pages = ${parsed} WHERE id = ${book.id}; INSERT INTO reading_events VALUES (${book.id}, ${parsed}); COMMIT;`
  )

  // 7. 模拟“服务器已提交，但响应在网络中超时丢失”（对应第 23 篇表格最后一行）
  if (simulateMode.value === 'timeout') {
    networkLogs.value.unshift({
      id: reqId,
      method: 'PATCH',
      url: `/api/books/${book.id}`,
      status: '(Timeout / 响应丢失)',
      statusClass: 'warn',
      reqBody: JSON.stringify({ read_pages: parsed, idempotency_key: idemKey || undefined }),
      resBody: 'net::ERR_TIMED_OUT（注意：后端数据库其实已经 COMMIT 成功了！）',
      note: '最易混淆场景：数据库已改成新值，但浏览器以为失败了。此时若不带幂等键再点一次保存，日志表会多出重复记录！'
    })
    uiBanner.value = {
      type: 'warn',
      text: '【响应超时】前端没收到回复（界面仍显示旧值），但右边数据库其实已经改成了 ' + parsed + '！试试再点一次保存看看日志表会发生什么？'
    }
    return
  }

  // 8. 正常返回 200 OK 并更新前端界面
  uiDisplayedPages.value = parsed
  networkLogs.value.unshift({
    id: reqId,
    method: 'PATCH',
    url: `/api/books/${book.id}`,
    status: '200 OK',
    statusClass: 'ok',
    reqBody: JSON.stringify({ read_pages: parsed, idempotency_key: idemKey || undefined }),
    resBody: JSON.stringify(book),
    note: '前后端与数据库完整闭环完成（详见第 23 篇）'
  })
  uiBanner.value = {
    type: 'ok',
    text: `保存成功（200 OK）：数据库已提交事务，当前进度 ${parsed} / ${book.total_pages} 页（${progressPercent.value}%）。`
  }
}
</script>

<template>
  <div class="reading-lab">
    <div class="lab-header">
      <div>
        <span class="lab-badge">交互式全链路沙盒</span>
        <h3>在线读书进度示例：一次 Web 操作经历了什么</h3>
        <p class="lab-sub">
          这个内置演练场把正文中贯穿全书的「读书记录」场景做成了一个无需安装环境的闭环模型。你可以亲手修改页数、切换故障模式，同时观察<strong>浏览器界面（第 18 篇）</strong>、<strong>F12 网络请求（第 17/28 篇）</strong>、<strong>后端校验与权限（第 19/22 篇）</strong>以及<strong>数据库事务与表记录（第 20/21/23 篇）</strong>是如何联动的。
        </p>
      </div>
      <button type="button" class="btn-secondary" @click="resetDemo">重置演示数据</button>
    </div>

    <!-- 故障与身份控制器 -->
    <div class="lab-controls">
      <div class="control-group">
        <label>当前模拟身份（第 22 篇 认证与授权）：</label>
        <select v-model="currentUser">
          <option value="owner">已登录：书目所有者 (owner)</option>
          <option value="guest">已登录：其他用户 (guest → 触发 403 越权拦截)</option>
          <option value="anonymous">未登录游客 (anonymous → 触发 401 未认证)</option>
        </select>
      </div>

      <div class="control-group">
        <label>模拟链路行为（第 17 / 21 / 23 篇）：</label>
        <select v-model="simulateMode">
          <option value="normal">正常通信与数据库事务提交 (200 OK)</option>
          <option value="optimistic">乐观更新假象：前端先变数字，但后端报错未保存</option>
          <option value="timeout">响应超时：后端其实已存库，但浏览器以为失败了</option>
          <option value="cors">跨域拦截：浏览器报 CORS policy 错误</option>
          <option value="500">服务端异常：数据库触发 ROLLBACK 回滚 (500)</option>
        </select>
      </div>
    </div>

    <!-- 主体双栏：左浏览器，右后端与数据库 -->
    <div class="lab-grid">
      <!-- 左侧：浏览器前端 -->
      <div class="lab-card">
        <div class="card-title">
          <span>🖥️ 1. 浏览器与前端页面状态（Memory / DOM）</span>
          <button type="button" class="btn-mini" @click="refreshBrowserPage">🔄 刷新浏览器页面</button>
        </div>

        <div class="book-tabs">
          <button
            v-for="b in dbBooks"
            :key="b.id"
            type="button"
            :class="['tab-btn', { active: b.id === selectedBookId }]"
            @click="switchBook(b.id)"
          >
            #{{ b.id }} 《{{ b.title }}》
          </button>
        </div>

        <div class="browser-box">
          <div class="progress-row">
            <div>
              <div class="book-name">《{{ currentBook.title }}》</div>
              <div class="book-meta">
                页面当前显示已读：<strong>{{ uiDisplayedPages }}</strong> / {{ currentBook.total_pages }} 页
                （<strong>{{ progressPercent }}%</strong>）
              </div>
            </div>
          </div>

          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: Math.min(progressPercent, 100) + '%' }"></div>
          </div>

          <div class="form-row">
            <label>输入新的已读页数：</label>
            <input v-model="inputPages" type="text" placeholder="试试输入 60、250 或 三本" />
            <button type="button" class="btn-primary" @click="saveProgress">点击保存 (PATCH)</button>
          </div>

          <div class="form-row idem-row">
            <label>可选请求标识（Idempotency-Key，防重试重复记日志）：</label>
            <input v-model="customIdempotencyKey" type="text" placeholder="例如 req-001（留空则不带幂等键）" />
          </div>

          <div :class="['status-banner', uiBanner.type]">
            {{ uiBanner.text }}
          </div>
        </div>

        <div class="quick-tips">
          <span>💡 动手试试：</span>
          <button type="button" class="chip" @click="inputPages = '三本'; simulateMode = 'normal'">输入 "三本" (类型错误)</button>
          <button type="button" class="chip" @click="inputPages = '999'; simulateMode = 'normal'">输入 999 (超出总页数)</button>
          <button type="button" class="chip" @click="inputPages = '80'; simulateMode = 'optimistic'">体验“假保存（乐观更新）”</button>
          <button type="button" class="chip" @click="inputPages = '75'; simulateMode = 'timeout'">体验“超时重发导致重复日志”</button>
        </div>
      </div>

      <!-- 右侧：SQLite 数据库实时状态 -->
      <div class="lab-card">
        <div class="card-title">
          <span>🗄️ 2. 服务端 SQLite 数据库（持久存储状态）</span>
          <span class="tag-mono">PRAGMA foreign_keys = ON</span>
        </div>

        <div class="db-section">
          <div class="db-table-title">表 1：<code>books</code>（书目主表，含 CHECK 范围约束）</div>
          <table class="lab-table">
            <thead>
              <tr>
                <th>id (PK)</th>
                <th>title</th>
                <th>total_pages</th>
                <th>read_pages</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in dbBooks" :key="b.id" :class="{ highlight: b.id === selectedBookId }">
                <td>{{ b.id }}</td>
                <td>{{ b.title }}</td>
                <td>{{ b.total_pages }}</td>
                <td><strong>{{ b.read_pages }}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="db-section">
          <div class="db-table-title">
            表 2：<code>reading_events</code>（阅读更新日志表，与主表在同一事务中写入）
          </div>
          <table class="lab-table">
            <thead>
              <tr>
                <th>#</th>
                <th>book_id (FK)</th>
                <th>page</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dbEvents.length === 0">
                <td colspan="3" class="empty-cell">暂无更新日志（点击左侧“保存”成功后会在此新增记录）</td>
              </tr>
              <tr v-for="ev in dbEvents.slice(0, 5)" :key="ev.event_id">
                <td>{{ ev.event_id }}</td>
                <td>{{ ev.book_id }}</td>
                <td>{{ ev.page }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 底部：模拟浏览器 F12 Network 面板与后端事务日志 -->
    <div class="lab-card lab-logs">
      <div class="card-title">
        <span>🔍 3. 模拟浏览器 F12 Network 面板 & 后端 SQL 事务日志（第 17 / 21 / 28 篇）</span>
      </div>

      <div v-if="networkLogs.length === 0" class="empty-log">
        尚未发送任何请求。点击上方「点击保存 (PATCH)」或「刷新浏览器页面」后，这里会展示完整的 HTTP 请求、状态码和响应体。
      </div>

      <div v-else class="log-list">
        <div v-for="log in networkLogs.slice(0, 4)" :key="log.id" class="log-item">
          <div class="log-head">
            <span class="log-method">{{ log.method }}</span>
            <code class="log-url">{{ log.url }}</code>
            <span :class="['log-status', log.statusClass]">{{ log.status }}</span>
            <span class="log-note">{{ log.note }}</span>
          </div>
          <div class="log-body">
            <div><strong>Payload (请求体):</strong> <code>{{ log.reqBody }}</code></div>
            <div><strong>Response (响应体):</strong> <code>{{ log.resBody }}</code></div>
          </div>
        </div>
      </div>

      <div v-if="serverLogs.length > 0" class="server-log-box">
        <div class="db-table-title">后端终端与数据库事务记录（最新 3 条）：</div>
        <div v-for="(s, idx) in serverLogs.slice(0, 3)" :key="idx" class="server-line">
          <code>{{ s }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reading-lab {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-size: 14px;
}
.lab-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}
.lab-header h3 {
  margin: 0.25rem 0 0.4rem;
  font-size: 1.15rem;
}
.lab-sub {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.lab-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 12px;
}
.lab-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
  padding: 0.85rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.control-group label {
  font-weight: 600;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
}
.control-group select,
.form-row input {
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 13.5px;
}
.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}
.lab-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem;
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.book-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.tab-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 13px;
}
.tab-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.browser-box {
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.book-name {
  font-weight: 700;
  font-size: 15px;
}
.book-meta {
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
.progress-bar-bg {
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-divider);
  overflow: hidden;
  margin: 0.65rem 0 0.85rem;
}
.progress-bar-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.25s ease;
}
.form-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.form-row label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.form-row input {
  flex: 1;
  min-width: 140px;
  background: var(--vp-c-bg);
}
.idem-row input {
  font-size: 12.5px;
}
.btn-primary {
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.btn-secondary,
.btn-mini {
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 12.5px;
  white-space: nowrap;
}
.status-banner {
  margin-top: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.45;
}
.status-banner.ok {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
}
.status-banner.err {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
}
.status-banner.warn {
  background: rgba(245, 158, 11, 0.14);
  border: 1px solid rgba(245, 158, 11, 0.4);
}
.status-banner.info {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.quick-tips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  font-size: 12px;
}
.chip {
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 12px;
}
.chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.db-section {
  margin-bottom: 0.75rem;
}
.db-table-title {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 0.35rem;
}
.lab-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 13px;
}
.lab-table th,
.lab-table td {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.lab-table tr.highlight {
  background: var(--vp-c-brand-soft);
}
.empty-cell,
.empty-log {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 0.75rem;
}
.tag-mono {
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  color: var(--vp-c-text-2);
}
.log-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.log-item {
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.log-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.log-method {
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
}
.log-status {
  padding: 1px 7px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
.log-status.ok {
  background: rgba(16, 185, 129, 0.16);
  color: #10b981;
}
.log-status.err {
  background: rgba(239, 68, 68, 0.16);
  color: #ef4444;
}
.log-status.warn {
  background: rgba(245, 158, 11, 0.18);
  color: #d97706;
}
.log-note {
  color: var(--vp-c-text-2);
  font-size: 12.5px;
}
.log-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.4rem;
  font-size: 12.5px;
}
.server-log-box {
  margin-top: 0.8rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.server-line {
  font-size: 12px;
  margin-top: 0.25rem;
}
</style>
