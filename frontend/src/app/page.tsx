// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  return (
    <div>
      <h1>Welcome to the Coin Dashboard!</h1>
      {date ? (
	<p>Current date and time: {date}</p>
      ) :( 
        <p>Loading date and time...</p>
      )}
    </div>
  );
}
