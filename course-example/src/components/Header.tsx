import { TitleProps } from '../types';

const Header = (props: TitleProps) => {
    return <h1>{props.name}</h1>;
  };

export default Header