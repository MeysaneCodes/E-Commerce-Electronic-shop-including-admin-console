export default function CustomStepper ({stepperIndex}:{stepperIndex:number}){

    const connectorBase = "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block";
    const circleBase = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-12 lg:w-12";


    return (
        <div className="w-full">
            <ol className="flex w-full items-center justify-center">
                <li
                    className={`flex w-full items-center ${
                        stepperIndex === 0 ? "after:border-border" : "after:border-primary"
                    } ${connectorBase}`}
                >
                    <span className={`${circleBase} bg-primary text-primary-foreground`}>
                        0
                    </span>
                </li>

                <li
                    className={`flex w-full items-center ${
                        stepperIndex > 1 ? "after:border-primary" : "after:border-border"
                    } ${connectorBase}`}
                >
                    <span
                        className={`${circleBase} ${
                            stepperIndex >= 1
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                        1
                    </span>
                </li>

                <li className="flex items-center">
                    <span
                        className={`${circleBase} ${
                            stepperIndex === 2
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                        2
                    </span>
                </li>
            </ol>
        </div>
    );

}