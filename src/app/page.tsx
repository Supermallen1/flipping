'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    const n = localStorage.getItem('userName');
    const l = localStorage.getItem('language');
    setName(n);
    setLang(l);
  }, []);

  if (!name || !lang) {
    return <Onboarding />;
  }

  return (
    <main style={{minHeight:'100vh', background:'#e5e7eb', padding:16}}>
      <h1 style={{textAlign:'center', margin:'12px 0'}}>Home</h1>
      <div style={{display:'flex', flexDirection:'column', gap:12, maxWidth:420, margin:'0 auto'}}>
        <Link href="/properties" style={btnStyle}>🏡 Properties</Link>
        <button style={btnStyle} disabled>🎨 Design (coming soon)</button>
        <button style={btnStyle} disabled>👷 Contractors (coming soon)</button>
        <button style={btnStyle} disabled>💬 Messaging (coming soon)</button>
      </div>
    </main>
  );
}

function Onboarding() {
  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState<'en'|'es'|''>('');

  const save = () => {
    if (!fullName || !language) return;
    localStorage.setItem('userName', fullName);
    localStorage.setItem('language', language);
    location.reload();
  };

  return (
    <main style={{minHeight:'100vh', display:'grid', placeItems:'center'}}>
      <div style={{width:360, maxWidth:'90vw', padding:16, border:'1px solid #ddd', borderRadius:12}}>
        <h2 style={{marginTop:0}}>Welcome</h2>
        <label style={{display:'block', marginBottom:8}}>Full name</label>
        <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name"
          style={inputStyle}/>
        <div style={{height:8}}/>
        <label style={{display:'block', marginBottom:8}}>Language</label>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>setLanguage('en')} style={language==='en'?chipOn:chipOff}>English</button>
          <button onClick={()=>setLanguage('es')} style={language==='es'?chipOn:chipOff}>Español</button>
        </div>
        <div style={{height:16}}/>
        <button onClick={save} style={{...btnStyle, width:'100%'}}>Continue</button>
      </div>
    </main>
  );
}

const btnStyle: React.CSSProperties = {
  display:'block', width:'100%', padding:'14px 16px',
  borderRadius:12, border:'1px solid #d1d5db', background:'white', textAlign:'left', fontSize:18
};
const inputStyle: React.CSSProperties = {
  width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid #d1d5db', fontSize:16
};
const chipOn: React.CSSProperties = { padding:'8px 12px', borderRadius:999, border:'1px solid #111', background:'#111', color:'white' };
const chipOff: React.CSSProperties = { padding:'8px 12px', borderRadius:999, border:'1px solid #d1d5db', background:'white' };
