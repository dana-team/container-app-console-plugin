// import {
//   Button,
//   FormGroup,
//   InputGroup,
//   MenuToggle,
//   MenuToggleElement,
//   Select,
//   SelectList,
//   SelectOption,
//   TextInput,
//   Title,
// } from '@patternfly/react-core';
// import * as React from 'react';
// import { useState } from 'react';
// import { Action } from 'src/types/action';
// import { State, Volume } from 'src/types/state';
// import CappFormTextInput from './CappFormTextInput';
// import { DROPDOWN_CAPACITY_UNITS } from '../../consts';

// interface VolumesSectionProps {
//   state: State;
//   dispatch: React.Dispatch<Action>;
// }

// const VolumesSection: React.FC<VolumesSectionProps> = ({ state, dispatch }) => {
//   const [isStorageUnitOpen, setIsStorageUnitOpen] = useState<boolean>(false);

//   return (
//     <>
//       <Title headingLevel="h2">Volumes Spec</Title>

//       <Button
//         variant="secondary"
//         onClick={() => dispatch({ type: 'addVolume' })}
//         className="pf-v5-u-mb-md"
//       >
//         Add NFS Volume
//       </Button>

//       {state.volumes.map((vol: Volume, index: number) => (
//         <div key={index} className="pf-v5-u-mb-md">
//           <Title headingLevel="h3">NFS Volume #{index + 1}</Title>

//           <CappFormTextInput
//             label="Name"
//             id={`vol-name-${index}`}
//             placeholder="volume-name"
//             value={vol.name}
//             onChange={(_, v) => dispatch({ type: 'setVolumeName', index: index, value: v })}
//             error={state.nameError}
//           />

//           <CappFormTextInput
//             label="Server"
//             id={`vol-server-${index}`}
//             placeholder="vs-nas-omer"
//             value={vol.server}
//             onChange={(_, v) => dispatch({ type: 'setVolumeServer', index: index, value: v })}
//             error={state.serverError}
//             hint="The hostname or IP address of the NFS server"
//           />

//           <CappFormTextInput
//             label="Path"
//             id={`vol-path-${index}`}
//             placeholder="/export/path"
//             value={vol.path}
//             onChange={(_, v) => dispatch({ type: 'setVolumePath', index: index, value: v })}
//             error={state.pathError}
//             hint='The Path of the NFS server. The Path has to begin with "/"'
//           />

//           <FormGroup label="Capacity (Gi)" isRequired fieldId={`vol-cap-${index}`}>
//             <InputGroup>
//               <TextInput
//                 isRequired
//                 type="number"
//                 id={`capacityValue-${index}`}
//                 name={`capacityValue-${index}`}
//                 value={vol.capacity?.toString() || ''}
//                 onChange={(_, v) =>
//                   dispatch({ type: 'setVolumeCapacity', index: index, value: Number(v) })
//                 }
//                 placeholder="Size"
//                 style={{ flexGrow: 1, minWidth: '100%' }}
//               />
//               <Select
//                 id={`capacity-unit-${index}`}
//                 isOpen={isStorageUnitOpen}
//                 selected={state.capacityUnit}
//                 onSelect={(_, val) => {
//                   dispatch({ type: 'setCapacityUnit', capacityUnits: val as string });
//                   setIsStorageUnitOpen(false);
//                 }}
//                 onOpenChange={(open) => setIsStorageUnitOpen(open)}
//                 toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
//                   <MenuToggle
//                     ref={toggleRef}
//                     onClick={() => setIsStorageUnitOpen(!isStorageUnitOpen)}
//                     id={`capacity-unit-toggle-${index}`}
//                   >
//                     {DROPDOWN_CAPACITY_UNITS[state.capacityUnit] || 'Select Unit'}
//                   </MenuToggle>
//                 )}
//                 style={{ flexGrow: 0, minWidth: 'max-content' }}
//               >
//                 <SelectList>
//                   {Object.keys(DROPDOWN_CAPACITY_UNITS).map((key) => (
//                     <SelectOption key={key} value={key}>
//                       {DROPDOWN_CAPACITY_UNITS[key]}
//                     </SelectOption>
//                   ))}
//                 </SelectList>
//               </Select>
//             </InputGroup>
//           </FormGroup>

//           <Button variant="danger" onClick={() => dispatch({ type: 'removeVolume', index })}>
//             Remove Volume
//           </Button>
//         </div>
//       ))}
//     </>
//   );
// };

// export default VolumesSection;
