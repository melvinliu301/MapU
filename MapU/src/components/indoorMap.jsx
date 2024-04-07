// import React, { Component } from 'react';
// import fengmapSDK from 'fengmap';
// import { FengmapBase, FengmapNavigation } from 'react-fengmap';

// export default class IndoorMap extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             mapId: '1769653400597381121',
//             mapOptions: {
//                 key: '3c9f775893ea11310c69acc19763c80a',
//                 appName: 'MapU',
//                 defaultMapScaleLevel: 20,
//                 defaultTiltAngle: 0,
//             }
//         }
//     }

//     render() {
//         return (
//             <FengmapBase
//                 fengmapSDK={fengmapSDK}
//                 mapId={this.state.mapId}
//                 mapOptions={this.state.mapOptions}
//                 style={{ width: '100%', height: '100%' }}
//             >
//                 <FengmapNavigation
//                     naviOptions={{
//                         lineStyle: {
//                           lineType: fengmapSDK.FMLineType.FMARROW,
//                           lineWidth: 6
//                         }
//                       }}
//                       start={props.startPoint}
//                       end={props.endPoint}
//                     />
//             </FengmapBase>
//         );
//     }
// }    
