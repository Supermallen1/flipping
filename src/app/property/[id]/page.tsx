'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PropertyPage() {
  const params = useParams();
  const id = params?.id as string;
  const [prop, setProp] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('properties').select('*').eq('id', id).single();
      setProp(data);
    };
    load();
  }, [id]);

  if (!prop) return <main style={{padding:16}}>Loading…</main>;

  return (
    <main style={{minHeight:'100vh', background:'#e5e7eb', padding:16}}>
      <h1>{prop.nickname}</h1>
      <p>Property detail page stub. (We’ll add photo/address/sections next.)</p>
    </main>
  );
}
