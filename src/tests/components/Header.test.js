import { render, screen } from "@testing-library/react";
import { Link } from "react-router-dom";
import App from "../../App";
import Header from "../../components/navbar/Header";

test("renders navbar with visible link children", () => {
  render(
    <App>
      <Header>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Header>
    </App>
  );
  const loginLink = screen.getByText(/Loading/i);
  expect(loginLink).toBeInTheDocument();
});
