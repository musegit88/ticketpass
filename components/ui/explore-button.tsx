import Link from "next/link"
import { Button } from "./button"

type ExploreButtonProps = {
    label:string
    path:string
    className?:string
}

const ExploreButton = ({className,label,path}:ExploreButtonProps) => {
  return (
    <Button asChild className={className}><Link href={path}>{label}</Link></Button>
  )
}

export default ExploreButton