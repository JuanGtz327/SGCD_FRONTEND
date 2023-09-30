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
        activeLineClassName="bg-cyan-200"
        lineClassName="bg-gray-400"
      >
        {steps.map(({Details,Icon},index) => (
          <Step activeClassName="bg-blue-700" completedClassName="bg-cyan-700" className="bg-gray-400" onClick={() => setActiveStep(index)} key={index}>
            <Icon className="h-5 w-5 text-white" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === index ? "cyan" : "gray"}
              >
                {Details}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
      <div className="mt-14 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep} className="bg-light-blue-600" variant="filled">
          Anterior
        </Button>
        <Button onClick={handleNext} className="bg-light-blue-600" type="submit" disabled={isLastStep}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default StepperC;
