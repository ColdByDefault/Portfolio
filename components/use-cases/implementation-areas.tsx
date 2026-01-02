import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface ImplementationAreasProps {
  areas: string[];
}

export function ImplementationAreas({ areas }: ImplementationAreasProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Lightbulb className="h-4 w-4" />
        Use Cases
      </h4>
      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <Badge key={area} variant="outline" className="font-normal">
            {area}
          </Badge>
        ))}
      </div>
    </div>
  );
}
