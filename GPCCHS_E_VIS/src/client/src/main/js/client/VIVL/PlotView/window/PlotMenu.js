// import React, { PureComponent, PropTypes } from 'react';
// import classnames from 'classnames';
// import { Dropdown } from 'react-bootstrap';
//
// export default class PlotMenu extends PureComponent {
//   static propTypes = {
//     isOpened: PropTypes.bool,
//     openOnLeft: PropTypes.bool,
//     openOnTop: PropTypes.bool,
//     children: PropTypes.node.isRequired,
//     mousePosition: PropTypes.shape({
//       X: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
//       y: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
//     }),
//   }
//
//   render() {
//     const {
//       isOpened,
//       openOnLeft,
//       openOnTop,
//       children,
//       mousePosition: { x, y },
//     } = this.props;
//
//     const menuStyle = {
//       position: 'absolute',
//       left: x,
//       top: y
//     };
//
//     return (
//       <div
//         className={
//           classnames('dropdown', {
//             open: isOpened,
//             dropup: openOnTop
//           })}
//         style={menuStyle}
//       >
//         <Dropdown.Menu pullRight={openOnLeft}>
//           {children}
//         </Dropdown.Menu>
//       </div>
//     );
//   }
// }

/** @TODO Uncomment when implementing markers! do the same for the Editor PlotTab part.
 <PlotMenu
 isOpened={isMenuOpened}
 openOnLeft={menuOpenOnLeft}
 openOnTop={menuOpenOnTop}
 mousePosition={menuPosition}
 >
 {disconnected &&
 <Button
 bsStyle="danger"
 bsSize="xs"
 className={styles.disconnectedButton}
 onClick={this.reconnect}
 >Reconnect</Button>
 }
 <ChartCanvas
 plotFull={false}
 ratio={1}
 width={containerWidth}
 height={containerHeight}
 margin={marginChart}
 pointsPerPxThreshold={4}
 seriesName="PlotView"
 data={columns}
 type="hybrid"
 xAccessor={this.xAccessor}
 xScale={scaleTime()}
 yAxisZoom={(id, domain) => console.log('zoom', id, domain)}
 zoomEvent={!disableZoom}
 xExtents={[new Date(lower), new Date(upper)]}
 >
 {this.getCharts()}
 <CrossHairCursor opacity={1} />
 <HoverTooltip
 tooltipContent={this.handleTooltipContent}
 opacity={1}
 fill="#FFFFFF"
 stroke="#F0F0F0"
 bgwidth={160}
 bgheight={50}
 tooltipCanvas={this.tooltipCanvas}
 backgroundShapeCanvas={this.backgroundShapeCanvas.bind(this)}
 />
 </ChartCanvas>
 do the same for the Editor PlotTab part.
 <PlotMenu
 isOpened={isMenuOpened}
 openOnLeft={menuOpenOnLeft}
 openOnTop={menuOpenOnTop}
 mousePosition={menuPosition}
 >
 <MenuItem header>Markers</MenuItem>
 <MenuItem divider />
 <MenuItem>Add a Text</MenuItem>
 <MenuItem>Add an horizontal line</MenuItem>
 <MenuItem>Add an Vertical line</MenuItem>
 </PlotMenu>
*/
