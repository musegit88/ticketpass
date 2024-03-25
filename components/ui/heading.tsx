import { LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description?: string;
  icon: LucideIcon;
}

const Heading = ({ title, description, icon: Icon }: HeadingProps) => {
  return (
    <div className="flex gap-2 mb-8">
      <div>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="font-medium text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Icon size={28} />
    </div>
  );
};

export default Heading;
