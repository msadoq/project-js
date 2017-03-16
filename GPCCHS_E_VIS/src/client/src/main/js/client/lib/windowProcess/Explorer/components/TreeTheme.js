export default {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      color: '#333',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px',
    },
    node: {
      base: {
        position: 'relative',
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block',
      },
      activeLink: {
        background: '#31363F',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px',
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px',
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#333',
          strokeWidth: 0,
        },
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#333',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px',
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle',
          fontWeight: 'bold',
        },
        value: {
          lineHeight: '24px',
          verticalAlign: 'middle',
          fontWeight: 'normal',
        },
        link: {
          textDecoration: 'underline',
        },
        item: {
          color: '#999',
          fontStyle: 'italic',
        },
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px',
      },
      loading: {
        color: '#999',
        fontWeight: 'bold',
      },
    },
  },
};
