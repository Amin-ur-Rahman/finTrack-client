import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div className={`bg-muted/40 animate-pulse rounded-md ${className}`} />
  );
};

export default Skeleton;
