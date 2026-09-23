import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { JobProvider } from "../context/JobContext";

export const metadata = {
  title: "JobPortal - Find Your Dream Job",
  description: "Find your dream job with JobPortal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <AuthProvider>
          <JobProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </JobProvider>
        </AuthProvider>
      </body>
    </html>
  );
}