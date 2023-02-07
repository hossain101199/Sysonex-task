import Link from "next/link";

const LinkText = ({ path = "/", title = "" }) => {
  return (
    <span className="link">
      <Link href={path} >
        {title}
      </Link>
    </span>
  );
};

export default LinkText;
