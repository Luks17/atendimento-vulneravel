import Navbar from "../ui/dashboard/navbar";
import Sidebar from "../ui/dashboard/sidebar";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <main>
          {children}
        </main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  )
}

export default Layout;
