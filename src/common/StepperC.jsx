import { useEffect, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

const StepperC = ({ steps, onStepChange }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [stepMobile, setStepMobile] = useState(
    steps.find((_, index) => index === activeStep)
  );

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    onStepChange(activeStep, isLastStep);
  }, [activeStep, isLastStep, onStepChange]);

  useEffect(() => {
    setStepMobile(steps.find((element, index) => index === activeStep));
  }, [activeStep, steps]);

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`mt-10 w-full max-w-7xl px-0 lg:px-24 py-0`}
      >
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          activeLineClassName="bg-cyan-200"
          lineClassName="bg-gray-400"
        >
          {steps.map(({ Details, Icon }, index) => (
            <Step
              activeClassName="bg-blue-500"
              completedClassName="bgClinic"
              className="bg-gray-400"
              onClick={() => setActiveStep(index)}
              key={index}
            >
              <Icon className="h-5 w-5 text-white" />
              <div className="absolute -bottom-[2.5rem] w-max text-center hidden xl:block">
                <Typography
                  color={activeStep === index ? "blue" : "gray"}
                  className="font-semibold sm:text-sm 2xl:text-base"
                >
                  {Details}
                </Typography>
              </div>
            </Step>
          ))}
        </Stepper>
        <div>
          <Typography
            color="blue"
            className="font-semibold xl:hidden sm:text-sm xl:text-base text-center mt-3"
          >
            {stepMobile.Details}
          </Typography>
        </div>
        <div className="mt-3 xl:mt-14 flex justify-between">
          <Button
            onClick={handlePrev}
            disabled={isFirstStep}
            color="blue"
            variant="filled"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            color="blue"
            type="submit"
            disabled={isLastStep}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepperC;
