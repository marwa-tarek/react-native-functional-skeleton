import { ViewStyleSheet, wp } from "@yourProjectName/utils"

const appStyles = ViewStyleSheet({
  /* Column Layouts */
  column: {
    flexDirection: "column",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  colCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  colVCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  colHCenter: {
    flexDirection: "column",
    justifyContent: "center",
  },
  /* Row Layouts */
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowVCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowHCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaceBtwn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  /* Default Layouts */
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  alignItemsStretch: {
    alignItems: "stretch",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentAround: {
    justifyContent: "space-around",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  selfStretch: {
    alignSelf: "stretch",
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: "90deg" }],
  },
  rotate90Inverse: {
    transform: [{ rotate: "-90deg" }],
  },
  /* App Spinner/Loader */
  spinner: {
    position: "absolute",
    top: "40%",
    left: "42%",
    right: 0,
    bottom: 0,
    width: wp(60),
    height: wp(60),
  },
})

export default appStyles
