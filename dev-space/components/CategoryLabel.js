import React from "react";
import Link from "next/link";
import { useToggle } from "../hooks/useToggle";

const bgColors = {
  yellow: "rgb(217, 119, 6)",
  red: "rgb(220, 38, 38)",
  blue: "rgb(37, 99, 235)",
  green: "rgb(5, 150, 105)",
  purple: "rgb(124, 58, 237)",
};

const colorKey = {
  JavaScript: "yellow",
  CSS: "blue",
  Python: "green",
  PHP: "purple",
  Ruby: "red",
};

const CategoryLabel = ({ children }) => {
  const [hover, setHover] = useToggle(false);

  const handleBgColors = (colorKey) => {
    const key = colorKey[children];
    return bgColors[key];
  };
  const styles = {
    categoryLabel: {
      padding: "0.2rem .4rem",
      backgroundColor: handleBgColors(colorKey),

      fontWeight: "bold",
      borderRadius: "5px",
    },
    link: {
      color: "rgb(243, 244, 246)",
    },
  };

  const hovered = (function handleHoveredStyle(hover) {
    if (hover) {
      const temp = styles.link.color;
      styles.link.color = styles.categoryLabel.backgroundColor;
      styles.categoryLabel.backgroundColor = temp;
    }
  })(hover);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.categoryLabel,
      }}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>
        <a
          style={{
            ...styles.link,
          }}
        >
          {" "}
          {children}
        </a>
      </Link>
    </div>
  );
};

export default React.memo(CategoryLabel);
