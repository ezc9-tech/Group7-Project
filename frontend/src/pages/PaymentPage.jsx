import Navbar from "../components/Navbar";
import { Container } from "react-bootstrap";
import {useState} from "react";

function PaymentPage() {
  const [form, setForm] = useState({
    nameCard: "",
    cardNum: "",
    expire: "",
    cvv: "",
    address: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <Container>
        <h1 style={{ fontWeight: 700 }}>Payment info</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "480px",
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <label>
            Name on card
            <input
              name="nameCard"
              value={form.nameCard}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            Card number
            <input
              name="cardNum"
              value={form.cardNum}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            Expiration date (MM/YY)
            <input
              name="expire"
              value={form.expire}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            cvv
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            Billing address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            State
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label>
            ZIP code
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <button type="submit">Save payment info</button>
        </form>
      </Container>
    </div>
  );
}

export default PaymentPage;
