/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/aria-role */
import React, { ComponentType, FC, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { ComponentTemplate, TemplateRenderer } from './TemplateRenderer'

function Input({ ...rest }) {
  return <input role="input" {...rest} />
}

const Wrapper: FC = ({ children, ...rest }) => {
  return (
    <div role="wrapper" {...rest}>
      {children}
    </div>
  )
}

const SlotWrapper: FC<{ slot: ReactNode }> = ({ slot, ...rest }) => {
  return (
    <div role="slotWrapper" {...rest}>
      {slot}
    </div>
  )
}

const components: Record<string, ComponentType<any>> = {
  input: Input,
  wrapper: Wrapper,
  slotWrapper: SlotWrapper,
}

const renderWithMocks = (template: ComponentTemplate[] | ComponentTemplate) => {
  return render(<TemplateRenderer templates={template} components={components} />)
}

describe('TemplateRenderer.tsx', () => {
  it('should render basic template', () => {
    const template: ComponentTemplate = {
      type: 'input',
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('input')).toBeValid()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('should render basic HTML template', () => {
    const template: ComponentTemplate = {
      type: 'div',
      children: 'test',
    }

    const { getByText } = renderWithMocks(template)

    expect(getByText('test')).toBeInTheDocument()
  })

  it('should render wrapper with input as single children', () => {
    const template: ComponentTemplate = {
      type: 'wrapper',
      children: {
        type: 'input',
      },
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('wrapper')).toBeInTheDocument()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('should render wrapper with input as children array', () => {
    const template: ComponentTemplate = {
      type: 'wrapper',
      children: [
        {
          type: 'input',
        },
      ],
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('wrapper')).toBeInTheDocument()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('should render wrapper with text as children', () => {
    const template: ComponentTemplate = {
      type: 'wrapper',
      children: 'WRAPPER_CONTENT',
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('wrapper')).toBeInTheDocument()
    expect(getByRole('wrapper')).toHaveTextContent('WRAPPER_CONTENT')
  })

  it('should render wrapper with text in slot', () => {
    const template: ComponentTemplate = {
      type: 'slotWrapper',
      options: {
        slot: 'SLOT_CONTENT',
      },
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('slotWrapper')).toBeInTheDocument()
    expect(getByRole('slotWrapper')).toHaveTextContent('SLOT_CONTENT')
  })

  it('should render wrapper with input as slot', () => {
    const template: ComponentTemplate = {
      type: 'slotWrapper',
      options: {
        slot: [
          {
            type: 'input',
          },
        ],
      },
    }

    const { getByRole } = renderWithMocks(template)

    expect(getByRole('slotWrapper')).toBeInTheDocument()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('should render input in nested wrappers', () => {
    const template: ComponentTemplate = {
      type: 'wrapper',
      options: {
        'data-testid': 'root-wrapper',
      },
      children: {
        type: 'wrapper',
        options: {
          'data-testid': 'nested-wrapper',
        },
        children: {
          type: 'input',
        },
      },
    }

    const { getByTestId, getByRole } = renderWithMocks(template)

    expect(getByTestId('root-wrapper')).toContainElement(getByTestId('nested-wrapper'))
    expect(getByTestId('nested-wrapper')).toContainElement(getByRole('input'))
  })

  it('should render input in nested slot-wrappers', () => {
    const template: ComponentTemplate = {
      type: 'slotWrapper',
      options: {
        'data-testid': 'root-wrapper',
        slot: {
          type: 'slotWrapper',
          options: {
            'data-testid': 'nested-wrapper',
            slot: {
              type: 'input',
            },
          },
        },
      },
    }

    const { getByTestId, getByRole } = renderWithMocks(template)

    expect(getByTestId('root-wrapper')).toContainElement(getByTestId('nested-wrapper'))
    expect(getByTestId('nested-wrapper')).toContainElement(getByRole('input'))
  })

  it('should throw error when component cannot be found', () => {
    const template: ComponentTemplate = {
      type: 'non-existing-component',
    }

    expect(() => renderWithMocks(template)).toThrowError(
      new Error("Component with type: 'non-existing-component' does not exist"),
    )
  })

  it('should throw error when nested component cannot be found', () => {
    const template: ComponentTemplate = {
      type: 'wrapper',
      children: {
        type: 'non-existing-component',
      },
    }

    expect(() => renderWithMocks(template)).toThrowError(
      new Error("Component with type: 'non-existing-component' does not exist"),
    )
  })
})
