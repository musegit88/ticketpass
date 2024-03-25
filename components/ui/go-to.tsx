"use client";

import Link from "next/link";
import { Button } from "./button";

type GoToProps = {
  description: string;
  to: string;
  linkTitle: string | undefined;
};

const GoTo = ({ description, to, linkTitle }: GoToProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-sm leading-5">{description}</p>
      <Button asChild size="sm">
        <Link href={to}>{linkTitle}</Link>
      </Button>
    </div>
  );
};

export default GoTo;
