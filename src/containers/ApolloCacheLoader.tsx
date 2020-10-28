import React, { Fragment } from "react";
import { useLoadCache } from "../hooks/useLoadCache";

export const ApolloCacheLoader: React.FC = ({children}) => {
  const { isCacheLoading } = useLoadCache();

  if (isCacheLoading) return <Fragment />;

  return <div>{children}</div>
};
