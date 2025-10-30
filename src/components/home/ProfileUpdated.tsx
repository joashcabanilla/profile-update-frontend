"use client";

//style utils and variants
import { cn } from "@/lib/utils";
import { card, text } from "@/lib/variants";

//components
import { Button } from "@/components/ui/button";

export default function ProfileUpdate() {
  return (
    <div className="sm:px-20">
      <div className={cn(card({ variant: "signIn" }))}>
        <div
          className={cn(
            text({
              font: "mono",
              align: "left",
              size: "lg",
              weight: "lg"
            }),
            "border-primary bg-primary/3 text-primary rounded-2xl border-2 border-double p-2"
          )}
        >
          <p>Thank you! Your profile has been successfully updated.</p>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Button
            type="button"
            className="w-1/4 cursor-pointer font-bold"
            onClick={() => {
              window.location.reload();
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
