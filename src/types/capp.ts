import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';

export const Capp: K8sModel = {
  label: 'Capp',
  apiGroup: 'rcs.dana.io',
  apiVersion: 'v1alpha1',
  plural: 'capps',
  abbr: 'CAPP',
  namespaced: true,
  kind: 'Capp',
  id: 'capp',
  labelPlural: 'Capp',
  crd: true,
};
