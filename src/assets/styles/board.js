const style = {
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  popoverOptions: {
    position: 'absolute',
    zIndex: 50,
    elevation: 10,
    width: 50,
    height: 115,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  popoverCancel: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverShovel: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverFlag: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popoverImage: {
    width: 30,
    height: 30,
  },
  popoverCancelImage: {
    width: 12.5,
    height: 12.5,
  },
  modalContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  modalContainerText: {
    fontSize: 20,
  },
};

export default style;
