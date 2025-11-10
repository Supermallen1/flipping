export const metadata = { title: 'Work App', description: 'Prototype' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:'system-ui, Arial'}}>{children}</body>
    </html>
  );
}
