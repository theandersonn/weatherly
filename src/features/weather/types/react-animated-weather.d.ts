declare module 'react-animated-weather' {
  import { Component } from 'react';

  interface AnimatedWeatherIconProps {
    icon: string;
    color?: string;
    size?: number;
    animate?: boolean;
  }

  export default class AnimatedWeatherIcon extends Component<AnimatedWeatherIconProps> {}
}
