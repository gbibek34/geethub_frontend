import React from "react";
import { Alert } from "react-bootstrap";

export default function Success({msg}) {
  return (
    <div>
      <Alert variant='success'>{msg}</Alert>
    </div>
  );
}