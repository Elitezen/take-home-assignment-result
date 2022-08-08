import './ShadowWrapper.scss';

type ShadowWrapperProps = {
  clearScreen: () => void;
}

export default function ShadowWrapper({
  clearScreen
}:ShadowWrapperProps) {
  return (
    <div id="wrapper" onClick={() => clearScreen()} />
  )
}