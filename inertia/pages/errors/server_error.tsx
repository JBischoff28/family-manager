import { Head } from "@inertiajs/react";

export default function ServerError(props: { error: any }) {
  return (
    <>
      <Head title="Server Error" />
      <div className="container">
        <div className="title">Server Error</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}