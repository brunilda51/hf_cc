/* eslint-disable @typescript-eslint/no-explicit-any */

export const traverse = (
  obj: any,
  path: string[] = [],
  handleClick: (e: React.MouseEvent, path: string[]) => void
) => {
  const isArray = Array.isArray(obj);
  return Object.keys(obj).map((key) => {
    const currentPath = [...path, key];
    const value = obj[key];

    if (value !== null && typeof value === "object") {
      if (Array.isArray(value)) {
        return (
          <div key={currentPath.join(".")}>
            <span style={{ fontWeight: "bold" }}>{key}:</span>
            {"["}
            <div style={{ paddingLeft: "20px" }}>
              {traverse(value, currentPath, handleClick)}
            </div>
            {"]"}
          </div>
        );
      } else
        return (
          <div key={currentPath.join(".")}>
            {isArray ? (
              `{`
            ) : (
              <span style={{ fontWeight: "bold" }}>
                <a href="#" onClick={(e) => handleClick(e, currentPath)}>
                  {key}:
                </a>{" "}
              </span>
            )}

            <div style={{ paddingLeft: "20px" }}>
              {traverse(value, currentPath, handleClick)}
            </div>
            {isArray ? `}` : ""}
          </div>
        );
    } else {
      return (
        <div key={currentPath.join(".")}>
          <span style={{ fontWeight: "bold" }}>
            <a href="#" onClick={(e) => handleClick(e, currentPath)}>
              {key}:
            </a>
          </span>{" "}
          {JSON.stringify(value)}
        </div>
      );
    }
  });
};

export const getValueFromPath = (obj: any, path: string[]): any => {
  for (const key of path) {
    if (obj && key in obj) {
      obj = obj[key];
    } else {
      return undefined;
    }
  }
  return JSON.stringify(obj);
};
