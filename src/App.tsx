import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Estimate from "./pages/Estimate";
import Portal from "./pages/Portal";
import About from "./pages/About";
import Auth from "./pages/Auth";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AdsDashboard from "./pages/dashboard/AdsDashboard";
import WebsiteDashboard from "./pages/dashboard/WebsiteDashboard";
import OrganicDashboard from "./pages/dashboard/OrganicDashboard";
import AssetsDashboard from "./pages/dashboard/AssetsDashboard";
import SettingsPage from "./pages/dashboard/SettingsPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminClients from "./pages/admin/AdminClients";
import AdminClientDetail from "./pages/admin/AdminClientDetail";
import AdminMessages from "./pages/admin/AdminMessages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
              <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
              <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
              <Route path="/estimate" element={<PublicLayout><Estimate /></PublicLayout>} />
              <Route path="/portal" element={<PublicLayout><Portal /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="ads" element={<AdsDashboard />} />
                <Route path="website" element={<WebsiteDashboard />} />
                <Route path="organic" element={<OrganicDashboard />} />
                <Route path="assets" element={<AssetsDashboard />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Admin dashboard */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="clients/:userId" element={<AdminClientDetail />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>

              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
