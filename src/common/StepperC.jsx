import React, { useEffect, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

const StepperC = ({steps,onStepChange}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    onStepChange(activeStep,isLastStep);
  }, [activeStep]);

  return (
    <div className={`mx-auto mt-auto ${steps.length<=3?'w-1/2':'w-[85%]'} px-24 py-0`}>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        {steps.map(({Details,Icon},index) => (
          <Step onClick={() => setActiveStep(index)} key={index}>
            <Icon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === index ? "blue-gray" : "gray"}
              >
                {Details}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
      <div className="mt-14 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Anterior
        </Button>
        <Button onClick={handleNext} type="submit" disabled={isLastStep}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default StepperC;
