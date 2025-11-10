'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Property = {
  id: string;
  nickname: string;
};

export default function Properties() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('properties').select('id,nickname').order('created_at', { ascending: false });
      if (!error && data) setItems(data as any);
      setLoading(false);
    };
    load();

    // Realtime subscription
    const channel = supabase.channel('realtime:properties')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, (payload) => {
        // re-fetch on any change
        supabase.from('properties').select('id,nickname').order('created_at', { ascending: false }).then(({ data }) => {
          if (data) setItems(data as any);
        });
      }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <main style={{minHeight:'100vh', background:'#e5e7eb', padding:16}}>
      <header style={{textAlign:'center', marginBottom:12}}>
        <h1 style={{margin:0}}>Properties</h1>
      </header>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:480, margin:'0 auto'}}>
        {loading && <div>Loading…</div>}
        {items.map(p => (
          <Link key={p.id} href={`/property/${p.id}`} style={tileStyle}>{p.nickname}</Link>
        ))}
        <Link href="/properties/new" style={{...tileStyle, borderStyle:'dashed'}}>Add New +</Link>
      </div>
    </main>
  );
}

const tileStyle: React.CSSProperties = {
  display:'grid', placeItems:'center', padding:'24px 12px',
  border:'1px solid #d1d5db', borderRadius:12, background:'white', minHeight:80, textAlign:'center'
};
