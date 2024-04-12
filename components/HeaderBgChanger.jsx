"use client";
import useUIState from "@/hooks/useUIState";
import React, { useEffect } from "react";

const HeaderBgChanger = ({ imageSrc }) => {
  const { setHeaderImageSrc } = useUIState();

  useEffect(() => {
    if (imageSrc) setHeaderImageSrc(imageSrc);
  }, [imageSrc]);

  return <div></div>;
};

export default HeaderBgChanger;
