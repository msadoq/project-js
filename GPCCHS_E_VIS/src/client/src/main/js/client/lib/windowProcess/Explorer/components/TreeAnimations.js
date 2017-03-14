export default {
  toggle: props => ({
    animation: { rotateZ: props.node.toggled ? 90 : 0 },
    duration: 50,
  }),
  drawer: () => ({
    enter: {
      animation: 'slideDown',
      duration: 50,
    },
    leave: {
      animation: 'slideUp',
      duration: 50,
    },
  }),
};
