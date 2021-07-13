import ErrorBoundary from '@/components/ErrorBoundary';
import App from 'app';

const AppRoot = (props: { children: any }) => {
  const { children } = props;
  return (
    <ErrorBoundary>
      <App>{children}</App>
    </ErrorBoundary>
  );
};

export default AppRoot;
