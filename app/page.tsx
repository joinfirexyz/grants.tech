"use client";

import { useEffect, useState } from "react";
import { HomePage } from "./homePage";

export default function Homepage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <HomePage />;
}
