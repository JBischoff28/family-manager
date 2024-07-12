import { Head } from "@inertiajs/react";

export default function NotFound() {
  return (
    <>
      <Head title="Not Found" />
      <div className="container">
        <div className="title">Resource not found</div>

        <span>This Resource does not exist.</span>
        <span>Please try to make your request again. If this error persists, please reach out to our support team.</span>
      </div>
    </>
  )
}