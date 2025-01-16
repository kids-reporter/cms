import styled from 'styled-components'
import { ThemeColor } from '@/app/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 42px;
`

const Label = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

const Switch = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 40px;
  height: 20px;
  background: gray;
  border-radius: 20px;
  padding: 0px;
  transition: 100ms ease-in-out;

  &:before {
    transition: 100ms ease-in-out;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 20px;
    top: 50%;
    left: 2px;
    background: white;
    transform: translate(0, -50%);
  }
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: ${(props) => (props.disabled ? 'gray' : ThemeColor.BLUE)};
    &:before {
      transform: translate(20px, -50%);
    }
  }
`

const themeBlue = ThemeColor.BLUE

export const ToggleButton = ({
  value = false,
  disabled = false,
  onChange,
  ...props
}: {
  value: boolean
  disabled?: boolean
  onChange: () => void
}) => {
  const handleChange = () => {
    onChange && onChange()
  }

  return (
    <Container>
      <Label disabled={disabled} {...props}>
        <Input
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={handleChange}
        />
        <Switch disabled={disabled} />
      </Label>
    </Container>
  )
}

export const Checkbox = (props: { checked: boolean; label: string }) => {
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border-2 border-[#575757] checked:bg-[${themeBlue}] checked:border-[${themeBlue}]`}
          id="check1"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        style={{ color: '#575757' }}
        className="ms-2 text-base font-medium"
      >
        {props.label}
      </label>
    </div>
  )
}
