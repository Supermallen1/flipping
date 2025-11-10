'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function NewProperty() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const save = async () => {
    if (!nickname) return;
    const { error } = await supabase.from('properties').insert({ nickname });
    if (!error) router.push('/properties');
  };

  return (
    <main style={{minHeight:'100vh', display:'grid', placeItems:'center'}}>
      <div style={{width:360, maxWidth:'90vw', padding:16, border:'1px solid #ddd', borderRadius:12}}>
        <h2 style={{marginTop:0}}>Add Property</h2>
        <input value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Nickname"
          style={{width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid #d1d5db', fontSize:16}}/>
        <div style={{height:16}}/>
        <button onClick={save} style={{display:'block', width:'100%', padding:'12px 16px', borderRadius:12, border:'1px solid #d1d5db'}}>Save</button>
      </div>
    </main>
  );
}
