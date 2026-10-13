import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

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
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="text-center mt-5 pt-5">
          <h1 className="display-1 mb-3">🚧</h1>
          <h2 className="fw-bold">Under Construction</h2>
          <p className="text-muted fs-5 mt-3">
            The{" "}
            <span className="text-capitalize fw-semibold">
              {currentUser.role}
            </span>{" "}
            dashboard is currently being built. Check back soon!
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Toaster position="top-center" />

      <Container className="py-5">
        <div className="mb-4">
          <h1 className="fw-bold">Admin Dashboard</h1>
          <h2 className="h4 text-muted">Pending Account Approvals</h2>
        </div>

        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" role="status" />
            <p className="mt-3 text-muted">Loading pending accounts...</p>
          </div>
        ) : pendingUsers.length === 0 ? (
          <Alert variant="info" className="text-center py-4 border-0 shadow-sm">
            No accounts are currently waiting for approval.
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {pendingUsers.map((user) => (
              <Col key={user.id}>
                <UserCard
                  user={user}
                  onApprove={handleApprove}
                  onDeny={handleDeny}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
