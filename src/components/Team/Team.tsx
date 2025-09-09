import { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import Card from "../ui/Card/Card";
import Spinner from "../ui/Spinner/Spinner";
import styles from "./Team.module.scss";
import { useUsers } from "../../hooks/useUsers";
import type { User } from "../../api/types";

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMorePages, setHasMorePages] = useState(true);

  const { data, isLoading, error, refetch } = useUsers(currentPage, 6);

  // Listen for successful user registration and reset to first page
  useEffect(() => {
    const handleUserRegistered = () => {
      setCurrentPage(1);
      setAllUsers([]);
      setHasMorePages(true);
      refetch();
    };

    // Listen for custom event when user is successfully registered
    window.addEventListener("userRegistered", handleUserRegistered);

    return () => {
      window.removeEventListener("userRegistered", handleUserRegistered);
    };
  }, [refetch]);

  // Update all users when new data arrives
  useEffect(() => {
    if (data && data.success) {
      if (currentPage === 1) {
        // First page - replace all users only if they're different
        setAllUsers((prev) => {
          if (prev.length === 0 || prev[0]?.id !== data.users[0]?.id) {
            return data.users;
          }
          return prev;
        });
      } else {
        // Subsequent pages - append new users
        setAllUsers((prev) => {
          const newUsers = data.users.filter(
            (newUser) =>
              !prev.some((existingUser) => existingUser.id === newUser.id)
          );
          return [...prev, ...newUsers];
        });
      }

      // Update hasMorePages based on API response
      setHasMorePages(data.page < data.total_pages);
    }
  }, [data, currentPage]);

  const handleShowMore = () => {
    if (hasMorePages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setAllUsers([]);
    setHasMorePages(true);
    refetch();
  };

  if (error) {
    return (
      <section className={styles.team}>
        <h2>Working with GET request</h2>
        <div className={styles.error}>
          <p>Failed to load users. Please try again.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.team}>
      <h2>Working with GET request</h2>

      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <Spinner size="large" color="secondary" />
        </div>
      ) : (
        <>
          <ul>
            {allUsers.map((user) => (
              <li key={user.id}>
                <Card
                  name={user.name}
                  position={user.position}
                  email={user.email}
                  phone={user.phone}
                  avatar={user.photo}
                  type="normal"
                />
              </li>
            ))}
          </ul>

          {isLoading && currentPage > 1 && (
            <div className={styles.loadingMore}>
              <Spinner />
            </div>
          )}

          {hasMorePages && (
            <Button onClick={handleShowMore} disabled={isLoading}>
              Show more
            </Button>
          )}

          {allUsers.length > 6 && (
            <Button onClick={handleReset} variant="primary">
              Reset to first page
            </Button>
          )}
        </>
      )}
    </section>
  );
};

export default Team;
