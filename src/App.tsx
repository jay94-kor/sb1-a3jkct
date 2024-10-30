import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

// 동적 임포트로 변경
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProjectManagement = lazy(() => import('./pages/ProjectManagement'));
const POManagement = lazy(() => import('./pages/POManagement'));
const BudgetManagement = lazy(() => import('./pages/BudgetManagement'));

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/po" element={<POManagement />} />
                <Route path="/budget" element={<BudgetManagement />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;