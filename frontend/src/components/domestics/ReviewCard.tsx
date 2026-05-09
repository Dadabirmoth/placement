import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { Review } from "@/data/profile";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-primary/10">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary/10">
            <AvatarFallback className="text-primary font-medium">
              {review.reviewerInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{review.reviewerName}</p>
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">
            {review.date}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}