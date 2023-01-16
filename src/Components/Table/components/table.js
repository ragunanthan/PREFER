import React from "react";
import { View } from "react-native";

export function Table({ borderStyle, style, children }) {
  const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
  const borderBottomWidth = borderLeftWidth;
  const borderColor = (borderStyle && borderStyle.borderColor) || "#000";

  return (
    <View
      style={[
        style,
        {
          borderLeftWidth,
          borderBottomWidth,
          borderColor,
        },
      ]}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(
          child,
          borderStyle && child.type.displayName !== "ScrollView"
            ? { borderStyle: borderStyle }
            : {}
        )
      )}
    </View>
  );
}

export function TableWrapper({ style,borderStyle, children }) {
  return (
    <View style={style}>
      {React.Children.map(children, (child) =>
        React.cloneElement(
          child,
          borderStyle ? { borderStyle: borderStyle } : {}
        )
      )}
    </View>
  );
}
