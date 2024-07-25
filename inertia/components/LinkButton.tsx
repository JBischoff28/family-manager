import { Link } from "@inertiajs/react";

interface Props {
	link: string;
	buttonText: string;
}

export default function LinkButton({ link, buttonText }: Props) {
	return (
		<Link
			href={`${link}`}
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#333',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textDecoration: 'none'
      }}>
				{buttonText}
			</Link>
	)
}