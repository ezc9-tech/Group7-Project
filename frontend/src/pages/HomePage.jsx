import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function HomePage() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [currentUser] = useState(() => {
    const userString = localStorage.getItem("user");
    if (!userString) return null;

    try {
      return JSON.parse(userString);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token || !currentUser) {
        navigate("/login");
        return;
      }

      if (currentUser.role !== "admin") {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/unapproved-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pending users");
        }

        const data = await response.json();
        setPendingUsers(data.unapprovedUsers || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, [navigate, currentUser]);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/approve-user/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to approve user");

      toast.success("User approved successfully!");
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeny = async (userId) => {
    if (
      !window.confirm("Are you sure you want to deny and delete this account?")
    )
      return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/deny/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to deny user");

      toast.success("User denied and removed.");
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (currentUser && currentUser.role !== "admin") {
    return (
      <div>
        <Navbar />
        <main className="under-construction">
          <h1 className="construction-icon">🚧</h1>
          <h2>Under Construction</h2>
          <p className="construction-text">
            The {currentUser.role} dashboard is currently being built.
            Check back soon!
          </p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />

      <main className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <h2>Pending Account Approvals</h2>

        {isLoading ? (
          <p>Loading pending accounts...</p>
        ) : pendingUsers.length === 0 ? (
          <p>No accounts are currently waiting for approval.</p>
        ) : (
          <div className="users-card-grid">
            {pendingUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-card-header">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <span className="role-badge">{user.role}</span>
                </div>

                <div className="user-card-body">
                  <p>
                    <strong>Email:</strong> {user.login?.email || user.email}
                  </p>
                  <p>
                    <strong>Requested:</strong>{" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="user-card-actions">
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="approve-btn icon-btn"
                    title="Approve User"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeny(user.id)}
                    className="deny-btn icon-btn"
                    title="Deny User"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
