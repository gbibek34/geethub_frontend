import React from "react";
import { Alert } from "react-bootstrap";

export default function Error({error}) {
  return (
    <div>
      <Alert variant='danger'>{error}</Alert>
    </div>
  );
}
