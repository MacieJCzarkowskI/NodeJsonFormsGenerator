import { Accordion, Button, Icon } from '@components'
import { css } from '@emotion/core'
import React, { cloneElement, FC, isValidElement, ReactNode, useState } from 'react'

export interface Step {
  key: string
  title: ReactNode | string
  content: ReactNode[] | ReactNode | string
  nextStepButton?: ReactNode
}

export interface StepperProps {
  steps: Step[]
  finalStepButton?: ReactNode
  hideFirstStepBackButton?: boolean
}

const getAccordionCss = (isLast: boolean) =>
  !isLast &&
  css`
    margin-bottom: 16px;
  `

export const Stepper: FC<StepperProps> = ({ steps, hideFirstStepBackButton, finalStepButton }) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const isFirstStep: boolean = activeStep === 0

  return (
    <div>
      {steps.map((step, index) => {
        let nextStepButton = <Button onClick={handleNext}>Next</Button>

        if (steps.length - 1 === index && isValidElement(finalStepButton)) {
          nextStepButton = cloneElement(finalStepButton, finalStepButton.props)
        } else if (isValidElement(step.nextStepButton)) {
          nextStepButton = cloneElement(step.nextStepButton, {
            ...step.nextStepButton.props,
            onClick: handleNext,
          })
        }

        return (
          <Accordion
            key={step?.key}
            title={
              <div className="flex">
                {activeStep > index && <Icon name="done" className="text-green-600 mr-2" />} {step.title}
              </div>
            }
            expanded={activeStep === index}
            css={getAccordionCss(steps.length - 1 === index)}
          >
            <div>{step.content}</div>

            <div className="mt-3">
              {(!hideFirstStepBackButton || !isFirstStep) && (
                <Button className="mr-2" disabled={isFirstStep} onClick={handleBack}>
                  Back
                </Button>
              )}
              {nextStepButton}
            </div>
          </Accordion>
        )
      })}
    </div>
  )
}
