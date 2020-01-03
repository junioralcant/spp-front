const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",
  padding: 10,
  maxHeight: 25,
  width: "40vh",
  borderRadius: 3,
  color: "#fff",
  marginTop: 0,
  transition: "border 0.15s ease",
  fontSize: 16
});

export const colorStyle = {
  control: styles => ({
    ...styles,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "white"
  }),
  option: styles => ({
    ...styles,
    backgroundColor: "#353940",
    color: "#fff"
  }),
  input: styles => ({ ...styles, color: "#fff", ...dot() }),
  singleValue: styles => ({ ...styles, color: "#fff", ...dot() })
};
