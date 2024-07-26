import { Head } from "@inertiajs/react";
import LinkButton from "~/components/LinkButton";

export default function ServerError(props: { error: any, prevURL?: string }) {

  return (
    <>
      <Head title="Server Error" />
      <div className="container">
        <div className="title">Server Error</div>

        <span>{props.error.message}</span>
        {props.prevURL && <LinkButton link={props.prevURL} buttonText="Back" />}
      </div>
    </>
  )
}