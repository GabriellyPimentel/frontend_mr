
import ProfissionalPage from '../components/pages/ProfissionalPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function ProfissionalDashboardPage() {
  return (
    <ProtectedRoute allowedTypes={['profissional']}>
      <ProfissionalPage />
    </ProtectedRoute>
  );
}