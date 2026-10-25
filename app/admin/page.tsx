'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase/client';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from 'recharts';

type Profile = { id: string; full_name: string; role: 'admin' | 'sales'; phone?: string };
type Lead = {
  id: string; created_at: string; name: string; email: string; phone: string;
  company: string; country: string; message: string; source: string;
  status: 'new' | 'contacting' | 'qualified' | 'deal' | 'lost';
  owner_id: string | null; owner?: { full_name: string; role: string } | null;
};
type Stats = {
  totalPv: number; todayPv: number; uniqueVisitors: number;
  trend: { date: string; pv: number }[];
  byPage: { name: string; value: number }[];
  byCountry: { name: string; value: number }[];
  bySource: { name: string; value: number }[];
};

const STATUS_LABEL: Record<string, string> = {
  new: '新询盘', contacting: '跟进中', qualified: '意向客户', deal: '已成交', lost: '无效',
};

export default function AdminPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [tab, setTab] = useState<'leads' | 'stats' | 'users'>('leads');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [filter, setFilter] = useState('');

  // 新增客户表单
  const [nf, setNf] = useState({ name: '', email: '', phone: '', company: '', country: '', message: '', owner_id: '' });
  const [showForm, setShowForm] = useState(false);

  const api = useCallback(async (path: string, method = 'GET', body?: unknown) => {
    const sb = getBrowserSupabase();
    const session = (await sb.auth.getSession()).data.session;
    if (!session) throw new Error('no session');
    const res = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }, []);

  const loadMe = useCallback(async () => {
    try {
      const me = await api('/api/admin/me');
      setProfile(me.profile);
    } catch {
      setProfile(null);
    }
  }, [api]);

  const loadLeads = useCallback(async () => {
    const q = filter ? `?status=${filter}` : '';
    const data = await api('/api/admin/leads' + q);
    setLeads(data.leads || []);
  }, [api, filter]);

  const loadStats = useCallback(async () => {
    setStats(await api('/api/admin/stats'));
  }, [api]);

  const loadUsers = useCallback(async () => {
    try {
      const data = await api('/api/admin/users');
      setUsers(data.users || []);
    } catch { /* 非admin */ }
  }, [api]);

  useEffect(() => { loadMe(); }, [loadMe]);

  useEffect(() => {
    if (!profile) return;
    loadLeads();
    if (profile.role === 'admin') loadUsers();
  }, [profile, loadLeads, loadUsers]);

  useEffect(() => { if (tab === 'stats') loadStats(); }, [tab, loadStats]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr('');
    const sb = getBrowserSupabase();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { setLoginErr('邮箱或密码错误'); return; }
    await loadMe();
  };

  const logout = async () => {
    await getBrowserSupabase().auth.signOut();
    setProfile(null);
  };

  const setStatus = async (lead: Lead, status: string) => {
    await api('/api/admin/leads', 'PATCH', { id: lead.id, status });
    loadLeads();
  };

  const assign = async (lead: Lead, owner_id: string) => {
    await api('/api/admin/leads', 'PATCH', { id: lead.id, owner_id });
    loadLeads();
  };

  const addLead = async (e: React.FormEvent) => {
    e.preventDefault();
    await api('/api/admin/leads', 'POST', nf);
    setNf({ name: '', email: '', phone: '', company: '', country: '', message: '', owner_id: '' });
    setShowForm(false);
    loadLeads();
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    await api('/api/admin/users', 'POST', {
      email: fd.get('email'), password: fd.get('password'),
      full_name: fd.get('full_name'), phone: fd.get('phone'), role: fd.get('role'),
    });
    loadUsers();
    (e.currentTarget as HTMLFormElement).reset();
  };

  if (!profile) {
    return (
      <div className="ab-wrap">
        <form className="ab-card ab-login" onSubmit={login}>
          <h1>客户管理后台登录</h1>
          <label>邮箱<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
          <label>密码<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
          {loginErr && <p className="ab-muted" style={{ color: 'var(--bad)' }}>{loginErr}</p>}
          <button className="ab-btn" type="submit">登录</button>
        </form>
      </div>
    );
  }

  return (
    <div className="ab-wrap">
      <div className="ab-top">
        <h1>ADC12 客户管理后台</h1>
        <div className="ab-row">
          <span className="ab-user">{profile.full_name || profile.id}（{profile.role === 'admin' ? '管理员' : '销售'}）</span>
          <button className="ab-btn ghost sm" onClick={logout}>退出</button>
        </div>
      </div>

      <div className="ab-tabs">
        <button className={'ab-tab' + (tab === 'leads' ? ' active' : '')} onClick={() => setTab('leads')}>客户询盘</button>
        <button className={'ab-tab' + (tab === 'stats' ? ' active' : '')} onClick={() => setTab('stats')}>访问统计</button>
        {profile.role === 'admin' && (
          <button className={'ab-tab' + (tab === 'users' ? ' active' : '')} onClick={() => setTab('users')}>账号管理</button>
        )}
      </div>

      {tab === 'leads' && (
        <div className="ab-card">
          <div className="ab-row" style={{ marginBottom: 12 }}>
            <select value={filter} onChange={(e) => { setFilter(e.target.value); }}>
              <option value="">全部状态</option>
              {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button className="ab-btn sm" onClick={() => setShowForm(!showForm)}>+ 手动添加客户</button>
          </div>

          {showForm && (
            <form className="ab-form" onSubmit={addLead} style={{ marginBottom: 16 }}>
              <label>姓名<input required value={nf.name} onChange={(e) => setNf({ ...nf, name: e.target.value })} /></label>
              <label>邮箱<input value={nf.email} onChange={(e) => setNf({ ...nf, email: e.target.value })} /></label>
              <label>电话/WhatsApp<input value={nf.phone} onChange={(e) => setNf({ ...nf, phone: e.target.value })} /></label>
              <label>国家/地区<input value={nf.country} onChange={(e) => setNf({ ...nf, country: e.target.value })} /></label>
              <label>公司<input value={nf.company} onChange={(e) => setNf({ ...nf, company: e.target.value })} /></label>
              {profile.role === 'admin' && (
                <label>负责人<select value={nf.owner_id} onChange={(e) => setNf({ ...nf, owner_id: e.target.value })}>
                  <option value="">不分配</option>
                  {users.map((u) => <option key={u.id} value={u.id}>{u.full_name || u.id}</option>)}
                </select></label>
              )}
              <label className="full">需求留言<textarea rows={3} value={nf.message} onChange={(e) => setNf({ ...nf, message: e.target.value })} /></label>
              <button className="ab-btn sm" type="submit">保存客户</button>
            </form>
          )}

          <table className="ab-table">
            <thead>
              <tr><th>时间</th><th>姓名</th><th>联系方式</th><th>公司/国家</th><th>需求</th><th>状态</th><th>负责人</th></tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="ab-muted">{new Date(l.created_at).toLocaleString('zh-CN')}</td>
                  <td>{l.name}</td>
                  <td>
                    <div>{l.email}</div>
                    <div className="ab-muted">{l.phone}</div>
                  </td>
                  <td><div>{l.company}</div><div className="ab-muted">{l.country}</div></td>
                  <td style={{ maxWidth: 220 }}>{l.message}</td>
                  <td>
                    <select value={l.status} onChange={(e) => setStatus(l, e.target.value)}>
                      {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td>
                    {profile.role === 'admin' ? (
                      <select value={l.owner_id || ''} onChange={(e) => assign(l, e.target.value)}>
                        <option value="">未分配</option>
                        {users.map((u) => <option key={u.id} value={u.id}>{u.full_name || u.id}</option>)}
                      </select>
                    ) : (l.owner?.full_name || '未分配')}
                  </td>
                </tr>
              ))}
              {!leads.length && <tr><td colSpan={7} className="ab-muted">暂无客户</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'stats' && stats && (
        <>
          <div className="ab-stats">
            <div className="ab-stat"><div className="n">{stats.totalPv}</div><div className="l">总访问量 PV</div></div>
            <div className="ab-stat"><div className="n">{stats.todayPv}</div><div className="l">今日访问</div></div>
            <div className="ab-stat"><div className="n">{stats.uniqueVisitors}</div><div className="l">独立访客</div></div>
          </div>
          <div className="ab-card">
            <h3>近14天访问趋势</h3>
            <div className="ab-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="pv" stroke="#1f6f8b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="ab-grid2">
            <div className="ab-card"><h3>页面访问</h3><BarChart data={stats.byPage} layout="vertical" width={480} height={240}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#1f6f8b" /></BarChart></div>
            <div className="ab-card"><h3>来源渠道</h3><BarChart data={stats.bySource} layout="vertical" width={480} height={240}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#2e7d32" /></BarChart></div>
            <div className="ab-card"><h3>国家/地区</h3><BarChart data={stats.byCountry} layout="vertical" width={480} height={240}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#e08600" /></BarChart></div>
          </div>
        </>
      )}

      {tab === 'users' && profile.role === 'admin' && (
        <div className="ab-card">
          <h3>创建销售账号</h3>
          <form className="ab-form" onSubmit={createUser}>
            <label>姓名<input name="full_name" required /></label>
            <label>邮箱<input name="email" type="email" required /></label>
            <label>初始密码(≥6位)<input name="password" type="password" required /></label>
            <label>电话<input name="phone" /></label>
            <label>角色<select name="role"><option value="sales">销售</option><option value="admin">管理员</option></select></label>
            <button className="ab-btn sm" type="submit">创建账号</button>
          </form>
          <h3 style={{ marginTop: 20 }}>成员列表</h3>
          <table className="ab-table">
            <thead><tr><th>姓名</th><th>角色</th><th>电话</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}><td>{u.full_name}</td><td>{u.role === 'admin' ? '管理员' : '销售'}</td><td>{u.phone}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
