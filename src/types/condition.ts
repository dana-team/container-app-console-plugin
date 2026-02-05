export type Condition = {
  source: string;
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
};
