import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 pt-24">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome, Admin. User subscription data will be displayed here.</p>
        {/* We will build the user list and functions here later */}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;