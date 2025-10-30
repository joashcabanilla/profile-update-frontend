"use client";

//hooks
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

//context global state
import { useMemberContext } from "@/context/member-context";

//style utils
import { cn } from "@/lib/utils";
import { container, card, text } from "@/lib/variants";

//icons
import { LoaderCircle } from "lucide-react";

//assets
import Logo from "@/assets/images/logo1.png";

//components
import Terms from "@/components/home/Terms";
import SwitchTheme from "@/components/home/SwitchTheme";
import StepIndicator from "@/components/home/StepIndicator";
import Step1 from "@/components/home/Step1";
import Step2 from "@/components/home/Step2";
import Step3 from "@/components/home/Step3";

export default function MainLayout() {
  const { setMember, step, member } = useMemberContext();
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<undefined | string>(undefined);

  const activeStep = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />
  }[step];
  useEffect(() => {
    const getMemberList = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/member/getMemberList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const data = await res.json();
      if (data?.success) {
        setMember(data.data);
      }
    };

    getMemberList();

    if (resolvedTheme) {
      setTheme(resolvedTheme);
    }
  }, [setMember, resolvedTheme]);

  return (
    <div className={container()}>
      <Terms />
      <div className={cn(card({ align: "center", variant: "maxWidth650px" }), "grid gap-10")}>
        <div className="grid gap-4">
          <div className="flex w-full items-center justify-between">
            <Image
              src={Logo}
              alt="Logo"
              draggable={false}
              priority
              className="w-8/12 max-w-[300px]"
            />
            <div className="flex items-center">
              <SwitchTheme resolvedTheme={theme} />
            </div>
          </div>
          <h1
            className={text({
              font: "title",
              align: "center",
              size: "xl",
              weight: "lg"
            })}
          >
            Update Member Profile
          </h1>
        </div>
        <StepIndicator />
        {member.length > 0 ? (
          activeStep
        ) : (
          <div className="text-muted-foreground flex h-16 flex-row content-center items-center justify-center gap-2">
            <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} />
            <div className="text-muted-foreground">Fetching Member List...</div>
          </div>
        )}
      </div>
    </div>
  );
}
