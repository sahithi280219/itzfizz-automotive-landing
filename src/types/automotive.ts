export interface CarSpec {
  label: string;
  value: string;
  unit?: string;
  description: string;
}

export interface AnimationStage {
  id: string;
  phase: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricUnit: string;
  statExtra: string;
}

export interface ViewAngle {
  id: 'side' | 'front' | 'rear' | 'cockpit';
  name: string;
  imageSrc: string;
  caption: string;
}

export interface ColorFinish {
  id: string;
  name: string;
  hex: string;
  accentClass: string;
  finishType: string;
}
