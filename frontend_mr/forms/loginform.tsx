import React from 'react';

export default function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}
