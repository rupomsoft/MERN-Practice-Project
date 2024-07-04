import React, { useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function SwrFetchingPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  if (error) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Alert variant="danger">Failed to load. Please try again later.</Alert>
      </div>
    );
  }

  // Loading state
  if (!data) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / limit);

  return (
    <Container className="py-5">
      <h1>Posts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>{" "}
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>{" "}
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default SwrFetchingPage;
