
import MaternalDashboard from '../components/pages/MaePage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function MaeDashboardPage() {
  return (
    <ProtectedRoute allowedTypes={['mae_solo']}>
      <MaternalDashboard />
    </ProtectedRoute>
  );
}