
import { useState, useEffect } from "react";

export type AnimationStage = 'initial' | 'textFadeOut' | 'logoTransition';

interface LoginStagesProps {
  children: (stage: AnimationStage) => React.ReactNode;
}

const LoginStages = ({ children }: LoginStagesProps) => {
  const [stage, setStage] = useState<AnimationStage>('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('textFadeOut'), 2000);   // Reduced from 3000ms to 2000ms
    const timer2 = setTimeout(() => setStage('logoTransition'), 2500); // Reduced from 4000ms to 2500ms

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return <>{children(stage)}</>;
};

export default LoginStages;
