import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 1,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    color: "rgba(0,141,228)"
  },
  image: {
    marginLeft: "15px"
  }
}));
