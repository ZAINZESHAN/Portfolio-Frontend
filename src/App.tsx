import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { PublicAdminRoute } from "@/components/admin/PublicAdminRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminProjectsPage } from "@/pages/admin/AdminProjectsPage";
import { AdminMessagesPage } from "@/pages/admin/AdminMessagesPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Portfolio Routes */}
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/about" element={<PortfolioPage />} />
            <Route path="/projects" element={<PortfolioPage />} />
            <Route path="/contact" element={<PortfolioPage />} />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={
                <PublicAdminRoute>
                  <AdminLoginPage />
                </PublicAdminRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="messages" element={<AdminMessagesPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
