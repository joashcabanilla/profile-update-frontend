"use client";

//hooks
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { format, isValid, parse } from "date-fns";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card, button } from "@/lib/variants";

//icons
import { CircleX, LoaderCircle } from "lucide-react";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProfileUpdated from "@/components/home/ProfileUpdated";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member, updateProfileInput } from "@/types/type";

export default function Step3() {
  const { memberId, searchedMember, setStep, stepCompleted, setStepCompleted } = useMemberContext();
  const profileFormRef = useRef<HTMLFormElement>(null);
  const [cpnumberRef, emailRef, tinRef, birthdateRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  const birthdatePrevRef = useRef("");

  const [cpnumberState, setCpnumberState] = useState<string>("");
  const [emailState, setEmailState] = useState<string>("");
  const [tinState, setTinState] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [birthdateInput, setBirthdateInput] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date>(new Date());

  const memberData: Member[] = searchedMember.filter((data) => data.id == memberId && data);

  const { id, memid, pbno, firstname, middlename, lastname, branch } = memberData[0];

  const memberInfo: updateProfileInput[][] = [
    [
      {
        id: "pbno",
        type: "text",
        label: "PB#",
        value: pbno ?? "No Data",
        class: pbno ? "text-foreground" : "text-muted-foreground",
        disabled: true
      },
      {
        id: "memid",
        type: "text",
        label: "Member ID",
        value: memid ?? "No Data",
        class: memid ? "text-foreground" : "text-muted-foreground",
        disabled: true
      }
    ],
    [
      {
        id: "memberName",
        type: "text",
        label: "Name",
        value: `${firstname} ${middlename ?? ""} ${lastname}`,
        disabled: true
      },
      {
        id: "branch",
        type: "text",
        label: "Branch",
        value: branch.toUpperCase(),
        disabled: true
      },
      {
        id: "cpnumber",
        type: "text",
        label: "Contact No.",
        disabled: false,
        ref: cpnumberRef,
        value: cpnumberState,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          /^\d*$/.test(e.target.value) && setCpnumberState(e.target.value),
        maxLength: 11,
        required: true,
        onClear: () => setCpnumberState(""),
        clearClass: cpnumberState ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        disabled: false,
        ref: emailRef,
        value: emailState,
        required: true,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmailState(e.target.value),
        onClear: () => setEmailState(""),
        clearClass: emailState ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"
      },
      {
        id: "tin",
        type: "text",
        label: "Tin No.",
        disabled: false,
        ref: tinRef,
        value: tinState,
        required: false,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTinState(e.target.value),
        onClear: () => setTinState(""),
        clearClass: tinState ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"
      }
    ]
  ];

  const [isPending, startTransition] = useTransition();

  const handleProfileForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      id: id,
      cpNumber: cpnumberState,
      email: emailState,
      tinNumber: tinState === "" ? undefined : tinState,
      birthdate: birthdateInput === "" ? undefined : new Date(birthdateInput)
    };

    startTransition(async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/member/updateMember`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStepCompleted(true);
      } else {
        const errors = await res.json();
        const errorMessage = errors?.errors[Object.keys(errors?.errors)[0]][0];
        toast.error(errorMessage, { duration: 3000 });
      }
    });
  };

  const handleBirhtdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalendarOpen(true);
    const input = e.target.value;
    const inputPrev = birthdatePrevRef.current;

    let dateInput = input.replace(/\D/g, "");

    if (input.length < inputPrev.length) {
      setBirthdateInput(input);
      birthdatePrevRef.current = input;
      setSelectedDate(undefined);
      return;
    }

    if (dateInput.length > 1) {
      dateInput = dateInput.slice(0, 2) + "/" + dateInput.slice(2);
    }
    if (dateInput.length > 4) {
      dateInput = dateInput.slice(0, 5) + "/" + dateInput.slice(5);
    }
    const formatted = dateInput.slice(0, 10);
    setBirthdateInput(formatted);
    birthdatePrevRef.current = formatted;

    const parsedDate = parse(formatted, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate)) {
      setMonth(parsedDate);
      setSelectedDate(parsedDate);
    } else {
      setMonth(new Date());
      setSelectedDate(undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      birthdateRef.current?.blur();
      setCalendarOpen(false);
    }
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setBirthdateInput("");
      setMonth(new Date());
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setBirthdateInput(format(date, "MM/dd/yyyy"));
    }
  };

  return stepCompleted ? (
    <ProfileUpdated />
  ) : (
    <div className="grid gap-2 pt-0 pb-0 sm:px-20">
      <h1
        className={cn(
          text({
            font: "title",
            align: "left",
            size: "lg",
            weight: "md"
          })
        )}
      >
        Update your information
      </h1>
      <div
        className={cn(
          card({ variant: "signIn" }),
          "grid gap-4 [&_label]:text-base [&_label]:font-bold"
        )}
      >
        <form ref={profileFormRef} onSubmit={handleProfileForm} className="grid gap-4">
          {memberInfo.map((component, index) =>
            index === 0 ? (
              <div className="grid gap-4 sm:grid-cols-2" key={index}>
                {component.map((field) => (
                  <div key={field.id} className="*:not-first:mt-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      placeholder={field.label}
                      type={field.type}
                      value={field.value}
                      className={cn(field.class, field.disabled ? "bg-primary/3" : "")}
                      disabled={field.disabled}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-rows-5 gap-4" key={index}>
                {component.map((field) => (
                  <div key={field.id} className="*:not-first:mt-2">
                    <Label
                      htmlFor={field.id}
                      className={cn(field.required && "flex items-center gap-1")}
                    >
                      {field.label}
                      {field.required && (
                        <Badge variant="outline" className="text-primary">
                          required
                        </Badge>
                      )}
                    </Label>

                    <div className="relative">
                      <Input
                        id={field.id}
                        ref={field.ref}
                        placeholder={field.id != "cpnumber" ? field.label : "ex.09xxxxxxxxx"}
                        type={field.type}
                        value={field.value}
                        disabled={field.disabled}
                        className={cn(
                          field.disabled ? "bg-primary/3" : "",
                          field.id == "cpnumber" ? "placeholder:font-jetbrains" : "",
                          "peer pe-9"
                        )}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                          e.key === "Enter" && profileFormRef.current?.requestSubmit()
                        }
                        required={field.required}
                        maxLength={field.maxLength}
                        minLength={field.maxLength}
                        onChange={field.onChange}
                      />
                      {field.ref != undefined && (
                        <a
                          className={cn(
                            button({
                              variant: "closeIcon"
                            }),
                            field.clearClass
                          )}
                          onClick={field.onClear}
                        >
                          <CircleX size={20} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          <div className="*:not-first:mt-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <div className="relative">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Input
                    ref={birthdateRef}
                    id="birthdate"
                    placeholder="mm/dd/yyyy"
                    type="text"
                    maxLength={10}
                    onInput={handleBirhtdate}
                    onKeyDown={handleKeyDown}
                    value={birthdateInput}
                    className="peer pe-9"
                  />
                </PopoverTrigger>
                <PopoverContent
                  avoidCollisions={false}
                  side="top"
                  onOpenAutoFocus={(event: Event) => {
                    event.preventDefault();
                    if (birthdateInput.length == 10) {
                      const parsedDate = parse(birthdateInput, "MM/dd/yyyy", new Date());
                      if (isValid(parsedDate)) {
                        setMonth(parsedDate);
                        setSelectedDate(parsedDate);
                      } else {
                        setMonth(new Date());
                        setSelectedDate(undefined);
                      }
                    } else {
                      setMonth(new Date());
                      setSelectedDate(undefined);
                    }
                  }}
                  className="w-fit p-1 sm:w-auto sm:p-2"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleDayPickerSelect}
                  />
                </PopoverContent>
              </Popover>
              <button
                className={cn(
                  button({
                    variant: "closeIcon"
                  }),
                  birthdateInput ? "cursor-pointer opacity-100" : "pointer-events-none opacity-0"
                )}
                aria-label="Submit search"
                type="submit"
                onClick={() => {
                  setBirthdateInput("");
                  setMonth(new Date());
                  setSelectedDate(undefined);
                }}
              >
                <CircleX size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse sm:justify-between">
          <Button
            type="button"
            className="w-full cursor-pointer text-base font-bold"
            size="lg"
            disabled={isPending}
            onClick={() => profileFormRef.current?.requestSubmit()}
          >
            {isPending ? (
              <>
                <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} /> Loading...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            variant="link"
            type="button"
            className="cursor-pointer text-base"
            onClick={() => {
              setStep(1);
            }}
          >
            Back to find your account
          </Button>
        </div>
      </div>
    </div>
  );
}
