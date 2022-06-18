export const reactTabsStyles = {
  ".react-tabs": { WebkitTapHighlightColor: "transparent" },
  ".react-tabs__tab-list": {
    borderBottom: "1px solid ",
    borderColor: "background2",
    margin: "0 0 10px",
    padding: "0",
    marginBottom: "1.6rem",
  },
  ".react-tabs__tab": {
    display: "inline-block",
    border: "1px solid transparent",
    borderBottom: "none",
    bottom: "-1px",
    position: "relative",
    listStyle: "none",
    padding: "6px 12px",
    cursor: "pointer",
  } as any,
  ".react-tabs__tab--selected": {
    backgroundColor: "primary",
    borderColor: "background2",
    color: "#ffffff",
    borderRadius: "5px 5px 0 0",
  },
  ".react-tabs__tab--disabled": { color: "GrayText", cursor: "default" },
  ".react-tabs__tab:focus": {
    boxShadow: "0 0 5px hsl(208, 99%, 50%)",
    borderColor: "background2",
    outline: "none",
  },
  ".react-tabs__tab-panel": { display: "none" },
  ".react-tabs__tab-panel--selected": { display: "block" },
};
