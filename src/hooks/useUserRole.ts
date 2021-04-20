import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';

interface TokenJWT {
  role: string;
}

export function useUserRole() {
  const [role, setRole] = useState<string>('null');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = jwtDecode<TokenJWT>(token)?.role;
      setRole(userRole);
    }
  });

  return role;
}
