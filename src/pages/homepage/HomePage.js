import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Task Master</h1>
        <h2 style={styles.subtitle}>
          Collaborate effortlessly with your team. Create tasks, assign them,
          and track progress to get work done seamlessly.
        </h2>
      </header>

      <footer style={styles.footer}>
        <Link to={"/about"} style={styles.footerLink}>
          About
        </Link>{" "}
        |
        <a href="mailto:support@taskmaster.com" style={styles.footerLink}>
          <span style={styles.emailIcon}>✉</span> Email Us
        </a>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f4f7fa",
    color: "#333",
  },
  header: {
    flex: 1,
    textAlign: "center",
    padding: "40px",
  },
  title: {
    fontSize: "3rem",
    color: "#2c3e50",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#7f8c8d",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.4",
  },
  footer: {
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  },
  footerLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "1.1rem",
  },
  emailIcon: {
    fontSize: "1.2rem",
    verticalAlign: "middle",
  },
};

export default HomePage;
