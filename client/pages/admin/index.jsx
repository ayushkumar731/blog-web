import Admin from '@/container/Admin';
import { PrivateRoute } from '@/components/Routes';

const AdminContainer = () => (
  <PrivateRoute render={(props) => <Admin {...props} />} />
);

export default AdminContainer;
