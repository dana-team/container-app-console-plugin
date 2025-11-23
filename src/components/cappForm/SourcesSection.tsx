// import { Button, FormGroup, InputGroup, TextInput, Title } from '@patternfly/react-core';
// import * as React from 'react';
// import { Source, State } from 'src/types/state';
// import CappFormTextInput from './CappFormTextInput';
// import { Action } from 'src/types/action';

// interface SourcesSectionProps {
//   state: State;
//   dispatch: React.Dispatch<Action>;
// }

// const SourcesSection: React.FC<SourcesSectionProps> = ({ state, dispatch }) => (
//   <>
//     <Title headingLevel="h2">Sources</Title>

//     <Button
//       variant="secondary"
//       onClick={() => dispatch({ type: 'addSource' })}
//       className="pf-v5-u-mb-md"
//     >
//       Add Kafka Source
//     </Button>

//     {state.sources.map((src: Source, index: number) => (
//       <div key={index} className="pf-v5-u-mb-md">
//         <Title headingLevel="h3">Source #{index + 1}</Title>

//         <CappFormTextInput
//           label="Name"
//           id={`src-name-${index}`}
//           placeholder="kafka-source"
//           value={src.name}
//           onChange={(_, v) => dispatch({ type: 'setSourceName', index: index, value: v })}
//           error={state.nameError}
//         />

//         <FormGroup label="Type" fieldId={`src-type-${index}`}>
//           <TextInput value="Kafka" readOnly />
//         </FormGroup>

//         <FormGroup label="Bootstrap Servers" fieldId={`src-bootstrap-${index}`}>
//           <Button
//             variant="secondary"
//             onClick={() => dispatch({ type: 'addBootstrapServer', index })}
//           >
//             Add Server
//           </Button>

//           {src.bootstrapServers?.map((b: string, j: number) => (
//             <InputGroup key={j} className="pf-v5-u-mt-sm">
//               <TextInput
//                 placeholder="broker:9092"
//                 value={b}
//                 onChange={(_, v) =>
//                   dispatch({
//                     type: 'updateBootstrapServer',
//                     index,
//                     serverIndex: j,
//                     value: v,
//                   })
//                 }
//               />
//               <Button
//                 variant="danger"
//                 onClick={() =>
//                   dispatch({
//                     type: 'removeBootstrapServer',
//                     index,
//                     serverIndex: j,
//                   })
//                 }
//               >
//                 Remove
//               </Button>
//             </InputGroup>
//           ))}
//         </FormGroup>

//         <FormGroup label="Topics" fieldId={`src-topic-${index}`}>
//           <Button variant="secondary" onClick={() => dispatch({ type: 'addSourceTopic', index })}>
//             Add Topic
//           </Button>

//           {src.topic.map((t: string, j: number) => (
//             <InputGroup key={j} className="pf-v5-u-mt-sm">
//               <TextInput
//                 placeholder="my-topic"
//                 value={t}
//                 onChange={(_, v) =>
//                   dispatch({
//                     type: 'updateSourceTopic',
//                     index,
//                     topicIndex: j,
//                     value: v,
//                   })
//                 }
//               />
//               <Button
//                 variant="danger"
//                 onClick={() =>
//                   dispatch({
//                     type: 'removeSourceTopic',
//                     index,
//                     topicIndex: j,
//                   })
//                 }
//               >
//                 Remove
//               </Button>
//             </InputGroup>
//           ))}
//         </FormGroup>
//       </div>
//     ))}
//   </>
// );

// export default SourcesSection;
