// React
import { Suspense } from 'react';
// Components
import Login from './Login.component';
// Page
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
