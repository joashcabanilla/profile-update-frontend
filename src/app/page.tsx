"use client";

export default function Home() {
    return (
        <div className="container-wrapper">
            {/* note: ililipat sa tailwind variants */}
            <div className="bg-card text-card-foreground mx-auto mt-4 w-full max-w-[650px] rounded-lg border p-2 shadow-lg grid grid-rows-4 gap-4 sm:gap-6">
                <div className="header">
                    <div className="border-2">logo</div>
                    <div className="border-2">title ng web app</div>
                    <div className="border-2">
                        note or tips para saan yung website data privacy
                    </div>
                </div>
                <div className="border-2">stepper design</div>
                <div className="border-2">
                    step container / child components
                </div>
                <div className="border-2">
                    button for back and next steps
                </div>
            </div>
        </div>
    );
}
