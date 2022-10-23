const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: 0,
    left: 0,
    transition: "opacity .3s ease",
  },
  hidden: { opacity: 0, zIndex: -100 },
  visible: { opacity: 1, zIndex: 1 },
  text: {
    textAlign: "center",
    m: 0,
  },
  cardBody: { ai: "center" },
};

export default styles;
